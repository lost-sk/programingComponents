import React, { Component, Fragment } from 'react';
import { Calendar, Row, Col, Button, Icon, Form, Input, DatePicker, TimePicker, Select, message, Modal, notification, Spin } from 'antd';
import moment from 'moment';

const { RangePicker } = DatePicker;
const { Option } = Select;
const { TextArea } = Input;
const { confirm } = Modal;
const dateFormat = 'YYYY-MM-DD';
const timeFormat = 'YYYY-MM-DD HH:mm';
const hoursFormat = 'HH:mm';
const options = [
  {
    key: 0,
    value: 'null',
    content: '无提醒'
  },
  {
    key: 1,
    value: '0',
    content: '开始时提醒'
  },
  {
    key: 2,
    value: '5',
    content: '5分钟前提醒'
  },
  {
    key: 3,
    value: '15',
    content: '15分钟前提醒'
  },
  {
    key: 4,
    value: '30',
    content: '30分钟前提醒'
  },
  {
    key: 5,
    value: '60',
    content: '1小时前提醒'
  },
  {
    key: 5,
    value: '1440',
    content: '1天前提醒'
  },
]

var css = document.createElement('style');
css.innerHTML = `
    /*
    #htDiv-km1eji1w0-97{
      transform: none !important;
      left: 0 !important;
      top: 0 !important;
    }
    */
    
    #calendarBox .ant-fullcalendar{
        border-top: none;
    }
    #calendarBox .ant-fullcalendar-header {
        padding: 4px 0 0 10px;
        margin-top: -40px;
        text-align: left;
    }

    #calendarBox .ant-fullcalendar-header .ant-fullcalendar-year-select .ant-select-selection--single{
      background: rgba(0,0,0,.1);
      color: #FFF;
      border-color: rgba(255,255,255,.3);
      height: 30px;
      width: 100px;

    }

    #calendarBox .ant-fullcalendar-header .ant-fullcalendar-month-select .ant-select-selection--single{
      background: rgba(0,0,0,.1);
      color: #FFF;
      border-color: rgba(255,255,255,.3);
      height: 30px;
      width: 70px;
    }

    #calendarBox .ant-fullcalendar-header .ant-select-selection--single .ant-select-arrow{
      color: rgba(255,255,255,0.3);
    }

    #calendarBox .ant-fullcalendar-header .ant-select-selection--single .ant-select-selection__rendered{
      line-height: 27px;
    }

    #calendarBox .ant-fullcalendar-header .ant-select-dropdown-menu{
      max-height: 200px;
    }


    #calendarBox .ant-fullcalendar-calendar-body{
      height: 200px;
      overflow: hidden;
      padding-right: 0;
    }

    #calendarBox .ant-fullcalendar-calendar-body .ant-fullcalendar-table{
      height: 227px;
    }

    #calendarBox .ant-fullcalendar-calendar-body .ant-fullcalendar-table .ant-fullcalendar-cell{
      cursor: pointer;
    }

    #calendarBox .ant-fullcalendar-header .ant-radio-group {
      display: none
    }
    #calendarBox .ant-fullcalendar-cell .ant-fullcalendar-value{
        color: #fff;
        background: transparent;
        box-shadow: none;
        cursor: pointer;
    }

    #calendarBox .ant-fullcalendar-cell .ant-fullcalendar-value:hover{
      background: #1890ff;
    }

    #calendarBox .ant-fullcalendar-cell .ant-fullcalendar-content{
      display: flex;
      justify-content: center;
    }
    
    #calendarBox .ant-fullcalendar-cell .ant-fullcalendar-content .tipsPointer{
      position: absolute;
      top: 11px;
      width: 5px;
      height: 5px;
      border-radius: 50%;
    }

    #calendarBox .ant-fullcalendar-next-month-btn-day .ant-fullcalendar-value {
        color: #748AA1;
    }

    #calendarBox .ant-fullcalendar-last-month-cell .ant-fullcalendar-value {
        color: #748AA1
    }
    
    #calendarBox .ant-fullcalendar-cell .ant-fullcalendar-date .ant-fullcalendar-value:hover{
        background: transparent !important;
    }
    
    #calendarBox .ant-fullcalendar-column-header{
        color: #B8C5D3;
        font-size: 12px;
    }
    #calendarBox{
        width: 100%;
        height: 100%;
        
          /*width: 486px;
          height: 274px;*/
        
    }
    #calendarBox .header{
        width: 100%;
        /*background: #252C3E;*/
        // background: rgba(37,44,62,.85);
        font-size: 16px;
        color: #FFFFFF;
        text-align: center;
        height: 42px;
        line-height: 42px;
        border-radius: 10px 10px 0 0;
        border-bottom: 1px solid rgba(255,255,255,0.1);
        position: relative;
        z-index: -1;
    }
    #calendarBox .content{
        width: 100%;
        height: calc(100% - 42px);
        /*background: #2A2F32;*/
        // background: rgba(42,47,50,0.85);
        z-index: 0;
        border-radius: 0 0 10px 10px;
    }
    #calendarBox .content .content_matter{
        height: 34px;
        line-height: 34px;
        font-size: 16px;
        color: #818181;
        margin-bottom: 25px;
        text-align: right;
        margin-top: -40px;
    }

    #calendarBox .content .content_matter .plusBtn{
      display: inline-block;
      border-radius: 4px;
      width: 80px;
      height: 30px;
      background: rgb(83, 143, 255);
      line-height: 30px;
      margin-top: 3px;
      margin-right: 3px;
      text-align: center;
      color: #FFF;
      cursor: pointer;
      font-size: 14px;
    }

    #calendarBox .content .content_matter .anticon-plus{
      width: auto;
      height: auto;
      background-image: none;
      vertical-align: 0;
    }

    #calendarBox .content .content_matter .anticon-plus svg{
      display: inline-block;
    }
    #calendarBox .content .content_list{
        padding: 0 4px 4px;
        height: calc(100% - 59px);
        overflow: auto;
    }
    #calendarBox .content .content_list .content_list_item{
        height: 25%;
        cursor: pointer;
        padding-left: 10px;
    }
    #calendarBox .content .content_list .content_list_item:hover{
        background: #343C49;
        border-radius: 4px;
        cursor: pointer;
    }
    #calendarBox .content .content_list .content_list_title{
        color: #FFF;
        font-size: 12px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        padding-top: 4px;
    }
    #calendarBox .content .content_list .content_list_time{
        color: #999999;
        font-size: 12px;
        display: flex;
        justify-content: space-between;
    }

    .addEventContainer .ant-modal-header{
      background: #DDEDF9 !important;
    }

    .addEventContainer .ant-modal-header .ant-modal-title{
      font-size: 17px;
    }

    .addEventContainer .ant-modal-footer{
      background-color: #F1F1F1;
    }

    .addEventContainer .ant-modal-footer .addEventBox_foot{
        background-color: #FFF;
        width: 83px;
        font-size: 16px;
        color: #247AC3;
        margin-left: 8px;
        cursor: pointer;
    }

    .addEventContainer .ant-modal-body{
      padding: 0 !important;
      max-height: 128px;
      overflow: auto;
    }

    .addEventContainer .ant-modal-body .emptyData{
      padding: 10px 16px;
      font-size: 16px;
    }

    .addEventContainer .ant-modal-body .addEventBox{
      border-left: 6px solid #CF2B36;
      margin: 4px 0;
      height: 58px;
      cursor: pointer;
      display: flex;
      align-items: center;
    }

    .addEventContainer .ant-modal-body .listItem_time{
        justify-content: center;
        display: flex;
        flex-direction: column;
        padding: 0 18px;
        color: #CF2B36;
    }

    .addEventContainer .ant-modal-body .listItem_title{
      line-height: 58px;
      font-size: 19px;
      color: #000;
      padding: 0 26px 0 14px;
  }

    .eventEditModal .ant-modal-body{
      padding: 0 !important;
      width: auto !important;
      height: 550px !important;
      overflow: auto;
    }

    .eventEditModal .ant-form-explain{
      display: none;
    }

    .eventEditModal .ant-modal-content{
      width: 488px;
      height: 660px;
      padding: 0 16px;
    }

    .eventEditModal .ant-modal-content .ant-modal-header{
      background: #FFF;
      padding: 14px 6px 13px;
    }

    .eventEditModal .ant-modal-content .ant-modal-footer{
      background: #FFF;
    }

    .eventEditModal .ant-modal-content .ant-modal-footer button{
      width: 123px;
      height: 32px;
      border-radius: 16px;
    }


    #eventEditBox .eventEditBox_head{
        padding: 0 10px;
        background-color: #F3F3F3;
        line-height: 32px;
        font-size: 12px;
    }
    #eventEditBox .eventEditBox_head .anticon-delete{
        width: auto;
        height: auto;
        background-image: none;
        vertical-align: -0.125em;
    }

    #eventEditBox .eventEditBox_head .anticon-delete svg{
        display: inline-block;
    }

    #eventEditBox .ant-calendar-picker-icon,.ant-time-picker-icon .ant-time-picker-clock-icon{
      display: none;
    }

    #eventEditBox .ant-form-explain{
        position: absolute;
        bottom: -18px;
    }
    #eventEditBox .formList{
        padding-top: 22px; 
    }

    .notificationBox .ant-notification-notice-message{
      margin-bottom: 2px;
    }
    .notificationBox .ant-notification-notice-close{
      display: none;
    }
    .notificationBox .ant-notification-notice-btn{
      width: 100%;
    }
    .notificationBox .ant-notification-notice-btn .notificationBox_foot{
      display: flex;
      width: 100%;
      justify-content: space-around;
    }
    .notificationBox .ant-notification-notice-btn .notificationBox_foot .ant-btn{
      width: 123px;
      border-radius: 16px;
    }

    /*新弹框*/

    /*
    #eventEditBox{
      height: 550px !important;
      overflow: auto;
    }

    .eventEditModal{
      padding: 0 16px;
      position: fixed;
      left: 0;
      top: 0;
      bottom: 0;
      background: #FFF;
      right: 0;
      margin: auto;
      width: 480px;
      height: 660px;
      box-shadow: 0px 0px 15px 0px rgba(0, 0, 0, 0.2);
      border-radius: 10px;
      z-index: 200;
    }

    .eventEditModal header{
      background: #FFF;
      padding: 14px 6px 13px;
      font-size: 16px;
      color: rgba(0, 0, 0, 0.85);
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid #e8e8e8;
    }

    .eventEditModal footer{
      background: #FFF;
      text-align: center;
      padding: 12px 0;
    }

    .eventEditModal footer button{
      width: 123px;
      height: 32px;
      border-radius: 16px;
    }
    */


`;
document.getElementsByTagName('head')[0].appendChild(css);

