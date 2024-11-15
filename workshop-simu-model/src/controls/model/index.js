import React, { Component } from 'react'
import { Input, InputNumber, Switch, Table, Form, Button } from 'antd'
//import _ from 'lodash'
import './index.css'
const modelList = {
  cyclone: '旋流器计算',
}

const modelParamsArr = {
  cyclone: ['ufDist', 'particleSize', 'ofDist', 'fdDist'],
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

class CustomComp extends Component {
  constructor(props) {
    super(props)
    const config = props?.data?._attrObject.data || {}
    console.log('simu props config', config)
    this.state = {
      model: config?.model?.value || 'cyclone',
      inputParams: {
        // ufDist: [0.25, 0.13, 0.1, 0.03],
        // fdDen: 0.57,
        // fishhook: false,
        // particleSize: [0.18, 0.095, 0.075, 0.038],
        // ofDist: [0.95, 0.8, 0.6, 0.23],
        // fdDist: [0.4, 0.3, 0.2, 0.07],
        // ufDen: 0.73,
        // ofDen: 0.3,
        // acceptablePs: 0.075,
        arrParams: [
          // {
          //   ufDist: 0.25,
          //   particleSize: 0.18,
          //   ofDist: 0.95,
          //   fdDist: 0.4,
          // },
          // {
          //   ufDist: 0.13,
          //   particleSize: 0.095,
          //   ofDist: 0.8,
          //   fdDist: 0.3,
          // },
        ],
      },
      outputParams: {
        // alpha: 0.963,
        // beta: 0.0,
        // cl: 410.62,
        // d50c: 0.0566,
        // quality: 34.239999999999995,
        // quantitative: 51.13999999999999,
        // rf: 39.43,
        // rv: 0.0,
      },
      editingKey: '',
      selectedRowKeys: [],
    }
  }
  componentDidMount() {
    scriptUtil.registerReactDom(this, this.props)
  }

  componentDidUpdate(prevProps, prevState) {}

  componentWillUnmount() {}

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
    const { model, inputParams } = this.state
    const newParams = {}
    switch (model) {
      case 'cyclone':
        modelParamsArr['cyclone'].forEach((p) => (newParams[p] = null))
        //newParams.key = inputParams.arrParams.length + 1
        inputParams.arrParams.push(newParams)
        break
    }
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

  getInputValue = () => {
    return this.state.inputParams
  }

  setInputValue = (value) => {
    this.setState({ inputParams: value })
  }

  setOutputValue = (value) => {
    this.setState({ outputParams: value })
  }

  /*********旋流器 输入，输出配置*************/
  cycloneHtml = () => {
    const { inputParams, outputParams, selectedRowKeys } = this.state

    const cyclone_columns = [
      {
        title: '粒级',
        dataIndex: 'particleSize',
        width: '20%',
        editable: true,
      },
      {
        title: '给矿分布',
        dataIndex: 'fdDist',
        width: '20%',
        editable: true,
      },
      {
        title: '溢流分布',
        dataIndex: 'ofDist',
        width: '20%',
        editable: true,
      },
      {
        title: '沉砂分布',
        dataIndex: 'ufDist',
        width: '20%',
        editable: true,
      },
      {
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
      },
    ]

    const components = {
      body: {
        cell: EditableCell,
      },
    }

    const columns = cyclone_columns.map((col) => {
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

    const dataSource = inputParams.arrParams.map((v, i) => ({ ...v, key: i })) || []

    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    }

    return (
      <div>
        <h3>输入参数</h3>
        <div style={{ marginBottom: '12px' }}>
          <div>
            <span className="inputSpan">计算描述</span>
            <Input
              className="paramInput"
              style={{ width: '96px' }}
              value={modelList[this.state.model]}
              disabled
            ></Input>
            <span className="inputSpan">给矿浓度</span>
            <InputNumber
              className="paramInput"
              value={inputParams.fdDen}
              onChange={(value) => this.setState({ inputParams: { ...inputParams, fdDen: value } })}
            ></InputNumber>
            <span className="inputSpan">溢流浓度</span>
            <InputNumber
              className="paramInput"
              value={inputParams.ifDen}
              onChange={(value) => this.setState({ inputParams: { ...inputParams, ifDen: value } })}
            ></InputNumber>
          </div>
          <div style={{ marginTop: '12px', marginBottom: '10px' }}>
            <span className="inputSpan">沉砂浓度</span>
            <InputNumber
              className="paramInput"
              value={inputParams.ufDen}
              onChange={(value) => this.setState({ inputParams: { ...inputParams, ufDen: value } })}
            ></InputNumber>
            <span className="inputSpan">合格粒度</span>
            <InputNumber
              className="paramInput"
              value={inputParams.acceptablePs}
              onChange={(value) =>
                this.setState({ inputParams: { ...inputParams, acceptablePs: value } })
              }
            ></InputNumber>
            <span className="inputSpan">鱼钩效应</span>
            <Switch
              checked={inputParams.fishhook}
              onChange={(checked) =>
                this.setState({ inputParams: { ...inputParams, fishhook: checked } })
              }
            ></Switch>
          </div>
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
        </div>
        <h3>输出参数</h3>
        <div style={{ marginBottom: '16px' }}>
          <span className="outputSpan">循环符合</span>
          <span className="paramOutput">&nbsp;tParams.cl}</span>
          <span className="outputSpan">水分比</span>
          <span className="paramOutput">&nbsp;{outputParams.rf}</span>
          <span className="outputSpan">流量比</span>
          <span className="paramOutput">&nbsp;{outputParams.rv}</span>
          <span className="outputSpan">质效比</span>
          <span className="paramOutput">&nbsp;{outputParams.quality}</span>
        </div>
        <div>
          <span className="outputSpan">量效比</span>
          <span className="paramOutput">&nbsp;{outputParams.quantitative}</span>
          <span className="outputSpan">分离粒度</span>
          <span className="paramOutput">&nbsp;{outputParams.d50c}</span>
          <span className="outputSpan">效率曲线α</span>
          <span className="paramOutput">&nbsp;{outputParams.alpha}</span>
          <span className="outputSpan">效率曲线β</span>
          <span className="paramOutput">&nbsp;{outputParams.beta}</span>
        </div>
      </div>
    )
  }
  render() {
    return <div className="modelContent">{this.cycloneHtml()}</div>
  }
}

const EditableFormTable = Form.create()(CustomComp)
export default EditableFormTable
