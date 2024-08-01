import React, { Component } from 'react'
import { Button, Modal, Collapse } from 'antd'
const { Panel } = Collapse

var css = document.createElement('style')

css.innerHTML = `
	.ant-collapse-content > .ant-collapse-content-box {
		padding-top: 0
	}
`

document.getElementsByTagName('head')[0].appendChild(css)

class CustomComp extends Component {
  constructor(props) {
    super(props)
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
      <div
        style={{ width: '250px', padding: '5px', display: 'flex', justifyContent: 'flex-end' }}
        size="small"
      >
        <Button type="dashed" onClick={this.showModal}>
          使用说明
        </Button>
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
              {docList.map((item) => (
                <Panel
                  header={`${item.functionName}   ${item.description}`}
                  key={item.functionName}
                >
                  <code style={{ whiteSpace: 'pre-line' }}>{item.code}</code>
                </Panel>
              ))}
            </Collapse>
          </div>
        </Modal>
      </div>
    )
  }
}

export default CustomComp

const docList = [
  {
    functionName: '',
    description: '基础说明',
    code: `
    用旋转魔方来套住图片和文字进行酷炫展示，图片和文字来之于服务，我们可以将图片上传到静态资源，然后复制地址放置到服务中，也可以通过服务方式获取对象属性的值、表单模版的值或者第三方API返回的值，转成字符串类型放到服务中(服务的数据结构参考服务demo)。
    服务返回的图片和字符串会显示在魔方不同的面，这种控件适合在大屏上展示。
		`,
  },
  {
    functionName: '',
    description: '图片要求',
    code: `
    图片最好控制在512*512像素以下，否则图片太大会加载较慢，同时，图片制作的时候，图片的边缘留白多一点，防止图片中的实物溢出魔方。
    图片地址支持相对路径，假如图片存放在supOS静态资源中，推荐使用相对路径，方便移植
		`,
  },
  {
    functionName: '',
    description: '文字要求',
    code: `
    如果魔方某一面显示要属性值，当属性的值比较长，魔方面会将溢出部分给隐藏掉，开发者最好自行做四舍五入控制好长度。
		`,
  },
  {
    functionName: '',
    description: '刷新要求',
    code: `
    1、刷新支持小位，例如填写11.6，那么就是11600毫秒，魔方6个面显示一个周期大概11.6秒；
    2、刷新时长最好设置>5分钟，因为魔方刷新会重新渲染魔方，频繁刷新会有抖动的问题。
		`,
  },
  {
    functionName: '',
    description: '数据服务说明',
    code: `
		// 将下方代码复制至对象模型服务里面绑定即可
		/**
		 * 参数注解
		 * url:图片url，优先选择该属性，图片尺寸建议为512*512
		 * text:文字，长度建议在6字节内
     * 数组长度必须为5
		 * /
		var ArrayList = Java.type("java.util.ArrayList");
		var mockList = [
        {
          url: 'http://xxx.com/pic1.png',
        }, 
        {
          url: 'http://xxx.com/pic2.png',
        }, 
        {
          url: 'http://xxx.com/pic3.png',
        },
        {
          text: 'Hello',
        },
        {
          text: 'World',
        }
    ];

		var result = {
			list: new ArrayList(mockList),
		};
		result;
		`,
  },
  {
    functionName: '',
    description: '个数要求',
    code: `
    因控件3D渲染对浏览器资源消耗较大，如果客户端电脑性能一般，推荐一个页面放两个旋转魔方。
		`,
  },
]
