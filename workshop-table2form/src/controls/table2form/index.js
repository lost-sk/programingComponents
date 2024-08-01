import React, { Component } from 'react'
import {
  Input,
  Button,
  Form,
  Row,
  Col,
  DatePicker,
  notification,
  Select,
  InputNumber,
  Progress,
  message,
  Cascader,
} from 'antd'
import moment from 'moment'
import { fetchService, addDataTableEnty, UpdateDataTableEntry } from './util'

const { Option } = Select

// import _ from 'lodash'
// const scriptUtil = {
//   registerReactDom: () => {},
//   executeScriptService: () => {},
// }

class EditableTable extends Component {
  constructor(props) {
    super(props)
    // 初始化防抖函数 --联动
    this.formData = {} // 添加 formData 属性
    this.timer = null // 添加定时器属性

    this.state = {
      columns: [],
      config: props.data?._attrObject?.data,
      editRow: {},
      isEdit: false,
      extraData: {}, // 存储字段类型为下拉列表，并且设置了选项文本存储字段的数据
    }
  }

  componentDidMount() {
    console.log('config', this.state.config)
    scriptUtil.registerReactDom(this, this.props)
    this.addCssRule()
    this.fetchSelectServiceData()

    this.runCode('componentDidMount', '内容加载事件脚本错误,请打开控制台查看错误信息')
  }

  addCssRule = () => {
    const { tHeaderBackColor = {}, tHeaderFontColor = {} } = _.get(
      this.props,
      'data._attrObject.data',
      {}
    )
    // ant-checkbox-inner
    document.styleSheets[0].insertRule(
      `
      #${this.props.widgetIndex} th.t-header-s, #${
        this.props.widgetIndex
      } th.ant-table-selection-column { 
        background-color: ${tHeaderBackColor.color || '#ebecf0'} !important;
        color: ${tHeaderFontColor.color || 'rgb(51,51,51)'} !important;
        padding: 12px 12px !important;
        font-size: 12px !important;
        font-weight: 400 !important;
      }
    `,
      0
    )
    document.styleSheets[0].insertRule(
      `
      #${this.props.widgetIndex} .ant-checkbox-inner { 
        background-color: #fff !important;
      }
    `,
      0
    )
    document.styleSheets[0].insertRule(
      `
      #${this.props.widgetIndex} th.ant-table-selection-column .ant-checkbox-inner { 
        border: solid 1px rgba(0,0,0,0.65);
        height: 14px;
        width: 14px;
      }
    `,
      0
    )
    document.styleSheets[0].insertRule(
      `
      #${this.props.widgetIndex} .ant-table-content > .ant-table-scroll > .ant-table-header { 
        margin-bottom: -4px !important;
      }
    `,
      0
    )
    document.styleSheets[0].insertRule(
      `
      #${this.props.widgetIndex} .ant-table .ant-table-tbody > tr:hover > td { 
        background-color: #f2f3f7;
      }
    `,
      0
    )
    document.styleSheets[0].insertRule(
      `
      #${this.props.widgetIndex} .ant-table .ant-table-tbody > tr,
      #${this.props.widgetIndex} .ant-table thead.ant-table-thead > tr
      { 
        height: 42px !important;
      }
    `,
      0
    )
    document.styleSheets[0].insertRule(
      `
       #${this.props.widgetIndex} td.t-header-s  {
        height: 44px !important;
        padding: 7px 12px !important;
        line-height: 1;
        border-bottom: 1px solid #dcdee3;
      }
    `,
      0
    )
    // .ant-table .ant-table-tbody > tr > td
    document.styleSheets[0].insertRule(
      `
       #${this.props.widgetIndex} .ant-table .ant-table-tbody > tr > td  {
        padding: 7px 12px !important;
      }
    `,
      0
    )
    document.styleSheets[0].insertRule(
      `
       #${this.props.widgetIndex} .ant-table-body::-webkit-scrollbar  {
        height: 5px;
      }
    `,
      0
    )
    document.styleSheets[0].insertRule(
      `
      #${this.props.widgetIndex} .ant-table thead.ant-table-thead > tr > th{
        height: 37px !important;
        line-height: 1;
      }
    `,
      0
    )
    document.styleSheets[0].insertRule(
      `
    #${this.props.widgetIndex} .ant-table{
      font-size: 12px;
      border: solid 1px #dcdee3;
      border-top-left-radius: 4px;
      border-top-right-radius: 4px;
      border-bottom: none;
    }
  `,
      0
    )

    document.styleSheets[0].insertRule(
      `
      #${this.props.widgetIndex} .ant-input, 
      #${this.props.widgetIndex} .ant-input-number-input, 
      #${this.props.widgetIndex} .ant-select-selection--single,
      #${this.props.widgetIndex} .ant-select-selection__rendered {
        height: 26px;
        font-size: 12px;
        line-height: 26px;
      }
    `,
      0
    )
    document.styleSheets[0].insertRule(
      `
      #${this.props.widgetIndex} .ant-input-number-handler-wrap {
        display: none;
      }
    `,
      0
    )
  }

