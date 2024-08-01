import React, { Component } from 'react';
import { Button, Modal, Collapse } from 'antd';
import 'text.css'
const { Panel } = Collapse;

var css = document.createElement('style');

css.innerHTML = `
	.ant-collapse-content > .ant-collapse-content-box {
		padding-top: 0
	}
`

document.getElementsByTagName('head')[0].appendChild(css);


class CustomComp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
        }
    }
    showModal = () => {
        this.setState({ visible: true })
    }
    closeModal = () => {
        this.setState({ visible: false })
    }

    render() {
        return (
            <div style={{ width: '100%', padding: '5px', display: 'flex', justifyContent: 'flex-end' }} size='small'>
                <Button type="dashed" onClick={this.showModal}>使用说明</Button>
                <Modal
                    title="使用说明"
                    visible={this.state.visible}
                    onOk={this.closeModal}
                    onCancel={this.closeModal}
                    width={600}
                    footer={null}
                >
                    <div style={{ height: '50vh', overflow: 'auto', padding: '5px 0' }}>
                        <Collapse>
                            {
                                docList.map(item => (
                                    <Panel header={`${item.functionName}   ${item.description}`} key={item.functionName}>
                                        <code style={{ whiteSpace: 'pre-line' }}>
                                            {item.code}
                                        </code>
                                    </Panel>
                                ))
                            }
                        </Collapse>
                    </div>

                </Modal>
            </div>
        );
    }
}

export default CustomComp;


const docList = [
    {
        functionName: '',
        description: '描述',
        code: `
        简单的文字提示气泡框。
        何时使用:
        鼠标移入则显示提示，移出消失，气泡浮层不承载复杂文本和操作。
        可用来代替系统默认的 title 提示，提供一个文字的文案解释。
        `
    },
    {
        functionName: '',
        description: '数据源结构',
        code: `
        支持返回的数据格式:
        text为文本展示的内容,title为鼠标移入时气泡展示的内容
        var source =
        {
            "text": "内容一",
            "title": "Prompt Text"
        }
        source
        `
    },
    {
        functionName: 'getValue()',
        description: '获取text和title的值',
        code: `var data = scriptUtil.getRegisterReactDom(组件id).getValue();
        console.log(data)`
    },
    {
        functionName: 'setSource()',
        description: '设置text和title的值',
        code: `var ctrl = scriptUtil.getRegisterReactDom(组件id);
        var source =
        {
            "text": "内容一",
            "title": "Prompt Text"
        }
        ctrl.setSource(source);
        `
    }


    // {
    //     functionName: '',
    //     description: '基础说明',
    //     code: `
    // 		引导用户按照流程完成任务的导航条。
    // 		当任务复杂或者存在先后关系时，将其分解成一系列步骤，从而简化任务。

    // 		在其他组件内容加载事件中，不能通过scriptUtil.getRegisterReactDom来获取可编程组件的实例，其他事件中则不受此影响
    // 	`
    // },
]