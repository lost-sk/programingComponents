import React, { Component } from 'react'
import { Select } from 'antd'

const selectList = [
  { label: '是', value: '1' },
  { label: '否', value: '0' },
]
const { Option } = Select

export default class BaseSelector extends Component {
  constructor(props) {
    super(props)
    console.log('props', props)
    this.state = {
      value: props.getInfo().value,
      options: [],
      defaultValue: '',
      title: '',
    }
  }
  componentDidMount() {
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
          return element.resource === 'select.js' && element.name === this._reactInternalFiber.key
        })
        this.setState({
          options: r.options,
          defaultValue: r.defaultValue,
          title: r.displayName,
        })
      })
  }
  onChange = (value, option) => {
    this.setState({ value }, () => {
      this.props.edit({ value })
      this.storageCurrentProps()
    })
  }

  selectChange = (value) => {
    if (this.props.selectChange) {
      this.props.selectChange(value)
    }
  }

  storageCurrentProps = (key, val) => {
    // this.props.editComponent.setCustomProps(key, val);
    setTimeout(() => {
      // console.log(this.props.data, this.props.editComponent.getCtrlId());
      const htId = this.props.editComponent.getCtrlId().value
      // supOS4.2之前的可编程组件实例
      if (window.dynamicImportWidget) {
        window.dynamicImportWidget[htId].forceUpdate()
      }
      // supOS4.2及之后的可编程组件实例
      if (window.COMPVIEW && window.COMPVIEW.dynamicImportWidget)
        window.COMPVIEW.dynamicImportWidget[htId].forceUpdate()
    }, 0)
  }

  typeProp = Object.prototype.toString

  intlFormat = (msg) => {
    return msg
  }

  getPopupContainer = () => {
    const { popupContainerQuery } = this.props
    return document.querySelector(popupContainerQuery || '#drawWrapContainer')
  }

  render() {
    const {
      allowClear = false,
      showArrow,
      placeholder,
      className = '',
      options = [],
      styleless = '',
      prefix,
      disabled,
      mode,
      showSearch = false,
      filterOption = () => {},
      onFocus = () => {},
      isHTlayer = false, // 兼容 图元库 图层选择
      getInfo,
    } = this.props

    const SpezialLanguage = ['de-de'].includes(localStorage.getItem('language'))
    const { value, disabledKey = [] } = getInfo()

    const prefixWidth = _.get(this.props, 'prefixWidth')
    const styleObj = {}
    if (prefixWidth && prefixWidth > 0) {
      styleObj.width = `${prefixWidth}px`
    }
    if (SpezialLanguage) {
      styleObj.maxWidth = '90px'
    }

    // 处理配置项
    let selectOptions = []
    if (isHTlayer) {
      const { editor } = window.COMPVIEW
      const layers = editor.dataView.dataModel.getLayers()
      selectOptions = (layers || []).map(({ name }, i) => {
        return {
          key: `${name}_${i}`,
          value: name,
          label: name,
        }
      })
    } else {
      selectOptions = Array.prototype.slice.call(options)
    }
    // 验证disabled类型
    const disabledSelectItemKey = Array.prototype.slice.call(disabledKey)

    const wrapperClassName = `supos-base-select-wrapper styleless-cover-style selector-with-label base-selector-disabled
      `

    return (
      <div
        className={wrapperClassName}
        id="supos-base-select"
        style={{
          backgroundColor: 'rgb(235,235,235)',
          display: 'flex',
          alignItems: 'center',
          marginBottom: '5px',
        }}
      >
        {prefix && !styleless && (
          <span className="prefix-title" style={styleObj} title={this.intlFormat(prefix)}>
            {this.intlFormat(prefix)}
          </span>
        )}
        <div
          style={{
            display: 'table-cell',
            verticalAlign: 'middle',
            padding: '0 3px',
            color: 'rgb(153, 165, 173)',
          }}
        >
          {this.state.title}
        </div>
        <Select
          allowClear={allowClear}
          onFocus={onFocus}
          showSearch={showSearch}
          filterOption={filterOption}
          disabled={disabled}
          onChange={this.onChange}
          onSelect={this.props.selectChange}
          value={this.state.value || this.state.defaultValue}
          mode={mode}
          dropdownClassName="dropdown-cover-style"
          className="select-cover-style"
          showArrow={showArrow}
          placeholder={this.intlFormat(placeholder)}
          suffixIcon={<span className="suffixIcon" />}
          getPopupContainer={this.getPopupContainer}
          dropdownMatchSelectWidth={!styleless}
          size="small"
        >
          {this.state.options.map(
            ({ key, value: $key, label, disabled: $disabled, style: $style }) => {
              return (
                <Option
                  value={$key} // 兼容 HT layer 特殊情况
                  key={$key}
                  style={$style}
                  disabled={$disabled || disabledSelectItemKey.includes($key)}
                  title={label}
                >
                  {this.intlFormat(label)}
                </Option>
              )
            }
          )}
        </Select>
      </div>
    )
  }
}
