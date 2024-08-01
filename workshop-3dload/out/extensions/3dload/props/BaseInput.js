import React, { Fragment } from 'react';
import { Input } from 'antd';
import _ from 'lodash'

export default class BaseInput extends React.Component {
  constructor(props) {
    super(props);
    const { value } = props.getInfo();
    this.state = {
      value: _.hasIn(props.getInfo(),"value") ?value: props.defaultValue
    };
    // 判断是否是德语
    this.SpezialLanguage = ['de-de'].includes(localStorage.getItem('language'));
  }

  // 值改变
  onChange = ({ target: { value } }) => {
    this.setState({ value }, () => {
      this.props.edit({ value });
    });
  }

  // 通过语法，判断前缀宽度
  getPrefixTitleWidth=()=> {
    if (['en-us', 'de-de'].includes(localStorage.getItem('language'))) return 'auto';
    return '';
  }  

  render() {
    const { prefix, suffix, disabled, placeholder } = this.props;
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
      .sup_componentInput {
        display: flex;
        flex-direction:row;
        margin-bottom: 8px;
        align-items: center;
      }
      .sup_componentInput .title {
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
      .sup_componentInput .ant-input-affix-wrapper {
        height: 26px;
      }
      .sup_componentInput .ant-input-affix-wrapper .ant-input {
        height: 26px;
      }
      .sup_componentInput .suffixTitle {
        padding: 0 4px;
      }
    `
    return (
      <Fragment>
        <style>
          {customStyle}
        </style>
        <div className='sup_componentInput'>
          {
            prefix ? (
              <span className='title' style={styleObj} title={prefix}>{prefix}</span>
            ) : null
          }
          <Input
            style={{ width: styleObj.width ? `calc(100% - ${styleObj.width})` : '100%' }}
            value={value}
            disabled={disabled}
            suffix={suffix}
            placeholder={placeholder}
            onChange={this.onChange}
          />
        </div>
      </Fragment>
    );
  }
}
