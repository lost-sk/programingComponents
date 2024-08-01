import React, {memo} from 'react';
/*页面：基本使用流程*/
const APP_ID = 'App_264610095947b7fa572df452f1c87c11';
const IMG_PATH = '/resource/' + APP_ID + '/listPageImg/images';
const BaseFlowPath = (props) => {
    return (
        <div className='MyBaseFlowPath'>
            <div className='my-title'>基本使用流程</div>
            <div className='col'>
                <div className='title'>1、图表样式库</div>
                <div className='img'>
                    <img src={`${IMG_PATH}/baseFlowPath1.png`} alt="图表样式库"/>
                </div>
                <div className='text'>
                    100+图表样式库列表
                </div>
            </div>
            {/*向下箭头*/}
            <div className='point'><img src={`${IMG_PATH}/point-down1.png`}/></div>
            <div className='col'>
                <div className='title'>2、跳转组态</div>
                <div className='img-block'>
                    <div className='img' style={{width:'90%'}}>
                        <img src={`${IMG_PATH}/baseFlowPath5.png`} alt="单个样式的组态页"/>
                    </div>
                </div>
                <div className='text'>
                    点击按钮跳转到组态页面
                </div>
            </div>
            {/*向下箭头*/}
            <div className='point'><img src={`${IMG_PATH}/point-down1.png`}/></div>
            <div className='col'>
                <div className='title'>3、（样式库）组态页</div>
                <div className='img-block'>
                    <div className='img'>
                        <img src={`${IMG_PATH}/baseFlowPath2_1.png`} alt="单个样式的组态页"/>
                    </div>
                    <div className='img'>
                        <img src={`${IMG_PATH}/baseFlowPath2_2.png`} alt="选择组件右键转存为模板"/>
                    </div>
                </div>
                <div className='text'>
                    跳转至单个样式的组态页，选择组件右键转存为模板，存至扩展库
                </div>
            </div>
            {/*向下箭头*/}
            <div className='point'><img src={`${IMG_PATH}/point-down1.png`}/></div>
            <div className='col'>
                <div className='title'>4、（项目）组态页</div>
                <div className='img'>
                    <img src={`${IMG_PATH}/baseFlowPath3.png`} alt="（项目）组态页"/>
                </div>
                <div className='text'>
                    由扩展库拖拽组件至当前项目页面使用
                </div>
            </div>
        </div>
    );
}

export default memo(BaseFlowPath);

var css = document.createElement('style');
css.id = 'BaseFlowPathStyle';
css.innerHTML = `
.MyBaseFlowPath {
    background: #151922;
    color: #fff;
    font-size: 20px;
    padding: 70px 0;
}
.MyBaseFlowPath .my-title {
    font-size: 40px;
    text-align: center;
    padding-bottom: 30px;
}
.MyBaseFlowPath .col {
    background: #19212c;
    border-radius: 10px;
    text-align: center;
    margin: 0 auto;
    width: 90%;
}
.MyBaseFlowPath .title {
    font-size: 30px;
    padding: 20px 0;
}
.MyBaseFlowPath .col .img img {
    height: auto;
    width: 90%;
}
.MyBaseFlowPath .col .img-block {
    display: flex;
    justify-content: space-evenly;
}
.MyBaseFlowPath .col .img-block .img {
    width: 45%;
}
.MyBaseFlowPath .col .text {
    padding: 30px 0;
}
.MyBaseFlowPath .point {
    text-align: center;
    padding: 20px 0;
}
.MyBaseFlowPath .point img {
    height: auto;
    min-width: 20px;
    width: 4%;
}

`;
document.getElementsByTagName('head')[0].appendChild(css);
