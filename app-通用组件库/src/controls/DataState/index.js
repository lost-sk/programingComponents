import React from 'react';
import scriptUtil from '../assets/externalsUtils';

scriptUtil.use('React', React);
const {
  customComponentConnect
} = scriptUtil;

/*---------------------------------------------------------------------*/
const objName = `tyzuksupos_tyzuksupos.GeneralCompnents`; // 对象实例命名空间.模板别名
const serviceName = `tyzuksupos_tyzuksupos.DataState`; // 服务命名空间.服务别名
/*---------------------------------------------------------------------*/

const DataState = (props) => {
  const wrapRef = React.useRef(null);

  const [ops, setOps] = React.useState([{ "value": 0, "name": "", "state": "" }]);

  React.useEffect(() => {
    scriptUtil.servicePromise({
      objName,
      serviceName
    }).then(res => {
      const result = res.list || res.data || []
      setOps(result);
    })
  }, [setOps])

  React.useEffect(() => {
    if (wrapRef && wrapRef.current) {
      ["touchstart", "touchmove", "touchend"].forEach((event) => {
        wrapRef.current.addEventListener(event, (e) => {
          e.stopPropagation();
        });
      })
    }
  }, [
    wrapRef
  ])

  return (
    <div className='dataStateWrapperBox'>
      <div className='charts-box'>
        <table>
          {ops.map((item, index) => (
            <tr>
              <td className='row1'>{item.name}</td>
              {/*三种状态:error normal warn*/}
              <td className='row2'>
                <div className={`type t-${item.state}`}></div>
              </td>
              <td className='row3'>{item.value}</td>
            </tr>
          ))}
        </table>
      </div>
    </div>
  )
}

export default customComponentConnect(DataState);

var css = document.createElement('style');
css.id = 'myDataStateStyle';
css.innerHTML = `
.dataStateWrapperBox {
    height: 100%;
    width: 100%;
}
.dataStateWrapperBox .charts-box {
    color: #fff;
    position:relative;
    overflow:hidden;
    margin: auto;
    height: 100%;
    width: 100%;
}
.dataStateWrapperBox .title{
    color: #B7C5DF;
    height:38px;
    text-align: center;
    font-size: 1.6em;
}
.dataStateWrapperBox table {
    border-left: 1px solid rgba(214, 225, 244, .1);
    border-right: 1px solid rgba(214, 225, 244, .1);
    margin: auto;
    width: 100%;
}
.dataStateWrapperBox table td {
    padding-top: 10px;
    padding-bottom: 10px;
}
.dataStateWrapperBox table tr:nth-child(odd) td{
    background: #11171E;
}
.dataStateWrapperBox table .row1 {
    font-size: 1.6em;
    text-align: right;
    padding-right: 2em;
    width: 46%;
}
.dataStateWrapperBox table .row2 {
    border-left: 1px solid rgba(214, 225, 244, .1);
    border-right: 1px solid rgba(214, 225, 244, .1);
    text-align: center;
}
.dataStateWrapperBox table .type {
    background: transparent;
    border-radius: 50%;
    display: inline-block;
    height: 2.1em;
    width: 2.1em;
}
.dataStateWrapperBox table .t-normal {
    background: linear-gradient(360deg, #11BB15 0%, #1EC98E 100%);
}
.dataStateWrapperBox table .t-error {
    background: linear-gradient(180deg, #FA6B6C 0%, #E63031 100%);
}
.dataStateWrapperBox table .t-warn {
    background: linear-gradient(180deg, #FAE52B 0%, #FFC118 100%);
}
.dataStateWrapperBox table .row3 {
    color: #1BFFE1;
    font-size: 2em;
    font-weight: bold;
    padding-left: 36px;
    text-align: left;
    width: 36%;
}`;

document.getElementsByTagName('head')[0].appendChild(css);