class CustomComp extends Component {
  constructor(props) {
    super(props);
    this.formRef = React.createRef();
    this.timer = null;
    this.state = {
      dataSource: [],
      addEventVisible: false,
      selectEvents: [],
      noticeEvents: [],
      formData: [],
      /**
       * addOrEdit 0为新增 1为编辑
       */
      addOrEdit: -1,
      selectedDate: moment().format(dateFormat),
      selectMonth: moment().format('YYYY-MM'),
      loading: false,
      spinning: false,
    }
  }

  onSelect = (moment) => {
    const date = moment.format(dateFormat);
    this.setState({
      selectedDate: date,
      spinning: true,
      selectEvents: []
    }, () => {
      this.getSelectDateData();
    })
    //判断如果跨月的话，就重新调用数据更新dataSource
    if (this.state.selectMonth != moment.format('YYYY-MM')) {
      this.setState({
        selectMonth: moment.format('YYYY-MM')
      }, () => {
        this.getRecentMonthData();
      })
    }
  }

  closeAddEventVisible = (e) => {
    e.stopPropagation();
    this.setState({
      addEventVisible: false,
      formData: []
    })
  }

  //新增弹框
  addCurrentEvent = (e) => {
    e.stopPropagation();
    //打开弹框，清空form，记录title为新增
    this.setState({
      addEventVisible: true,
      addOrEdit: 0,
      formData: []
    })
  }

