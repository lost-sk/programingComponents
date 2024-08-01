/***************************************
author:Gangan
date:2022-4-10
description:仅供学习，不可商用 
****************************************/

import React, { Component } from 'react';
import FrontCode from '../extensions/frontcode/compiled/index';
import BackCode from '../extensions/backcode/compiled/index';
import { Tree, Icon, Tag, notification, Tabs } from 'antd';
const { TabPane } = Tabs;

const { TreeNode } = Tree;

const ROOTID = 1;
const TLTYPE = { ENTITY: 'entity', FORM: 'form' };
const ROOTICON = <Icon type='appstore' theme='twoTone' twoToneColor='#52c41a' />;
const MODELICON = <Icon type='file-markdown' theme='twoTone' />;
const ITINCON = <Icon type="gold" theme='twoTone' twoToneColor='#f1a020' />;

//3.5版本内部接口前缀
// const INNERAPI = `/inter-api/oodm-gateway/template`; //3.5
//3.2版本内部接口前缀
const INNERAPI =`/project/dam/supngin/api/dam/template`; //3.2

class CustomComp extends Component {
    state = {
        templates: [],
        isExpand: [],
        selectedInstance: {
            namespace: '',
            template: '',
            enName: '',
            template: '',
            appName: '',
            id: '',
            templateId: 0,
            properties: [],
            services: []
        },
        whichPage: 'back'
    };

    //获取第一层的实体模板
    getTemplates = async id => {
        let tlList = [];
        const rootTemplate = await this.getTemplateByID(id);
        let isExpandID = ''
        for (let item of rootTemplate) {
            if (item.enName.toUpperCase() in TLTYPE) {
                let { id, displayName, namespace, enName } = item;
                let settle = { key: `${id}-${enName}`, title: `${displayName} (${namespace}-${enName})`, icon: ROOTICON };
                if (item.enName == TLTYPE.ENTITY) {
                    isExpandID = `${id}-${enName}`;
                    let entityTemplate = await this.getTemplateByID(item.id);
                    settle.children = entityTemplate.reduce((acc, cru) => {
                        cru.editable && acc.push({ key: `${cru.id}-${cru.enName}`, title: `${cru.displayName} (${cru.namespace}-${cru.enName})`, icon: MODELICON })
                        return acc;
                    }, []);
                }
                tlList = [...tlList, settle];
            }
        }
        this.setState({ templates: tlList, isExpand: [isExpandID] });
    }


    getTemplateByID = async id =>
        new Promise((resolve) => {
            const url = `${INNERAPI}/${id}/children?appName=system`;
            scriptUtil.request(url, { method: 'GET' }).then(res => resolve(res.data));
        });

    getInstance = id => {
        const url = `${INNERAPI}/normal/${id}/instance?pageIndex=1&pageSize=100&needSystemAttributeValue=true&needNormalAttributeValue=true`;
        return scriptUtil.request(url, { method: 'GET' }).then(res => res.data);
    }

    getProperties = (tlType, id, namespace, template, enName) => {
        let url = '';
        if (TLTYPE.ENTITY == tlType) {
            url = `/open-api/supos/oodm/v2/attributes?pageIndex=1&pageSize=30&instanceNames=${enName}`;
            return scriptUtil.request(url, { method: 'GET' }).then(res => res.list);
        }
        else {
            url = `/open-api/supos/oodm/v2/template/${namespace}/${template}/attribute/self?pageIndex=1&pageSize=50`;
            return scriptUtil.request(url, { method: 'GET' }).then(res => res.data.data);
        }
    }


    getServices = (tlType, id) => {
        let url = '';
        if (TLTYPE.ENTITY == tlType) {
            url = `${INNERAPI}/11535/instance/${id}/service/list?type=own&pageIndex=1&pageSize=30`;
            return scriptUtil.request(url, { method: 'GET' }).then(res => res.data.data);
        }
        else {
            url = `${INNERAPI}/${id}/service/list?type=own&pageIndex=1&pageSize=30&templateId=${id}`;
            return scriptUtil.request(url, { method: 'GET' }).then(res => res.data.data);
        }
    }

