import React, { Component } from 'react'
import { Input, InputNumber } from 'antd'
import _ from 'lodash'
import './index.css'
const { TextArea } = Input

const scriptUtil = { registerReactDom: () => {}, executeScriptService: () => {} }

const granularity_list = [
  { valueName: '粒级', valueKey: 'particleSize', valueType: 'json' },
  { valueName: '粒度分布', valueKey: 'distribution', valueType: 'json' },
  { valueName: '最大粒径', valueKey: 'maxSize', valueType: 'number' },
  { valueName: '粒度分布', valueKey: 'stdDist', valueType: 'json', disabled: true },
  { valueName: '粒级', valueKey: 'stdPs', valueType: 'json', disabled: true },
]
const process_list = [
  { valueName: '矿石密度', valueKey: 'rho', valueType: 'number' },
  { valueName: '给矿1', valueKey: 'feed1', valueType: 'feed' },
  { valueName: '给矿2', valueKey: 'feed2', valueType: 'feed' },
  { valueName: '给矿3', valueKey: 'feed3', valueType: 'feed' },
  { valueName: '给水量1', valueKey: 'water1', valueType: 'number' },
  { valueName: '给水量2', valueKey: 'water2', valueType: 'number' },
  { valueName: '给水量3', valueKey: 'water3', valueType: 'number' },
]

class JSONEditor extends Component {
  constructor(props) {
    super(props)
    this.state = {
      inputValue: JSON.stringify(props.initialValue),
      parsedValue: props.initialValue,
      isValidJSON: true,
      errorMessage: '',
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.initialValue !== this.props.initialValue) {
      this.setState({
        inputValue: JSON.stringify(this.props.initialValue),
        parsedValue: this.props.initialValue,
        isValidJSON: true,
        errorMessage: '',
      })
    }
  }

  handleInputChange = (event) => {
    const inputValue = event.target.value
    this.setState({ inputValue }, this.validateAndParseJSON)
  }

  validateAndParseJSON() {
    try {
      const parsedValue = JSON.parse(this.state.inputValue)
      this.setState(
        {
          parsedValue,
          isValidJSON: true,
          errorMessage: '',
        },
        () => {
          if (this.props.onValidInput) {
            this.props.onValidInput(parsedValue)
          }
        }
      )
    } catch (error) {
      this.setState({
        parsedValue: null,
        isValidJSON: false,
        errorMessage: '请输入有效的JSON字符串',
      })
    }
  }

  render() {
    const { inputValue, isValidJSON, errorMessage } = this.state

    return (
      <div>
        <TextArea
          rows={2}
          value={inputValue}
          onChange={this.handleInputChange}
          placeholder="请输入或编辑JSON字符串"
          disabled={this.props.disabled || false}
        />
        {!isValidJSON && <div style={{ color: 'red' }}>{errorMessage}</div>}
      </div>
    )
  }
}

class Feed extends Component {
  constructor(props) {
    super(props)
    this.state = {
      inputValue: props.initialValue || {
        ore: 0,
        water: 0,
        dist: [],
      },
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.initialValue !== this.props.initialValue) {
      this.setState({
        inputValue: this.props.initialValue,
      })
    }
  }

  handleInputChange = (key, value) => {
    this.setState({ inputValue: { ...inputValue, [key]: value } }, () => {
      if (this.props.onChange) {
        this.props.onChange({ ...inputValue, [key]: value })
      }
    })
  }

