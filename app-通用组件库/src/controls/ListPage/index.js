import React, { createContext, Fragment, memo, useEffect, useMemo, useRef, useState, useCallback, useLayoutEffect, useContext } from 'react';
import { message, Modal, Menu, Pagination, Layout, Input } from 'antd';
import highlight from '../assets/highlight.min';
import '../assets/highlight.css';

const { Header, Sider, Content } = Layout;

highlight.configure({
  ignoreUnescapedHTML: true
})

var css = document.createElement('style');
css.innerHTML = `
/*======共通======*/
body {
    background: #151922;
    padding: 0;
    margin: 0;
}

.my-container ul, li, ol, div, span {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
    list-style: none;
}
.my-container a:hover {
    text-underline: none;
}
/*按钮*/
.my-container .my-button,
.my-modal .my-button {
    cursor: pointer;
}
.my-container .my-button:hover,
.my-modal .my-button:hover {
    opacity: 0.8;
}
.my-container .button-normal {
    background: #273142;
    border: 1px solid #313D4F;
    border-radius: 4px;
    display: inline-block;
    color: #fff;
    text-align: center;
    font-size: 12px;
    line-height: 24px;
    height: 26px;
    width: 86px;
}
.my-container .button-side {
    background: #273142;
    border-radius: 38px;
    display: inline-block;
    color: #fff;
    text-align: left;
    font-size: 14px;
    line-height: 38px;
    height: 38px;
    width: 196px;
}
.my-container .button-3,
.my-modal .button-3 {
    background: linear-gradient(360deg, #1991EB 0%, #0F71E2 100%);
    border-radius: 4px;
    display: inline-block;
    color: #fff;
    text-align: center;
    font-size: 14px;
    line-height: 36px;
    height: 36px;
    width: 108px;
}
/*菜单选中效果*/
.my-container .ant-menu-item-selected {
    background: #3377FF !important;
}
.my-container .ant-menu-item-active {
    background-color:#273142 !important;
}
.my-container .btn-blue-border {
    background: #1F547C;
    border: 1px solid #1A91EB;
}
/*======页面样式======*/
.my-container {
    background: #131922;
    color: #fff;
    position: relative;
}
/*===左侧菜单===*/
.my-container .side-bar {
    background: #1B2431;
}
/*logo模块*/
.my-container .side-bar .logo-block {
    height: 60px;
    width: 100%;
    display: flex;
    align-items: center;
    margin:0 10px;
}
.my-container .side-bar .logo-block > span {
    display: inline-block;
}   

.my-container .side-bar .logo-block .menu-title {
    height: 60px;
    display: flex;
    align-items: center;
    margin-left: 10px;
  }
  .my-container .side-bar .logo-block  .logo {
    width: 72px;
    height: 24px;
  }
  .my-container .side-bar .logo-block .title-text {
    margin-left: 14px;
    font-size: 18px;
    font-weight: bold;
    color: #fff;
  }
.my-container .side-bar .logo-block .text {
    font-size: 14px;
    position: absolute;
    top: 20px;
    right: 38px;
}
.my-container .side-bar .collapseOpen {
    background: url(/resource/App_8bc9df86221bcc045d80c6ebf98d5667/listPageImg/images/open.svg) 50% 50% no-repeat;
    top: 20px;
    right: 12px;
    height: 100%;
    width: 100%;
}
.my-container .side-bar .collapseClose {
    background: url(/resource/App_8bc9df86221bcc045d80c6ebf98d5667/listPageImg/images/close.svg) 50% 50% no-repeat;
    top: 20px;
    right: 12px;
}
/*菜单模块*/
.my-container .side-bar .nav-block {
    background: transparent;
    text-align: center;
    padding: 0 5px;
}
.my-container .side-bar .nav-block li {
    position: relative;
    margin-bottom: 10px;
    width: 100%;
}
.my-container .side-bar .nav-block li .icon-point-right {
    background: url(/resource/App_8bc9df86221bcc045d80c6ebf98d5667/listPageImg/images/point-right.png) 50% 50% no-repeat;
    background-size: contain;
    display: inline-block;
    position: absolute;
    right: 14px;
    top: 50%;
    margin-top: -3px;
    height: 6px;
    width: 9px;
}
.my-container .side-bar .go-help {
    align-items: center;
    background: #1B2431;
    bottom: 0;
    display: flex;
    color: #39ABC3;
    font-size: 14px;
    text-align: center;
    padding: 10px 0 32px;
    position: fixed;
    justify-content: center;
    left: 0;
    width: 200px;
}
.my-container .side-bar .go-help .icon-help {
    background: url(/resource/App_264610095947b7fa572df452f1c87c11/listPageImg/images/icon-help.png) 50% 50% no-repeat;
    background-size: contain;
    display: inline-block;
    margin-right: 7px;
    height: 24px;
    width: 24px;
}
/*header*/
.my-container .header-block {
    background: #293243;
    justify-content: space-between;
    position: relative;
}
.my-container .header-block .title {
    position: relative;
    padding: 0 30px 0 40px;
    font-size: 14px;
}
.my-container .header-block .title:after {
    content: '';
    background: #21557D;
    display: inline-block;
    height: 18px;
    width: 6px;
    position: absolute;
    left: 30px;
    top: 50%;
    margin-top: -9px;
}
/*搜索框*/
.my-container .search-bar {
    background: #131922;
    border-radius: 2px;
    border: 1px solid #313D4F;
    display: flex;
    height: 44px;
    overflow: hidden;
    position: absolute;
    right: 28px;
    top: 9px;
    width: 240px;
}
.my-container .search-bar .search-input {
    border: 0;
    background: transparent;
    color: #fff;
    font-size: 16px;
    padding: 10px;
    height: 42px;
    line-height: 40px;
    width: 160px;
}
.my-container .search-bar .search-btn {
    align-items: center;
    background: #1F547C;
    border-radius: 0 2px 2px 0;
    border: 1px solid #1A91EB;
    color: #fff;
    display: flex;
    font-size: 16px;
    text-align: center;
    height: 42px;
    line-height: 40px;
    justify-content: center;
    width: 80px;
}
.my-container .search-bar .search-btn .icon-search {
    background: url(/resource/App_8bc9df86221bcc045d80c6ebf98d5667/listPageImg/images/icon-search.png) 50% 50% no-repeat;
    background-size: contain;
    display: inline-block;
    margin-right: 2px;
    height: 20px;
    width: 20px;
}
/*右侧主内容*/
.my-container .main {
    background: #000;
    padding: 20px 30px;
    height: 100%;
    overflow: hidden;
}
.my-container .main .my-list {
    overflow-x: hidden;
    width: 100%;
    height: calc(100vh - 210px);
}
.my-container .main .my-list ul {
    display: flex;
    flex-wrap: wrap;
    width: calc(100% + 14px);
}
.my-container .main .my-list li {
    border-radius: 10px;
    border: 1px solid #353c54;
    margin: 0 10px 20px 0;
    overflow: hidden;
    float: left;
    height: 282px;
    width: 400px;
}

.my-container .main .my-list .min-img {
    border-bottom: 1px solid #353c54;
    padding: 10px;
    text-align: center;
    overflow: hidden;
    height: 240px;
    width: 400px;
}

.my-container .main .my-list .min-img .img {
    cursor: pointer;
    height: 220px;
    width: unset;
    max-width: 380px;
}
.my-container .main .my-list .min-img .img:hover {
    opacity: 0.8;
}

.my-container .main .my-list .controls {
    display: flex;
    justify-content: space-between;
    height: 36px;
    padding: 5px;
}
.my-container .main .my-list .controls .c-name {
    padding: 5px 0 5px 10px;
    width: 110px;
}
.my-container .main .my-list .controls .c-btn {
    padding-top: 2px;
}
.my-container .main .my-list .controls .go-page {
    margin-left: 5px;
}
/*暂无数据*/
.my-container .main .no-data {
    text-align: center;
    font-size: 30px;
    color: #787878;
    line-height: 200px;
    height: 200px;
}
/*======分页======*/
.my-pagination {
    text-align: center;
    padding: 1px;
}
.my-pagination .ant-pagination {
    color: #7F8FA4;
    margin-top: 15px;
    margin-bottom: 46px;
}
.my-pagination .ant-pagination-prev,
.my-pagination .ant-pagination-next,
.my-pagination .ant-pagination-jump-prev,
.my-pagination .ant-pagination-jump-next,
.my-pagination .ant-pagination-item {
    line-height: 24px;
    height: 26px;
    min-width: 26px;
    width: 26px;
}
.my-pagination .ant-pagination-item,
.my-pagination .ant-pagination-prev a,
.my-pagination .ant-pagination-next a,
.my-pagination .ant-pagination-options-quick-jumper input {
    background: #273142;
    border-color: #313D4F;
    color: #7F8FA4;
    font-size: 12px;
}

.my-pagination .ant-pagination-item a {
    color: #7F8FA4;
}
.my-pagination .ant-pagination-item-active {
    border-color: #1A91EB;
    background: #1F547C;
    font-size: 14px;
}
.my-pagination .ant-pagination-item-active a {
    color: #fff !important;
}
.my-pagination .ant-pagination-options-quick-jumper input {
    border-radius: 2px;
    height: 26px;
    width: 63px;
}
/*======modal======*/
.my-modal .ant-modal-content {
    background: #273142;
}
/*预览弹窗*/
.modal-view .ant-modal-content {
    width: 1280px;
}
/*数据结构弹窗*/
.my-container .modal-data .ant-modal-content {
    width: 560px;
}
/*标题*/
.my-modal .ant-modal-content .ant-modal-header {
    background: transparent !important;
    border: 0 !important;
    height: 100px;
    position: relative;
}
.my-modal .ant-modal-content .ant-modal-title {
    align-items: center;
    border: 0 !important;
    color: #fff !important;
    display: flex;
    font-size: 20px !important;
    height: 100%;
    justify-content: center;
    max-width: 900px;
    margin: auto;
    overflow: hidden;
    text-align: center;
    word-break: break-all;
}
.my-modal .ant-modal-content .ant-modal-close-x {
    border: 1px solid #8492B4;
    border-radius: 30px;
    color: #8492B4;
    height: 44px !important;
    line-height: 44px !important;
    margin: 30px 20px 0;
    width: 44px !important;
}
/*iframe*/
.my-modal .ant-modal-content .ant-modal-body {
    padding: 0 !important;
    text-align: center;
}
.my-modal .ant-modal-content .show-charts {
    border: 1px solid #313D4F;
    height: 600px;
    margin: auto;
    width: 1240px;
}
.my-modal .ant-modal-content .modal-footer {
    padding: 24px 0 40px;
    text-align: center;
}
.my-modal .ant-modal-content .show-data {
    background: #000;
    border: 1px solid #313D4F;
    color: #fff;
    height: 300px;
    margin: auto;
    text-align: left;
    overflow: auto;
    width: 520px;
}
.my-modal .ant-modal-content .show-data-input {
    position: absolute;
    opacity: 0;
}

`;

