/**
 * @description 请求配置
 */
export enum HttpEnum {
  SUCCESS = 200,
  ERROR = 500,
  OVERDUE = 401,
  TIMEOUT = 30000,
  TYPE = 'success'
}

/**
 * @description 请求类型
 */
export enum HttpType {
  GET = 'get',
  POST = 'post',
  PUT = 'put',
  DELETE = 'delete'
}

/**
 * @description 常用的 contentType 类型
 */
export enum ContentTypeEnum {
  // json
  JSON = 'application/json;charset=UTF-8',
  // text
  TEXT = 'text/plain;charset=UTF-8',
  // form-data qs
  FORM = 'application/x-www-form-urlencoded;charset=UTF-8',
  // form-data upload
  UPLOAD = 'multipart/form-data;charset=UTF-8'
}
