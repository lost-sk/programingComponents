import React, { Fragment } from 'react';
import { Select } from 'antd';

const { Option } = Select;

export default class BaseSelector extends React.Component {
  constructor(props) {
    super(props);
    const { value } = props.getInfo();
    this.state = {
      value: _.hasIn(props.getInfo(), "value") ?value: props.defaultValue
    };
    // 判断是否是德语
    this.SpezialLanguage = ['de-de'].includes(localStorage.getItem('language'));
  }


  // 值改变
  onChange = (value, option) => {
    this.setState({ value }, () => {
      // 将option传入会报错
      // this.props.edit({ value, option: option });
      this.props.edit({ value });
    });
  }

  // 通过语法，判断前缀宽度
  getPrefixTitleWidth=()=> {
    if (['en-us', 'de-de'].includes(localStorage.getItem('language'))) return 'auto';
    return '';
  }  

  render() {
    const {
      allowClear = false,
      showArrow,
      placeholder,
      options = [],
      styleless = '',
      prefix,
      disabled,
      mode,
      showSearch = false,
    } = this.props;

    const { value } = this.state;
    const prefixWidth = this.getPrefixTitleWidth() || _.get(this.props, 'width');
    const styleObj = {};
    if (prefixWidth && prefixWidth > 0) {
      styleObj.width = `${prefixWidth}px`;
    }
    if (this.SpezialLanguage) {
      styleObj.maxWidth = '90px';
    }

    // 处理配置项
    let selectOptions =  Array.prototype.slice.call(options);
    const customStyle = `
      .sup_componentSelector {
        display: flex;
        flex-direction:row;
        margin-bottom: 8px;
      }
      .sup_componentSelector .title {
        height: 26px;
        line-height: 26px;
        min-width: 52px;
        flex: 0 0 auto;
        padding: 0 4px;
        background: #ebebeb;
        color: #8d9ea7;
        text-align: center;
        display: inline-block;
        border-radius: 2px 0 0 2px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      
      .sup_componentSelector .ant-select .ant-select-selection {
        min-height: 26px;
      }
      .sup_componentSelector .ant-select .ant-select-selection .ant-select-selection__rendered {
        margin-bottom: 0;
      }
      .sup_componentSelector .ant-select .ant-select-selection .ant-select-selection__rendered ul li {
        height: 18px;
        line-height: 16px;
      }
      .sup_componentSelector .ant-select .ant-select-selection .ant-select-selection__clear {
        top: 12px;
      }
      .sup_componentSelector .ant-select .ant-select-selection--single {
        height: 26px;
        line-height: 26px;
      }
      .sup_componentSelector .ant-select .ant-select-selection--single .ant-select-selection__rendered {
        line-height: 26px;
      }
      .sup_componentSelector .ant-select .ant-select-selection--multiple {
        padding-bottom: 0;
      }
      .sup_componentSelector .ant-select .ant-select-selection--multiple .ant-select-selection__rendered {
        line-height: 24px;
      }
      .sup_componentSelector .ant-select .ant-select-selection--multiple .ant-select-selection__rendered ul li:last-child {
        margin-bottom:3px
      }
      .sup_componentSelector .suffixTitle {
        padding: 0 4px;
      }
    `
    return (
      <Fragment>
        <style>
          {customStyle}
        </style>
        <div className='sup_componentSelector'>
          {
            prefix ? (
              <span className='title' style={styleObj} title={prefix}>{prefix}</span>
            ) : null
          }
          <Select
            style={{ width: styleObj.width ? `calc(100% - ${styleObj.width})` : '100%' }}
            allowClear={allowClear}
            showSearch={showSearch}
            disabled={disabled}
            onChange={this.onChange}
            value={value}
            mode={mode}
            showArrow={showArrow}
            placeholder={placeholder}
            suffixIcon={<span className="suffixIcon" />}
            dropdownMatchSelectWidth={!styleless}
          >
            {
              selectOptions.map(({ key, value: $key, label, disabled: $disabled, style: $style }) => {
                return (
                  <Option
                    value={$key === false ? $key : ($key || key)}
                    key={$key}
                    style={$style}
                    disabled={$disabled}
                    title={label}
                  >
                    {label}
                  </Option>
                );
              })
            }
          </Select>
        </div>
      </Fragment>
    );
  }
}
