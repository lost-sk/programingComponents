import React, { Component } from 'react';
import {Icon, Button,Input} from 'antd';

class CustomComp extends Component {
	constructor(props) {
		super(props);
		this.state = {
			detail: '',
			index: '0',
			formList: !_.isEmpty(props.getInfo()) ? props.getInfo() : [],
			eventList: []
		}
	}

	componentDidMount() {
	}

	// 新增交互事件 
	addItem = () => {
		const list = [...this.state.formList,
		{ id: new Date().valueOf(), content: ''}
		]
		this.setState({ formList: list })
		console.log(this.props)
		this.props.edit(list)
	}
	// 删除事件
	deleteItem = (index) => {
		const list = this.state.formList
		list.splice(index, 1)
		this.setState({ formList: list })
		this.props.edit(list)
	}

	// 颜色输入事件 
	colorOnChange = (index,value) => {
		const list = this.state.formList
		list[index].content = value
		this.setState({ formList: list })
		this.props.edit(list)
	}

	render() {
		const { formList} = this.state;
		return (
			<div style={{ width: '250px', padding: '5px', marginTop: '10px' }}>
				{formList.map((item, index) => {
					return <div key={item.id} style={{ marginBottom: '5px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Input style={{ width: '60%' }} size='small' value={item.content} onChange={(e)=>this.colorOnChange(index,e.target.value)}></Input>
						<input type='color' style={{ width: '20%' }} value={item.content} onChange={(e)=>this.colorOnChange(index,e.target.value)}></input>
						<Button style={{ width: '20%' }} size='small' onClick={this.deleteItem.bind(this, index)}>删除</Button>
					</div>
				})}
				<div  >
					<Button type="dashed" style={{ width: '100%' }} onClick={this.addItem}>
						<Icon type="plus" /> 新增颜色序列
					</Button>
				</div>
			</div>
		);
	}
}

export default CustomComp;