    onLoadData = treeNode =>
        new Promise(resolve => {
            const { children, eventKey } = treeNode.props;
            if (children) {
                resolve();
                return;
            }
            const key = eventKey.split('-');
            //表单模板子模版
            if (key[1] == TLTYPE.FORM) {
                this.getTemplateByID(key[0]).then(templates => {
                    const templateArray = templates.reduce((acc, cru) => {
                        acc.push({
                            key: `${cru.id}&${cru.namespace}&${cru.enName}&form&${cru.appName}&0`,
                            title: `${cru.displayName}(${cru.namespace}-${cru.enName})`,
                            icon: ITINCON, isLeaf: true
                        });
                        return acc;
                    }, []);
                    treeNode.props.dataRef.children = templateArray;
                    this.setState({
                        templates: [...this.state.templates],
                    });
                });
            } else {
                //实体模板的子模版和对象
                const insatnce = this.getInstance(key[0]);
                insatnce.then(intances => {
                    //获取对象
                    const instanceArray = intances.data.reduce((acc, cru) => {
                        cru.template.enName == key[1] && acc.push({
                            key: `${cru.system_id}&${cru.template.namespace}&${cru.template.enName}&${cru.system_en_name}&${cru.system_app_name}&${cru.template.id}`,
                            title: `${cru.system_display_name}(${cru.template.namespace}-${cru.template.enName}-${cru.system_en_name})`,
                            icon: ITINCON, isLeaf: true
                        });
                        return acc;
                    }, []);
                    //根据模板ID或者模板
                    this.getTemplateByID(key[0]).then(temps => {
                        const templateArray = temps.reduce((acc, cru) => {
                            acc.push({ key: `${cru.id}-${cru.enName}`, title: `${cru.displayName} (${cru.namespace}- ${cru.enName})`, icon: MODELICON });
                            return acc;
                        }, []);
                        treeNode.props.dataRef.children = [...templateArray, ...instanceArray];
                        this.setState({
                            templates: [...this.state.templates],
                        });
                    });
                });
            }
            resolve();
        });

    onExpand = expandedKeys => this.setState({ isExpand: expandedKeys });

    renderTreeNodes = data =>
        data.map(item => {
            if (item.children) {
                return (
                    <TreeNode {...item} dataRef={item}>
                        {this.renderTreeNodes(item.children)}
                    </TreeNode>
                );
            }
            return <TreeNode  {...item} dataRef={item} />;
        });

    onSelect = (selectedKeys, info) => {
        if (info.node.isLeaf() && selectedKeys.length > 0) {
            const keyStr = selectedKeys[0];
            const instance = keyStr.split('&');
            //In case there are no objects under the template, click to continue execution
            if (!(instance.length > 1))
                return;
            let propsArray = [];
            if (instance[3] == TLTYPE.FORM) {
                this.getProperties(TLTYPE.FORM, ...instance).then(data => {
                    return new Promise((resolve, reject) => {
                        propsArray = data.reduce((acc, cru) => {
                            acc.push({ name: cru.displayName, namespace: cru.namespace, enName: cru.enName, dataType: cru.dataType });
                            return acc;
                        }, []);
                        resolve(propsArray);
                    });
                }).then(propsArray => {
                    this.getServices(TLTYPE.FORM, instance[0]).then(data => {
                        const serviceArray = data.reduce((acc, cru) => {
                            acc.push({ name: cru.displayName, namespace: cru.namespace, enName: cru.enName, inputs: cru.inputs });
                            return acc;
                        }, []);
                        this.setState({
                            selectedInstance: {
                                id: instance[0],
                                namespace: instance[1],
                                template: instance[2],
                                enName: instance[3],
                                appName: instance[4],
                                templateId: instance[5],
                                properties: propsArray,
                                services: serviceArray
                            }
                        });
                    });
                });
            } else {
                this.getProperties(TLTYPE.ENTITY, ...instance).then(data => {
                    return new Promise((resolve, reject) => {
                        propsArray = data.reduce((acc, cru) => {
                            ['internal', 'entity'].indexOf(cru.templateName) == -1 && acc.push({ name: cru.displayName, namespace: cru.namespace, enName: cru.enName, dataType: cru.dataType });
                            return acc;
                        }, []);
                        resolve(propsArray)
                    });
                }).then(propsArray => {
                    this.getServices(TLTYPE.ENTITY, instance[0]).then(data => {
                        const serviceArray = data.reduce((acc, cru) => {
                            acc.push({ name: cru.displayName, namespace: cru.namespace, enName: cru.enName, inputs: cru.inputs });
                            return acc;
                        }, []);
                        this.setState({
                            selectedInstance: {
                                id: instance[0],
                                namespace: instance[1],
                                template: instance[2],
                                enName: instance[3],
                                appName: instance[4],
                                templateId: instance[5],
                                properties: propsArray.reverse(),
                                services: serviceArray
                            }
                        });
                    });
                });
            }
        }
    };

