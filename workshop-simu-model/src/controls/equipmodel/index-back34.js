import React, { Component } from 'react'
import { Input, InputNumber, Switch, Table, Form, Button, Modal } from 'antd'
import _ from 'lodash'
import './index.css'
const { TextArea } = Input

const scriptUtil = {
  registerReactDom: () => {},
  executeScriptService: ({ objName, serviceName, params, version, cb }) => {
    cb({
      data: {
        list: [
          {
            'os_simulation.processSimulationEquipModelTable.created_time': '2024-12-04T06:10:25Z',
            'os_simulation.processSimulationEquipModelTable.defaultValue': null,
            'os_simulation.processSimulationEquipModelTable.value_name': '磨机直径',
            'os_simulation.processSimulationEquipModelTable.id': 207130,
            'os_simulation.processSimulationEquipModelTable.equipType': 'Ball',
            'os_simulation.processSimulationEquipModelTable.displayable': 1,
            'os_simulation.processSimulationEquipModelTable.description': null,
            'os_simulation.processSimulationEquipModelTable.last_modifier_id': '1',
            'os_simulation.processSimulationEquipModelTable.value_isArray': 0,
            'os_simulation.processSimulationEquipModelTable.app_name': '仿真APP',
            'os_simulation.processSimulationEquipModelTable.value_type': 'number',
            'os_simulation.processSimulationEquipModelTable.type': 'input',
            'os_simulation.processSimulationEquipModelTable.creator_id': '1',
            'os_simulation.processSimulationEquipModelTable.value_key': 'diameter',
            'os_simulation.processSimulationEquipModelTable.last_modified_time':
              '2024-12-04T06:10:25Z',
            'os_simulation.processSimulationEquipModelTable.modelType': 'PerfectMixing',
            'os_simulation.processSimulationEquipModelTable.app_access_mode': 'PUBLIC',
            'os_simulation.processSimulationEquipModelTable.array_key': '1_defaut',
          },
          {
            'os_simulation.processSimulationEquipModelTable.created_time': '2024-12-04T06:15:16Z',
            'os_simulation.processSimulationEquipModelTable.defaultValue': null,
            'os_simulation.processSimulationEquipModelTable.value_name': '磨机长度',
            'os_simulation.processSimulationEquipModelTable.id': 207131,
            'os_simulation.processSimulationEquipModelTable.equipType': 'Ball',
            'os_simulation.processSimulationEquipModelTable.displayable': 1,
            'os_simulation.processSimulationEquipModelTable.description': null,
            'os_simulation.processSimulationEquipModelTable.last_modifier_id': '1',
            'os_simulation.processSimulationEquipModelTable.value_isArray': 0,
            'os_simulation.processSimulationEquipModelTable.app_name': 'system',
            'os_simulation.processSimulationEquipModelTable.value_type': 'number',
            'os_simulation.processSimulationEquipModelTable.type': 'input',
            'os_simulation.processSimulationEquipModelTable.creator_id': '1',
            'os_simulation.processSimulationEquipModelTable.value_key': 'length',
            'os_simulation.processSimulationEquipModelTable.last_modified_time':
              '2024-12-04T06:15:16Z',
            'os_simulation.processSimulationEquipModelTable.modelType': 'PerfectMixing',
            'os_simulation.processSimulationEquipModelTable.app_access_mode': 'PRIVATE',
            'os_simulation.processSimulationEquipModelTable.array_key': '1_defaut',
          },
          {
            'os_simulation.processSimulationEquipModelTable.created_time': '2024-12-04T06:15:16Z',
            'os_simulation.processSimulationEquipModelTable.defaultValue': null,
            'os_simulation.processSimulationEquipModelTable.value_name': '转速',
            'os_simulation.processSimulationEquipModelTable.id': 207132,
            'os_simulation.processSimulationEquipModelTable.equipType': 'Ball',
            'os_simulation.processSimulationEquipModelTable.displayable': 1,
            'os_simulation.processSimulationEquipModelTable.description': null,
            'os_simulation.processSimulationEquipModelTable.last_modifier_id': '1',
            'os_simulation.processSimulationEquipModelTable.value_isArray': 0,
            'os_simulation.processSimulationEquipModelTable.app_name': 'system',
            'os_simulation.processSimulationEquipModelTable.value_type': 'number',
            'os_simulation.processSimulationEquipModelTable.type': 'input',
            'os_simulation.processSimulationEquipModelTable.creator_id': '1',
            'os_simulation.processSimulationEquipModelTable.value_key': 'speed',
            'os_simulation.processSimulationEquipModelTable.last_modified_time':
              '2024-12-04T06:15:16Z',
            'os_simulation.processSimulationEquipModelTable.modelType': 'PerfectMixing',
            'os_simulation.processSimulationEquipModelTable.app_access_mode': 'PRIVATE',
            'os_simulation.processSimulationEquipModelTable.array_key': '1_defaut',
          },
          {
            'os_simulation.processSimulationEquipModelTable.created_time': '2024-12-04T06:15:16Z',
            'os_simulation.processSimulationEquipModelTable.defaultValue': null,
            'os_simulation.processSimulationEquipModelTable.value_name': '混合填充率',
            'os_simulation.processSimulationEquipModelTable.id': 207133,
            'os_simulation.processSimulationEquipModelTable.equipType': 'Ball',
            'os_simulation.processSimulationEquipModelTable.displayable': 1,
            'os_simulation.processSimulationEquipModelTable.description': null,
            'os_simulation.processSimulationEquipModelTable.last_modifier_id': '1',
            'os_simulation.processSimulationEquipModelTable.value_isArray': 0,
            'os_simulation.processSimulationEquipModelTable.app_name': 'system',
            'os_simulation.processSimulationEquipModelTable.value_type': 'number',
            'os_simulation.processSimulationEquipModelTable.type': 'input',
            'os_simulation.processSimulationEquipModelTable.creator_id': '1',
            'os_simulation.processSimulationEquipModelTable.value_key': 'jt',
            'os_simulation.processSimulationEquipModelTable.last_modified_time':
              '2024-12-04T06:15:16Z',
            'os_simulation.processSimulationEquipModelTable.modelType': 'PerfectMixing',
            'os_simulation.processSimulationEquipModelTable.app_access_mode': 'PRIVATE',
            'os_simulation.processSimulationEquipModelTable.array_key': '1_defaut',
          },
          {
            'os_simulation.processSimulationEquipModelTable.created_time': '2024-12-04T06:15:16Z',
            'os_simulation.processSimulationEquipModelTable.defaultValue': null,
            'os_simulation.processSimulationEquipModelTable.value_name': '最大钢球直径',
            'os_simulation.processSimulationEquipModelTable.id': 207134,
            'os_simulation.processSimulationEquipModelTable.equipType': 'Ball',
            'os_simulation.processSimulationEquipModelTable.displayable': 1,
            'os_simulation.processSimulationEquipModelTable.description': null,
            'os_simulation.processSimulationEquipModelTable.last_modifier_id': '1',
            'os_simulation.processSimulationEquipModelTable.value_isArray': 0,
            'os_simulation.processSimulationEquipModelTable.app_name': 'system',
            'os_simulation.processSimulationEquipModelTable.value_type': 'number',
            'os_simulation.processSimulationEquipModelTable.type': 'input',
            'os_simulation.processSimulationEquipModelTable.creator_id': '1',
            'os_simulation.processSimulationEquipModelTable.value_key': 'db',
            'os_simulation.processSimulationEquipModelTable.last_modified_time':
              '2024-12-04T06:15:16Z',
            'os_simulation.processSimulationEquipModelTable.modelType': 'PerfectMixing',
            'os_simulation.processSimulationEquipModelTable.app_access_mode': 'PRIVATE',
            'os_simulation.processSimulationEquipModelTable.array_key': '1_defaut',
          },
          {
            'os_simulation.processSimulationEquipModelTable.created_time': '2024-12-04T06:15:16Z',
            'os_simulation.processSimulationEquipModelTable.defaultValue': null,
            'os_simulation.processSimulationEquipModelTable.value_name': '钢球填充率',
            'os_simulation.processSimulationEquipModelTable.id': 207135,
            'os_simulation.processSimulationEquipModelTable.equipType': 'Ball',
            'os_simulation.processSimulationEquipModelTable.displayable': 1,
            'os_simulation.processSimulationEquipModelTable.description': null,
            'os_simulation.processSimulationEquipModelTable.last_modifier_id': '1',
            'os_simulation.processSimulationEquipModelTable.value_isArray': 0,
            'os_simulation.processSimulationEquipModelTable.app_name': 'system',
            'os_simulation.processSimulationEquipModelTable.value_type': 'number',
            'os_simulation.processSimulationEquipModelTable.type': 'input',
            'os_simulation.processSimulationEquipModelTable.creator_id': '1',
            'os_simulation.processSimulationEquipModelTable.value_key': 'jb',
            'os_simulation.processSimulationEquipModelTable.last_modified_time':
              '2024-12-04T06:15:16Z',
            'os_simulation.processSimulationEquipModelTable.modelType': 'PerfectMixing',
            'os_simulation.processSimulationEquipModelTable.app_access_mode': 'PRIVATE',
            'os_simulation.processSimulationEquipModelTable.array_key': '1_defaut',
          },
          {
            'os_simulation.processSimulationEquipModelTable.created_time': '2024-12-04T06:15:16Z',
            'os_simulation.processSimulationEquipModelTable.defaultValue': null,
            'os_simulation.processSimulationEquipModelTable.value_name': '钢球密度',
            'os_simulation.processSimulationEquipModelTable.id': 207136,
            'os_simulation.processSimulationEquipModelTable.equipType': 'Ball',
            'os_simulation.processSimulationEquipModelTable.displayable': 1,
            'os_simulation.processSimulationEquipModelTable.description': null,
            'os_simulation.processSimulationEquipModelTable.last_modifier_id': '1',
            'os_simulation.processSimulationEquipModelTable.value_isArray': 0,
            'os_simulation.processSimulationEquipModelTable.app_name': 'system',
            'os_simulation.processSimulationEquipModelTable.value_type': 'number',
            'os_simulation.processSimulationEquipModelTable.type': 'input',
            'os_simulation.processSimulationEquipModelTable.creator_id': '1',
            'os_simulation.processSimulationEquipModelTable.value_key': 'rhoB',
            'os_simulation.processSimulationEquipModelTable.last_modified_time':
              '2024-12-04T06:15:16Z',
            'os_simulation.processSimulationEquipModelTable.modelType': 'PerfectMixing',
            'os_simulation.processSimulationEquipModelTable.app_access_mode': 'PRIVATE',
            'os_simulation.processSimulationEquipModelTable.array_key': '1_defaut',
          },
          {
            'os_simulation.processSimulationEquipModelTable.created_time': '2024-12-04T06:15:16Z',
            'os_simulation.processSimulationEquipModelTable.defaultValue': null,
            'os_simulation.processSimulationEquipModelTable.value_name': '邦德球磨功指数',
            'os_simulation.processSimulationEquipModelTable.id': 207137,
            'os_simulation.processSimulationEquipModelTable.equipType': 'Ball',
            'os_simulation.processSimulationEquipModelTable.displayable': 1,
            'os_simulation.processSimulationEquipModelTable.description': null,
            'os_simulation.processSimulationEquipModelTable.last_modifier_id': '1',
            'os_simulation.processSimulationEquipModelTable.value_isArray': 0,
            'os_simulation.processSimulationEquipModelTable.app_name': 'system',
            'os_simulation.processSimulationEquipModelTable.value_type': 'number',
            'os_simulation.processSimulationEquipModelTable.type': 'input',
            'os_simulation.processSimulationEquipModelTable.creator_id': '1',
            'os_simulation.processSimulationEquipModelTable.value_key': 'wi',
            'os_simulation.processSimulationEquipModelTable.last_modified_time':
              '2024-12-04T06:15:16Z',
            'os_simulation.processSimulationEquipModelTable.modelType': 'PerfectMixing',
            'os_simulation.processSimulationEquipModelTable.app_access_mode': 'PRIVATE',
            'os_simulation.processSimulationEquipModelTable.array_key': '1_defaut',
          },
          {
            'os_simulation.processSimulationEquipModelTable.created_time': '2024-12-04T06:15:16Z',
            'os_simulation.processSimulationEquipModelTable.defaultValue':
              '[[1, 3], [2, 1], [3, 1], [4, 3]]',
            'os_simulation.processSimulationEquipModelTable.value_name': '磨矿速率',
            'os_simulation.processSimulationEquipModelTable.id': 207138,
            'os_simulation.processSimulationEquipModelTable.equipType': 'Ball',
            'os_simulation.processSimulationEquipModelTable.displayable': 0,
            'os_simulation.processSimulationEquipModelTable.description': null,
            'os_simulation.processSimulationEquipModelTable.last_modifier_id': '1',
            'os_simulation.processSimulationEquipModelTable.value_isArray': 0,
            'os_simulation.processSimulationEquipModelTable.app_name': 'system',
            'os_simulation.processSimulationEquipModelTable.value_type': 'json',
            'os_simulation.processSimulationEquipModelTable.type': 'input',
            'os_simulation.processSimulationEquipModelTable.creator_id': '1',
            'os_simulation.processSimulationEquipModelTable.value_key': 'rate',
            'os_simulation.processSimulationEquipModelTable.last_modified_time':
              '2024-12-17T02:43:11Z',
            'os_simulation.processSimulationEquipModelTable.modelType': 'PerfectMixing',
            'os_simulation.processSimulationEquipModelTable.app_access_mode': 'PRIVATE',
            'os_simulation.processSimulationEquipModelTable.array_key': '1_defaut',
          },
          {
            'os_simulation.processSimulationEquipModelTable.created_time': '2024-12-09T08:35:01Z',
            'os_simulation.processSimulationEquipModelTable.defaultValue': null,
            'os_simulation.processSimulationEquipModelTable.value_name': '功率',
            'os_simulation.processSimulationEquipModelTable.id': 207139,
            'os_simulation.processSimulationEquipModelTable.equipType': 'Ball',
            'os_simulation.processSimulationEquipModelTable.displayable': 1,
            'os_simulation.processSimulationEquipModelTable.description': null,
            'os_simulation.processSimulationEquipModelTable.last_modifier_id': '1',
            'os_simulation.processSimulationEquipModelTable.value_isArray': 0,
            'os_simulation.processSimulationEquipModelTable.app_name': 'system',
            'os_simulation.processSimulationEquipModelTable.value_type': 'number',
            'os_simulation.processSimulationEquipModelTable.type': 'output',
            'os_simulation.processSimulationEquipModelTable.creator_id': '1',
            'os_simulation.processSimulationEquipModelTable.value_key': 'power',
            'os_simulation.processSimulationEquipModelTable.last_modified_time':
              '2024-12-09T08:35:01Z',
            'os_simulation.processSimulationEquipModelTable.modelType': 'PerfectMixing',
            'os_simulation.processSimulationEquipModelTable.app_access_mode': 'PRIVATE',
            'os_simulation.processSimulationEquipModelTable.array_key': '1_defaut',
          },
          {
            'os_simulation.processSimulationEquipModelTable.created_time': '2024-12-09T09:01:19Z',
            'os_simulation.processSimulationEquipModelTable.defaultValue': null,
            'os_simulation.processSimulationEquipModelTable.value_name': '排矿（矿浆参数）',
            'os_simulation.processSimulationEquipModelTable.id': 207146,
            'os_simulation.processSimulationEquipModelTable.equipType': 'Ball',
            'os_simulation.processSimulationEquipModelTable.displayable': 1,
            'os_simulation.processSimulationEquipModelTable.description':
              '不包含粒度分布（dist）包含flowRate,ore,percent,rhoP,watere,',
            'os_simulation.processSimulationEquipModelTable.last_modifier_id': '1',
            'os_simulation.processSimulationEquipModelTable.value_isArray': 0,
            'os_simulation.processSimulationEquipModelTable.app_name': 'system',
            'os_simulation.processSimulationEquipModelTable.value_type': 'pulp',
            'os_simulation.processSimulationEquipModelTable.type': 'output',
            'os_simulation.processSimulationEquipModelTable.creator_id': '1',
            'os_simulation.processSimulationEquipModelTable.value_key': 'product',
            'os_simulation.processSimulationEquipModelTable.last_modified_time':
              '2025-03-04T02:05:41Z',
            'os_simulation.processSimulationEquipModelTable.modelType': 'PerfectMixing',
            'os_simulation.processSimulationEquipModelTable.app_access_mode': 'PRIVATE',
            'os_simulation.processSimulationEquipModelTable.array_key': '1_defaut',
          },
          {
            'os_simulation.processSimulationEquipModelTable.created_time': '2025-03-04T02:06:54Z',
            'os_simulation.processSimulationEquipModelTable.defaultValue': null,
            'os_simulation.processSimulationEquipModelTable.value_name': '粒度分布',
            'os_simulation.processSimulationEquipModelTable.id': 209272,
            'os_simulation.processSimulationEquipModelTable.equipType': 'Ball',
            'os_simulation.processSimulationEquipModelTable.displayable': 1,
            'os_simulation.processSimulationEquipModelTable.description': '粒度分布(数组)',
            'os_simulation.processSimulationEquipModelTable.last_modifier_id': '1',
            'os_simulation.processSimulationEquipModelTable.value_isArray': 1,
            'os_simulation.processSimulationEquipModelTable.app_name': '仿真APP',
            'os_simulation.processSimulationEquipModelTable.value_type': 'number',
            'os_simulation.processSimulationEquipModelTable.type': 'output',
            'os_simulation.processSimulationEquipModelTable.creator_id': '1',
            'os_simulation.processSimulationEquipModelTable.value_key': 'dist',
            'os_simulation.processSimulationEquipModelTable.last_modified_time':
              '2025-03-04T02:07:10Z',
            'os_simulation.processSimulationEquipModelTable.modelType': 'PerfectMixing',
            'os_simulation.processSimulationEquipModelTable.app_access_mode': 'PUBLIC',
            'os_simulation.processSimulationEquipModelTable.array_key': '1_default',
          },
          {
            'os_simulation.processSimulationEquipModelTable.defaultValue': null,
            'os_simulation.processSimulationEquipModelTable.value_name': '粒度分布',
            'os_simulation.processSimulationEquipModelTable.equipType': 'Ball',
            'os_simulation.processSimulationEquipModelTable.displayable': 1,
            'os_simulation.processSimulationEquipModelTable.description': '',
            'os_simulation.processSimulationEquipModelTable.value_isArray': 1,
            'os_simulation.processSimulationEquipModelTable.value_type': 'number',
            'os_simulation.processSimulationEquipModelTable.type': 'input',
            'os_simulation.processSimulationEquipModelTable.value_key': 'distribution',
            'os_simulation.processSimulationEquipModelTable.modelType': 'PerfectMixing',
            'os_simulation.processSimulationEquipModelTable.array_key': '1_default',
          },
          {
            'os_simulation.processSimulationEquipModelTable.defaultValue': null,
            'os_simulation.processSimulationEquipModelTable.value_name': '粒级',
            'os_simulation.processSimulationEquipModelTable.equipType': 'Ball',
            'os_simulation.processSimulationEquipModelTable.displayable': 1,
            'os_simulation.processSimulationEquipModelTable.description': '',
            'os_simulation.processSimulationEquipModelTable.value_isArray': 1,
            'os_simulation.processSimulationEquipModelTable.value_type': 'number',
            'os_simulation.processSimulationEquipModelTable.type': 'input',
            'os_simulation.processSimulationEquipModelTable.value_key': 'particleSize',
            'os_simulation.processSimulationEquipModelTable.modelType': 'PerfectMixing',
            'os_simulation.processSimulationEquipModelTable.array_key': '1_default',
          },
        ],
      },
    })
  },
}

