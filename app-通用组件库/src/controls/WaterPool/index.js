import React from 'react';
import scriptUtil from '../assets/externalsUtils';

scriptUtil.use('React', React);

const {
  customComponentConnect
} = scriptUtil;

console.log(customComponentConnect)

/*---------------------------------------------------------------------*/
const objName = `tyzuksupos_tyzuksupos.GeneralCompnents`; // 对象实例命名空间.模板别名
const serviceName = `tyzuksupos_tyzuksupos.WaterPool`; // 服务命名空间.服务别名
/*---------------------------------------------------------------------*/


const WaterPool = () => {
  const wrapRef = React.useRef(null);
  const [[{ value }], setOps] = React.useState([{ value: 0 }]);//水位定位，与水位值相反(例如：水位值是69，图片水位定位是100-69=31)

  React.useEffect(() => {
    scriptUtil.servicePromise({
      objName,
      serviceName
    }).then(res => setOps(res.list || res.data || []))
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
    <div className='waterPoolWrapperBox'>
      <div className='charts-box'>
        <div className='waves' style={{ top: `${value}%`, display: `${value === 100 ? 'none' : 'block'}` }}>
          <div className='wave wave1'></div>
          <div className='wave wave2'></div>
        </div>
        <div className='show-num'>
          50%
        </div>
      </div>
      <div className='show-text'>液位图</div>
    </div>
  )
}

export default customComponentConnect(WaterPool);

var css = document.createElement('style');
css.id = 'waterPoolCompStyle';
css.innerHTML = `
.waterPoolWrapperBox {
    height: 100%;
    width: 100%;
}
.waterPoolWrapperBox .charts-box {
    border-radius: 50%;
    border: 0.5em solid #69EC63;
    position:relative;
    overflow:hidden;
    margin: auto;
    height: 200px;
    width: 200px;
}
.waterPoolWrapperBox .waves{
    position: absolute;
    display:none;
    top: 100%;
    left: 50%;
    transform: translateX(250px);
}
.waterPoolWrapperBox .wave {
    width: 500px;
    height: 500px;
    background-color: rgba(86, 197, 119, 0.6);
    border-radius: 45%;
    position: absolute;
    left: 50%;
    margin-left: -500px;
    animation-iteration-count: infinite;
    animation-timing-function: linear;
}
.waterPoolWrapperBox .wave1{
    animation-name: myWaterRotate1;
    animation-duration: 10s;
    background-color: rgba(86, 197, 119, 0.9);
    top: 0;
}
.waterPoolWrapperBox .wave2{
    animation-name: myWaterRotate2;
    animation-duration: 12s;
    top: -2px;
}
.waterPoolWrapperBox .show-num{
    position: absolute;
    color: #fff;
    font-size: 3em;
    left: 50%;
    top: 53%;
    transform: translate(-50%, -50%);
}
.waterPoolWrapperBox .show-text{
    color: #fff;
    font-size: 2em;
    text-align: center;
}

@keyframes myWaterRotate1 {
    0% {
        transform: rotateZ(0deg);
    }
    100% {
        transform:rotateZ(360deg);
    }
}
@keyframes myWaterRotate2 {
    0% {
        transform: rotateZ(15deg);
    }
    100% {
        transform:rotateZ(375deg);
    }
}

`;

document.getElementsByTagName('head')[0].appendChild(css);
