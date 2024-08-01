import React, { memo } from "react";
import highlight from '../assets/highlight.min';
import '../assets/highlight.css';

/*页面：基本使用流程*/
const APP_ID = "App_264610095947b7fa572df452f1c87c11";
const IMG_PATH = "/resource/" + APP_ID + "/listPageImg/images";
const BaseFlowPath = (props) => {

  React.useEffect(() => {
    const text = `
import React from 'react';
// 引入扩展依赖
import scriptUtil from '../assets/externalsUtils';

// 加载其他外部依赖，可以链式调用处理依赖关系，资源会按顺序依次加载
scriptUtil.load("../assets/highcharts.js");

// 引入React依赖
scriptUtil.use('React', React);

const {
// 图表组件
SupChartReact,
// 用于绑定可编程组件执行环境的高阶函数
customComponentConnect
} = scriptUtil;`
    document.querySelector('#codeBox1').innerHTML = text.replace(/</g, "&lt;").replace(/>/g, '&gt;');
    highlight.highlightElement(document.querySelector('#codeBox1'), { language: "javascript" });
  }, [])
  return (
    <div style={{ height: "100%", overflowY: "scroll" }}>
      <div className="MyBaseFlowPath">
        <div className="my-title">图表库使用文档</div>

        <section className="section">
          <h2 className="section-title">说明</h2>
          <p>
            本图表库为平台图表的扩展，用于弥补平台内置图表在样式，种类，和交互方式上的空白，如果内置图表在以上方面可以满足需求，请使用内置图表实现。
          </p>
          <p>本图表库基于highcharts(v10.3.2),echarts(v4.6.0)等图表库封装，具体配置请参考官方文档</p>
          <p><a href="https://api.hcharts.cn/legacy/index.html" blank>highcharts</a> 旧版文档地址</p>
          <p><a href="https://api.hcharts.cn/highcharts/index.html" blank>highcharts</a> 新版文档地址</p>
          <h2 className="section-title">一. 示例</h2>
          <p>点击 <strong>查看源码</strong> 或 <strong>数据结构</strong> 复制内容并在自己的项目中使用。</p>
          <p>
            <img src='/resource/App_264610095947b7fa572df452f1c87c11/assets/001.png' />
          </p>
          <h2 className="section-title">二. 依赖资源</h2>
          <p>
            引入scriptUtil扩展文件 '../assets/externalsUtils', 注意使用相对路径，".." 表示静态资源的根目录，例如：'../image/a.png' 表示静态资源的根目录下image文件夹中的图片 a.png
          </p>
          <p className="warning">
            注意：使用相对路径引入资源必须使用单引号 <strong>'../assets/externalsUtils'</strong>， 不要写后缀名
          </p>

          <pre class="hljs"><code id="codeBox1" style={{ textAlign: 'left' }}></code></pre>

          <h2 className="section-title">三. 资源列表</h2>

          <p><a href="/resource/App_264610095947b7fa572df452f1c87c11/assets/externalsUtils.js" download>externalsUtils</a>&nbsp;&nbsp; scriptUril 扩展文件</p>
          <br></br>
          <p><a href="/resource/App_264610095947b7fa572df452f1c87c11/assets/highcharts.js" download>highcharts.js</a>&nbsp;&nbsp; highcharts 图表主文件</p>
          <p><a href="/resource/App_264610095947b7fa572df452f1c87c11/assets/highcharts-more.js" download>highcharts-more.js</a>&nbsp;&nbsp; highcharts 图表类型扩展文件</p>
          <p><a href="/resource/App_264610095947b7fa572df452f1c87c11/assets/wordcloud.js" download>wordcloud.js</a>&nbsp;&nbsp; highcharts 词云扩展文件</p>
          <p><a href="/resource/App_264610095947b7fa572df452f1c87c11/assets/funnel.js" download>funnel.js</a>&nbsp;&nbsp; highcharts 漏斗图扩展文件</p>
          <p><a href="/resource/App_264610095947b7fa572df452f1c87c11/assets/solid-gauge.js" download>solid-gauge.js</a>&nbsp;&nbsp; highcharts 速度仪扩展文件</p>
          <br></br>
          <p><a href="/resource/App_264610095947b7fa572df452f1c87c11/assets/echarts.min.js" download>echarts.min.js</a>&nbsp;&nbsp; echarts 主文件</p>
          <p><a href="/resource/App_264610095947b7fa572df452f1c87c11/assets/china.json" download>china.json</a>&nbsp;&nbsp; 中国地图json数据</p>
          <p><a href="/resource/App_264610095947b7fa572df452f1c87c11/assets/geo.json" download>geo</a>&nbsp;&nbsp; 中国地图geo数据</p>
        </section>
      </div>
    </div>
  );
};

export default memo(BaseFlowPath);

var css = document.createElement("style");
css.id = "BaseFlowPathStyle";
css.innerHTML = `
.MyBaseFlowPath {
    background: #151922;
    color: #fff;
    padding: 70px 0;
}
.MyBaseFlowPath .my-title {
    font-size: 40px;
    text-align: center;
    padding-bottom: 30px;
}
.section {
    color:#fff;
    margin: 0 20px;
}
.section-title {
    color:#fff
}
.section p {
  font-size:18px;
}
.section p img{
  width:420px;
}
.section p.warning {
  color: burlywood;
}
`;
document.getElementsByTagName("head")[0].appendChild(css);
