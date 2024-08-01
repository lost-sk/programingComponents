import React, { Component } from 'react';
import { Button, Modal, Collapse } from 'antd';
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
			<div style={{ width: '100%', padding: '5px', display: 'flex', justifyContent: 'flex-start' }} size='small'>
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
		description: '模拟数据服务',
		code: `
		// 将下方代码复制至对象模型服务里面绑定即可
		/**
		 * 参数注解
		 * name：名称
		 * label：标题
		 * description：提示框内容
		 * /
		var ArrayList = Java.type("java.util.ArrayList");
		var mockList = [{
			name: '首次生物',
			label: '1951：第一批太空犬',
			description: '1951年7月22日第一批狗（Dezik 和 Tsygan）送上太空'
		}, {
			name: '人造卫星',
			label: '1957: 第一颗人造卫星',
			description: '1957年十月4日，发射第一颗人造卫星，第一次接收到来自太空的信号'
		}, {
			name: '载人航天',
			label: '1961：首次载人航天(尤里加加林)',
			description: '首次载人航天(尤里加加林)，首次载人轨道飞行'
		}, {
			name: '登陆月球',
			label: '1969：人类首次登陆月球',
			description: 'First human on the Moon, and first space launch from a celestial body other than the Earth. First sample return from the Moon'
		}, {
			name: '空间站',
			label: '1971: 第一个太空空间站',
			description: 'Salyut 1 was the first space station of any kind, launched into low Earth orbit by the Soviet Union on April 19, 1971.'
		}, {
			name: '阿波罗-联盟号试验计划',
			label: '1975: First multinational manned mission',
			description: 'The mission included both joint and separate scientific experiments, and provided useful engineering experience for future joint US–Russian space flights, such as the Shuttle–Mir Program and the International Space Station.'
		}];

		var result = {
			list: new ArrayList(mockList),
		};
		result;
		`
	},
	{
		functionName: 'getValue',
		description: '获取组件数据',
		code: `
			// 内容包含全部组件数据
			var data = scriptUtil.getRegisterReactDom(组件id).getValue();
			console.log(data)
		`
	},
	{
		functionName: '',
		description: '点击事件示例',
		code: `
			// 输出当前点击的节点，便于添加跳转或下钻事件
			console.log('触发编辑的点击事情')
			console.log(event.point)
		`
	},
	{
		functionName: 'setSource',
		description: '页面脚本设置当前组件的填充数据',
		code: `
		var data = [{
			name: '首次生物',
			label: '1951：第一批太空犬',
			description: '1951年7月22日第一批狗（Dezik 和 Tsygan）送上太空'
		}, {
			name: '人造卫星',
			label: '1957: 第一颗人造卫星',
			description: '1957年十月4日，发射第一颗人造卫星，第一次接收到来自太空的信号'
		}, {
			name: '载人航天',
			label: '1961：首次载人航天(尤里加加林)',
			description: '首次载人航天(尤里加加林)，首次载人轨道飞行'
		}, {
			name: '登陆月球',
			label: '1969：人类首次登陆月球',
			description: 'First human on the Moon, and first space launch from a celestial body other than the Earth. First sample return from the Moon'
		}, {
			name: '空间站',
			label: '1971: 第一个太空空间站',
			description: 'Salyut 1 was the first space station of any kind, launched into low Earth orbit by the Soviet Union on April 19, 1971.'
		}, {
			name: '阿波罗-联盟号试验计划',
			label: '1975: First multinational manned mission',
			description: 'The mission included both joint and separate scientific experiments, and provided useful engineering experience for future joint US–Russian space flights, such as the Shuttle–Mir Program and the International Space Station.'
		}]
			scriptUtil.getRegisterReactDom(组件ID).setSource(data)
		`
	},
]