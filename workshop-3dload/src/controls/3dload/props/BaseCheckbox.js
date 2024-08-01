import React, { Fragment } from 'react';
import { Checkbox, Row, Col, Tooltip } from 'antd';

export default class BaseCheckbox extends React.Component {
  constructor(props) {
    super(props);
    const { value } = props.getInfo();
    this.state = {
      value: _.hasIn(props.getInfo(), "value") ? value : props.defaultValue
    };
    // 判断是否是德语
    this.SpezialLanguage = ['de-de'].includes(localStorage.getItem('language'));
  }

  // 值改变
  onChange = (e) => {
    const { options } = this.props;
    const type = this.typeProp.call(options);
    let value = null;
    switch (type) {
      case '[object Array]':
        value = e;
        break;
      case '[object Undefined]':
        value = e.target.checked;
        break;
      default:
        break;
    }
    this.setState({
      value
    }, () => {
      this.props.edit({value});
    });
  }

  typeProp = Object.prototype.toString

  mutliPermutation = (styleObj) => {
    let { options } = this.props;
    const { value: checkedArr } = this.state;
    options = options ? Array.prototype.slice.call(options) : [];
    return (
      <Checkbox.Group
        value={checkedArr}
        style={{ width: styleObj.width ? `calc(100% - ${styleObj.width})` : '100%' }}
        onChange={this.onChange}
      >
        <Row>
          {
            options.map(item => (
              <Col span={item.span || 24}>
                <Tooltip title={item.label} placement="topLeft">
                  <Checkbox value={item.value} disabled={item.disabled} title={item.label}>{item.label}</Checkbox>
                </Tooltip>
              </Col>
            ))
          }
        </Row>
      </Checkbox.Group>
    );
  }

  singlePermutation = () => {
    const { label } = this.props;
    const { value: checked, disabled } = this.state;
    return (
      <Fragment>
        {
          label ? (
            <Tooltip title={label} placement="topLeft">
              <Checkbox
                checked={checked}
                onChange={this.onChange}
                disabled={disabled}
                onClick={(e) => { e.stopPropagation(); }}
                title={label}
              >
                {label}
              </Checkbox>
            </Tooltip>
          ) : (
            <Checkbox
              checked={checked}
              onChange={this.onChange}
              disabled={disabled}
              onClick={(e) => { e.stopPropagation(); }}
            />
          )
        }
      </Fragment>
    );
  }

  renderCheckbox = (styleObj) => {
    const { options } = this.props;
    const type = this.typeProp.call(options);
    let box = null;
    switch (type) {
      case '[object Array]':
        box = this.mutliPermutation(styleObj);
        break;
      case '[object Undefined]':
        box = this.singlePermutation(styleObj);
        break;
      default:
        box = null;
    }
    return box;
  }

  // 通过语法，判断前缀宽度
  getPrefixTitleWidth=()=> {
    if (['en-us', 'de-de'].includes(localStorage.getItem('language'))) return 'auto';
    return '';
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
      .sup_componentCheckbox {
        display: flex;
        flex-direction:row;
        margin-bottom: 8px;
      }
      .sup_componentCheckbox .title {
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
      .sup_componentCheckbox .ant-checkbox-wrapper {
        align-items: center;
        display: flex;
      }
      .sup_componentCheckbox .ant-checkbox-wrapper>:nth-child(2) {
        display: inline-block;
        border-radius: 2px 0 0 2px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        width: calc( 100% - 16px );
        height: 26px;
        line-height: 26px;
      }
    `
    return (
      <Fragment>
        <style>
          {customStyle}
        </style>
        <div className='sup_componentCheckbox'>
          {
            prefix ? (
              <span className='title' style={styleObj} title={prefix}>{prefix}</span>
            ) : null
          }
          {this.renderCheckbox(styleObj)}
        </div>
      </Fragment>
    );
  }
}
