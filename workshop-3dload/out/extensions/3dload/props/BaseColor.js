import React, { Fragment } from 'react';
import { Input, Icon, Button, Popover } from 'antd';
import ReColor from 'react-color';
import _ from 'lodash'

export default class BaseColor extends React.Component {
  constructor(props) {
    super(props);
    const { value } = props.getInfo();
    this.state = {
      value: _.hasIn(props.getInfo(),"value") ?value: props.defaultValue
    };
  }

  // 修改颜色
  updateSingleColor = (e, colorIndex) => {
    let { target: { value: changeValue } } = e;
    const { value = [] } = this.state;
    changeValue = changeValue.replace(/\s*/g,"")
    // const isHex = /(^[0-9A-Fa-f]{6}$)|(^[0-9A-Fa-f]{3}$)/i.test(changeValue);
    _.set(value[colorIndex], 'color', changeValue ? changeValue : "")
    this.setState({ value },()=> {
      this.props.edit({ value });
    })
  }

  // 在colorIndex下方添加一组颜色
  addSingleColorItme = (colorIndex) => {
    const { value = [] } = this.state;
    value.splice(colorIndex + 1, 0, { color: 'rgba(24,144,255,1)' })
    this.setState({ value },()=> {
      this.props.edit({ value });
    })
  }

  // 删除colorIndex对应颜色
  delteSingleColorItme = (colorIndex) => {
    const { value = [] } = this.state;
    value.splice(colorIndex, 1)
    this.setState({ value },()=> {
      this.props.edit({ value });
    })
  }

  //新增一组颜色
  addColorItme = () => {
    const { value = [] } = this.state;
    value.push({ color: 'rgba(24,144,255,1)' })
    this.setState({ value },()=> {
      this.props.edit({ value });
    })
  }

  // 颜色选择器
  colorPickerHtml = (value= [], colorIndex) => {
    return (
      <div className='colorPicker'>
        <ReColor.componentColor.SketchPicker
          color={_.get(value[colorIndex], 'color', '')}
          onChange={(e)=>this.colorChange(e, colorIndex)}
        />
      </div>
    )
  }

  // 颜色选择器颜色改变事件
  colorChange = (e, colorIndex) => {
    const { rgb } = e;
    const { value = [] } = this.state;
    _.set(value[colorIndex], 'color', `rgba(${rgb.r},${rgb.g},${rgb.b},${rgb.a})`)
    this.setState({ value },()=> {
      this.props.edit({ value });
    })
  }

  render() {
    const { prefix, isSingleColor } = this.props;
    const { value = [] } = this.state;
    const customStyle = `
      .sup_colorPopover .ant-popover-inner-content{
        padding: 0;
      }
      .sup_componentColor {
        display: flex;
        flex-direction:column;
        margin-bottom: 8px;
      }
      .sup_colorSingle {
        flex-direction:row;
        margin-bottom: 0;
      }
      .sup_componentColor .title {
        height: 26px;
        line-height: 26px;
        width: 100%;
        padding: 0 4px;
        color: #8d9ea7;
        display: inline-block;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .sup_colorSingle .title {
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
        width: auto;
      }
      .sup_colorSingle .colorContent {
        display: flex;
        width: 100%;
        flex-wrap: wrap;
      }
      .sup_componentColor .colorContent .colorList {
        display: flex;
        flex-direction:row;
        align-items: center;
        margin-bottom: 8px;
      }
      .sup_componentColor .colorContent .colorList .inputColor {
        flex: 1;
        height: 26px;
      }
      .sup_componentColor .colorContent .colorList .showColor {
        flex: 0 0 auto;
        display: inline-block;
        width: 26px;
        height: 26px;
        border: 1px solid #d9d9d9;
        margin-left: 8px;
      }
      .sup_componentColor .colorContent .colorList .addColor {
        flex: 0 0 auto;
        cursor: pointer;
        margin-left: 8px;
      }
      .sup_componentColor .colorContent .colorList .deleteColor {
        flex: 0 0 auto;
        cursor: pointer;
        margin-left: 8px;
      }
      .sup_componentColor .ant-btn {
        height: 26px;
      }
    `
    
    return (
      <Fragment>
        <style>
          {customStyle}
        </style>
        <div className={isSingleColor?'sup_componentColor sup_colorSingle':'sup_componentColor'}>
          {
            prefix ? (
              <span className='title' title={ prefix }>{ prefix }</span>
            ) : null
          }
          <div className='colorContent'>
            {
              _.map(value,(colorInfo, colorIndex)=>{
                // const color = colorInfo.color.split('#')[1] || ""
                return (
                  <div className='colorList' key={colorIndex}>
                    {!isSingleColor?<Input className='inputColor' defaultValue={colorInfo.color} value={colorInfo.color} onChange={(e) => this.updateSingleColor(e, colorIndex)}/>:null}
                    <Popover content={this.colorPickerHtml(value, colorIndex)} trigger="click" placement="topLeft" overlayClassName="sup_colorPopover">
                      <span className='showColor' style={{background: colorInfo.color || "white" }}/>
                    </Popover>
                    {!isSingleColor?<Icon className='addColor'  type="plus-circle" onClick={() => this.addSingleColorItme(colorIndex) }/>:null}
                    {!isSingleColor?<Icon className='deleteColor' type="minus-circle" onClick={() => this.delteSingleColorItme(colorIndex) }/>:null}
                  </div>
                )
              })
            }
          </div>
          {!isSingleColor?<Button type="dashed" shape="round" icon="plus" block onClick={this.addColorItme}>新增颜色</Button>:null}
        </div>
      </Fragment>
    );
  }
}
