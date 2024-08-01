import React, { Component } from 'react'
import {
  Input,
  Button,
  Modal,
  Select,
  Tree,
  Icon,
  Form,
  Row,
  Col,
  Tooltip,
  InputNumber,
  Switch,
} from 'antd'
const { Option } = Select
const { TreeNode } = Tree
const { TextArea } = Input

var css = document.createElement('style')

css.innerHTML = `
	.ant-tree li span.ant-tree-switcher.ant-tree-switcher-noop {
		display: none
	}
	.ant-tree li .ant-tree-node-content-wrapper.ant-tree-node-selected {
		background-color: rgba(0,0,0,0)
	}
	.ant-tree li .ant-tree-node-content-wrapper:hover {
		background-color: rgba(0,0,0,0)
	}
  .ant-tree li span[draggable], .ant-tree li span[draggable="true"] {
    width: 100%;
  }
`

document.getElementsByTagName('head')[0].appendChild(css)

class HeaderSelect extends Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false,
      liContent: [],
      nowData: {},
      isEdit: false,
      editIndex: '',
      record: {},
      tableHeaderSource: !_.isEmpty(props.getInfo()) ? props.getInfo() : [],
      type: 'input',
      dataSource:
        props.editComponent.props.data._attrObject.data?.object?.dynamicDataSource[0] || {},
    }
  }

  componentDidMount() {
    console.log('componentDidMount props state', this.props, this.state)
    this.handleTableHeaderSource()
    let url = `/resource/${this.props.appId}/extensions/${
      this.props.editComponent.props.data.getAttrObject().componentName
    }/index.json`
    if (this.props.editComponent?.commonPath?.includes('fileName=resources/plugin')) {
      url = `${this.props.editComponent.commonPath}/index.json`
    }
    fetch(url)
      .then((item) => {
        return item.json()
      })
      .then((data) => {
        const r = data.find((element) => {
          return (
            element.resource === 'FBindingTableHeader.js' &&
            element.name === this._reactInternalFiber.return.key
          )
        })
        this.setState({
          reRenderFunctionName: r.reRenderFunctionName,
        })
      })
  }

  // componentDidUpdate(prevProps, prevState) {
  //   if (
  //     Array.isArray(this.props.editComponent.props.data._attrObject.data?.object?.dynamicDataSource)
  //   ) {
  //     const preDataSource =
  //       prevProps.editComponent.props.data._attrObject.data?.object?.dynamicDataSource[0] || {}
  //     const propsDataSource =
  //       this.props.editComponent.props.data._attrObject.data?.object?.dynamicDataSource[0] || {}
  //     const preStateDataSource = prevState.dataSource
  //     const stateDataSource = this.state.dataSource

  //     console.log(
  //       'componentDidUpdate preprops prestate props state',
  //       preDataSource.selectedTemplate.showName,
  //       preStateDataSource.selectedTemplate.showName,
  //       propsDataSource.selectedTemplate.showName,
  //       stateDataSource.selectedTemplate.showName
  //     )
  //     console.log('componentDidUpdate', this.state)
  //     if (
  //       propsDataSource.selectedTemplate &&
  //       stateDataSource.selectedTemplate &&
  //       !_.isEqual(propsDataSource.selectedTemplate, stateDataSource.selectedTemplate)
  //     ) {
  //       const newTableHeaderSource = propsDataSource.selectedProp.map((field, index) => {
  //         const defaultHeader = {
  //           align: 'left',
  //           fixed: 'null',
  //           __index: index,
  //           dataIndex: field.namespace + '.' + field.propertyName,
  //           title: field.showName,
  //         }
  //         switch (field.primitiveType) {
  //           case 'INTEGER':
  //           case 'LONG':
  //             Object.assign(defaultHeader, { type: 'inputInteger' })
  //             break
  //           case 'FLOAT':
  //           case 'DOUBLE':
  //           case 'DECIMAL':
  //             Object.assign(defaultHeader, { type: 'inputNumber' })
  //             break
  //           case 'DATE':
  //           case 'DATETIME':
  //             Object.assign(defaultHeader, { type: 'date' })
  //             break
  //           default:
  //             Object.assign(defaultHeader, { type: 'input' })
  //         }
  //         return defaultHeader
  //       })
  //       this.setState({ dataSource: propsDataSource })
  //       this.setHeaderSelect(newTableHeaderSource)
  //       console.log('newTableHeaderSource', newTableHeaderSource)
  //     }
  //   }
  // }

  getHeaderSelect = () => {
    return this.state.tableHeaderSource
  }

  setHeaderSelect = (tableHeaderSource) => {
    this.setState({ tableHeaderSource }, () => {
      this.handleTableHeaderSource()
      this.props.edit(tableHeaderSource)
      this.storageCurrentProps()
    })
  }

  storageCurrentProps = (key, val) => {
    // this.props.editComponent.setCustomProps(key, val);
    setTimeout(() => {
      // console.log(this.props.data, this.props.editComponent.getCtrlId());
      const htId = this.props.editComponent.getCtrlId().value
      // supOS4.2之前的可编程组件实例
      if (window.dynamicImportWidget) {
        window.dynamicImportWidget[htId]?.forceUpdate()
      }
      // supOS4.2及之后的可编程组件实例
      if (window.COMPVIEW && window.COMPVIEW.dynamicImportWidget) {
        const { reRenderFunctionName } = this.state
        if (reRenderFunctionName) {
          window.COMPVIEW.dynamicImportWidget[htId][reRenderFunctionName]()
        } else {
          window.COMPVIEW.dynamicImportWidget[htId]?.forceUpdate()
        }
      }
    }, 0)
  }

  showModal = () => {
    //console.log('show modal', this.state)
    this.setState({
      visible: true,
      isEdit: false,
      record: {},
      type: 'input',
    })
    this.props.form.resetFields()
  }
  handleCancel = () => {
    this.setState({ visible: false })
  }

  onDrop = (info) => {
    // console.log('info', info);
    const dropKey = info.node.props.eventKey
    const dragKey = info.dragNode.props.eventKey
    const dropPos = info.node.props.pos.split('-')
    const dropPosition = info.dropPosition - Number(dropPos[dropPos.length - 1])
    // const { dragNodesKeys } = info;
    const { tableHeaderSource } = this.state

    let dropIndex
    let dragItem
    let dragIndex
    for (let i = 0; i < tableHeaderSource.length; i += 1) {
      if (tableHeaderSource[i].dataIndex === dragKey) {
        dragItem = tableHeaderSource[i]
        dragIndex = i
      }
    }
    // console.log(dropKey, dragKey);
    if (info.dropToGap) {
      tableHeaderSource.splice(dragIndex, 1)
      for (let i = 0; i < tableHeaderSource.length; i += 1) {
        if (tableHeaderSource[i].dataIndex === dropKey) {
          dropIndex = i
        }
      }
      if (dropPosition === -1) {
        // console.log('上');
        tableHeaderSource.splice(dropIndex, 0, dragItem)
      } else {
        // console.log('下');
        tableHeaderSource.splice(dropIndex + 1, 0, dragItem)
      }
    }
    this.setHeaderSelect(tableHeaderSource)
  }

  delBindedItem = (option) => {
    const { tableHeaderSource } = this.state
    //console.log(tableHeaderSource, option)
    const newTableHeaderSource = tableHeaderSource.filter(
      (item) => item.dataIndex != option.dataIndex
    )
    this.setHeaderSelect(newTableHeaderSource)
  }

  editBindedItem = (item) => {
    this.setState({
      visible: true,
      isEdit: true,
      editIndex: item.__index,
      record: item,
      type: item.type,
    })
  }

  handleTableHeaderSource = () => {
    const { tableHeaderSource } = this.state
    const liContent = []
    if (tableHeaderSource && tableHeaderSource.length > 0) {
      tableHeaderSource.forEach((option, i) => {
        option.__index = i
        if (!option) {
          return
        }
        liContent.push(
          <TreeNode
            key={option.dataIndex}
            style={{ height: 65, padding: '0px' }}
            title={
              <div style={{ display: 'flex', marginBottom: '10px', width: '100%' }}>
                <div
                  style={{ flex: 1, overflow: 'hidden', border: 'dashed 1px #ccc', padding: '4px' }}
                >
                  值：<span title={option.dataIndex}>{option.dataIndex}</span>
                  <br />
                  文本：<span title={option.title}>{option.title}</span>
                </div>
                <div
                  style={{
                    width: '22px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-evenly',
                  }}
                >
                  <Icon
                    type="delete"
                    style={{ color: 'blue' }}
                    onClick={this.delBindedItem.bind(this, option)}
                  />
                  <Icon type="edit" onClick={this.editBindedItem.bind(this, option)} />
                </div>
              </div>
            }
          />
        )
      })
    }
    //console.log('liContent', liContent)
    this.setState({ liContent })
  }

  getTableHeaderSource(values) {
    const { tableHeaderSource = [], isEdit, editIndex } = this.state
    //console.log(isEdit, editIndex, tableHeaderSource)
    if (isEdit) {
      return tableHeaderSource.map((source) => {
        if (source.__index === editIndex) {
          return values
        }
        return source
      })
    } else {
      if (
        tableHeaderSource.map((t) => t.dataIndex).filter((it) => it === values.dataIndex).length ===
        0
      ) {
        tableHeaderSource.push(values)
      }
      return tableHeaderSource
    }
  }

  handleOk = () => {
    this.props.form.validateFields((err, values) => {
      if (err) {
        return
      }
      const tableHeaderSource = this.getTableHeaderSource(values)
      this.setState({
        visible: false,
        isEdit: false,
      })
      this.setHeaderSelect(tableHeaderSource)
      this.props.form.resetFields()
    })
  }

  typeChange = (type) => {
    // console.log(value)
    this.setState({ type })
  }

  parseSelectOption = () => {
    const dynamicDataSource = _.get(
      this.props,
      'editComponent.props.data._attrObject.data.object.dynamicDataSource'
    )
    // let { inputs = [] } = _.get(dynamicDataSource, 'selectedProp', {});
    // 选择表单模板下的属性时，dynamicDataSource是个数组，其他情况下是 {}
    const isFormProperty = Array.isArray(dynamicDataSource)
    let optionList = []
    if (isFormProperty) {
      optionList = _.get(dynamicDataSource[0], 'selectedProp', []).map((item) => {
        return {
          ...item,
          __optionName: item.showName,
          //__optionValue: `${item.namespace}.${item.propertyName}`,
          __optionValue: `${item.propertyName}`,
        }
      })
    } else {
      try {
        const obj = JSON.parse(_.get(dynamicDataSource, 'selectedProp.output.jsonDesc')).list[0]
        optionList = Object.keys(obj).map((item) => {
          return {
            __optionValue: item,
          }
        })
      } catch (error) {
        optionList = []
      }
    }
    //console.log('header optionList', optionList)
    return optionList
  }

  changeDataIndex = (value) => {
    const thOptions = this.parseSelectOption()
    const name = _.find(thOptions, { __optionValue: value }).__optionName
    const { record } = this.state
    this.setState({ record: { ...record, title: name, dataIndex: value } })
  }

  render() {
    const { visible, liContent, record, type, tableHeaderSource } = this.state
    const { getFieldDecorator } = this.props.form
    const labelCol = 7
    const wrapperCol = 16
    const formItemLayout = {
      labelCol: {
        sm: { span: 6 },
      },
      wrapperCol: {
        sm: { span: 16 },
      },
    }

    const thOptions = this.parseSelectOption()

    return (
      <>
        <div style={{ display: 'flex', fontSize: '13px', width: '100%' }}>
          <div style={{ minWidth: 60, lineHeight: '24px' }}>表头设置</div>
          <div style={{ flex: 1, width: 'calc(100% - 60px)' }}>
            <Tree draggable onDrop={this.onDrop} style={{ margin: '0' }}>
              {liContent}
            </Tree>
            <Button style={{ width: '100%' }} type="primary" size="small" onClick={this.showModal}>
              新增表头
            </Button>
          </div>
        </div>
        <Modal
          title="添加绑定关系"
          visible={visible}
          maskClosable={false}
          destroyOnClose={true}
          onOk={this.handleOk}
          width={600}
          onCancel={this.handleCancel}
        >
          <div>
            <Form {...formItemLayout}>
              {thOptions[0] ? (
                <Row>
                  <Col span={labelCol} style={labelColStyle}>
                    可选字段：
                  </Col>
                  <Col span={wrapperCol} style={wrapperColStyle}>
                    <Form.Item>
                      <Select
                        showSearch
                        onChange={this.changeDataIndex}
                        allowClear={true}
                        value={record.dataIndex}
                      >
                        {thOptions.map((item) => (
                          <Option
                            key={item.__optionValue}
                            value={item.__optionValue}
                            // disabled={tableHeaderSource.find(
                            //   (r) => r.dataIndex === item.__optionValue
                            // )}
                          >
                            {item.__optionName}
                          </Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>
              ) : null}

              <Row>
                <Col span={labelCol} style={labelColStyle}>
                  字段：
                </Col>
                <Col span={wrapperCol} style={wrapperColStyle}>
                  <Form.Item>
                    {getFieldDecorator('dataIndex', {
                      rules: [{ required: true, message: '请输入字段名称！' }],
                      initialValue: record.dataIndex,
                    })(<Input placeholder="数据的字段名称" disabled />)}
                  </Form.Item>
                </Col>
              </Row>

              <Row>
                <Col span={labelCol} style={labelColStyle}>
                  显示名：
                </Col>
                <Col span={wrapperCol} style={wrapperColStyle}>
                  <Form.Item>
                    {getFieldDecorator('title', {
                      rules: [{ required: true, message: '请输入显示名称！' }],
                      initialValue: record.title,
                    })(<Input placeholder="数据的显示名称" />)}
                  </Form.Item>
                </Col>
              </Row>

              <Row>
                <Col span={labelCol} style={labelColStyle}>
                  对齐方式：
                </Col>
                <Col span={wrapperCol} style={wrapperColStyle}>
                  <Form.Item>
                    {getFieldDecorator('align', {
                      initialValue: record.align || 'left',
                      rules: [],
                    })(
                      <Select>
                        <Option value="left">左对齐</Option>
                        <Option value="center">居中</Option>
                        <Option value="right">右对齐</Option>
                      </Select>
                    )}
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col span={labelCol} style={labelColStyle}>
                  固定列：
                </Col>
                <Col span={wrapperCol} style={wrapperColStyle}>
                  <Form.Item>
                    {getFieldDecorator('fixed', {
                      initialValue: record.fixed || 'null',
                      rules: [],
                    })(
                      <Select>
                        <Option value="left">固定在左侧</Option>
                        <Option value="null">无</Option>
                        <Option value="right">固定在右侧</Option>
                      </Select>
                    )}
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col span={labelCol} style={labelColStyle}>
                  宽度：
                </Col>
                <Col span={wrapperCol} style={wrapperColStyle}>
                  <Form.Item>
                    {getFieldDecorator('width', {
                      rules: [],
                      initialValue: record.width,
                    })(<InputNumber placeholder="宽度" />)}
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col span={labelCol} style={labelColStyle}>
                  是否必填：
                </Col>
                <Col span={wrapperCol} style={wrapperColStyle}>
                  <Form.Item>
                    {getFieldDecorator('required', {
                      initialValue: record.required,
                      rules: [],
                    })(<Switch defaultChecked={record.required}>必填</Switch>)}
                  </Form.Item>
                </Col>
              </Row>

              <Row>
                <Col span={labelCol} style={labelColStyle}>
                  只读：
                </Col>
                <Col span={wrapperCol} style={wrapperColStyle}>
                  <Form.Item>
                    {getFieldDecorator('readOnly', {
                      initialValue: record.readOnly,
                      rules: [],
                    })(<Switch defaultChecked={record.readOnly}>只读</Switch>)}
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col span={labelCol} style={labelColStyle}>
                  隐藏当前列：
                </Col>
                <Col span={wrapperCol} style={wrapperColStyle}>
                  <Form.Item>
                    {getFieldDecorator('isHidden', {
                      initialValue: record.isHidden,
                      rules: [],
                    })(<Switch defaultChecked={record.isHidden}></Switch>)}
                  </Form.Item>
                </Col>
              </Row>

              <Row>
                <Col span={labelCol} style={labelColStyle}>
                  单元格类型：
                </Col>
                <Col span={wrapperCol} style={wrapperColStyle}>
                  <Form.Item>
                    {getFieldDecorator('type', {
                      initialValue: record.type || 'input',
                      rules: [],
                    })(
                      <Select onChange={this.typeChange}>
                        <Option value="input">文本输入框</Option>
                        <Option value="inputNumber">数值(带小数点)</Option>
                        <Option value="inputInteger">数值(整数)</Option>
                        <Option value="progress">进度条</Option>
                        <Option value="date">日期</Option>
                        <Option value="link">链接</Option>
                        <Option value="select">下拉框（静态）</Option>
                        <Option value="select_service">下拉框（服务）</Option>
                        <Option value="cascader">级联选择器</Option>
                      </Select>
                    )}
                  </Form.Item>
                </Col>
              </Row>

              {type === 'link' ? (
                <Row>
                  <Col span={labelCol} style={labelColStyle}>
                    链接地址：
                  </Col>
                  <Col span={wrapperCol} style={wrapperColStyle}>
                    <Form.Item>
                      {getFieldDecorator('linkUrl', {
                        rules: [],
                        initialValue: record.linkUrl,
                      })(
                        <TextArea placeholder="请输入链接地址，变量参数以${}拼接，text表示单元格数据，record表示行数据，例：https://www.baidu.com/s?wd=${text} " />
                      )}
                    </Form.Item>
                  </Col>
                </Row>
              ) : null}

              {type === 'select' ? (
                <Row>
                  <Col span={labelCol} style={labelColStyle}>
                    下拉选项：
                  </Col>
                  <Col span={wrapperCol} style={wrapperColStyle}>
                    <Form.Item>
                      {getFieldDecorator('optionJson', {
                        rules: [],
                        initialValue:
                          record.optionJson ||
                          `[{optionText: '男',optionValue: '1'},{optionText: '女',optionValue: '2'}]`,
                      })(<TextArea placeholder="optionJson" />)}
                    </Form.Item>
                  </Col>
                </Row>
              ) : null}

              {['cascader', 'select_service'].includes(type) ? (
                <Row>
                  <Col span={labelCol} style={labelColStyle}>
                    objName：
                  </Col>
                  <Col span={wrapperCol} style={wrapperColStyle}>
                    <Form.Item>
                      {getFieldDecorator('objName', {
                        rules: [{ required: true, message: '请输入模板或实例信息！' }],
                        initialValue: record.objName,
                      })(<Input placeholder="namespace.templateName/instanceName" />)}
                    </Form.Item>
                  </Col>
                  {/* <span>?</span> */}
                </Row>
              ) : null}

              {['cascader', 'select_service'].includes(type) ? (
                <Row>
                  <Col span={labelCol} style={labelColStyle}>
                    serviceName：
                  </Col>
                  <Col span={wrapperCol} style={wrapperColStyle}>
                    <Form.Item>
                      {getFieldDecorator('serviceName', {
                        rules: [{ required: true, message: '请输入服务信息！' }],
                        initialValue: record.serviceName,
                      })(<Input placeholder="namespace.serviceName" />)}
                    </Form.Item>
                  </Col>
                </Row>
              ) : null}

              {['cascader', 'select_service', 'select'].includes(type) ? (
                <Row>
                  <Col span={labelCol} style={labelColStyle}>
                    选项文本存储字段：
                  </Col>
                  <Col span={wrapperCol} style={wrapperColStyle}>
                    <Form.Item>
                      {getFieldDecorator('labelName', {
                        rules: [],
                        initialValue: record.labelName,
                      })(<Input placeholder="指定一个字段，将选项的文本存入对应的表单字段中" />)}
                    </Form.Item>
                  </Col>
                </Row>
              ) : null}
              <Row>
                <Col span={labelCol} style={labelColStyle}>
                  数据渲染：
                </Col>
                <Col span={wrapperCol} style={wrapperColStyle}>
                  <Form.Item>
                    {getFieldDecorator('textRender', {
                      rules: [],
                      initialValue: record.textRender,
                    })(
                      <TextArea
                        placeholder={`text表示当前单元格的值，record表示当前行数据，index表示索引 return "<span>" + text + "</span>"`}
                      />
                    )}
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </div>
        </Modal>
      </>
    )
  }
}

const labelColStyle = {
  lineHeight: '40px',
  textAlign: 'right',
  paddingRight: '12px',
  fontSize: '14px',
}

const wrapperColStyle = {}

HeaderSelect = Form.create({})(HeaderSelect)

export default HeaderSelect
