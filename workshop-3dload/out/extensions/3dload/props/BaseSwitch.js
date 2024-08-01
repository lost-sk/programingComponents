import React, { Fragment } from 'react';
import { Switch } from 'antd';
import _ from 'lodash'

export default class BaseSwitch extends React.Component {
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
  onChange = (checked) => {
    this.setState({ value:checked }, () => {
      this.props.edit({ value:checked });
    });
  }

  // 通过语法，判断前缀宽度
  getPrefixTitleWidth=()=> {
    if (['en-us', 'de-de'].includes(localStorage.getItem('language'))) return 'auto';
    return '';
  }  

  render() {
    const { prefix, checkedChildren, unCheckedChildren } = this.props;
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
      .sup_componentSwitch {
        display: flex;
        flex-direction:row;
        margin-bottom: 8px;
        align-items: center;
      }
      .sup_componentSwitch .title {
        height: 26px;
        line-height: 26px;
        min-width: 52px;
        flex: 0 0 auto;
        padding: 0 4px;
        color: #8d9ea7;
        text-align: center;
        display: inline-block;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .sup_componentSwitch .ant-switch {
        height: 18px;
      }
      .sup_componentSwitch .ant-switch:after {
        height: 14px;
      }
      .sup_componentSwitch .ant-switch-inner {
        height: 16px;
        line-height: 16px;
      }
    `
    return (
      <Fragment>
        <style>
          {customStyle}
        </style>
        <div className='sup_componentSwitch'>
          {
            prefix ? (
              <span className='title' style={styleObj} title={prefix}>{prefix}</span>
            ) : null
          }
          <Switch 
            checked={value} 
            onChange={this.onChange} 
            checkedChildren={checkedChildren} 
            unCheckedChildren={unCheckedChildren}
          />
        </div>
      </Fragment>
    );
  }
}
