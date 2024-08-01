import React, { Fragment } from 'react';
import { InputNumber } from 'antd';

const numberFormatter =  { // 数字
  naturalInteger: /^(0|[1-9][0-9]*)$/, // 自然数||非负整数
  integer: /^-?\d+$/, // 整数
  positiveInteger: /^([1-9][0-9]*)$/, // 正整数
  float: /^(-?\d+)(\.\d+)?$/, // 浮点数
  nonnegativeFloat: /^\d+(\.\d+)?$/ // 非负浮点数
};

class BaseInputNumber extends React.Component {
  constructor(props) {
    super(props);
    const { value } = props.getInfo();
    this.state = {
      value: _.hasIn(props.getInfo(),"value") ?value: props.defaultValue,
      isActive: false
    };
    // 判断是否是德语
    this.SpezialLanguage = ['de-de'].includes(localStorage.getItem('language'));
  }

  // 校验
  checkText = (value, method) => {
    const { min, max, onlyOnBlur } = this.props;
    const realMin = Number(min);
    const realMax = Number(max);
    if (onlyOnBlur && method !== 'blur') {
      return;
    }
    if (method === 'blur') {
      if (value) value *= 1;
    }
    const { allowEmpty } = this.props;
    if (value !== undefined && value !== '') {
      const { type = 'naturalInteger' } = this.props;
      const formatter = numberFormatter[type];
      if (formatter.test(value)) {
        // 失焦后，存在当数据超出极大极小值不再触发onchange的情况
        if (!isNaN(realMin) || !isNaN(realMax)) {
          if (!isNaN(realMin)) {
            value = value < realMin ? realMin : value;
          }
          if (!isNaN(realMax)) {
            value = value > realMax ? realMax : value;
          }
          this.updateValue( value , method);
        } else {
          this.updateValue( value , method);
        }
      }
    } else if (allowEmpty) {
      this.updateValue({ value: null }, method);
    }
  }

  updateValue =(value, method) => {
    this.setState({ value }, () => {
      this.props.edit({value});
    });
  }

  doFocus = () => {
    if (this.comp) this.comp.focus();
  }

  // 通过语法，判断前缀宽度
  getPrefixTitleWidth=()=> {
    if (['en-us', 'de-de'].includes(localStorage.getItem('language'))) return 'auto';
    return '';
  }  

  render() {
    const {
      prefix,
      suffix,
      min = 0, // 默认最小值为 0
      max = Infinity,
      unit = '',
      disabled = false
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
    const customStyle = `
      .sup_componentNumber {
        display: flex;
        flex-direction:row;
        margin-bottom: 8px;
        align-items: center;
      }
      .sup_componentNumber .title {
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
      .sup_componentNumber .ant-input-number {
        height: 26px;
      }
      .sup_componentNumber .ant-input-number .ant-input-number-input {
        height: 26px;
      }
      .sup_componentNumber .suffixTitle {
        padding: 0 4px;
      }
    `
    return (
      <Fragment>
        <style>
          {customStyle}
        </style>
        <div className='sup_componentNumber'>
          {
            prefix ? (
              <span className='title' style={styleObj} title={prefix}>{prefix}</span>
            ) : null
          }
          <InputNumber
            style={{ width: styleObj.width ? `calc(100% - ${styleObj.width})` : '100%' }}
            ref={(el) => { this.comp = el; }}
            min={min}
            max={max}
            onChange={this.checkText}
            onBlur={(e) => { this.checkText(e.target.value, 'blur'); }}
            onFocus={this.doFocus}
            value={value}
            formatter={numberValue => `${numberValue}${unit}`}
            parser={numberValue => numberValue.replace(`${unit}`, '')}
            disabled={disabled}
          />
          {
            suffix ? (
              <span
                onClick={this.doFocus}
                className='suffixTitle'
                style={this.SpezialLanguage ? { maxWidth: '60px' } : {}}
                title={suffix}
              >
                {suffix}
              </span>
            ) : null
          }
        </div>
      </Fragment>
    );
  }
}

export default BaseInputNumber;