    onRedirect = (id, templateId) => {
        if (id) {
            const prefix = '/static/oodm-frontend/#/aspect';
            const url = templateId != 0 ? `${prefix}/instance-attribute/${id}?templateId=${templateId}&type=ENTITY` : `${prefix}/template-attribute/${id}`;
            window.open(url);
        }
        else
            notification.open({
                message: '请选择一个对象....',
                description:
                    '提醒 : 跳转页面下建立属性和服务,命名空间都是system.如果属性和服务要建立在APP下,不要在弹出页面进行组态！'
            });
    }

    onTabsChange = (key) => {
        const { whichPage } = this.state;
        if (whichPage != key) {
            this.setState({ whichPage: key });
        }
    }

    componentDidMount() {
        this.getTemplates(ROOTID);
        this.leftContent.addEventListener('wheel', function (event) {
            event.stopPropagation();
        });
        this.rightContent01.addEventListener('wheel', function (event) {
            event.stopPropagation();
        });
        this.rightContent02.addEventListener('wheel', function (event) {
            event.stopPropagation();
        });
        document.styleSheets[0].insertRule('#leftContent::-webkit-scrollbar {display: none}', 0);
        document.styleSheets[0].insertRule('#rightContent01::-webkit-scrollbar {display: none}', 0);
        document.styleSheets[0].insertRule('#rightContent02::-webkit-scrollbar {display: none}', 0);
    }

