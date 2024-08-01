import React, {memo, useEffect, useLayoutEffect, useRef, useState} from 'react';

const DigitalFlop = (props) => {
    console.log(props);
    const wrapRef = useRef(null);
    const {
        title,
        dataSelect,
        reloadTime,//定时刷新
    } = _.get(props.data.getAttrObject(),'data',{});

    const [numberList, setNumberList] = useState([]);// 数量拆分
    function useGetData() {
            scriptUtil.executeScriptService({
                objName:`${dataSelect.selectedTemplate.namespace}.${dataSelect.selectedTemplate.name}`,
                // 对象实例
                serviceName:`${dataSelect.selectedProp.namespace}.${dataSelect.selectedProp.name}`, // 服务
                version: 'V2',
                // 回调函数
                cb:function(res){

                    console.log('取得数据 -> res', res);

                    const result = res.list||res.data||[];

                    const arr = String(result[0].value).split('');

                    console.log('转换取得数据arr-->',arr);
                    
                    setNumberList(arr);

                }
                // 可自定义补充请求参数
            })
        }
        useEffect(() => {
            if(dataSelect){
                useGetData();
                if(reloadTime) {
                    const myVar = setInterval(() => {
                        if(!reloadTime) {
                            clearInterval(myVar);
                        }
                        useGetData();
                    }, reloadTime * 1000);
                }
            }
    }, [
        dataSelect,
        reloadTime,//定时刷新
        setNumberList
    ])

    useEffect(() => {
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

    useLayoutEffect(() => {
        let container = document.getElementById('box')
        if (container) {
            container.parentElement.style.height = "100vh"
            container.parentElement.style.maxHeight = "100vh"
            container.parentElement.style.position = "relative"
            container = container.parentElement
            while (container) {
                container.style.height = "100vh"
                container = container.parentElement
            }
        }
    }, [])


    return (
        <div className='digitalFlopWrapperBox'>
            <div className="d-content">
                <div className="box-infinity">
                    <div className="line-number">
                        <div className="number-slide">
                            {numberList.map(item =>
                                <span>
                                    <i style={{top: `calc(-${item}em * ${imgSize})`}} key={item.key}>
                                        <img src="/resource/App_8bc9df86221bcc045d80c6ebf98d5667/listPageImg/images/number.png" />
                                    </i>
                                </span>
                            )}
                        </div>
                    </div>
                    <div className="show-text">{title}</div>
                </div>
            </div>
        </div>
    )
}


export default memo(DigitalFlop);

var css = document.createElement('style');
css.id = 'myDigitalFlopStyle';

const times= 1; // TODO 调整尺寸系数
const numberHeight = 268*times+'px';
const imgSize = 0.4;/*调整数字尺寸*/
const padSize = 0.025+'em';/*调整翻牌两侧蓝色留白*/
css.innerHTML = `
.digitalFlopWrapperBox .line-number{
    padding: 120px 0 20px;
    width: 100%;
}
.digitalFlopWrapperBox .number-slide {
    font-size: ${numberHeight};
    color: #fff;
    display: flex;
    justify-content: center;
    overflow: hidden;
    width: 100%;
}
.digitalFlopWrapperBox .d-content{
    position: relative;
    min-width: 100%;
    width: 100%;
    height: 100%;
}
.digitalFlopWrapperBox .number-slide span {
    border-radius: 0.03em;
    border-top: 0.15em solid #2B96F5;
    border-bottom: 0.15em solid #2B96F5;
    box-sizing: content-box;
    background-color: #2B96F5;
    display: block;
    margin-left: 60px;
    height: ${imgSize}em;
    overflow: hidden;
    position: relative;
    padding: 0 ${padSize};
}
.digitalFlopWrapperBox .number-slide i {
    font-style: normal;
    position: relative;
    display: block;
    transition: all 1.2s ease 0s;
    width: ${imgSize}em;
    height: ${imgSize}em;
    margin: auto;
}
.digitalFlopWrapperBox .number-slide>span:first-child {
    margin-left: 0;
}
.digitalFlopWrapperBox .number-slide img{
    width: ${imgSize}em;
}
.digitalFlopWrapperBox .show-text {
    color: #fff;
    font-size: 32px;
    text-align: center;
}

`;

document.getElementsByTagName('head')[0].appendChild(css);