document.getElementsByTagName('head')[0].appendChild(css);
const BASE_URL = window.location.origin;
const APP_ID = 'App_264610095947b7fa572df452f1c87c11';
const NAMESPACE = 'gongcheng';
const chartUrlPre = '/#/runtime-fullscreen/runtime-fullscreen/';//预览图表url前缀
const layoutUrlPre = '/#/layout/workflow/';//组态页url前缀
const helpUrl = "/main/?supmenuhash=1680238413130#/runtime-fullscreen/runtime-fullscreen/Page_927e71788d094b1494252edf9af98f70"
let fe = (namespace, token) => (method, url, options) => fetch(url, {
  ...{
    method,
    headers: {
      'X-Namespace': namespace,
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json',
      'Content-Type': 'application/json; charset=utf-8',
      'Accept-Language': 'zh-cn'
    }
  },
  ...options ? { body: JSON.stringify(options) } : {}
}
).then(res => res.json())

const CustomComp = (props) => {
  const [userInfo, setUserInfo] = useState(() => JSON.parse(localStorage.getItem('loginMsg')));
  const fc = useCallback(fe(NAMESPACE, userInfo.ticket), [userInfo.ticket]);
  const [sideList, setSideList] = useState([]);//sideBar数据
  const [allList, setAllList] = useState([]);//全部list列表
  const [pageList, setPageList] = useState([]);//显示分页列表(分页列表处理)
  const [pageListBak, setPageListBak] = useState([]);//显示分页列表备份
  const pageSize = 12;//每页条数
  const [currentIndex, setCurrentIndex] = useState(1);//当前页数
  const [pageTotal, setPageTotal] = useState(0);//当前分页数据总数
  const [sideItem, setSideItem] = useState('全部');//选中左侧菜单 item
  const [selectItem, setSelectItem] = useState('');//选中图表item
  const [chartUrl, setChartUrl] = useState(chartUrlPre + '');//预览图表url
  const [layoutUrl, setLayoutUrl] = useState(layoutUrlPre + '');//组态页url
  const [dataUrl, setDataUrl] = useState('');//数据结构url
  const [showModal, setShowModal] = useState(false);//显示预览效果modal
  const [showDataModal, setShowDataModal] = useState(false);//显示数据结构modal
  const codeBox = useRef(null);

  /**
   * sideBar选择分类
   * @param type
   * @param list
   */
  function useCheckItem(type, list) {
    if (type === 'all') {
      //全部
      usePageList(allList, 0, pageSize);
      setSideItem('全部');
    } else {
      let children = list.children || [];

      children = children.map(item => ({
        ...item,
        originName: _.get(item.name.match(/<(.+)>/), '[1]'),
      })).map(item => ({
        ...item,
        name: item.name.replace(/<.+>/, ''),
      }))


      usePageList(children, 0, pageSize);
      setSideItem(list.name);
    }
    //初始当前页数
    setCurrentIndex(1);
  }
  /**
   * 显示分页列表
   * @param list
   * @param start
   * @param End
   */
  function usePageList(list, start, End) {
    setPageList(list.slice(start, End));
    setPageListBak(list);
    useSetPageTotal(list);
  }
  /**
   * 设置当前分页数据总数
   * @param list
   */
  function useSetPageTotal(list) {
    setPageTotal(list.length ? list.length : 0);
  }
  /**
   * 搜索
   */
  function useSearchKey() {
    const myKey = document.getElementById('my-search-input').value;
    const newList = [];
    if (pageListBak && pageListBak.length > 0) {
      pageListBak.forEach((item) => {
        if (item.name.indexOf(myKey) >= 0) {
          newList.push(item);
        }
      })
    }
    setPageList(newList.slice(0, pageSize));
    useSetPageTotal(newList);
    //初始当前页数
    setCurrentIndex(1);
  }
  /**
   * 设置url
   * @param type 类别 1：预览效果；2：跳转组态;3：增加；4.删除；
   * @param item 选中图表item
   */
  function useSetUrl(type, item) {
    setSelectItem(item);
    setChartUrl('?=' + Math.random().toString(36).substring(2, 8) + chartUrlPre + item.id);
    // setLayoutUrl(layoutUrlPre + JSON.parse(item.layout).layoutNodes[0].id + '?appId=' + APP_ID + '&parentId=' + APP_ID + '&pageId=' + item.id);
    const dataUrl = '/resource/' + APP_ID + '/listPageImg/json/' + item.id + '.json';
    const layoutUrl = '/resource/' + APP_ID + '/extensions/' + item.originName + '/source/index.js'
    if (type === 1) {
      // 预览效果
      useOpenView();
    } else if (type === 2) {
      // 复制代码
      openSource(layoutUrl)
    } else {
      // 数据结构
      useOpenData(dataUrl);
    }
  }
  /**
   * 显示预览效果
   */
  function useOpenView() {
    setShowModal(true);
  }
  /**
   * 关闭预览效果
   */
  function useCloseView() {
    setShowModal(false);
  }
  /**
   * 显示数据结构
   */
  function useOpenData(dataUrl) {
    setShowDataModal(true);
    fetch(dataUrl).then(res => res.json()).then(json => {
      codeBox.current.innerHTML = JSON.stringify(json, null, 2);
      highlight.highlightElement(codeBox.current);
      document.getElementById('show-data-input').value = JSON.stringify(json, null, 2);
    })
  }
  function openSource(layoutUrl) {
    setShowDataModal(true);

    fetch(layoutUrl).then(res => res.text()).then(text => {
      codeBox.current.innerHTML = text.replace(/</g, "&lt;").replace(/>/g, '&gt;');
      highlight.highlightElement(codeBox.current, { language: "javascript" });
      document.getElementById('show-data-input').value = text;
    })
  }
  /**
   * 关闭数据结构
   */
  function useCloseData() {
    setShowDataModal(false);
  }
  /**
   * 跳转组态
   */
  function useGoPage() {
    window.open(layoutUrl);
  }
  /**
   * 复制
   */
  function useGoCopy() {
    const oInput = document.getElementById('show-data-input');
    oInput.select(); // 选择对象
    document.execCommand("Copy"); // 执行浏览器复制命令
    message.success('复制成功!');
  }
  /**
   * 改变页码
   */
  function useChangePage(page) {
    const beginIndex = (page - 1) * pageSize;
    usePageList(pageListBak, beginIndex, beginIndex + pageSize);
    setCurrentIndex(page);
  }
  useEffect(() => {
    // 组件列表
    const componentListUrl = `/api/compose/manage/folders?parentId=${APP_ID}`;

    Promise.all([
      fc("GET", componentListUrl),
    ]).then(res => {
      let getList = res[0].children
      let newList = [];//分类组件数据
      let componentList = [];//全部组件数据
      if (getList && getList.length > 0) {
        getList.forEach((item) => {
          item.children = item.children ? item.children : [];
          if (item.templateName === 'Folder') {
            //sideBar数据
            newList.push(item);
            //list列表数据
            componentList = componentList.concat(item.children);
          }
        });
      }

      componentList = componentList.map(item => ({
        ...item,
        originName: _.get(item.name.match(/<(.+)>/), '[1]'),
      })).map(item => ({
        ...item,
        name: item.name.replace(/<.+>/, ''),
      }))

      setSideList(newList);
      setAllList(componentList);
      usePageList(componentList, 0, pageSize);
    }).catch((err) => {
      console.error(err);
    });

  }, [
    setSideList,
    setAllList,
    setPageList
  ]);
  return (
    <Layout className={'my-container'}>
      {/*左侧菜单*/}
      <Sider className='side-bar'>
        <div className='logo-block'>
          <div className='title-text'>通用组件库</div>
        </div>

        <Menu className='nav-block' theme="dark" mode="inline" defaultSelectedKeys={['1']}>
          <Menu.Item key="1" className='my-button button-side' onClick={() => useCheckItem('all', null)}>
            <div>
              全部（{allList.length ? allList.length : 0}）
              <i className="icon-point-right"></i>
            </div>
          </Menu.Item>
          {sideList.map((item, index) =>
          (<Menu.Item key={item.id} className='my-button button-side' onClick={() => useCheckItem('normal', item)}>
            <div>
              {item.name}（{item.children ? item.children.length : 0}）
              <i className="icon-point-right"></i>
            </div>
          </Menu.Item>)
          )}
        </Menu>
        <div className='my-button go-help'
          onClick={() => window.open(helpUrl)}><i className='icon-help'></i>使用帮助</div>
      </Sider>
      <Layout className="site-layout">
        {/*header*/}
        <Header className="site-layout-background header-block" style={{ padding: 0 }}>
          <div>
            <div className='title'>组件库/{sideItem}</div>
            <div className='search-bar'>
              <input id='my-search-input' className='search-input' type='text' placeholder='请输入' />
              <div className='my-button search-btn' onClick={() => useSearchKey()}>
                <i className="icon-search"></i>
                搜索
              </div>
            </div>
          </div>
        </Header>
        {/*右侧主内容*/}
        <Content className="site-layout-background main">
          <div>
            <div className='my-list'>
              <ul>
                {pageList.map(item =>

                (<li>
                  <div className='min-img'>
                    <img
                      className='img'
                      draggable='false'
                      src={`/resource/${APP_ID}/listPageImg/chartsImg/${item.id}.png`}
                      onClick={() => useSetUrl(1, item)} />
                  </div>
                  <div className='controls'>
                    <div className='c-name'>{item.name}</div>
                    <div className='c-btn'>
                      <div className='my-button button-normal go-view'
                        onClick={() => useSetUrl(1, item)}>预览</div>
                      <div className='my-button button-normal btn-blue-border go-page'
                        onClick={() => useSetUrl(2, item)}>查看源码</div>
                      {
                        sideItem !== "特定样式" ? <div className='my-button button-normal btn-blue-border go-page'
                          onClick={() => useSetUrl(5, item)}>数据结构</div> : null
                      }
                    </div>
                  </div>
                </li>)
                )}
              </ul>
            </div>
            <div className='my-pagination' style={{ display: `${pageTotal ? 'block' : 'none'}` }}>
              <Pagination
                onChange={useChangePage}
                total={pageTotal}
                showQuickJumper
                defaultCurrent={1}
                defaultPageSize={pageSize}
                current={currentIndex}
              />
            </div>
            <div className='no-data' style={{ display: `${!pageTotal ? 'block' : 'none'}` }}>
              暂无数据
            </div>
          </div>
        </Content>
      </Layout>
      {/*弹出窗：预览效果*/}
      <Modal
        className="my-modal modal-view"
        title={selectItem.name}
        centered
        visible={showModal}
        onCancel={useCloseView}
        width={1280}
        footer={null}
      >
        <iframe className="show-charts" width="1024" height="600" frameBorder="0" scrolling="no" hspace="0" src={chartUrl}></iframe>
        <div className='modal-footer'>
          {/* <div className='my-button button-3' onClick={() => useGoPage()}>跳转组态</div> */}
        </div>
      </Modal>
      {/*弹出窗：数据结构*/}
      <Modal
        className="my-modal modal-data"
        title={selectItem.name}
        centered
        visible={showDataModal}
        onCancel={useCloseData}
        width={750}
        footer={null}
      >
        {/* <iframe className='show-data' id="show-data" width="1024" height="600" frameBorder="0" scrolling="no" hspace="0" src={dataUrl}></iframe> */}
        <div className='codeBox'>
          <pre class="hljs"><code id="codeBox" ref={codeBox} style={{ textAlign: 'left', maxHeight: '500px' }}></code></pre>
        </div>
        {/*复制隐藏表单*/}
        <textarea className="show-data-input" id="show-data-input" cols="30" rows="10"></textarea>
        <div className='modal-footer'>
          <div className='my-button button-3' onClick={() => useGoCopy()}>复制</div>
        </div>
      </Modal>
    </Layout>
  );
}

export default CustomComp;
