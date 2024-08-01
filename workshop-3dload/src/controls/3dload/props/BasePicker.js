import React, { Fragment } from 'react';
import { DatePicker, TimePicker } from 'antd';
import moment from 'moment';
import _ from 'lodash'

export default class BasePicker extends React.Component {
  constructor(props) {
    super(props);
    const { value } = props.getInfo();
    this.state = {
      value: _.hasIn(props.getInfo(),"value") ? value: props.defaultValue
    };
    // 判断是否是德语
    this.SpezialLanguage = ['de-de'].includes(localStorage.getItem('language'));
  }


  // 通过语法，判断前缀宽度
  getPrefixTitleWidth=()=> {
    if (['en-us', 'de-de'].includes(localStorage.getItem('language'))) return 'auto';
    return '';
  }

  // 值改变
  onChange = (time) => {
    const { type = "dateTime", format } = this.props;
    let defaultFormat;
    if(type === "time"){
      defaultFormat = "HH:mm:ss";
    } else {
      defaultFormat = type === "date" ? "YYYY-MM-DD" : "YYYY-MM-DD HH:mm:ss";
    }
    console.log(time)
    const timeValue = time ? moment(time).format(format || defaultFormat) : time;
    this.setState({ value: timeValue },()=>{
      this.props.edit({ value: timeValue });
    });
  };

  renderPicker = (styleObj)=> {
    const { type = "dateTime", format } = this.props;
    let defaultFormat;
    if(type === "time"){
      defaultFormat = "HH:mm:ss";
    } else {
      defaultFormat = type === "date" ? "YYYY-MM-DD" : "YYYY-MM-DD HH:mm:ss";
    }
    const value = this.state.value ? moment(this.state.value, (format || defaultFormat)): this.state.value;
    switch (type) {
      case "time":
        return (
          <TimePicker 
            style={{ width: styleObj.width ? `calc(100% - ${styleObj.width})` : '100%' }}
            value={value} 
            onChange={this.onChange} 
            format={format || "HH:mm:ss"}
          />
        )
        break;
      case "date":
      case "dateTime":
      default:
        const defaultFormat = type === "date" ? "YYYY-MM-DD" : "YYYY-MM-DD HH:mm:ss"
        return (
          <DatePicker 
            style={{ width: styleObj.width ? `calc(100% - ${styleObj.width})` : '100%' }}
            showTime={type !== "date"}  
            value={value}
            format={format || defaultFormat}
            onChange={this.onChange}
          />
        )
        break;
    }
  }

  render() {
    const { prefix } = this.props;
    const prefixWidth = this.getPrefixTitleWidth() || _.get(this.props, 'width');
    const styleObj = {};
    if (prefixWidth && prefixWidth > 0) {
      styleObj.width = `${prefixWidth}px`;
    }
    if (this.SpezialLanguage) {
      styleObj.maxWidth = '90px';
    }
    
    const customStyle = `
      .sup_componentPicker {
        display: flex;
        flex-direction:row;
        margin-bottom: 8px;
      }
      .sup_componentPicker .title {
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
      .sup_componentPicker .ant-input {
        height: 26px;
      }
      .sup_componentPicker .ant-time-picker .ant-time-picker-input {
        height: 26px;
      }
    `
    return (
      <Fragment>
        <style>
          {customStyle}
        </style>
        <div className='sup_componentPicker'>
          {
            prefix ? (
              <span className='title' style={styleObj} title={prefix}>{prefix}</span>
            ) : null
          }
          {this.renderPicker(styleObj)}
        </div>
      </Fragment>
    );
  }
}