const EditableContext = React.createContext()

class EditableCell extends React.Component {
  getInput = () => {
    if (this.props.inputType === 'number') {
      return <InputNumber />
    }
    return <Input />
  }

  renderCell = ({ getFieldDecorator }) => {
    const { editing, dataIndex, title, inputType, record, index, children, ...restProps } =
      this.props
    return (
      <td {...restProps}>
        {editing ? (
          <Form.Item style={{ margin: 0 }}>
            {getFieldDecorator(dataIndex, {
              rules: [
                {
                  required: true,
                  message: `请输入 ${title}!`,
                },
              ],
              initialValue: record[dataIndex],
            })(this.getInput())}
          </Form.Item>
        ) : (
          children
        )}
      </td>
    )
  }

  render() {
    return <EditableContext.Consumer>{this.renderCell}</EditableContext.Consumer>
  }
}

class JSONEditor extends Component {
  constructor(props) {
    super(props)
    this.state = {
      inputValue: JSON.stringify(props.initialValue || ''),
      parsedValue: props.initialValue,
      isValidJSON: true,
      errorMessage: '',
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.initialValue !== this.props.initialValue) {
      this.setState({
        inputValue: JSON.stringify(this.props.initialValue || ''),
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
    const { inputValue, isValidJSON, parsedValue, errorMessage } = this.state

    return (
      <div>
        <TextArea
          rows={2}
          value={inputValue}
          onChange={this.handleInputChange}
          placeholder="请输入或编辑JSON字符串"
        />
        {!isValidJSON && <div style={{ color: 'red' }}>{errorMessage}</div>}
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
      inputParams: {},
      outputParams: {},
      copyParams: {},
      // 改为对象存储不同array_key的编辑状态
      editingKeys: {},
      // 存储不同表格选中的行
      selectedRowKeysMap: {},
      getServiceReady: false,
      isVisible: false,
    }
    this.modelInput_single = []
    this.modelInput_multiple = {} // 改为对象结构 {arrayKey: [...]}
    this.modelOutput_single = []
    this.modelOutput_multiple = {} // 改为对象结构 {arrayKey: [...]}
    this.pulp_params = [
      // { valueName: '粒度分布', valueKey: 'dist', valueType: 'json' },
      { valueName: '矿浆流量', valueKey: 'flowRate', valueType: 'number' },
      { valueName: '矿量', valueKey: 'ore', valueType: 'number' },
      { valueName: '矿浆浓度', valueKey: 'percent', valueType: 'number' },
      { valueName: '矿浆密度', valueKey: 'rhoP', valueType: 'number' },
      { valueName: '水量', valueKey: 'water', valueType: 'number' },
    ]
  }
  componentDidMount() {
    scriptUtil.registerReactDom(this, this.props)
    const { equipType, modelType } = this.state
    if (this.modelInput_single.length === 0) {
      this.getServiceData(equipType, modelType)
    } else {
      this.setState({ getServiceReady: true })
    }
  }

  getServiceData = (equipType, modelType) => {
    scriptUtil.executeScriptService({
      objName: 'os_simulation.processSimulationEquipModelTable', // 模板 或者 实例
      serviceName: 'os_simulation.getEquipModeParams', // 服务的命名空间+服务别名
      // 入参
      params: {
        equipType,
        modelType,
      },
      version: 'V2',
      // 回调函数 获取input参数和output参数
      cb: (res) => {
        const datalist = res.data.list

        // 重置数据结构
        this.modelInput_single = []
        this.modelInput_multiple = {}
        this.modelOutput_single = []
        this.modelOutput_multiple = {}

        datalist.forEach((obj) => {
          const item = {
            valueName: obj['os_simulation.processSimulationEquipModelTable.value_name'],
            valueKey: obj['os_simulation.processSimulationEquipModelTable.value_key'],
            valueType: obj['os_simulation.processSimulationEquipModelTable.value_type'],
            valueDefault:
              obj['os_simulation.processSimulationEquipModelTable.defaultValue'] || null,
            displayable: obj['os_simulation.processSimulationEquipModelTable.displayable'],
            arrayKey:
              obj['os_simulation.processSimulationEquipModelTable.array_key'] || '1_default',
          }
          const type = obj['os_simulation.processSimulationEquipModelTable.type']
          const isArray = obj['os_simulation.processSimulationEquipModelTable.value_isArray']

          if (type === 'input') {
            if (isArray) {
              if (!this.modelInput_multiple[item.arrayKey]) {
                this.modelInput_multiple[item.arrayKey] = []
              }
              this.modelInput_multiple[item.arrayKey].push(item)
            } else {
              this.modelInput_single.push(item)
            }
          } else if (type === 'output') {
            if (isArray) {
              if (!this.modelOutput_multiple[item.arrayKey]) {
                this.modelOutput_multiple[item.arrayKey] = []
              }
              this.modelOutput_multiple[item.arrayKey].push(item)
            } else {
              this.modelOutput_single.push(item)
            }
          }
        })

        const defaultValues = {}
        this.modelInput_single
          .filter((v) => v.valueDefault)
          .forEach((v) => {
            defaultValues[v.valueKey] = v.valueType === 'number' ? +v.valueDefault : v.valueDefault
          })

        // 初始化数组参数
        const arrParamsMap = {}
        Object.keys(this.modelInput_multiple).forEach((arrayKey) => {
          arrParamsMap[arrayKey] = [{}] // 初始化空行
        })

        this.setState(
          {
            getServiceReady: true,
            inputParams: { ...defaultValues, arrParamsMap },
            // 初始化编辑状态
            editingKeys: Object.keys(this.modelInput_multiple).reduce((acc, cur) => {
              acc[cur] = ''
              return acc
            }, {}),
            selectedRowKeysMap: Object.keys(this.modelInput_multiple).reduce((acc, cur) => {
              acc[cur] = []
              return acc
            }, {}),
          },
          () => {
            console.log('init state', this.state)
          }
        )
        console.log(
          'callback res',
          this.modelInput_single,
          this.modelInput_multiple,
          this.modelOutput_single,
          this.modelOutput_multiple
        )
      },
    })
  }

  isEditing = (record, arrayKey) => record.key === this.state.editingKeys[arrayKey]
  handleEdit = (key, arrayKey) => {
    this.setState(({ editingKeys }) => ({
      editingKeys: { ...editingKeys, [arrayKey]: key },
    }))
  }

  cancel = (arrayKey) => {
    this.setState(({ editingKeys }) => ({
      editingKeys: { ...editingKeys, [arrayKey]: '' },
    }))
  }

  handleSave = (form, key, arrayKey) => {
    form.validateFields((error, row) => {
      if (error) return

      const newData = [...this.state.inputParams.arrParamsMap[arrayKey]]
      const index = newData.findIndex((item) => key === item.key)

      if (index > -1) {
        newData.splice(index, 1, { ...newData[index], ...row })
      } else {
        newData.push({ ...row, key: newData.length })
      }

      this.setState(({ inputParams, editingKeys }) => ({
        inputParams: {
          ...inputParams,
          arrParamsMap: {
            ...inputParams.arrParamsMap,
            [arrayKey]: newData,
          },
        },
        editingKeys: { ...editingKeys, [arrayKey]: '' },
      }))
    })
  }

  handleAdd = (arrayKey) => {
    this.setState(({ inputParams }) => {
      const newData = [...inputParams.arrParamsMap[arrayKey], {}]
      return {
        inputParams: {
          ...inputParams,
          arrParamsMap: {
            ...inputParams.arrParamsMap,
            [arrayKey]: newData,
          },
        },
      }
    })
  }

  handleDelete = (arrayKey) => {
    this.setState(({ inputParams, selectedRowKeysMap }) => {
      const newData = inputParams.arrParamsMap[arrayKey].filter(
        (_, index) => !selectedRowKeysMap[arrayKey].includes(index)
      )
      return {
        inputParams: {
          ...inputParams,
          arrParamsMap: {
            ...inputParams.arrParamsMap,
            [arrayKey]: newData,
          },
        },
        selectedRowKeysMap: {
          ...selectedRowKeysMap,
          [arrayKey]: [],
        },
      }
    })
  }

  onSelectChange = (selectedRowKeys, arrayKey) => {
    this.setState(({ selectedRowKeysMap }) => ({
      selectedRowKeysMap: {
        ...selectedRowKeysMap,
        [arrayKey]: selectedRowKeys,
      },
    }))
  }

  // 生成表格列
  generateInputColumns = (arrayKey) => {
    const columns = this.modelInput_multiple[arrayKey].map((obj) => ({
      title: obj.valueName,
      dataIndex: obj.valueKey,
      editable: true,
    }))

    columns.push({
      title: '操作',
      dataIndex: 'operation',
      render: (text, record) => {
        const editable = this.isEditing(record, arrayKey)
        return editable ? (
          <span>
            <EditableContext.Consumer>
              {(form) => <a onClick={() => this.handleSave(form, record.key, arrayKey)}>保存</a>}
            </EditableContext.Consumer>
            <a onClick={() => this.cancel(arrayKey)} style={{ marginLeft: 8 }}>
              取消
            </a>
          </span>
        ) : (
          <a onClick={() => this.handleEdit(record.key, arrayKey)}>编辑</a>
        )
      },
    })

    return columns.map((col) => {
      if (!col.editable) return col
      return {
        ...col,
        onCell: (record) => ({
          record,
          inputType: 'number',
          dataIndex: col.dataIndex,
          title: col.title,
          editing: this.isEditing(record, arrayKey),
        }),
      }
    })
  }

  // 渲染输入表格
  renderInputTables() {
    const { inputParams, selectedRowKeysMap } = this.state
    return Object.keys(this.modelInput_multiple).map((arrayKey) => (
      <div key={arrayKey} style={{ marginBottom: 24 }}>
        <div style={{ margin: '12px 0' }}>
          <Button
            onClick={() => this.handleAdd(arrayKey)}
            type="primary"
            icon="plus"
            style={{ marginRight: 8 }}
          >
            新增
          </Button>
          <Button
            onClick={() => this.handleDelete(arrayKey)}
            type="danger"
            icon="delete"
            disabled={selectedRowKeysMap[arrayKey]?.length === 0}
          >
            删除
          </Button>
        </div>
        <EditableContext.Provider value={this.props.form}>
          <Table
            components={{
              body: {
                cell: EditableCell,
              },
            }}
            bordered
            dataSource={inputParams.arrParamsMap[arrayKey].map((v, i) => ({ ...v, key: i }))}
            columns={this.generateInputColumns(arrayKey)}
            rowSelection={{
              selectedRowKeys: selectedRowKeysMap[arrayKey] || [],
              onChange: (keys) => this.onSelectChange(keys, arrayKey),
            }}
            pagination={false}
          />
        </EditableContext.Provider>
      </div>
    ))
  }

  // 生成输出表格列
  generateOutputColumns = (arrayKey) => {
    const columns = this.modelOutput_multiple[arrayKey].map((obj) => ({
      title: obj.valueName,
      dataIndex: obj.valueKey,
      editable: true,
    }))

    return columns
  }

  // 渲染输出表格
  renderOutputTables() {
    const { outputParams } = this.state
    console.log('outputParams', outputParams)
    return Object.keys(this.modelOutput_multiple).map((arrayKey) => (
      <div key={arrayKey} style={{ marginBottom: 24 }}>
        <Table
          bordered
          dataSource={outputParams.arrParamsMap?.[arrayKey].map((v, i) => ({ ...v, key: i })) || []}
          columns={this.generateOutputColumns(arrayKey)}
          pagination={false}
        />
      </div>
    ))
  }

  toggleVisibility = () => {
    const { isVisible } = this.state
    if (!isVisible) {
      this.setState((prevState) => ({
        isVisible: !prevState.isVisible,
        copyParams: prevState.inputParams,
      }))
    } else this.setState((prevState) => ({ isVisible: !prevState.isVisible }))
  }

  handleOk = (e) => {
    this.setState({
      isVisible: false,
    })
  }

  handleCancel = (e) => {
    this.setState({
      isVisible: false,
      inputParams: this.state.copyParams,
    })
  }
  getInputValue = () => {
    return this.state.inputParams
  }

  setInputValue = (value) => {
    const defaultValues = {}
    this.modelInput_single
      .filter((v) => v.valueDefault)
      .forEach((v) => {
        defaultValues[v.valueKey] = v.valueType === 'number' ? +v.valueDefault : v.valueDefault
      })
    console.log('defaultValues', defaultValues)
    this.setState({ inputParams: { ...value, ...defaultValues } })
  }

  setOutputValue = (value) => {
    this.setState({ outputParams: value })
  }

  renderInputHtml = (list) => {
    const { inputParams } = this.state

    return (
      <div
        className="renderDiv"
        key={list.valueKey}
        style={{ display: list.displayable ? 'block' : 'none' }}
      >
        <span className="inputSpan">{list.valueName}</span>
        {list.valueType === 'number' && (
          <InputNumber
            value={inputParams[list.valueKey] || list.valueDefault}
            onChange={(value) =>
              this.setState({ inputParams: { ...inputParams, [list.valueKey]: value } })
            }
          ></InputNumber>
        )}
        {list.valueType === 'json' && (
          <JSONEditor
            initialValue={inputParams[list.valueKey] || list.valueDefault}
            onValidInput={(parsedValue) =>
              this.setState({ inputParams: { ...inputParams, [list.valueKey]: parsedValue } })
            }
          />
        )}
        {list.valueType === 'string' && (
          <Input
            value={inputParams[list.valueKey] || list.valueDefault}
            onChange={(event) =>
              this.setState({
                inputParams: { ...inputParams, [list.valueKey]: event.target.value },
              })
            }
          ></Input>
        )}
        {list.valueType === 'switch' && (
          <Switch
            checked={inputParams[list.valueKey] || list.valueDefault}
            onChange={(checked) =>
              this.setState({ inputParams: { ...inputParams, [list.valueKey]: checked } })
            }
          ></Switch>
        )}
      </div>
    )
  }

  renderPulpHtml = (params) => {
    return this.pulp_params.map((pulp) => {
      return (
        <div className="renderDiv" key={pulp.valueKey}>
          <span className="outputSpan">{pulp.valueName}</span>
          {pulp.valueType === 'json' ? (
            <TextArea rows={2} value={JSON.stringify(params[pulp.valueKey] || '')} disabled />
          ) : (
            <span className="paramOutput">{params[pulp.valueKey]}</span>
          )}
        </div>
      )
    })
  }

  renderOutputHtml = (list) => {
    const { outputParams } = this.state
    if (list.valueType !== 'pulp') {
      return (
        <div className="renderDiv" key={list.valueKey}>
          <span className="outputSpan">{list.valueName}</span>
          <span className="paramOutput">
            &nbsp;
            {list.valueType === 'json'
              ? JSON.stringify(outputParams[list.valueKey] || '')
              : outputParams[list.valueKey]}
          </span>
        </div>
      )
    } else {
      return (
        <div key={list.valueKey}>
          <h4>{list.valueName}</h4>
          {this.renderPulpHtml(outputParams[list.valueKey] || {})}
        </div>
      )
    }
  }

  render() {
    const { getServiceReady, isVisible, modelType } = this.state
    return (
      <div className="equipModelContent">
        <button onClick={this.toggleVisibility}>visable</button>
        <Modal
          width={600}
          bodyStyle={{
            maxHeight: '450px', // 视口高度减去头部和底部高度（需根据实际调整）
            overflowY: 'auto',
            padding: '0 24px', // 避免内容紧贴边缘
          }}
          title={`${modelType}模型参数`}
          visible={isVisible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <div className="equipInputModelContent">
            {getServiceReady && (
              <div>
                <h3>输入参数</h3>
                <div className="inputDiv">
                  {this.modelInput_single.map((item) => this.renderInputHtml(item))}
                </div>
                {this.renderInputTables()}

                <h3>输出参数</h3>
                {this.modelOutput_single.map((item) => this.renderOutputHtml(item))}
                {this.renderOutputTables()}
              </div>
            )}
          </div>
        </Modal>
      </div>
    )
  }
}

const EditableFormTable = Form.create()(CustomComp)
export default EditableFormTable