  //修改弹框
  editCurrentEvent = (e, id) => {
    e.stopPropagation();
    const [data] = this.state.dataSource.filter(item => item.c_id === id);
    this.setState({
      addEventVisible: true,
      formData: data,
      addOrEdit: 1
    })
  }

  //新增确认
  addSchedule = (data, e) => {
    scriptUtil.addDataTable(
      {
        dataSource: 'admin_zhuomian.calendar',
        properties: [{ ...data }],
        version: 'V2'
      },
      (res) => {
        if (res.code == 200) {
          message.success('添加成功！');
          this.setState({
            loading: false,
            spinning: true,
            selectEvents: [],
          })
          this.formRef.current.resetFields();
          this.closeAddEventVisible(e);
          this.getRecentMonthData();
          this.getSelectDateData();
        }
      }
    )
  }

  modifySchedule = (data, id, e) => {
    scriptUtil.updateDataTable('App_4601e24ddea6267cbdffc391b03c1fcd',
      {
        dataSource: 'admin_zhuomian.calendar',
        properties: [{ ...data }],
        keys: {
          c_id: id
        },
        version: 'V2'
      },
      (res) => {
        if (res.code == 200) {
          message.success('修改成功！');
          this.setState({
            loading: false,
            spinning: true,
            selectEvents: [],
          })
          this.formRef.current.resetFields();
          this.closeAddEventVisible(e);
          this.getRecentMonthData();
          this.getSelectDateData();
        }
      }
    )
  }

