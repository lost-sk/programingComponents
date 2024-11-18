import * as crypto from 'crypto'
import suposrc from '../.suposrc.json'
import Axios from 'axios'
console.log('suposrc', suposrc)
const ak = suposrc.information.accountkey
const sk = suposrc.information.secretkey

const supOSUrl = suposrc.information.server

//对查询参数进行排序
function sortQuery(jsonObj) {
  if (jsonObj == null) return ''
  const lowerCasekeyObj = {}
  const lowerCasekeyArr = []
  for (const key in jsonObj) {
    const lowerKey = key.toLowerCase()
    lowerCasekeyArr.push(lowerKey)
    lowerCasekeyObj[lowerKey] = jsonObj[key]
  }
  let res = ''
  lowerCasekeyArr.sort()
  for (const i in lowerCasekeyArr) {
    const key = lowerCasekeyArr[i]
    res += lowerCasekeyArr[i] + '=' + lowerCasekeyObj[key] + '&'
  }
  return res.substring(0, res.length - 1)
}

function buildSignString(uri, methodName, queryJson, headerJson) {
  let signStr = ''
  // HTTP Schema
  signStr = signStr + methodName + '\n'
  // HTTP URI
  signStr = signStr + uri + '\n'
  // HTTP ContentType
  signStr = signStr + headerJson['Content-Type'] + '\n'
  // CanonicalQueryString
  signStr = signStr + sortQuery(queryJson) + '\n' + '\n'
  return signStr
}

//使用aksk方式签名
function signHeader(uri, methodName, queryJson, headerJson) {
  let signStr = buildSignString(uri, methodName, queryJson, headerJson)

  let signature = crypto.createHmac('sha256', sk).update(signStr, 'utf8').digest('hex')
  let final_signature = 'Sign ' + ak + '-' + signature

  headerJson['Authorization'] = final_signature
}

const axios = Axios.create({
  headers: { 'Content-Type': 'application/json;charset=utf-8' },
  httpsAgent: new https.Agent({ rejectUnauthorized: false }),
})

// var url = '/api/openapi/notification/v1/message';
// var param = {
//   method: 'POST', //请求类型，可选GET、POST、PUT、DELETE
//   body: {} //非必填
//   headers: {} //非必填
// };

const request = (url, params) => {
  // 简单判断是否为相对地址，相对地址参与aksk计算
  function isAbsoluteURL(url) {
    const pattern = /^(https?:\/\/)/i
    return pattern.test(url)
  }
  if (isAbsoluteURL(url)) {
    return axios({ ...params, url, method: params.method.toLowerCase() })
  } else {
    const holeUrl = new URL(supOSUrl + url)
    const params1 = new URLSearchParams(holeUrl.search)
    params.headers = { ...params?.headers, 'Content-Type': 'application/json;charset=utf-8' }
    if (!params.headers.hasOwnProperty('Authorization')) {
      signHeader(url, method.toUpperCase(), params1, headers)
    }
    return axios({ ...params, url: holeUrl.href, method: params.method.toLowerCase() })
  }
}

const executeScriptService = (params) => {}

export const scriptUtil = {
  request,
  executeScriptService,
}
