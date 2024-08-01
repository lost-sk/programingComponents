import React, { Component } from 'react'
import { Tree, Empty, Icon } from 'antd'
import './index.css'
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

function list2tree(arr, params = { value: 'id', text: 'name', parent: 'parentId' }) {
  function hasRequiredFields(obj) {
    if (typeof obj !== 'object' || obj === null) {
      return false
    }

    const requiredFields = ['value', 'text', 'parent']
    for (let i = 0; i < requiredFields.length; i++) {
      if (!(requiredFields[i] in obj)) {
        // 如果对象没有该属性，则返回false
        return false
      }
    }
    // 如果对象包含所有所需字段，则返回true
    return true
  }

  if (hasRequiredFields(params) && Array.isArray(arr)) {
    const map = {}
    const roots = []
    const newArr = arr.map((a) => ({
      id: a[params.value],
      name: a[params.text],
      parentId: a[params.parent],
    }))
    newArr.forEach((node) => {
      if (node.id) {
        map[node.id] = { ...node, children: [] }
      }
    })

    // 将每个节点放入其父节点的 children 数组中
    Object.values(map).forEach((node) => {
      if (node.parentId !== null) {
        map[node.parentId].children.push(node)
      } else {
        roots.push(node)
      }
    })

    return roots
  }
  return []
}

function convertTree(tree, params = { value: 'id', text: 'name', children: 'children' }) {
  function hasRequiredFields(obj) {
    if (typeof obj !== 'object' || obj === null) {
      return false
    }

    const requiredFields = ['value', 'text', 'children']
    for (let i = 0; i < requiredFields.length; i++) {
      if (!(requiredFields[i] in obj)) {
        // 如果对象没有该属性，则返回false
        return false
      }
    }
    // 如果对象包含所有所需字段，则返回true
    return true
  }
  function transformData(data) {
    return data.map((item) => {
      const newItem = {
        id: item[params.value],
        name: item[params.text],
        children: item[params.children] ? transformData(item[params.children]) : [],
      }
      return newItem
    })
  }

  if (hasRequiredFields(params) && Array.isArray(tree)) {
    return transformData(tree)
  }
  return []
}

