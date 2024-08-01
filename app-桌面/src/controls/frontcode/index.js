import React from 'react';

function FrontCode(props) {
    const { namespace, template, enName, propsArray } = props;
    let propsStr = '';//不带命名空间的属性
    let propsWithQuotes = '';//不带命名空间带引号属性
    let firstProp = { enName: '属性' };//单个属性
    let propsWithNamaspace = '';//带命名空间的属性
    let propsWithInstance = '';//带实例名的属性
    if (propsArray.length > 0) {
        firstProp = { namespace: propsArray[0].namespace, enName: propsArray[0].enName, dataType: propsArray[0].dataType };
        for (let i = 0; i < propsArray.length; i++) {
            propsWithInstance += `"(\\"${namespace}.${template}.${enName}.${propsArray[i].namespace}.${propsArray[i].enName}\\")"`;
            propsWithNamaspace += `'${propsArray[i].enName}'`;
            propsWithQuotes += `'${propsArray[i].enName}'`;
            propsStr += propsArray[i].enName;
            if (i != propsArray.length - 1) {
                propsWithNamaspace += ',';
                propsStr += ',';
                propsWithQuotes += ',';
                propsWithInstance += ','
            }
        };
    }
    propsStr = propsStr || '属性:None';
    propsWithQuotes = propsWithQuotes || '属性:None';
    propsWithNamaspace = propsWithNamaspace || '属性:None';
    propsWithInstance = propsWithInstance || '(属性:None)';

    //属性值要设置的时候拼接的字符串
    let propsSetValue = '属性:None';
    let propsSetVQTval = '属性:[空]';
    const vals = propsStr.split(",");
    if (vals.length > 1) {
        propsSetValue = '';
        propsSetVQTval = '';
        //propsSetFormval = '';
        for (let val of propsArray) {
            propsSetValue += `"${val.enName}":${val.dataType == 'STRING' ? '\'字符串\'' : 100},`;
            propsSetVQTval += `"${val.enName}":[{value:${val.dataType == 'STRING' ? '\'字符串\'' : 100},"timestamp": new Date().getTime()}],`;
        }
        propsSetValue = propsSetValue.substring(0, propsSetValue.length - 1);
        propsSetVQTval = propsSetVQTval.substring(0, propsSetVQTval.length - 1);
    }

    let Contents = '';
    if (enName == 'form')
        //#region 表单模板的前台服务
        Contents = [{
            title: '# 1、前端调用后台服务,批量查询表单模板的数据',
            code: `
        // 执行后台表单模板的其他自定义服务可以参考此项
        scriptUtil.executeScriptService({
            objName: "${namespace}.${template}", // 表单模板的objName是"命名空间:表单模板别名"
            serviceName: "system.GetDataTableEntries",  // 服务
            // 入参
            params: {
                pageIndex:1,    
                pageSize:50,    
                distinct:false,  
                fields:[${propsWithQuotes}],
                order: [
                    {
                        "order": '${firstProp.enName}', 
                        "sort": "desc"
                    }
                ],
                condition: {
                    and: {
                        '${firstProp.namespace}.${firstProp.enName}': ${firstProp.dataType == 'STRING' ? '\'字符串\'' : 100} //查询条件只有and或者or
                        //如果多条查询条件则在上行后面增加个逗号后,复制上行到本行再改变查询的属性名和条件
                    }
                }
            },
            version: 'V2',
            // 回调函数
            cb: function (res) {
                //chrome浏览器F12打开控制台查看数据
                console.log('res', res);
            }
            // 可自定义补充请求参数
        });`
        }, {
            title: '# 2、调用前端封装服务,批量查询表单模板的数据[推荐]',
            code: `
        scriptUtil.queryDataTable({
            dataSource:'${namespace}.${template}',
            filters: {
                fields:[${propsWithQuotes}],//查询指定字段
                order: [
                    {
                        "order": '${firstProp.enName}', 
                        "sort": "desc" //desc -降序  asc-升序
                    }
                ],
                distinct: false,
                "${firstProp.namespace}.${firstProp.enName}":"%xx%",
                //增加条件则复制上一行
            },
            version: 'V2'
            },
            (res)=>{
                console.log('res', res);
        });`
        }, {
            title: '# 3、批量向表单模板中插入数据 - 批量用这个',
            code: `
        const data =  [
                {
                    ${propsSetValue}
                },
                {
                    ${propsSetValue}
                }
                //.....
        ];
        scriptUtil.executeScriptService({
            objName: '${namespace}.${template}',
            serviceName: "AddDataTableEntries",  // 服务
            // 入参
            params: {
                params: JSON.stringify({list: data})
            },
            version: 'V2',
            // 回调函数
            cb: function (res) {
                console.log('res', res);
            }
            // 可自定义补充请求参数
        });`
        }, {
            title: '# 4、向表单模板中插入单条数据 - 单条用这个',
            code: `
        const param = {
                ${propsSetValue}
            };
        scriptUtil.addDataTable({
            dataSource: '${namespace}.${template}',
            properties: [param], //一定要是Array 格式,虽然是数组,但只会插入一条
            version: 'V2',
        },
        function (res) {
            console.log('res', res);
        });`
        }, {
            title: '# 5、修改表单模板的数据',
            code: `
        var param = {
            "${firstProp.namespace}.${firstProp.enName}": 新的值
        };
        var keys = {
            "${firstProp.namespace}.${firstProp.enName}": ${firstProp.dataType == 'STRING' ? '\'字符串\'' : 100},//key 必须带命名空间
        };
        scriptUtil.updateDataTable(
            {
            dataSource:'${namespace}.${template}',
            properties: [param], //一定要是Array 格式
            keys,
            version: 'V2',
            },
            function (res) {
            console.log('res', res);
        });`
        }, {
            title: '# 7、删除表单模板的数据',
            code: `
        const param = {
            "${firstProp.namespace}.${firstProp.enName}": ${firstProp.dataType == 'STRING' ? '\'字符串\'' : 100} //key 必须带命名空间
            };
        scriptUtil.delDataTable({
                dataSource: '${namespace}.${template}',
                properties: [param], //一定要是Array 格式
                version: 'V2',
            },
            function (res) {
                console.log('res', res);
        });`
        }, {
            title: '# 8、其他常用服务',
            code: `   
        //根据控件ID获取控件,并设值
        const ctrl = scriptUtil.getRegisterReactDom(控件id);
        ctrl.getValue();        //获取值
        ctrl.setValue('值');    //设置值
        ctrl.getLabelContent(); //获取标签值用此方法
        ctrl.setLabelContent(); //设置标签值用此方法

        //根据组件组件名称(可自定义)获取组件的值,非常便捷
        scriptUtil.getFormData(['title', 'name', '组件的名称']);

        //根据组件的名称批量设置组件的值
        scriptUtil.setFormData({ title: '我的测试数据','name':'我的测试数据' });

        //弹出提示窗口,类别分为 success/error/warning
        scriptUtil.showMessage('保存成功！','success');

        //格式化日期
        scriptUtil.timestampFormat(new Date(),'yyyy-MM-DD HH:mm:ss');

        //点击确定的时候才会触发回调,例如删除提示
        scriptUtil.Alert('弹出成功', () => {console.log('点击确定');});

        
        //获取当前登陆用户信息
        scriptUtil.getUserInfo(res=> {console.log('res', res)});

        //获取点击的表格行数据
        const var result = scriptUtil.getEditRow('表格控件id');

        //用于Json对象数据导出excel表格
        scriptUtil.JSONToExcelConvertor({
            data: [{ name: '小王', age: '12', sex: '女' }],
            dataTitle: ['姓名', '年纪', '性别'],
            dataKey: ['name', 'age', 'sex'],
            fileName: '测试文件',
            extension: 'xls',
        });

        //用于打开一个新的浏览器窗口或查找一个已命名的窗口
        // 空页面
        scriptUtil.openPage('url', '_black');
        // 替换当前页面
        scriptUtil.openPage('url', '_self');
        //宽高配置的空页面
        scriptUtil.openPage('url', '_black', true, '{"height":400,"width":400}');
        //关闭当前窗口
        scriptUtil.closeCurrentPage();

        //打开一个新的模态窗口
        scriptUtil.showModal({
            "width":800,
            "height":600,
            "padding":{"paddingTop":24,"paddingBottom":24,"paddingLeft":24,"paddingRight":24},
            "modelTitle":"标题",
            "needTitle":true,
            "fontSize":14,
            "fontColor":"#000000",
            "titleBgColor":"#ebeef5",
            "contentBgColor":"#ffffff",
            "modalIsCenter":true,
            "url":"/#/runtime-fullscreen/runtime-fullscreen/Page_401bf68ecd634809a7cf36fe44b73f59"
        });

        //关闭模态窗口
        scriptUtil.closeModal();

        //获取当前URL地址后面的参数,例:http://url?a=1&b=1 返回{a:1,b:2}
        const params = scriptUtil.getRequestUrl();

        //Get请求API的服务
        var url = '/resource/App_67aeef5f345007d7e8b9c85b819c37bf/area_data.json';
        scriptUtil.request(url, {method: 'GET'}).then(res=>{console.log(res)});
        //POST请求API的服务
        const api = '/api/compose/manage/objectdata/query';
        const param = {
            method:'POST',
            body: { a:1,b:2}
        };
        scriptUtil.request(api,param).then(res=>{console.log(res)});
        `
        }];
    //#endregion
    else
        //#region 实体模板的前台服务
        Contents = [{
            title: '# 1、获取单个属性当前值 - 前端获取',
            code: `
        scriptUtil.executeScriptService({
            //注意点:服务在对象实例里,objName后面要加/对象实例名,服务在表单模板内则不需要
            objName: "${namespace}.${template}/${enName}",
            serviceName: "getPropertyValue",  
            // 入参
            params: {
                propName:'${firstProp.namespace}.${firstProp.enName}'
            },
            version: 'V2',
            // 回调函数
            cb: function (res) {
                console.log('res', res);
            }
        });`
        }, {
            title: '# 2、获取单个属性当前的[正常值]',
            code: `
        scriptUtil.executeScriptService({
            objName: "${namespace}.${template}/${enName}",
            serviceName: "getPropertyLastValue",  
            // 入参
            params: {
                propName:'${firstProp.namespace}.${firstProp.enName}'
            },
            version: 'V2',
            // 回调函数
            cb: function (res) {
                console.log('res', res);
            }
        });`
        }, {
            title: '# 3、获取单个属性当前值,以VQT模式返回',
            code: `
        scriptUtil.executeScriptService({
            objName: "${namespace}.${template}/${enName}",
            serviceName: "getPropertyVQTValue",  
            // 入参
            params: {
                propName:'${firstProp.namespace}.${firstProp.enName}'
            },
            version: 'V2',
            // 回调函数
            cb: function (res) {
                console.log('res', res);
            }
        });`
        }, {
            title: '# 4、获取单个属性当前的[正常值],以VQT模式返回',
            code: `
        scriptUtil.executeScriptService({
            objName: "${namespace}.${template}/${enName}",
            serviceName: "getPropertyLastVQTValue",  
            // 入参
            params: {
                propName:'${firstProp.namespace}.${firstProp.enName}'
            },
            version: 'V2',
            // 回调函数
            cb: function (res) {
                console.log('res', res);
            }
        });`
        }, {
            title: '# 5、批量获取属性当前值',
            code: `
        scriptUtil.executeScriptService({
            objName: "${namespace}.${template}/${enName}",
            serviceName: "getPropertyValues",  
            // 入参
            params: {
                propNames:'${propsStr}'
            },
            version: 'V2',
            // 回调函数
            cb: function (res) {
                console.log('res', res);
            }
        });`
        }, {
            title: '# 6、批量获取属性值,以VQT模式返回',
            code: `
        scriptUtil.executeScriptService({
            objName: "${namespace}.${template}/${enName}",
            serviceName: "getPropertyVQTValues",  
            // 入参
            params: {
                propNames:'${propsStr}'
            },
            version: 'V2',
            // 回调函数
            cb: function (res) {
                console.log('res', res);
            }
        });`
        }, {
            title: '# 7、批量获取属性的某个时间点的值',
            code: `
        const dateTime = new Date().toISOString().split('.')[0] +'Z';
        scriptUtil.executeScriptService({
            objName: "${namespace}.${template}/${enName}",
            serviceName: "getCertainHistory",  
            // 入参
            params: {
                propNames: 
                [
                    ${propsWithNamaspace}
                ],
                time: dateTime,
                strategy: "pre" //两种策略pre/next(向前/向后找值)
            },
            version: 'V2',
            // 回调函数
            cb: function (res) {
                console.log('res', res);
            }
        });`
        }, {
            title: '# 8、批量获取某一段时间的属性值',
            code: `
        const begTime = new Date(new Date().valueOf() - 60*1000).toISOString().split('.')[0] +'Z';
        const endTime = new Date().toISOString().split('.')[0] +'Z';
        scriptUtil.executeScriptService({
            objName: "${namespace}.${template}/${enName}",
            serviceName: "getPropertiesHistory",  
            // 入参
            params: {
                // "fill": {
                //    "strategy": "previous" //补值策略:分组寻值，寻不到时候采用策略向前或向后寻值
                // },
                // "groupBy": {
                //     "time": "300s"  //按时间(秒)分组查询,如果不需要分组,这段需要注释掉
                // },            
                // "offset": 0,  //偏移量
                "limit": 5,   //返回条数
                "select": [
                    ${propsWithInstance}
                    // "first${propsWithInstance.indexOf(':') > -1 ? propsWithInstance : propsWithInstance.split(',')[0].substring(1, propsWithInstance.split(',')[0].length)} //可添加表达式:sum/mean/first/last/max/min求和/平均值/第一个值/最新的值/最大值/最小值
                ],
                "where": {
                    "and": {
                        "timestamp": {
                            "ge": "",       //大于等于
                            "gt": begTime,  //大于
                            "le": "",       //小于等于
                            "lt": endTime  //小于
                        }
                    }
                }
            },
            version: 'V2',
            // 回调函数
            cb: function (res) {
                console.log('res', res);
            }
            // 可自定义补充请求参数
        });`
        }, {
            title: '# 9、设置单个属性实时值',
            code: `
        scriptUtil.executeScriptService({
            objName: "${namespace}.${template}/${enName}",
            serviceName: "setPropertyValue",  
            // 入参
            params: {
                propName: '${firstProp.enName}',
                propValue: ${firstProp.dataType == 'STRING' ? '\'字符串\'' : 100}
            },
            version: 'V2',
            // 回调函数
            cb: function (res) {
                console.log('res', res);
            }
        });`
        }, {
            title: '# 10、批量设置属性实时值',
            code: `
        scriptUtil.executeScriptService({
            objName: "${namespace}.${template}/${enName}",
            serviceName: "setPropertyValues",  
            // 入参
            params: {
                ${propsSetValue}
            },
            version: 'V2',
            // 回调函数
            cb: function (res) {
                console.log('res', res);
            }
        });`
        }, {
            title: '# 11、批量设置属性VQT实时值',
            code: `
        scriptUtil.executeScriptService({
            objName: "${namespace}.${template}/${enName}",
            serviceName: "setPropertyVQTValues",  
            // 入参
            params: {
                ${propsSetVQTval}
            },
            version: 'V2',
            // 回调函数
            cb: function (res) {
                console.log('res', res);
            }
        });
        `
        }];
    //#endregion

    return (
        <div>
            {
                Contents.map((item, index) => {
                    return <div style={contentStyle} key={index}>
                        <p style={titleStyle}>{item.title}</p>
                        <pre style={preStyle}>
                            {item.code}
                        </pre>
                    </div>
                })
            }
        </div>
    );
}

const contentStyle = {
    border: "1px solid #d1d1d1",
    borderTop: '0px'
}
const titleStyle = {
    lineHeight: '34px',
    fontSize: '14px',
    margin: "0px 18px",
    color: '#ff008e'
}
const preStyle = {
    lineHeight: "150%",
    marginTop: "-15px",
    maxWidth: "100%",
    overflow: "auto",
    padding: "0px",
    whiteSpace: "pre",
    whiteSpace: "pre-wrap",
    wordWrap: "break-word"
}

export default FrontCode;