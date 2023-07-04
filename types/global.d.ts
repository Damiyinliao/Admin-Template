export {};

declare global {
  type Recordable<T = any, K = string> = Record<K extends null | undefined ? string : K, T>;

  type AxiosMethod = 'get' | 'post' | 'delete' | 'put' | 'GET' | 'POST' | 'DELETE' | 'PUT';
  // 请求返回的数据类型
  interface AxiosConfig {
    params?: unknown;
    data?: unknown;
    url?: string;
    method?: AxiosMethod;
    headersType?: string;
    responseType?: AxiosResponseType;
  }
  // Vite环境变量
  interface ViteEnv {
    VITE_USER_NODE_ENV: 'development' | 'production' | 'test';
    VITE_GLOB_APP_TITLE: string;
    VITE_PORT: number;
    VITE_OPEN: boolean;
    VITE_REPORT: boolean;
    VITE_BUILD_COMPRESS: 'gzip' | 'brotli' | 'gzip,brotli' | 'none';
    VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE: boolean;
    VITE_DROP_CONSOLE: boolean;
    VITE_PWA: boolean;
    VITE_PUBLIC_PATH: string;
    VITE_API_URL: string;
    VITE_PROXY: [string, string][];
  }
}