  hasAppointEvent = (code) => {
    const events = _.get(this.props, 'data._attrObject.data.events', [])
    return !!events.filter((item) => item.content === code).length
  }

  runCode = (key, msg) => {
    const events = _.get(this.props, 'data._attrObject.data.events', [])
    events.forEach((item) => {
      if (item.content === key) {
        this.runScript(item.detail, msg)
      }
    })
  }

  runScript = (codeStr, message) => {
    try {
      new Function(codeStr)()
    } catch (error) {
      console.error(error)
      notification.error({
        message: '可编程组件',
        description: message,
      })
    }
  }

  fetchSelectServiceData = async () => {
    const { BindingTableHeader = [] } = _.get(this.props, 'data._attrObject.data', {})
    console.log('BindingTableHeader', BindingTableHeader)
    const newHeader = BindingTableHeader.map(async (item) => {
      // 'select'
      if (['cascader', 'select_service'].includes(item.type) && !this.props.isDesign) {
        const op = await fetchService(item)
        if (Array.isArray(op.data)) {
          item.serviceOptions = op.data
        } else {
          console.error('下拉框或者级联选择绑定的数据服务返回格式错误')
        }
      }
      return item
    })

    Promise.all(newHeader).then((res) => {
      console.log('newHeader res', res)
      this.setColumnHeader(res)
    })
  }

  componentWillUnmount() {
    scriptUtil.logoutReactDom(this, this.props)
  }

  findOptionTexts = (data, optionValues) => {
    optionValues = (optionValues || '').split('/')
    let names = []
    let currentNode = null
    for (let i = 0; i < optionValues.length; i++) {
      if (currentNode) {
        currentNode = currentNode.children.find((item) => item.value === optionValues[i])
      } else {
        currentNode = data.find((item) => item.value === optionValues[i])
      }
      if (!currentNode) {
        break
      }
      names.push(currentNode.label)
    }
    return names.join('/')
  }
  // return new Function('text', 'row', 'index', 'tableData', item[key])(text, row, index, tableData);
  parseCell = (text, record, index, item) => {
    // console.log(item.textRender)
    if (item.textRender) {
      let tableHtml = ''
      try {
        tableHtml = new Function('text', 'record', 'index', item.textRender)(text, record, index)
      } catch (error) {
        console.error(error)
      }

      return <span dangerouslySetInnerHTML={{ __html: tableHtml }}></span>
    }
    switch (item.type) {
      case 'progress':
        return (
          <Progress
            percent={parseFloat(text || 0)}
            size="small"
            status="active"
            format={(percent) => `${text || 0} %`}
          />
        )
      case 'link':
        return (
          <a
            style={{ fontSize: '12px', lineHeight: '27px' }}
            href={eval('`' + item.linkUrl + '`')}
            target="_blank"
          >
            {' '}
            {text}{' '}
          </a>
        )
      case 'select':
        return (
          <span style={{ fontSize: '12px', lineHeight: '27px' }}>
            {
              this.parseOperationJson(item.optionJson).filter((it) => it.optionValue === text)[0]
                ?.optionText
            }
          </span>
        )
      case 'select_service':
        return (
          <span style={{ fontSize: '12px', lineHeight: '27px' }}>
            {
              _.get(item, 'serviceOptions', []).filter((it) => it.optionValue === text)[0]
                ?.optionText
            }
          </span>
        )
      case 'cascader':
        return (
          <span style={{ fontSize: '12px', lineHeight: '27px' }}>
            {/* {this.findOptionTexts(_.get(item, 'serviceOptions', []), text)} */}
            {this.findOptionTexts(_.get(item, 'serviceOptions', []), text)}
          </span>
        )
      default:
        return <span style={{ fontSize: '12px', lineHeight: '27px' }}>{text}</span>
    }
  }