class CustomComp extends Component {
  constructor(props) {
    super(props)
    const config = props?.data?._attrObject.data || {}
    console.log('props', props)
    console.log('Tree2 this.props.config', config)
    this.interval = null

    this.state = {
      events: config?.events || [],
      service: config?.object?.dynamicDataSource || {},
      interval: config?.interval?.value || '0', //定时刷新时间
      isDesign: props.isDesign === true ? true : false,
      backgroundColor: config?.backgroundColor?.color || '#bae7ff',
      checkable: config?.checkable?.value || 'on',
      deleteable: config?.deleteable?.value || 'off',
      expendParent: config?.expendParent?.value || 'on',
      defaultText: config?.defaultText?.value || '暂无内容',
      loading: true,
      dataList: [], //服务返回存放
      dataSource: [],
      expandedKeys: [],
      autoExpandParent: true,
      checkedKeys: [],
      selectedKeys: [],
      setDataSetParam: null,
      setDataTreeParam: null,
    }
  }
  componentDidMount() {
    const { backgroundColor } = this.state
    scriptUtil.registerReactDom(this, this.props)
    setTimeout(() => {
      let targetSheet = null
      for (let i = 0; i < document.styleSheets.length; i++) {
        const sheet = document.styleSheets[i]
        if (sheet.cssRules) {
          for (let j = 0; j < sheet.cssRules.length; j++) {
            if (sheet.cssRules[j].selectorText === '.treeContainer_jsyq') {
              targetSheet = sheet
              break
            }
          }
        }
        if (targetSheet) break
      }

      if (targetSheet) {
        try {
          targetSheet.insertRule(
            `.treeContainer_jsyq .ant-tree-node-selected { background-color: ${backgroundColor} !important; }`,
            targetSheet.cssRules.length
          )
        } catch (error) {
          console.error('Failed to insert rule:', error)
        }
      } else {
        console.log('未找到 targetSheet')
      }
    }, 1000)

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

  runCode = (key, msg, params = null) => {
    const { events } = this.state
    events.forEach((item) => {
      //actionType 0-0 打开链接 1 关闭 2 脚本
      // if (item.action === key && item.actionType === '2') {
      //   this.runScript(item.script, msg, params)
      // }
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

  // 方法1 树.setDataSet
  setDataSet = (list, params) => {
    const arr = list2tree(list, params)
    const defaultKeys = []
    arr.forEach((a) => {
      defaultKeys.push(a.id.toString())
    })
    const { expendParent } = this.state
    this.setState((preState) => ({
      dataSource: arr,
      setDataSetParam: params,
      setDataTreeParam: null,
      expandedKeys: expendParent === 'on' ? defaultKeys : preState.expandedKeys,
    }))
  }
  // 方法2 树.setDataTree
  setDataTree = (tree, params) => {
    const arr = convertTree(tree, params)
    const defaultKeys = []
    arr.forEach((a) => {
      defaultKeys.push(a.id.toString())
    })

    const { expendParent } = this.state
    this.setState((preState) => ({
      dataSource: arr,
      setDataSetParam: null,
      setDataTreeParam: params,
      expandedKeys: expendParent === 'on' ? defaultKeys : preState.expandedKeys,
    }))
  }

  // getSelectedValue = () => {
  //   const { checkedKeys, dataList } = this.state
  //   return dataList.filter((d) => checkedKeys.includes(d.id.toString()))
  // }

  getSelectedKeys = () => {
    return this.state.selectedKeys
  }

  setSelectedKeys = (selectedKeys) => {
    this.setState({ selectedKeys })
  }

  getCheckedKeys = () => {
    return this.state.checkedKeys
  }

  setCheckedKeys = (checkedKeys) => {
    this.setState({ checkedKeys })
  }

  onExpand = (expandedKeys) => {
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
    this.setState({ selectedKeys }, () => {
      if (selectedKeys.length) {
        const item = info.selectedNodes[0].props.dataRef
        const { setDataSetParam, setDataTreeParam } = this.state
        const transItem = setDataSetParam
          ? {
              ...item,
              [setDataSetParam.value]: item.id,
              [setDataSetParam.text]: item.name,
            }
          : {
              ...item,
              [setDataTreeParam.value]: item.id,
              [setDataTreeParam.text]: item.name,
            }
        this.runCode('onSelect', '脚本错误,请打开控制台查看错误信息', transItem)
      }
    })
  }

  getKey = (item = {}) => {
    return item.templateName && item.templateNamespace
      ? `${item.templateNamespace}.${item.templateName}.${item.id}`
      : item.id
  }
  renderTitleNode = (item) => {
    const { deleteable, setDataSetParam, setDataTreeParam } = this.state
    const transItem = setDataSetParam
      ? {
          ...item,
          [setDataSetParam.value]: item.id,
          [setDataSetParam.text]: item.name,
        }
      : {
          ...item,
          [setDataTreeParam.value]: item.id,
          [setDataTreeParam.text]: item.name,
        }
    return (
      <div className="instanceTitle">
        <span>{item.name}</span>
        {deleteable === 'on' && (
          <Icon
            className="instanceIcon"
            type="delete"
            onClick={(e) => {
              e.stopPropagation()
              this.runCode('onDelete', '删除脚本错误,请打开控制台查看错误信息', transItem)
            }}
          />
        )}
      </div>
    )
  }
  renderTreeNodes = (data) =>
    data.map((item) => {
      const key = this.getKey(item)
      if (item.children.length > 0) {
        return (
          <TreeNode title={this.renderTitleNode(item)} key={key} dataRef={item}>
            {this.renderTreeNodes(item.children)}
          </TreeNode>
        )
      }
      return <TreeNode key={key} title={this.renderTitleNode(item)} dataRef={item} />
    })

  render() {
    const { dataSource, checkable, defaultText } = this.state
    return (
      <div className="treeContainer_jsyq">
        {dataSource.length ? (
          <Tree
            checkable={checkable === 'on' ? true : false}
            onExpand={this.onExpand}
            expandedKeys={this.state.expandedKeys}
            autoExpandParent={this.state.autoExpandParent}
            onCheck={this.onCheck}
            checkedKeys={this.state.checkedKeys}
            onSelect={this.onSelect}
            selectedKeys={this.state.selectedKeys}
          >
            {this.renderTreeNodes(dataSource)}
          </Tree>
        ) : (
          defaultText
        )}
      </div>
    )
  }
}

export default CustomComp
