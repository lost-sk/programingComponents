import React, { Component } from 'react'
import { Input, InputNumber, Switch, Table, Form, Button } from 'antd'
//import _ from 'lodash'
import './index.css'
const { TextArea } = Input

//const scriptUtil = { registerReactDom: () => {}, executeScriptService: () => {} }

class CustomComp extends Component {
  constructor(props) {
    super(props)
    const config = props?.data?._attrObject.data || {}
    console.log('simu props config', config)
    this.state = {
      outputParams: {},
      isVisible: false,
    }

    this.pulp_params = [
      { valueName: '粒度分布', valueKey: 'dist', valueType: 'json' },
      { valueName: '矿浆流量', valueKey: 'flowRate', valueType: 'number' },
      { valueName: '矿量', valueKey: 'ore', valueType: 'number' },
      { valueName: '矿浆浓度', valueKey: 'percent', valueType: 'number' },
      { valueName: '矿浆密度', valueKey: 'rhoP', valueType: 'number' },
      { valueName: '水量', valueKey: 'water', valueType: 'number' },
    ]
  }
  componentDidMount() {
    scriptUtil.registerReactDom(this, this.props)
  }

  setOutputValue = (value) => {
    this.setState({ outputParams: value })
  }

  renderPulpHtml = (params) => {
    return this.pulp_params.map((pulp) => {
      return (
        <div className="renderDiv" key={pulp.valueKey}>
          <span className="outputSpan">{pulp.valueName}</span>
          {pulp.valueType === 'json' ? (
            <TextArea rows={2} value={JSON.stringify(params[pulp.valueKey])} disabled />
          ) : (
            <span className="paramOutput">{params[pulp.valueKey]}</span>
          )}
        </div>
      )
    })
  }

  render() {
    const { outputParams } = this.state
    return <div>{this.renderPulpHtml(outputParams)}</div>
  }
}

const EditableFormTable = Form.create()(CustomComp)
export default EditableFormTable