    render() {
        const { templates, isExpand, whichPage, selectedInstance: { id, templateId, namespace, appName, template, enName, properties, services } } = this.state;
        const propsArray = properties.slice(0, 5);
        return (
            <div style={Container}>
                <div style={leftTotal}>
                    <div style={leftTitle}>对象模型</div>
                    <div style={leftContent} ref={ref => this.leftContent = ref} id='leftContent'>
                        <Tree
                            showIcon={true}
                            loadData={this.onLoadData}
                            expandedKeys={isExpand}
                            onExpand={this.onExpand}
                            onSelect={this.onSelect}
                        >
                            {this.renderTreeNodes(templates)}
                        </Tree >
                    </div>
                </div>
                <div style={rightTotal}>
                    <div style={rightTitle01}>自动生成前后端服务(请Ctrl+C并Ctrl+V)</div>
                    <div style={rightTitle02}>
                        <Tabs defaultActiveKey="back" onChange={this.onTabsChange}>
                            <TabPane tab="后端服务脚本[天基]" key="back">
                            </TabPane>
                            <TabPane tab="前端APP脚本[天坊]" key="front">
                            </TabPane>
                        </Tabs>
                    </div>
                    <div style={rightContent01} id='rightContent01' ref={ref => this.rightContent01 = ref}>
                        {
                            whichPage == 'back' ?
                                <BackCode namespace={namespace} template={template} enName={enName} propsArray={propsArray} />
                                : <FrontCode namespace={namespace} template={template} enName={enName} propsArray={propsArray} />
                        }
                    </div>
                    <div style={rightContent02} id='rightContent02' ref={ref => this.rightContent02 = ref}>
                        <p style={{ ...pStyle, color: '#1b9d13', fontWeight: 'bold' }}>基本信息
                            <Tag color="volcano" onClick={_ => this.onRedirect(id, templateId)} style={{ marginLeft: '8px' }}>Go</Tag></p>
                        <p style={pStyle}>命名空间 : {namespace}</p>
                        <p style={pStyle}>模板名称 : {template}</p>
                        <p style={pStyle}>实例名称 : {enName}</p>
                        <p style={{ ...pStyle, color: '#1b9d13', fontWeight: 'bold' }}>对象属性</p>
                        <p style={{ ...pStyle, color: 'gray' }}>
                            <span style={firstSpan}>名称</span>
                            <span style={secondSpan}>空间</span>
                            <span style={thirdSpan}>别名</span>
                            <span style={fourthSpan}>类型</span>
                        </p>
                        {
                            properties.map((item, index) =>
                                <p style={pStyle}>
                                    <span style={firstSpan}>{item.name}</span>
                                    <span style={secondSpan}>{item.namespace}</span>
                                    <span style={thirdSpan}>{item.enName}</span>
                                    <span style={fourthSpan}>{item.dataType}</span>
                                </p>
                            )
                        }
                        <p style={{ ...pStyle, color: '#1b9d13', fontWeight: 'bold' }}>自定义服务</p>
                        {
                            services.map((item, index) =>
                                <div>
                                    <p style={pServiceStyle}>名称 : {item.name}</p>
                                    <p style={{ ...pServiceStyle, fontWeight: 'bold' }}>别名  :  {item.namespace}.{item.enName}</p>
                                    {item.inputs.length > 0 && <p style={pServiceStyle}>参数</p>}
                                    {
                                        item.inputs.length > 0 && item.inputs.map(item =>
                                            <p style={pServiceStyle}>
                                                <span style={firstSpan}>{item.enName}</span>
                                                <span style={secondSpan}>{item.dataType}</span>
                                                <span style={thirdSpan}>{item.comment}</span>
                                            </p>
                                        )
                                    }
                                    <br />
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
        );
    }
}

const height = '100%';
const Container = {
    height
}

const leftTotal = {
    height,
    float: 'left',
    width: '22%',
}
const title = {
    textAlign: 'center',
    lineHeight: '40px',
    fontWeight: 'bold',
    fontSize: '16px',
    color: 'white'
}
const leftTitle = {
    ...title,
    backgroundColor: 'rgb(84, 205, 205)'

}
const leftContent = {
    height: '96%',
    overflow: 'auto'
}

const rightTotal = {
    height,
    float: 'left',
    width: '78%',
    position: 'relative'
}

const rightTitle01 = {
    ...title,
    backgroundColor: 'rgb(91, 155, 213)'
}

const rightTitle02 = {
    height: '45px',
    width: '78%',
    textAlign: 'center',
    borderLeft: '1px solid #D1D1D1',
    borderRight: '1px solid #D1D1D1'
}

const rightContent = {
    height: '92%',
    overflow: 'auto',
    position: 'absolute'
}
const rightContent01 = {
    ...rightContent,
    width: '78%',
    top: '84px'
}
const rightContent02 = {
    ...rightContent,
    width: '22%',
    top: '40px',
    left: '78%'
}
const pStyle = {
    margin: '8px 15px',
    padding: '8px 8px',
    fontSize: '14px'
}
const spanStyle = {
    display: 'inline-block',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: "nowrap"
}
const firstSpan = {
    width: "25%",
    ...spanStyle
}
const secondSpan = {
    width: "24%",
    ...spanStyle
}
const thirdSpan = {
    width: "35%",
    ...spanStyle
}
const fourthSpan = {
    width: "16%",
    ...spanStyle
}

const pServiceStyle = {
    margin: '2px 15px',
    padding: '2px 8px',
    fontSize: '14px'
}
export default CustomComp;