  setColumnHeader = (columnHeader) => {
    const columns = columnHeader.map((item) => {
      return {
        ...item,
        className: 't-header-s',
        render: (text, record, index) => this.parseCell(text, record, index, item),
      }
    })

    this.setState({ columns })
  }

  isEmpty = (data) => {
    // 如果数据是 undefined、null、空字符串、空数组或空对象，则返回 true，否则返回 false
    return (
      data === undefined ||
      data === null ||
      (typeof data === 'string' && data.trim() === '') ||
      (Array.isArray(data) && data.length === 0) ||
      (typeof data === 'object' && Object.keys(data).length === 0)
    )
  }

  setFormData = (fieldsValue) => {
    this.props.form.setFieldsValue(fieldsValue)
  }

  getFormData = () => {
    let data = {}
    const { isEdit, extraData } = this.state
    this.props.form.validateFields((err, values) => {
      const newData = {}
      Object.keys(values).forEach((key) => {
        // 处理日期与级联选择器数据
        if (!!values[key] && typeof values[key] == 'object') {
          if (Array.isArray(values[key])) {
            values[key] = values[key].join('/')
          } else {
            values[key] = values[key].format('YYYY-MM-DD')
          }
        }
        newData[key.replaceAll('_&_', '.')] = values[key]
      })
      // ===================
      data = { ...newData, ...extraData }
    })
    return data
  }

  handleReset = () => {
    this.props.form.resetFields()
  }

  handleSubmit = () => {
    const { isEdit, extraData } = this.state
    this.props.form.validateFields((err, values) => {
      if (err) {
        return
      }

      const newData = {}
      Object.keys(values).forEach((key) => {
        if (!!values[key] && typeof values[key] == 'object') {
          if (Array.isArray(values[key])) {
            values[key] = values[key].join('/')
          } else {
            values[key] = values[key].format('YYYY-MM-DD')
          }
        }
        newData[key.replaceAll('_&_', '.')] = values[key]
      })

      this.handleAdd({ ...newData, ...extraData })
      const hasSubmitEvent = this.hasAppointEvent('onSubmit')
      if (hasSubmitEvent) {
        this.runCode('onSubmit', '事件脚本错误,请打开控制台查看错误信息')
      }
      // if (isEdit) {
      //   const hasUpEvent = this.hasAppointEvent('onUp')
      //   if (hasUpEvent) {
      //     this.runCode('onUp', '编辑弹窗确认事件脚本错误,请打开控制台查看错误信息')
      //   } else {
      //     this.handleUpData({ ...newData, ...extraData })
      //   }
      // } else {
      //   const hasAddEvent = this.hasAppointEvent('onAdd')
      //   if (hasAddEvent) {
      //     this.runCode('onAdd', '新增弹窗确认事件脚本错误,请打开控制台查看错误信息')
      //   } else {
      //     this.handleAdd({ ...newData, ...extraData })
      //   }
      // }
    })
  }

  handleUpData = async (record) => {
    const { editRow, extraData } = this.state
    const { BindingTableHeader = [] } = _.get(this.props, 'data._attrObject.data', {})
    const params = {}
    BindingTableHeader.forEach((item) => {
      params[item.dataIndex] = record[item.dataIndex]
        ? record[item.dataIndex]
        : record[item.dataIndex] == 0
        ? 0
        : null
    })
    const dynamicDataSource = _.get(this.props, 'data._attrObject.data.object.dynamicDataSource')
    // 选择表单模板下的属性时，dynamicDataSource是个数组，其他情况下是 {}
    const isFormProperty = Array.isArray(dynamicDataSource)
    if (isFormProperty) {
      const { namespace, name } = dynamicDataSource[0].selectedTemplate
      const data = await UpdateDataTableEntry({
        templateName: `${namespace}.${name}`,
        condition: { where: { id: editRow['system.id'] }, update: { ...params, ...extraData } },
      })
      if (data.code == 200 || data.code == 200) {
        message.success(`编辑成功`)
      } else {
        message.error(`编辑失败，请检查数据参数格式是否正确`)
      }
    }
  }

