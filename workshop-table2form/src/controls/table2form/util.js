/**
 * @desc 封装的 scriptUtil中获取用户信息 请求
 * @return Promise
 */

const getUserInfo = async () => {
  return new Promise((resolve, reject) => {
    scriptUtil.getUserInfo((res) => {
      resolve(res.userInfo)
    })
  })
}

/**
 * @desc 封装的 scriptUtil中获取服务数据 请求
 * @param {String} objName  -命名空间
 * @param {String} serviceName -服务名
 * @param {Object} params -参数
 * @return Promise
 */
const fetchService = async ({ objName, serviceName, params = {} }) => {
  return new Promise((resolve, reject) => {
    scriptUtil.executeScriptService({
      objName, // 模板 或者 实例
      serviceName, // 服务名
      // 入参
      params,
      version: 'V2',
      // 回调函数
      cb: (res) => {
        resolve(res)
      },
      // 可自定义补充请求参数
    })
  })
}

/**
 * @desc 封装的 scriptUtil中请求api接口的方法
 * @param {String} url  -接口地址
 * @param {param} param -请求参数{method: 'GET',...}
 * @return Promise
 */

const request = async (url, param) => {
  return new Promise((resolve, reject) => {
    scriptUtil.request(url, param).then((res) => {
      resolve(res)
    })
  })
}
/**
 * @desc 封装的 feach请求api接口的方法
 * @param {String} url  -接口地址
 * @param {param} param -请求参数{method: 'GET',...}
 * @return Promise
 */

const feachRequest = async (url, param) => {
  return new Promise((resolve, reject) => {
    fetch(url, param)
      .then((response) => response.json())
      .then((res) => resolve(res))
  })
}

/**
 * @desc 封装的 加载js文件的方法
 * @param {String} url  -js文件地址
 * @return Promise
 */
const loadScript = (src) => {
  return new Promise((resolve) => {
    const script = document.createElement('script')
    script.type = 'text/javascript'
    script.src = src
    document.body.appendChild(script)
    script.onload = resolve
  })
}

/**
 * @desc 封装的组件绑定数据源后请求数据的方法
 * @param {Object} dynamicDataSource  -js文件地址
 * @return Promise
 */
const fetchSourceData = (dynamicDataSource) => {
  if (_.isEmpty(dynamicDataSource)) return

  let objName = ''
  let serviceName = ''
  let params = {}

  if (dynamicDataSource.key == 'template') {
    objName =
      dynamicDataSource.selectedTemplate.namespace + '.' + dynamicDataSource.selectedTemplate.name
  } else {
    objName =
      dynamicDataSource.selectedTemplate.namespace +
      '.' +
      dynamicDataSource.selectedTemplate.name +
      '/' +
      dynamicDataSource.selectedInstance.name
  }

  if (dynamicDataSource.subTab == 'service') {
    serviceName =
      dynamicDataSource.selectedProp.namespace + '.' + dynamicDataSource.selectedProp.name
  } else {
    serviceName = 'system.getPropertyValue'
    params = {
      propName: dynamicDataSource.selectedProp.propertyName,
    }
  }

  return new Promise((resolve, reject) => {
    scriptUtil.executeScriptService({
      objName, // 模板 或者 实例
      serviceName, // 服务名
      // 入参
      params,
      version: 'V2',
      // 回调函数
      cb: (res) => {
        resolve(res)
      },
      // 可自定义补充请求参数
    })
  })
}

const deleteDataTableEntries = ({ templateName, condition }) => {
  return new Promise((resolve, reject) => {
    scriptUtil.executeScriptService({
      objName: templateName, // 模板 或者 实例
      serviceName: 'DeleteDataTableEntries', // 服务名
      // 入参
      params: condition,
      version: 'V2',
      // 回调函数
      cb: (res) => {
        resolve(res)
      },
      // 可自定义补充请求参数
    })
  })
}

const addDataTableEnty = ({ templateName, condition }) => {
  return new Promise((resolve, reject) => {
    scriptUtil.executeScriptService({
      objName: templateName, // 模板 或者 实例
      serviceName: 'AddDataTableEntry', // 服务名
      // 入参
      params: condition,
      version: 'V2',
      // 回调函数
      cb: (res) => {
        resolve(res)
      },
      // 可自定义补充请求参数
    })
  })
}

const UpdateDataTableEntry = ({ templateName, condition }) => {
  return new Promise((resolve, reject) => {
    scriptUtil.executeScriptService({
      objName: templateName, // 模板 或者 实例
      serviceName: 'UpdateDataTableEntry', // 服务名
      // 入参
      params: condition,
      version: 'V2',
      // 回调函数
      cb: (res) => {
        resolve(res)
      },
      // 可自定义补充请求参数
    })
  })
}

const AddDataTableEntries = ({ templateName, condition }) => {
  return new Promise((resolve, reject) => {
    scriptUtil.executeScriptService({
      objName: templateName, // 模板 或者 实例
      serviceName: 'AddDataTableEntries', // 服务名
      // 入参
      params: condition,
      version: 'V2',
      // 回调函数
      cb: (res) => {
        resolve(res)
      },
      // 可自定义补充请求参数
    })
  })
}

module.exports = {
  AddDataTableEntries,
  UpdateDataTableEntry,
  addDataTableEnty,
  deleteDataTableEntries,
  fetchSourceData,
  getUserInfo,
  fetchService,
  request,
  feachRequest,
  loadScript,
}
