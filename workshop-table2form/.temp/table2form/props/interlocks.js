import React, { Component } from 'react';
import { Divider, Button, Modal, Input, Row, Col, Checkbox } from 'antd';

class CustomComp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      // formList: !_.isEmpty(props.getInfo()) ? props.getInfo() : {},
      selectedInput: null,
      bindInputs: _.get(props.getInfo(), 'bindInputs', {}), // 新增状态用于追踪已选中的输入项
			intlData: _.get(props.getInfo(), 'intlData', {}),
    };
  }

  // 处理单击选中项
	handleItemClick = (itemName) => {
		this.setState({ selectedInput: itemName });
	};
	

  // 关闭弹窗
  handleCancel = (e) => {
    this.setState({ visible: false });
  };

  // 打开弹窗
  showModal = () => {
    this.setState({ visible: true });
  };

	handleOk = (e) => {
		const { bindInputs, intlData } = this.state;
		this.props.edit({ bindInputs, intlData })
    this.setState({ visible: false });
  };


  inputChange = (value, key) => {
		const { intlData } = this.state;
    intlData[key] = value;
		this.setState({ intlData })
  };

	changeCheck = (e, item) => {
		const { bindInputs, selectedInput } = this.state;
		if (e.target.checked) {
			bindInputs[item.config.formItemId] = {...item, bindInputName: selectedInput };
		} else {
			delete bindInputs[item.config.formItemId]
		}
		this.setState({ bindInputs })
  };


	render() {
		const { visible, selectedInput, bindInputs, intlData } = this.state;
		const ctrls = _.get(this.props, 'editComponent.props.ctrls', []).filter(item => !!_.get(item, 'config.formItemId'))
		// TODO: 后续可以考虑修改此部分代码，目前写法限定index.json中数据源选择器的name必须为object
		// const { inputs = [] } = _.get(this.props, 'editComponent.props.data._attrObject.data.object.dynamicDataSource.selectedProp', {});


		const dynamicDataSource = _.get(this.props, 'editComponent.props.data._attrObject.data.object.dynamicDataSource');
		let { inputs = [] } = _.get(dynamicDataSource, 'selectedProp', {});
    // 选择表单模板下的属性时，dynamicDataSource是个数组，其他情况下是 {}
    const isFormProperty = Array.isArray(dynamicDataSource);
    if (isFormProperty) {
			inputs = _.get(dynamicDataSource[0], 'selectedProp', []).map(item => {
				return {
					...item,
					name: item.propertyName,
				}
			})
    }
    
		return (
			<div style={{ width: '250px', padding: '5px' }}>
				<div>
					<Button type="dashed" onClick={this.showModal}>
						绑定联动关系
					</Button>
				</div>

				<Modal
					title="联动对象"
					visible={visible}
					maskClosable={false}
					width="60%"
					onOk={this.handleOk}
					onCancel={this.handleCancel}
				>
					<Divider orientation="left">控件参数设置</Divider>
					<Row>
						{
							inputs.map(item => {
								return (
									<Col span={12} key={item.name} style={{ marginBottom: '8px' }}>
										<Row align='middle' justify='space-around' type='flex'>
											<Col span={5} style={{ textAlign: 'right' }}>{item.name} ：</Col>
											<Col span={1}></Col>
											<Col span={18}>
												<Input value={intlData[item.name]} onChange={e => this.inputChange(e.target.value, item.name)} />
											</Col>
										</Row>
									</Col>
								)
							})
						}
					</Row>
					<Divider orientation="left">联动配置</Divider>
          <Row>
            <Col span={9} style={{ border: '1px solid #ced3db',minHeight: 200, overflow: 'auto' }}>
						{
							inputs.map(item => (
								<div
									key={item.name}
									onClick={() => this.handleItemClick(item.name)}
									style={{
										height: '32px',
										cursor: 'pointer',
										lineHeight: '32px',
										padding: '0 16px',
										backgroundColor: selectedInput === item.name ? '#bae7ff' : 'transparent',
										
									}}
								>
									{`${item.name} (${item.primitiveType})`}
								</div>
							))
						}
            </Col>
            <Col span={1}></Col>
            <Col span={14} style={{ border: '1px solid #ced3db' ,minHeight: 200, overflow: 'auto'  }}>
              {ctrls.map((item) => 
							 {
								const checked = _.get(bindInputs, `${item.config.formItemId}.config.formItemId`) === item.config.formItemId;
								return (
									<div
										key={item.key}
										style={{
											height: '32px',
											lineHeight: '32px',
											padding: '0 16px',
										}}
									>
										<Checkbox
											disabled={ !selectedInput || (checked && _.get(bindInputs, `${item.config.formItemId}.bindInputName`) != selectedInput)  }
											onChange={(e) => { this.changeCheck(e, item) }}
											checked = { checked }
										>
											{`${item.config.formItemId} (${item.key})`} &nbsp;&nbsp;{ _.get(bindInputs, `${item.config.formItemId}.bindInputName`)}
										</Checkbox>
									</div>
								)
							 }
							)}
            </Col>
          </Row>
        </Modal>
      </div>
    );
  }
}

export default CustomComp;