  delSchedule = (e) => {
    e.stopPropagation();
    const { formData: { c_id } } = this.state;
    confirm({
      title: '提示',
      content: '是否删除日程',
      okText: '确定',
      okType: 'danger',
      cancelText: '取消',
      onOk: () => {
        this.setState({
          loading: true,
        })
        scriptUtil.delDataTable('App_4601e24ddea6267cbdffc391b03c1fcd',
          {
            dataSource: 'admin_zhuomian.calendar',
            properties: [{
              c_id
            }],
            version: 'V2'
          },
          (res) => {
            if (res.code == 200) {
              message.success('删除成功！');
              this.setState({
                loading: false,
                spinning: true,
                selectEvents: [],
              })
              this.closeAddEventVisible(e);
              notification.close(c_id);
              this.getRecentMonthData();
              this.getSelectDateData();
            }
          }
        )
      },
      onCancel () {

      },
    });
  }

  dateCellRender = (mome) => {
    /**
     * selectedDate 默认选中的是今天
     */
    const { dataSource, selectedDate } = this.state;
    const allMonthDate = mome.format(dateFormat);
    const current = moment().format(dateFormat);
    const schedules = dataSource.filter(item => item.c_StartTime.slice(0, 10) === allMonthDate);
    let pointColor;
    if (schedules.length > 0 && allMonthDate == current) {
      pointColor = '#FFF'
    } else if (schedules.length > 0 && allMonthDate != current) {
      pointColor = '#748AA1';
    } else {
      pointColor = 'transparent'
    }
    return (
      <Fragment>
        <div style={{
          position: 'relative',
          top: -12,
          width: 30,
          zIndex: -1,
          height: 30,
          backgroundColor: allMonthDate == current ? '#538FFF' : '#343C49',
          borderRadius: '4px',
          border: allMonthDate == selectedDate ? '1px solid #538FFF' : 'none'
        }}></div>
        <div className='tipsPointer' style={{
          background: pointColor,
        }}></div>
      </Fragment>
    );
  }

  handleOk = (e) => {
    e.stopPropagation();
    const { addOrEdit, formData } = this.state;
    const { validateFields, resetFields } = this.formRef.current;
    validateFields((err, values) => {
      if (!err) {
        const { startDate, startTime, endDate, endTime, c_Matter, c_place, c_ReminderTime, c_Theme } = values;
        const c_StartTime = startDate.format(dateFormat) + ' ' + startTime.format(hoursFormat);
        const c_EndTime = endDate.format(dateFormat) + ' ' + endTime.format(hoursFormat);
        if (moment(c_StartTime).isAfter(c_EndTime)) {
          message.warning('开始时间不能晚于结束时间');
          return;
        }
        const editData = {
          c_StartTime,
          c_EndTime,
          c_Theme,
          c_Matter,
          c_place,
          c_ReminderTime,
          c_State: addOrEdit == 0 ? '0' : formData.c_State
        }
        this.setState({
          loading: true
        })
        if (addOrEdit == 0) {
          this.addSchedule({ ...editData, c_id: moment().format("x") }, e)
        } else {
          this.modifySchedule({ ...editData }, formData.c_id, e)
        }
      }
    });
  }

  //我知道了
  hidePops = (e, id) => {
    e.stopPropagation();
    if (!this.state.dataSource.length) return;
    const data = this.state.dataSource.filter(item => item.c_id == id).map(l => (
      {
        ...l,
        c_State: '5'
      }
    ));
    console.log([...data])
    scriptUtil.updateDataTable('App_4601e24ddea6267cbdffc391b03c1fcd', {
        dataSource: 'admin_zhuomian.calendar',
        properties: [...data],
        keys: {
          c_id: id
        },
        version: 'V2'
      },
      (res) => {
        if (res.code == 200) {
          notification.close(id);
        }
      }
    )
  }

