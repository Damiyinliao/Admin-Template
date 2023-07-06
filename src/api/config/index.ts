import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosError,
  InternalAxiosRequestConfig
} from 'axios';
import { HttpEnum } from '@/enums/httpEnum';

const config = {
  // 默认请求地址，可在 .env.** 文件中修改
  baseURL: import.meta.env.VITE_API_URL,
  // 请求超时时间
  timeout: HttpEnum.TIMEOUT,
  // 跨域是否携带凭证
  withCredentials: true
};

class RequestHttp {
  service: AxiosInstance;
  constructor(config: AxiosRequestConfig) {
    // 创建 axios 实例
    this.service = axios.create(config);

    /**
     * @description 请求拦截器
     *
     */
    this.service.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {},
      (error: AxiosError) => {
        return Promise.reject(error);
      }
    );
  }
}