  render() {
    const { inputValue } = this.state
    const { valueName = '' } = this.props
    return (
      <div>
        <h4>{valueName}</h4>
        <InputNumber
          value={inputValue.ore}
          onChange={(value) => this.handleInputChange('ore', value)}
        ></InputNumber>
        <InputNumber
          value={inputValue.water}
          onChange={(value) => this.handleInputChange('water', value)}
        ></InputNumber>
        <TextArea rows={2} value={JSON.stringify(inputValue.dist)} disabled />
      </div>
    )
  }
}
class CustomComp extends Component {
  constructor(props) {
    super(props)
    const config = props?.data?._attrObject.data || {}
    console.log('simu props config', config)
    this.state = {
      equipType: config?.type?.value || 'Ball',
      modelType: config?.model?.value || 'PerfectMixing',
      granularityParams: {
        type: 'particleSize',
        particleSize: [2, 1, 0.1],
        distribution: [0.8, 0.6, 0.3],
        maxSize: 4,
      },
      granularityOutputParams: {
        stdDist: [], //粒度分布 用于给feed1的dist
        stdPs: [], //粒级
      },
      processParams: {
        rho: 2.7, //密度，t/m³
        maxSize: 4, //最大粒径，mm 等于granularityParams.maxSize
        feed1: {
          ore: 400, //给矿量，t/h
          water: 10, //给矿中含水量，
          dist: [],
        },
        feed2: {
          ore: 0,
          water: 0,
          dist: [],
        },
        feed3: {
          ore: 0,
          water: 0,
          dist: [],
        },
        water1: 90, //给水量，m³/h
        water2: 0, //给水量，m³/h
        water3: 0, //给水量，m³/h
      },
    }
  }
  componentDidMount() {
    scriptUtil.registerReactDom(this, this.props)
  }

  getInputValue = () => {
    return this.state.inputParams
  }

  setInputValue = (value) => {
    this.setState({ inputParams: value })
  }

  setOutputValue = (value) => {
    this.setState({ outputParams: value })
  }

  renderGranularityHtml = () => {
    const { granularityParams, granularityOutputParams } = this.state
    return (
      <div>
        <h4>矿石粒度</h4>
        <div className="inputDiv">
          {granularity_list.map((mos) => {
            return (
              <div className="renderDiv" key={mos.valueKey}>
                <span className="inputSpan">{mos.valueName}</span>
                {mos.valueType === 'number' && (
                  <InputNumber
                    value={granularityParams[mos.valueKey]}
                    onChange={(value) =>
                      this.setState({
                        granularityParams: { ...granularityParams, [mos.valueKey]: value },
                      })
                    }
                  ></InputNumber>
                )}
                {!mos.disabled && mos.valueType === 'json' && (
                  <JSONEditor
                    initialValue={granularityParams[mos.valueKey]}
                    onValidInput={(parsedValue) =>
                      this.setState({
                        granularityParams: { ...granularityParams, [mos.valueKey]: parsedValue },
                      })
                    }
                  />
                )}
                {mos.disabled && mos.valueType === 'json' && (
                  <JSONEditor initialValue={granularityOutputParams[mos.valueKey]} disabled />
                )}
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  renderPrecessHtml = () => {
    const { processParams } = this.state
    return (
      <div>
        <h4>流程参数</h4>
        <div className="inputDiv">
          {process_list.map((mos) => {
            return (
              <div className="renderDiv" key={mos.valueKey}>
                <span className="inputSpan">{mos.valueName}</span>
                {mos.valueType === 'number' && (
                  <InputNumber
                    value={processParams[mos.valueKey]}
                    onChange={(value) =>
                      this.setState({
                        processParams: { ...processParams, [mos.valueKey]: value },
                      })
                    }
                  ></InputNumber>
                )}
                {mos.valueType === 'feed' && (
                  <Feed
                    initialValue={processParams[mos.valueKey]}
                    onChange={(parsedValue) =>
                      this.setState({
                        processParams: { ...processParams, [mos.valueKey]: parsedValue },
                      })
                    }
                  />
                )}
              </div>
            )
          })}
        </div>
      </div>
    )
  }
  renderHtml = () => {
    return (
      <div>
        <h3>设置仿真参数</h3>
        {this.renderGranularityHtml()}
        {this.renderPrecessHtml()}
      </div>
    )
  }
  render() {
    return <div className="processContent">{this.renderHtml()}</div>
  }
}

export default CustomComp