  showPops = (item) => {
    const message = (
      <div className="notificationBox_title">
        <div style={{ color: '#006AFE', fontSize: '14px' }}>日程提醒</div>
        <div style={{ fontSize: '14px', color: '#273142' }}>
          <span>{item.time}</span>
        </div>
      </div>
    );
    const btn = (
      <div className="notificationBox_foot">
        <Button style={{ color: '#008AFF' }} onClick={e => this.editCurrentEvent(e, item.c_id)}>查看详情</Button>
        <Button style={{ background: '#006AFE', color: '#FFF' }} onClick={e => this.hidePops(e, item.c_id)}>我知道了</Button>
      </div>
    );
    const description = (
      <div className="notificationBox_cont">
        <div style={{ color: '#747577', fontSize: '12px', marginBottom: '2px' }}>
          <Icon type="clock-circle" style={{ fontSize: '12px', verticalAlign: '-1px', marginRight: '6px' }} />
          <span>{item.c_StartTime.slice(0, 10)}</span>
          <span style={{ margin: '0 6px' }}>{this.numToWeek(new Date(item.c_StartTime.slice(0, 10)).getDay())}</span>
          <span>{item.c_StartTime.slice(11)}-{item.c_EndTime.slice(11)}</span>
        </div>
        <div style={{ color: '#747577', fontSize: '12px', display: 'flex', alignItems: 'center' }}>
          <Icon type="file-done" style={{ fontSize: '12px', verticalAlign: '-1px', marginRight: '6px' }} />
          <span title={item.c_Matter} style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.c_Matter}</span>
        </div>
      </div>
    );
    notification.open({
      className: 'notificationBox',
      duration: 0,
      key: item.c_id,
      message,
      description,
      btn,
    });
  }

  numToWeek = (num) => {
    if (_.isNil(num)) return;
    let week;
    switch (num) {
      case 0: week = '周日'; break;
      case 1: week = '周一'; break;
      case 2: week = '周二'; break;
      case 3: week = '周三'; break;
      case 4: week = '周四'; break;
      case 5: week = '周五'; break;
      case 6: week = '周六'; break;
      default: week = '';
    }
    return week;
  }

  noticeTimeToWord = (state, startTime) => {
    const current = moment().format('X');
    const start = moment(startTime).format('X');
    const result = parseInt((current - start) / 60);
    const result1 = parseInt((start - current) / 60);
    let minus;
    switch (state) {
      case '1': minus = result1 >= 60 ? `${parseInt(result1 / 60)}小时${parseInt(result1 % 60) + 1}分钟后` : `${result1 + 1}分钟后`; break;
      case '2': minus = '现在'; break;
      case '3': minus = result >= 60 ? `已开始${parseInt(result / 60)}小时${parseInt(result % 60)}分钟` : `已开始${result}分钟`; break;
      case '4': minus = '已结束'; break;
      default: minus = ''; break;
    }
    return minus;
  }

  getRecentMonthData = () => {
    const { selectMonth } = this.state;
    const currentMonth = moment(selectMonth).format('YYYY-MM');
    const beforeMonth = moment(selectMonth).add(-1, 'M').format('YYYY-MM');
    const afterMonth = moment(selectMonth).add(1, 'M').format('YYYY-MM');

    Promise.all([
      scriptUtil.callFunction('admin_zhuomian.calendar', 'admin_zhuomian.selectUpdAll', { c_StartTime: beforeMonth }),
      scriptUtil.callFunction('admin_zhuomian.calendar', 'admin_zhuomian.selectUpdAll', { c_StartTime: currentMonth }),
      scriptUtil.callFunction('admin_zhuomian.calendar', 'admin_zhuomian.selectUpdAll', { c_StartTime: afterMonth }),
    ]).then(res => {
      let [beforeData, currentData, afterData] = res;
      if (beforeData.code == 200 && currentData.code == 200 && afterData.code == 200) {
        beforeData = _.get(beforeData, 'data');
        currentData = _.get(currentData, 'data');
        afterData = _.get(afterData, 'data');
        const data = [...beforeData, ...currentData, ...afterData];
        //循环查询提醒框内容
        const tips = _.sortBy(data, ['c_StartTime']).filter(item => item.c_State != 0 && item.c_State != 5).map(l => (
          {
            ...l,
            time: this.noticeTimeToWord(l.c_State, l.c_StartTime)
          }
        ));
        for (let i = 0; i < tips.length; i++) {
          this.showPops(tips[i]);
        }

        this.setState({
          dataSource: data
        })
      }
    })
  }

  getSelectDateData = () => {
    const { selectedDate } = this.state;
    this.setState({
      spinning: true,
    })
    scriptUtil.callFunction('admin_zhuomian.calendar', 'admin_zhuomian.selectUpdAll', { c_StartTime: selectedDate }).then(res => {
      if (res.code == 200) {
        const { data } = res;
        this.setState({
          selectEvents: data,
          spinning: false,
        })
      }
    })
  }

  componentWillUnmount () {
    clearInterval(this.timer);
    this.timer = null;
  }


  componentDidMount () {
    document.getElementById("calendarBox").addEventListener("mousedown", function (event) {
      event.stopPropagation();
    });

    this.getSelectDateData();
    this.getRecentMonthData();
    function formatDate (value) {
      if (typeof (value) == 'undefined') {
          return ''
      } else {
          var date = new Date(parseInt(value))
          var s = date.getSeconds()
          s = s < 10 ? ('0' + s) : s
          return s
      }
    }
    this.timer = setInterval(() => {
      // this.getRecentMonthData();
      var timeDate = Date.parse(new Date());
      var timeDates = formatDate(timeDate);
      if(timeDates==0){
        this.getRecentMonthData();
      }
    }, 1000)
  }
  render () {
    const { addEventVisible, selectEvents, formData, selectedDate, loading, spinning } = this.state;
    return (
      <Fragment>
        <div id="calendarBox">
          <div className="header">日程安排</div>
          <Row className="content">
            <Col span={15}>
              <Calendar
                fullscreen={false}
                onChange={this.onSelect}
                dateCellRender={this.dateCellRender}
              />
            </Col>
            <Col span={9} style={{ height: '100%', paddingRight: '10px', maxHeight: '236px' }}>
              <div className="content_matter">
                <span className="plusBtn" onClick={e => this.addCurrentEvent(e)}>新增日程</span>
              </div>
              <div className="content_list">
                <Spin spinning={spinning} />
                {
                  _.sortBy(selectEvents, ['c_StartTime']).map(item => (
                    <div key={item.id} className="content_list_item" onClick={e => this.editCurrentEvent(e, item.c_id)}>
                      <div className="content_list_title" title={item.c_Theme}>{item.c_Theme}</div>
                      <div className="content_list_time">
                        <span>{item.c_StartTime.slice(11)}-{item.c_EndTime.slice(11)}</span>
                      </div>
                    </div>
                  ))
                }
                {
                  (!spinning && !selectEvents.length) && <div style={{ color: '#FFF' }}>今日暂无日程</div>
                }
              </div>
            </Col>
          </Row>
        </div>
        <Modal
          title={this.state.addOrEdit ? '编辑日程' : '新增日程'}
          visible={addEventVisible}
          onCancel={e => this.closeAddEventVisible(e)}
          className="eventEditModal"
          footer={[
            <Button key="submit" type="primary" loading={loading} onClick={e => this.handleOk(e)}>
              完成
            </Button>,
            <Button key="back" loading={loading} style={{ borderColor: '#FF7D7D', color: '#FF7070', display: `${this.state.addOrEdit ? 'inline-block' : 'none'}` }} onClick={e => this.delSchedule(e)}>
              删除
            </Button>,
          ]}
          maskClosable={false}
          closable={true}
          width={480}
        >
          {
            addEventVisible && (
              <WrappedNormalEventForm
                formData={formData}
                selectedDate={selectedDate}
                ref={this.formRef}
              />
            )
          }
        </Modal>
      </Fragment>
    );
  }
}