  handleAdd = async (record) => {
    const dynamicDataSource = _.get(this.props, 'data._attrObject.data.object.dynamicDataSource')
    // 选择表单模板下的属性时，dynamicDataSource是个数组，其他情况下是 {}
    const isFormProperty = Array.isArray(dynamicDataSource)

    if (isFormProperty) {
      const { namespace, name } = dynamicDataSource[0].selectedTemplate
      const data = await addDataTableEnty({
        templateName: `${namespace}.${name}`,
        condition: { ...record },
      })

      if (data.code == 200 || data.code == 200) {
        message.success(`添加成功`)
      } else {
        message.error(`添加失败，请检查数据参数格式是否正确`)
      }
    }
  }

  parseOperationJson = (str) => {
    let arr = []
    try {
      arr = eval('(' + str + ')')
    } catch (error) {
      arr = []
      notification.error({
        message: '可编程组件',
        description: '表格下拉框json数据配置有误，请重新设置',
      })
    }
    return arr
  }

  convertToCascaderData = (data) => {
    const map = {}
    const result = []

    // 将每个选项按照 parentValue 分组
    data.forEach((option) => {
      if (!option.parentValue) {
        result.push({
          value: option.optionValue,
          label: option.optionText,
          children: [],
        })
      } else {
        if (!map[option.parentValue]) {
          map[option.parentValue] = []
        }
        map[option.parentValue].push(option)
      }
    })

    // 递归构建级联选择器数据结构
    const buildTree = (node) => {
      if (map[node.value]) {
        node.children = map[node.value].map((child) => ({
          value: child.optionValue,
          label: child.optionText,
          children: [],
        }))
        node.children.forEach(buildTree)
      }
    }

    result.forEach(buildTree)

    return result
  }

