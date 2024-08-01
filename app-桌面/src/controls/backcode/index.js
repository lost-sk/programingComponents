import React from 'react';

function BackCode(props) {
    const { namespace, template, enName, propsArray } = props;
    let propsStr = '';//不带命名空间的属性
    let propsWithQuotes = '';//不带命名空间带引号属性
    let firstProp = { enName: '属性' };//单个属性
    let propsWithNamaspace = '';//带命名空间的属性
    let propsWithInstance = '';//带实例名的属性
    if (propsArray.length > 0) {
        firstProp = { enName: propsArray[0].enName, dataType: propsArray[0].dataType };
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

    //const descrip = '此类的代码只能复制到对象服务中使用,不可复制到前端页面.改不了服务要去APP里面改'
    let Contents = '';
    if (enName == 'form')
        //#region 表单模板的后台服务
        Contents = [{
            title: '# 1、批量查询表单模板的数据 - GetDataTableEntries',
            code: `
        var inputs = {
            pageIndex:1,    //查询起始页,默认为1
            pageSize:50,    //查询页大小,默认为50
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
                    '${firstProp.enName}': ${firstProp.dataType == 'STRING' ? '\'字符串\'' : 100} //查询条件只有and或者or
                    //如果多条查询条件则在上行后面增加个逗号后,复制上行到本行再改变查询的属性名和条件
                }
            }
        };
        var params = {
            params: JSON.stringify(inputs)
        }
        var template = templates['${namespace}.${template}'];
        var result = template['GetDataTableEntries'](params);
        result;`
        }, {
            title: '# 2、向表单模板中插入一条数据 - AddDataTableEntry',
            code: `
        var param = {
            ${propsSetValue}
        };
        var template = templates['${namespace}.${template}'];
        var result = template['AddDataTableEntry'](param);
        result;`
        }, {
            title: '# 3、批量向表单模板中插入数据 - AddDataTableEntries',
            code: `
        var param = {
            list: [
                {
                    ${propsSetValue}
                },
                {
                    ${propsSetValue}
                }
                //.....
            ]
        };
        var params = {
            params: JSON.stringify(param)
        }
        var template = templates['${namespace}.${template}'];
        var result = template['AddDataTableEntries'](params);
        result;`
        }, {
            title: '# 4、更新表单模板的多条数据 - UpdateDataTableEntry',
            code: `
        var params = {
            update: {
                ${propsSetValue}
            },
            where: {
                ${propsSetValue}
            }
        }
        var template = templates['${namespace}.${template}'];
        var result = template['UpdateDataTableEntry'](params);
        result;`
        }, {
            title: '# 5、删除表单模板的多条数据 - DeleteDataTableEntries',
            code: `
        var params = {
            ${propsSetValue} //删除条件
        };
        var template = templates['${namespace}.${template}'];
        var result = template['DeleteDataTableEntries'](params);
        result;`
        }, {
            title: '# 6、jsql方式查询单个表单模板[推荐]',
            code: `
        var template = jsql.template["${namespace}.${template}"];
        //为提高性能,推荐: sql.select(template.属性1,template.属性2).from(template)
        var sql = jsql.select().from(template)
                .where(template.${firstProp.enName}.eq(${firstProp.dataType == 'STRING' ? '\'字符串\'' : 100}).and(template.${firstProp.enName}.eq(${firstProp.dataType == 'STRING' ? '\'字符串\'' : 100})))
                .orderByDesc(template.${firstProp.enName})
                .limit(20); 
        //相关知识参考第十小节
        var list = repo.query(sql).items;         //3.2+版本支持: repo.query(sql,'kv').list
        list;`
        }, {
            title: '# 7、jsql方式联表查询',
            code: `
        //如下是示例(运行会异常),连接的数据表必须为不同表
        var template01 = jsql.template["${namespace}.${template}"];
        var template02 = jsql.template["${namespace}.${template}"];
        var sql = jsql
        .select(template01.${firstProp.enName}, template02.${firstProp.enName})
        .from(template01)
        .join(template02, template01.${firstProp.enName}.eq(template02.${firstProp.enName}));
        // 执行查询
        var list = repo.query(sql).items;
        list;

        //1、 join:内连接 2、leftJoin:左连接 3、rightJoin:右连接`
        }, {
            title: '# 8、jsql方式增、删、改操作',
            code: `        
        //增加数据
        var template = jsql.template["${namespace}.${template}"];
        var sql = jsql.insert(template)
        .columns(template.${firstProp.enName})
        .values(
            [${firstProp.dataType == 'STRING' ? '\'字符串\'' : 100}],
            [${firstProp.dataType == 'STRING' ? '\'字符串\'' : 100}]
        );
        var res = repo.insert(sql);
        res;

        //修改数据
        var template = jsql.template["${namespace}.${template}"];
        var sql = jsql.update(template)
        .set({${firstProp.enName}: ${firstProp.dataType == 'STRING' ? '\'字符串New\'' : 101}})
        .where(template.${firstProp.enName}.eq(${firstProp.dataType == 'STRING' ? '\'字符串\'' : 100}));
        var res = repo.update(sql);
        res;

        //删除数据
        var template = jsql.template["${namespace}.${template}"];
        var sql = jsql.delete(template).where(template.${firstProp.enName}.eq(${firstProp.dataType == 'STRING' ? '\'字符串\'' : 100}));
        var res = repo.delete(sql);
        res;`
        }, {
            title: '# 9、jsql事务方式处理数据',
            code: `
        //开启事务:var tx = services.DataTableService.createTransaction();  
        //提交事务:tx.commit();  
        //回滚事务:tx.rollback();  
        //关闭事务:tx.close();

        // 新增两条数据,然后要删除一条数据，要保证整体成功,若删除失败则新增的数据也要回滚
        // 字段和值按照顺序一一对应

        // 开启事务
        var tx = services.DataTableService.createTransaction();

        // 插入数据
        var template = jsql.template["${namespace}.${template}"];
        var sql = jsql.insert(template)
        .columns(template.${firstProp.enName})
        .values(
            [${firstProp.dataType == 'STRING' ? '\'字符串\'' : 100}],
            [${firstProp.dataType == 'STRING' ? '\'字符串\'' : 100}]
        );
        repo.insert(sql);
        var sql = jsql.delete(template).where(template.${firstProp.enName}.eq(${firstProp.dataType == 'STRING' ? '\'字符串\'' : 100}));
        var res = repo.delete(sql);  
        // 提交事务
        tx.commit();
        tx.close();
        res;`
        },{
            title: '# 10、jsql相关功能',
            code: `
        **********************where查询运算符包括**********************
        //where动态参数,用于参数不为空,则添加到条件中
        var condition = Jsql.inline(true);
        if (参数A !='') condition = condition.and(template.${firstProp.enName}.eq(参数A));
        if (参数B !='') condition = condition.and(template.${firstProp.enName}.eq(参数B));
        var sql  = jsql.select().from(template).where(condition); //拼出来就是template.${firstProp.enName}='参数A' and template.${firstProp.enName}='参数B'

        //其他
        = 对应: eq:template.CheckMaterialId.eq(100)
        > 对应: gt:template.CheckMaterialId.gt(100)
        >=对应: ge:template.CheckMaterialId.ge(100)
        < 对应: lt:template.CheckMaterialId.lt(100)
        <= 对应:le:template.CheckMaterialId.le(100)
        !=对应: ne:template.CheckMaterialId.ne(100) 
        <>对应: var sql = jsql.select().from(template).where(template.CheckMaterialId.eq(100).not());
        like notLike 模糊:template.CheckMaterialId.like('%字符串%') //like内容内必须是字符串类型
        in,notIn 存在: var sql = jsql.select().from(template).where(template.CheckMaterialId.in(10,20,30)); //in的内容可以是一个数组
        between,notBetween 之间: var sql = jsql.select().from(template).where(template.CheckMaterialId.between(10,50)});

        ***************************匹配及分组**************************
        caseWhen,caseWhenEq 匹配: var sql = jsql.select(jsql.caseWhen(template.CheckMaterialId.lt(20), 'X1').when(template.CheckMaterialId.between(20, 30), 'X2').el('X3')).from(template);
        group 分组: var sql = jsql.select(template.CheckMaterialId,template.CheckMaterialId.count()).from(template).groupBy(template.CheckMaterialId);
        //分组支持的聚合函数:count/sum/max/min/avg
        having 分组过滤 var sql = jsql.select(template.CheckMaterialId,template.CheckMaterialId.count()).from(template).groupBy(template.CheckMaterialId).having(template.CheckMaterialId.count().gt(100));
        
        *************************支持的算术操作符************************
        var sql = jsql.select(template.CheckMaterialId.add(10)).from(template);
        + 对应add: template.CheckMaterialId.add(10) 对应sql: template.CheckMaterialId + 10
        - 对应sub: template.CheckMaterialId.sub(10) 对应sql: template.CheckMaterialId - 10
        * 对应mul: template.CheckMaterialId.mul(10) 对应sql: template.CheckMaterialId * 10
        / 对应div: template.CheckMaterialId.div(10) 对应sql: template.CheckMaterialId / 10
        % 对应mod: template.CheckMaterialId.mod(10) 对应sql: template.CheckMaterialId % 10
        abs 绝对值: template.CheckMaterialId.abs()
        截取字符串 template.CheckMaterialId.substr(1, 5)
        示例:(A+B)*(1+C) = template.A.add(template.B).mul(template.C.add(1))

        *******************************其他******************************
        数据去重: var sql = jsql.select(template.${firstProp.enName}.distinct()).from(template);
        全部去重: var sql = jsql.select().distinctAll().from(template);
        日期格式化: var sql = jsql.select(template.${firstProp.enName}.dateFormat('%Y-%m-%d %H:%i:%S')).from(template);
        `
        }];
    //#endregion
    else
        //#region 实体模板的后台服务
        Contents = [{
            title: '# 1、获取单个属性当前值 - getPropertyValue',
            code: `
        var instance = templates['${namespace}.${template}'].instances('${enName}');
        var propValue = instance.getPropertyValue('${firstProp.enName}');
        propValue;

        //或用更便捷的方式
        var propValue = objects["${enName}"].${firstProp.enName};
        propValue;`
        }, {
            title: '# 2、获取单个属性当前的[正常值] - getPropertyLastValue  例:取当前时间点的属性值,若该属性值质量码异常,服务会自动取异常前面的值,保证数据的准确',
            code: `
        var input = {
            propName:'${firstProp.enName}'
        };
        var instance = templates['${namespace}.${template}'].instances('${enName}');
        var result = instance.executeService('getPropertyLastValue',input);
        result;`
        }, {
            title: '# 3、获取单个属性当前值,以VQT模式返回 - getPropertyVQTValue  注:V=Value 值;Q=Quality 质量码;T=Timestamp 时间戳',
            code: `
        var input = {
            propName:'${firstProp.enName}'
        };
        var instance = templates['${namespace}.${template}'].instances('${enName}');
        var result = instance.executeService('getPropertyVQTValue',input);
        result;`
        }, {
            title: '# 4、获取单个属性当前的[正常值],以VQT模式返回 - getPropertyLastVQTValue',
            code: `
        var input = {
            propName:'${firstProp.enName}'
        };
        var instance = templates['${namespace}.${template}'].instances('${enName}');
        var result = instance.executeService('getPropertyLastVQTValue',input);
        result;`
        }, {
            title: '# 5、批量获取属性当前值 - getPropertyValues',
            code: `
        var inputs = {
            propNames:'${propsStr}'
        };
        var instance = templates['${namespace}.${template}'].instances('${enName}');
        var result = instance.executeService('getPropertyValues',inputs);
        result;`
        }, {
            title: '# 6、批量获取属性值,以VQT模式返回 - getPropertyVQTValues',
            code: `
        var inputs = {
            propNames:'${propsStr}'
        };
        var instance = templates['${namespace}.${template}'].instances('${enName}');
        var result = instance.executeService('getPropertyVQTValues',inputs);
        result;`
        }, {
            title: '# 7、批量获取属性的某个时间点的值 - getCertainHistory',
            code: `
        var dateTime = new Date().toISOString().split('.')[0] +'Z';
        var inputs = {
            propNames: [
                ${propsWithNamaspace}
            ],
            time: dateTime,
            strategy: "pre" //两种策略pre/next(向前/向后找值)
        };
        var param = {
            inputs: JSON.stringify(inputs)
        }
        var instance = templates['${namespace}.${template}'].instances('${enName}');
        var result = instance.executeService('getCertainHistory',param);
        result;`
        }, {
            title: '# 8、批量获取一段时间的取属值 - getPropertiesHistory',
            code: `
        var begTime  = new Date(new Date().valueOf() - 60*1000).toISOString().split('.')[0] +'Z';
        var endTime = new Date().toISOString().split('.')[0] +'Z';
        var inputs = {
            // "fill": {
            //    "strategy": "previous" //补值策略:分组寻值，寻不到时候采用策略向前或向后寻值
            // },
            // "groupBy": {
            //     "time": "300s"  //按时间(秒)分组查询,例如300s一组取最大或平均,然后返回每组的聚合数据
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
        }
        var param = {
            "inputs": JSON.stringify(inputs)
        }
        var instance = templates['${namespace}.${template}'].instances('${enName}');
        var result = instance.executeService('getPropertiesHistory',param);
        result;`
        }, {
            title: '# 9、设置单个属性实时值 - setPropertyValue',
            code: `
        var inputs = {
            propName: '${firstProp.enName}',
            propValue: ${firstProp.dataType == 'STRING' ? '\'字符串\'' : 100}
        }
        var instance = templates['${namespace}.${template}'].instances('${enName}');
        var result = instance.executeService('setPropertyValue',inputs);
        result;`
        }, {
            title: '# 10、批量设置属性实时值 - setPropertyValues',
            code: `
        var inputs = {
            ${propsSetValue}
        }
        var instance = templates['${namespace}.${template}'].instances('${enName}');
        var result = instance.executeService('setPropertyValues',inputs);
        result;`
        }, {
            title: '# 11、批量设置属性VQT实时值 - setPropertyVQTValues',
            code: `
        var param = {
            ${propsSetVQTval}
        }
        var inputs = {
            inputs: JSON.stringify(param)
        }
        var instance = templates['${namespace}.${template}'].instances('${enName}');
        var result = instance.executeService('setPropertyVQTValues',inputs);
        result;`
        }, {
            title: '# 12、其他常用功能',
            code: `
        **********************后端调用第三方API接口获取数据**********************
        //Get方式调用第三方的API
        var baseUrl = "http://App_c22ea5a725264786b1c873febe2dfd7c.apps:8080/healt?id=xxx&name=wang";
        var httpservice= services["HttpClientService"];
        var result = httpservice.getString(baseUrl,10000);
        //POST方式调用第三方的API
        var httpService = services["HttpClientService"]
        var header={Authorization: '参数'};
        var bodyParams = {
            "userName": "test",
            "id": "xxxxxx!"
        }
        var loginMsgStr = httpService.post('第三方API地址', JSON.stringify(bodyParams), header, 10000);//header没有就不要写
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
    color: 'tomato'
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

export default BackCode;