export default CustomComp;

class NormalEventForm extends React.Component {

  componentDidMount () {
    const { form: { setFieldsValue }, formData } = this.props;
    if (formData.length === 0 || formData.c_id == undefined) return;
    const { c_StartTime, c_EndTime } = formData;
    //设置默认值
    setFieldsValue({
      ...formData,
      startDate: moment(c_StartTime.slice(0, 10), dateFormat),
      startTime: moment(c_StartTime.slice(11), hoursFormat),
      endDate: moment(c_EndTime.slice(0, 10), dateFormat),
      endTime: moment(c_EndTime.slice(11), hoursFormat),
    });
  }

  render () {
    const { form: { getFieldDecorator }, formData, selectedDate } = this.props;
    const initStart = moment().add(1, 'h').format('HH') + ':00';
    const initEnd = moment().add(2, 'h').format('HH') + ':00';
    return (
      <div id="eventEditBox">
        <Form className="formList" ref={this.props.ref}>
          <Form.Item style={{ marginBottom: '22px' }}>
            {getFieldDecorator('c_Theme', {
              rules: [
                {
                  required: true,
                  message: '请输入事件标题'
                },
              ],
            })(<TextArea rows={3} placeholder="日程标题" />)}
          </Form.Item>
          <Row style={{ marginBottom: '22px' }}>
            <Col span={1}><Icon type="clock-circle" style={{ fontSize: '20px', verticalAlign: '-15px' }} /></Col>
            <Col span={11} style={{ display: 'flex' }}>
              <Form.Item>
                {getFieldDecorator('startDate', {
                  initialValue: moment(selectedDate, dateFormat),
                  rules: [
                    {
                      required: true,
                      message: '请选择开始日期'
                    },
                  ],
                })(<DatePicker style={{ width: "118px", paddingLeft: '10px' }} allowClear={false} placeholder="开始日期" />)}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator('startTime', {
                  initialValue: moment(initStart, 'HH:mm'),
                  rules: [
                    {
                      required: true,
                      message: '请选择开始时间'
                    },
                  ],
                })(<TimePicker minuteStep={15} format="HH:mm" style={{ width: '86px', paddingLeft: '10px' }} placeholder="时间" />)}
              </Form.Item>
            </Col>
            <Col span={1} style={{ paddingLeft: '10px' }}>
              <span style={{ verticalAlign: '-9px' }}>-</span>
            </Col>
            <Col span={11} style={{ display: 'flex' }}>
              <Form.Item>
                {getFieldDecorator('endDate', {
                  initialValue: moment(selectedDate, dateFormat),
                  rules: [
                    {
                      required: true,
                      message: '请选择结束日期'
                    },
                  ],
                })(<DatePicker style={{ width: "118px", paddingLeft: '10px' }} allowClear={false} placeholder="结束日期" />)}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator('endTime', {
                  initialValue: moment(initEnd, 'HH:mm'),
                  rules: [
                    {
                      required: true,
                      message: '请选择结束时间'
                    },
                  ],
                })(<TimePicker minuteStep={15} format="HH:mm" style={{ width: '86px', paddingLeft: '10px' }} placeholder="时间" />)}
              </Form.Item>
            </Col>
          </Row>
          <Row style={{ marginBottom: '22px' }}>
            <Col span={1}>
              <Icon type="environment" style={{ fontSize: '20px', verticalAlign: '-15px' }} />
            </Col>
            <Col span={23} style={{ paddingLeft: '9px' }}>
              <Form.Item>
                {getFieldDecorator('c_place', {})(<Input placeholder="日程地点" />)}
              </Form.Item>
            </Col>
          </Row>
          <Row style={{ marginBottom: '22px' }}>
            <Col span={1}>
              <Icon type="bell" style={{ fontSize: '20px', verticalAlign: '-15px' }} />
            </Col>
            <Col span={11} style={{ paddingLeft: '9px' }}>
              <Form.Item>
                {getFieldDecorator('c_ReminderTime', {
                  initialValue: '15'
                })(<Select>
                  {options.map(item => <Option key={item.key} value={item.value}>{item.content}</Option>)}
                </Select>)}
              </Form.Item>
            </Col>
          </Row>
          <Row style={{ marginBottom: '22px' }}>
            <Col span={1}>
              <Icon type="file-done" style={{ fontSize: '20px', verticalAlign: '-9px' }} />
            </Col>
            <Col span={23} style={{ paddingLeft: '9px' }}>
              <Form.Item>
                {getFieldDecorator('c_Matter', {})(<TextArea rows={5} placeholder="日程描述" />)}
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </div>
    );
  }
}

const WrappedNormalEventForm = Form.create({ name: 'normal_event' })(NormalEventForm);