  parseItem = (column) => {
    const { getFieldDecorator } = this.props.form
    const { editRow, isEdit } = this.state
    const disabled = isEdit && column.readOnly
    const { width = 200 } = column
    const { borderColor = { color: '#BFBFBF' } } = _.get(this.props, 'data._attrObject.data', {})

    switch (column.type) {
      case 'input':
      case 'link':
        return (
          <Form.Item>
            {/* supos表单模板返回数据的key里面包含" . " 在获取值得时候会被antd的form解析成二级对象 */}
            {getFieldDecorator(column.dataIndex.replaceAll('.', '_&_'), {
              rules: [{ required: column.required, message: column.title + '为必填项！' }],
              initialValue: editRow[column.dataIndex],
            })(<Input disabled={disabled} style={{ width, borderColor: borderColor.color }} />)}
          </Form.Item>
        )
      case 'inputNumber':
      case 'progress':
        return (
          <Form.Item>
            {getFieldDecorator(column.dataIndex.replaceAll('.', '_&_'), {
              rules: [{ required: column.required, message: column.title + '为必填项！' }],
              initialValue: editRow[column.dataIndex],
            })(
              <InputNumber disabled={disabled} style={{ width, borderColor: borderColor.color }} />
            )}
          </Form.Item>
        )
      case 'inputInteger':
        return (
          <Form.Item>
            {getFieldDecorator(column.dataIndex.replaceAll('.', '_&_'), {
              rules: [{ required: column.required, message: column.title + '为必填项！' }],
              initialValue: editRow[column.dataIndex],
            })(
              <InputNumber
                disabled={disabled}
                decimalSeparator="0"
                style={{ width, borderColor: borderColor.color }}
              />
            )}
          </Form.Item>
        )
      case 'date':
        const param = {
          rules: [{ required: column.required, message: column.title + '为必填项！' }],
        }
        if (editRow[column.dataIndex]) {
          param.initialValue = moment(editRow[column.dataIndex])
        }
        return (
          <Form.Item>
            {getFieldDecorator(
              column.dataIndex.replaceAll('.', '_&_'),
              param
            )(<DatePicker disabled={disabled} style={{ width }} />)}
          </Form.Item>
        )
      // select
      case 'select':
        return (
          <Form.Item>
            {getFieldDecorator(column.dataIndex.replaceAll('.', '_&_'), {
              rules: [{ required: column.required, message: column.title + '为必填项！' }],
              initialValue: editRow[column.dataIndex],
            })(
              <Select
                disabled={disabled}
                style={{ width }}
                onChange={(value, option) => this.selectChange(value, option, column.labelName)}
              >
                {this.parseOperationJson(column.optionJson).map((item) => (
                  <Option value={item.optionValue}>{item.optionText}</Option>
                ))}
              </Select>
            )}
          </Form.Item>
        )
      case 'select_service':
        return (
          <Form.Item>
            {getFieldDecorator(column.dataIndex.replaceAll('.', '_&_'), {
              rules: [{ required: column.required, message: column.title + '为必填项！' }],
              initialValue: editRow[column.dataIndex],
            })(
              <Select
                disabled={disabled}
                style={{ width }}
                onChange={(value, option) => this.selectChange(value, option, column.labelName)}
              >
                {_.get(column, 'serviceOptions', []).map((item) => (
                  <Option value={item.optionValue}>{item.optionText}</Option>
                ))}
              </Select>
            )}
          </Form.Item>
        )
      case 'cascader':
        return (
          <Form.Item>
            {getFieldDecorator(column.dataIndex.replaceAll('.', '_&_'), {
              rules: [{ required: column.required, message: column.title + '为必填项！' }],
              initialValue: (editRow[column.dataIndex] || '').split('/'),
            })(
              <Cascader
                style={{ width }}
                // options={this.convertToCascaderData(_.get(column, 'serviceOptions', []))}
                options={column.serviceOptions}
                placeholder="Please select"
                onChange={(value, option) => this.cascaderChange(value, option, column.labelName)}
              />
            )}
          </Form.Item>
        )
      default:
        return null
    }
  }

  selectChange = (value, option, labelName) => {
    const { extraData } = this.state
    if (labelName) {
      this.setState({ extraData: { ...extraData, [labelName]: option.props.children } })
    }
  }

  cascaderChange = (value, option, labelName) => {
    const { extraData } = this.state
    if (labelName) {
      this.setState({
        extraData: { ...extraData, [labelName]: option.map((it) => it.label).join('/') },
      })
    }
  }

  render() {
    const { columns } = this.state

    const { addButton = { value: { reset: true, save: true } } } = _.get(
      this.props,
      'data._attrObject.data',
      {}
    )
    return (
      <div>
        <Form>
          {/* <Row>
            {columns.map((column) => {
              if (column.dataIndex == 'operation') return null
              return (
                <Col span={24 / (colNum.value || 2)}>
                  <div style={{ display: 'flex' }}>
                    <span style={labelColStyle}>{column.title}:</span>
                    <div>{this.parseItem(column)}</div>
                  </div>
                </Col>
              )
            })}
          </Row> */}
          <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            {columns.map((column) => {
              if (column.dataIndex == 'operation') return null
              return (
                <div style={{ display: 'flex' }}>
                  <span style={labelColStyle}>{column.title}:</span>
                  <div style={{ marginRight: '20px' }}>{this.parseItem(column)}</div>
                </div>
              )
            })}
          </div>
          <Row>
            <Col span={24}>
              {addButton.value.save && (
                <Button type="primary" htmlType="submit" onClick={this.handleSubmit} size="small">
                  保存
                </Button>
              )}
              {addButton.value.reset && (
                <Button style={{ marginLeft: 8 }} onClick={this.handleReset} size="small">
                  重置
                </Button>
              )}
            </Col>
          </Row>
        </Form>
      </div>
    )
  }
}
EditableTable = Form.create({})(EditableTable)
export default EditableTable

const labelColStyle = {
  lineHeight: '32px',
  textAlign: 'right',
  paddingRight: '12px',
  fontSize: '12px',
  minWidth: '130px',
  marginBottom: '12px',
}
