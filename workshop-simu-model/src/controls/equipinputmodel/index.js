import React, { Component } from 'react'
import { Input, InputNumber, Switch, Table, Form, Button, Modal } from 'antd'
//import _ from 'lodash'
import './index.css'
const { TextArea } = Input

//const scriptUtil = { registerReactDom: () => {}, executeScriptService: () => {} }

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
      copyParams: {},
      editingKey: '',
      selectedRowKeys: [],
      getServiceReady: false,
      isVisible: false,
    }
    this.modelInput_single = []
    this.modelInput_multiple = []
    this.modelOutput_single = []
    this.modelOutput_multiple = []
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
    const { equipType, modelType } = this.state
    if (this.modelInput_single.length === 0) {
      this.getServiceData(equipType, modelType)
    } else {
      this.setState({ getServiceReady: true })
    }
  }

  componentDidUpdate(prevProps, prevState) {}

  componentWillUnmount() {}

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

        datalist.forEach((obj) => {
          const objTemp = {
            valueName: obj['os_simulation.processSimulationEquipModelTable.value_name'],
            valueKey: obj['os_simulation.processSimulationEquipModelTable.value_key'],
            valueType: obj['os_simulation.processSimulationEquipModelTable.value_type'],
            valueDefault:
              obj['os_simulation.processSimulationEquipModelTable.defaultValue'] || null,
            displayable: obj['os_simulation.processSimulationEquipModelTable.displayable'],
          }
          if (obj['os_simulation.processSimulationEquipModelTable.type'] === 'input') {
            if (obj['os_simulation.processSimulationEquipModelTable.value_isArray']) {
              this.modelInput_multiple.push(objTemp)
            } else {
              this.modelInput_single.push(objTemp)
            }
          }
          if (obj['os_simulation.processSimulationEquipModelTable.type'] === 'output') {
            if (obj['os_simulation.processSimulationEquipModelTable.value_isArray']) {
              this.modelOutput_multiple.push(objTemp)
            } else {
              this.modelOutput_single.push(objTemp)
            }
          }
        })

        const defaultValues = {}
        this.modelInput_single
          .filter((v) => v.valueDefault)
          .forEach((v) => {
            switch (v.valueType) {
              case 'number':
                defaultValues[v.valueKey] = +v.valueDefault
                break
              case 'json':
                defaultValues[v.valueKey] = JSON.parse(v.valueDefault)
                break
              default:
                defaultValues[v.valueKey] = v.valueDefault
            }
          })
        this.setState({ getServiceReady: true, inputParams: defaultValues })
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

  isEditing = (record) => record.key === this.state.editingKey

  cancel = () => {
    this.setState({ editingKey: '' })
  }

  handleSave(form, key) {
    form.validateFields((error, row) => {
      if (error) {
        return
      }

      const newData = this.state.inputParams.arrParams.map((v, i) => ({ ...v, key: i }))
      const index = newData.findIndex((item) => key === item.key)
      console.log('save key row index', key, row, index)
      if (index > -1) {
        const item = newData[index]
        newData.splice(index, 1, {
          ...item,
          ...row,
        })
        this.setState({
          inputParams: { ...this.state.inputParams, arrParams: newData },
          editingKey: '',
        })
      } else {
        newData.push(row)
        this.setState({ ...this.state.inputParams, arrParams: newData, editingKey: '' })
      }
    })
  }

  handleEdit(key) {
    this.setState({ editingKey: key })
  }

  handleAdd = () => {
    //点击新增 插入一行空数据
    const { inputParams } = this.state
    const newParams = {}
    this.modelInput_multiple.forEach((obj) => {
      newParams[obj.valueKey] = null
    })
    inputParams.arrParams.push(newParams)
    this.setState({ inputParams })
  }

  handleDelete = () => {
    const { selectedRowKeys, inputParams } = this.state
    const newData = inputParams.arrParams.map((v, i) => ({ ...v, key: i }))
    const filterData = newData.filter((obj) => !selectedRowKeys.includes(obj.key))
    console.log('handle delete', newData, filterData)
    this.setState({ inputParams: { ...inputParams, arrParams: filterData }, selectedRowKeys: [] })
  }

  onSelectChange = (selectedRowKeys) => {
    console.log('selectedRowKeys changed: ', selectedRowKeys)
    this.setState({ selectedRowKeys })
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
        switch (v.valueType) {
          case 'number':
            defaultValues[v.valueKey] = +v.valueDefault
            break
          case 'json':
            defaultValues[v.valueKey] = JSON.parse(v.valueDefault)
            break
          default:
            defaultValues[v.valueKey] = v.valueDefault
        }
      })
    console.log('defaultValues', defaultValues)
    this.setState({ inputParams: { ...value, ...defaultValues } })
  }

  renderInputHtml = (list) => {
    const { inputParams } = this.state

    return (
      <div
        className="renderDiv"
        key={list.valueKey}
        style={{ display: list.displayable ? 'flex' : 'none' }}
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

  renderHtml = () => {
    const { inputParams, selectedRowKeys } = this.state

    const model_columns = this.modelInput_multiple.map((obj) => ({
      title: obj.valueName,
      dataIndex: obj.valueKey,
      editable: true,
    }))
    model_columns.push({
      title: '操作',
      dataIndex: 'operation',
      render: (text, record) => {
        const { editingKey } = this.state
        const editable = this.isEditing(record)
        return editable ? (
          <span>
            <EditableContext.Consumer>
              {(form) => (
                <a onClick={() => this.handleSave(form, record.key)} style={{ marginRight: 8 }}>
                  确定
                </a>
              )}
            </EditableContext.Consumer>

            <a onClick={() => this.cancel(record.key)}>取消</a>
          </span>
        ) : (
          <a disabled={editingKey !== ''} onClick={() => this.handleEdit(record.key)}>
            编辑
          </a>
        )
      },
    })

    const components = {
      body: {
        cell: EditableCell,
      },
    }

    const columns = model_columns.map((col) => {
      if (!col.editable) {
        return col
      }
      return {
        ...col,
        onCell: (record) => ({
          record,
          inputType: 'number',
          dataIndex: col.dataIndex,
          title: col.title,
          editing: this.isEditing(record),
        }),
      }
    })

    const dataSource = inputParams.arrParams
      ? inputParams.arrParams.map((v, i) => ({ ...v, key: i }))
      : []

    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    }

    return (
      <div style={{ marginBottom: '12px' }}>
        <div className="inputDiv">
          {this.modelInput_single.map((mos) => {
            return this.renderInputHtml(mos)
          })}
        </div>
        {this.modelInput_multiple.length > 0 && (
          <EditableContext.Provider value={this.props.form}>
            <Button
              onClick={this.handleAdd}
              type="primary"
              icon="plus"
              style={{ marginBottom: 6, marginRight: 10 }}
            >
              新增
            </Button>
            <Button
              type="danger"
              onClick={this.handleDelete}
              style={{ marginBottom: 6 }}
              icon="delete"
              disabled={selectedRowKeys.length === 0}
            >
              删除
            </Button>
            <Table
              components={components}
              bordered
              dataSource={dataSource}
              columns={columns}
              rowSelection={rowSelection}
              rowClassName="editable-row"
              pagination={false}
            />
          </EditableContext.Provider>
        )}
      </div>
    )
  }
  render() {
    const { getServiceReady, isVisible, modelType } = this.state
    return (
      <div>
        {/* <Button onClick={this.toggleVisibility}>{`${isVisible ? '隐藏' : '显示'}配置项`}</Button> */}
        <Modal
          title={`${modelType}模型参数`}
          visible={isVisible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <div className="equipInputModelContent">{getServiceReady && this.renderHtml()}</div>
        </Modal>
      </div>
    )
  }
}

const EditableFormTable = Form.create()(CustomComp)
export default EditableFormTable
