import React, { Component } from 'react'
import { Tree, Spin } from 'antd'

const { TreeNode } = Tree

const listToTree = (list) => {
  const map = {}
  const tree = []

  // 将列表中的每个项按照id映射到map对象中
  list.forEach((item) => {
    map[item.id] = { ...item, children: [] }
  })

  // 将每个项连接到其父项
  list.forEach((item) => {
    if (item.parentTemplate.id && item.parentTemplate.id !== 10) {
      if (map[item.parentTemplate.id]) {
        //假如元素的父节点已经被过滤掉了 就 不添加子节点
        map[item.parentTemplate.id].children.push(map[item.id])
      }
    } else {
      tree.push(map[item.id])
    }
  })

  return tree
}

const tree2list = (tree) => {
  const list = []

  // 辅助函数，用于递归遍历树形结构
  const traverse = (node) => {
    list.push({
      ...node,
      // 如果存在父节点ID，则添加parentTemplate属性
      parentTemplate: node.parent ? { id: node.parent.id } : undefined,
    })
    // 递归处理子节点
    node.children.forEach((child) => traverse(child))
  }

  // 遍历树的根节点
  tree.forEach((root) => traverse(root))

  return list
}

const getParentKey = (key, tree) => {
  let parentKey
  for (let i = 0; i < tree.length; i++) {
    const node = tree[i]
    if (node.children) {
      if (node.children.some((item) => item.key === key)) {
        parentKey = node.key
      } else if (getParentKey(key, node.children)) {
        parentKey = getParentKey(key, node.children)
      }
    }
  }
  return parentKey
}

class CustomComp extends Component {
  constructor(props) {
    super(props)
    const config = props?.data?._attrObject.data || {}
    console.log('templateTree this.props.config', config)
    this.interval = null
    this.state = {
      events: config?.events || [],
      service: config?.object?.dynamicDataSource || {},
      interval: config?.interval?.value || '0', //定时刷新时间
      isDesign: props.isDesign === true ? true : false,
      backgroundColor: config?.backgroundColor?.color || '',
      filterString: config?.filterString?.value || '',
      loading: true,
      dataList: [], //服务返回存放
      templateTree: [],
      expandedKeys: [],
      autoExpandParent: true,
      checkedKeys: [],
      selectedKeys: [],
    }
  }
  componentDidMount() {
    scriptUtil.registerReactDom(this, this.props)
    const { filterString } = this.state
    const filterArr = filterString.split(',')
    const ticket = localStorage.getItem('ticket') || ''
    fetch(`/inter-api/oodm-gateway/template/search?keyword=&pageIndex=1&pageSize=2000`, {
      headers: { Authorization: `Bearer ${ticket}` },
    })
      .then((response) => response.json())
      .then((data) => {
        const list = data.data.data || []
        const systemTemplate = [
          'RemoteCollector',
          'LinkObject',
          'VideoObject',
          'HistoryVideoObject',
          'AECollector',
          'sim_model',
        ]
        let EntityList = list.filter(
          (l) =>
            l.type === 'ENTITY' &&
            !systemTemplate.includes(l.enName) &&
            !filterArr.includes(l.enName)
        )
        const templateTree = listToTree(EntityList)
        EntityList = tree2list(templateTree)

        this.setState({
          dataList: EntityList,
          templateTree,
          loading: false,
        })
      })
      .catch((error) => {
        this.setState({
          loading: false,
        })
        console.error('Error:', error)
      })
    this.runCode('componentDidMount', '内容加载事件脚本错误,请打开控制台查看错误信息')
  }

  componentWillUnmount() {
    if (this.interval) {
      clearInterval(this.interval)
    }
  }

  /**
   *
   * @param {*} service oodm服务
   * @param {*} attr 服务返回存放位置
   */
  execService = (service, attr) => {
    var objName = ''
    var serviceName = ''
    var params = {}
    if (service.key == 'template') {
      objName = service.selectedTemplate.namespace + '.' + service.selectedTemplate.name
    } else {
      objName =
        service.selectedTemplate.namespace +
        '.' +
        service.selectedTemplate.name +
        '/' +
        service.selectedInstance.name
    }

    if (service.subTab == 'service') {
      serviceName = service.selectedProp.namespace + '.' + service.selectedProp.name
    } else {
      serviceName = 'system.getPropertyValue'
      params = {
        propName: service.selectedProp.propertyName,
      }
    }

    scriptUtil.executeScriptService({
      objName, // 模板 或者 实例
      serviceName, // 服务的命名空间+服务别名
      // 入参
      params,
      version: 'V2',
      // 回调函数
      cb: (res) => {
        this.setState({
          [attr]: res.data.list,
        })
      },
    })
  }

  getSelectedValue = () => {
    const { checkedKeys, dataList } = this.state
    return dataList.filter((d) => checkedKeys.includes(d.id.toString()))
  }

  runCode = (key, msg, params = null) => {
    const { events } = this.state
    events.forEach((item) => {
      if (item.content === key) {
        this.runScript(item.detail, msg, params)
      }
    })
  }

  runScript = (codeStr, message, params) => {
    try {
      //new function中codeStr脚本可以通过固定的_this来获取当前组件的this,通过params获取入参
      const _this = this
      new Function('_this', 'params', codeStr)(_this, params)
    } catch (error) {
      console.error(error)
      notification.error({
        message: '可编程组件',
        description: message,
      })
    }
  }

  onExpand = (expandedKeys) => {
    //console.log('onExpand', expandedKeys)
    // if not set autoExpandParent to false, if children expanded, parent can not collapse.
    // or, you can remove all expanded children keys.
    this.setState({
      expandedKeys,
      autoExpandParent: false,
    })
  }

  onCheck = (checkedKeys) => {
    //console.log('onCheck', checkedKeys)
    this.setState({ checkedKeys })
  }

  onSelect = (selectedKeys, info) => {
    //console.log('onSelect', info)
    this.setState({ selectedKeys })
  }

  renderTreeNodes = (data) =>
    data.map((item) => {
      if (item.children.length > 0) {
        return (
          <TreeNode title={item.displayName} key={item.id} dataRef={item}>
            {this.renderTreeNodes(item.children)}
          </TreeNode>
        )
      }
      return <TreeNode key={item.id} title={item.displayName} dataRef={item} />
    })

  render() {
    const { loading, templateTree } = this.state
    return (
      <div>
        {loading ? (
          <Spin />
        ) : (
          <Tree
            checkable
            onExpand={this.onExpand}
            expandedKeys={this.state.expandedKeys}
            autoExpandParent={this.state.autoExpandParent}
            onCheck={this.onCheck}
            checkedKeys={this.state.checkedKeys}
            onSelect={this.onSelect}
            selectedKeys={this.state.selectedKeys}
          >
            {this.renderTreeNodes(templateTree)}
          </Tree>
        )}
      </div>
    )
  }
}

export default CustomComp
