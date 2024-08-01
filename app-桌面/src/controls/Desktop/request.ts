import { NAMESPACE } from "./config";

import { getToken } from "./util";

type Method = "GET" | "POST" | "PUT";

interface Request {
  (method: Method, url: string, options?: any): Promise<any>;
  setHeader: <T>(payload: Record<any, any>) => T;
}

let customHeaders: Record<any, any> | null;

const request: Request = (method, url, options) => {

  let headers = {
    "X-Namespace": NAMESPACE,
    Authorization: `Bearer ${getToken()}`,
    Accept: "application/json",
    "Content-Type": "application/json; charset=utf-8",
    "Accept-Language": "zh-cn",
  } as { [K: string]: any };
  if (customHeaders) {
    headers = { ...headers, ...customHeaders };
    customHeaders = null;
  }
  return fetch(url, {
    ...{
      headers,
      method,
    },
    ...(options ? { body: JSON.stringify(options) } : {}),
  })
    .then((res) => res.json())
    .catch((err) => (console.log(`request error:${url}`), console.log(err)));
};

request.setHeader = (payload) => (customHeaders = payload);

export default request;
