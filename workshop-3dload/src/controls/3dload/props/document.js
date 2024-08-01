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
			<div style={{ width: '100%', padding: '0', display: 'flex', justifyContent: 'flex-start' }} size='big'>
				<Button type="dashed" onClick={this.showModal} block>使用说明</Button>
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
		description: '模型加载器说明',
		code: `
			加载器使用three.js加载模型，支持的功能为模型查看、模型旋转动画、鼠标控制、HDR场景加载。
			仅支持OBJ与GLTF格式，不支持FBX格式。
			模型文件建议放置在静态资源中，如使用第三方模型文件链接可能会出现加载失败的情况。
			其中OBJ格式如需加载MTL文件，请将贴图文件按照原模型文件路径放置在静态资源中。
			可调整参数说明：
				环境贴图链接: 使用HDR场景文件链接，如无HDR场景文件，请使用默认值。
				模型文件类型: 选择要加载OBJ或GLTF格式文件。
				模型链接: 放置模型文件链接，如使用第三方模型文件链接可能会出现加载失败的情况。
				材质链接：放置MTL材质链接，当选择GLTF文件时不需要填写。
				光照风格：提供了3种常用光照选择，可以进行测试选择最合适的光照。
				光照亮度：强度范围为0~1。
				缩放比例: 模型缩放，默认值为1。
				模型位置X轴：模型位置X轴，水平方向位置，正数向右，负数向左，默认值为0。
				模型位置Y轴：模型位置Y轴，垂直方向位置，正数向下，负数向上，默认值为0。
				模型位置Z轴：模型位置Z轴，前后方向位置，正数向前，负数向后，默认值为0。
				模型角度X轴：模型角度X轴，水平方向角度，正数向右，负数向左，默认值为0。
				模型角度Y轴：模型角度Y轴，垂直方向角度，正数向下，负数向上，默认值为0。
				模型角度Z轴：模型角度Z轴，前后方向角度，正数向前，负数向后，默认值为0。
				是否可控：开启模型的控制，开启后可以通过鼠标控制模型旋转。
				滚轮缩放：开启后可以通过鼠标滚轮控制模型缩放。
				键盘控制：开启后可以通过键盘控制模型旋转。
				启用阻尼：开启后可以通过鼠标控制模型旋转时产生惯性效果。
				阻尼系数：控制惯性效果，数值越大惯性效果越明显，默认值为0.1。
				动画效果：控制模型是否具有动画效果，默认值为false。
				X轴动画速度：控制模型在X轴方向旋转速度，默认值为0。
				Y轴动画速度：控制模型在Y轴方向旋转速度，默认值为0。
				Z轴动画速度：控制模型在Z轴方向旋转速度，默认值为0。
		`
	}
]