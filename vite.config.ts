import { defineConfig, ConfigEnv, UserConfig, loadEnv } from 'vite';

import { createVitePlugins } from './build/plugins';
import { wrapperEnv } from './build/getEnv';

import { resolve } from 'path';

export default defineConfig(({ mode }: ConfigEnv): UserConfig => {
  // 项目根目录
  const root = process.cwd();
  // 环境变量
  const env = loadEnv(mode, root);
  // 环境变量
  const viteEnv = wrapperEnv(env);
  return {
    base: env.VITE_BASE_PATH, // 部署时的路径
    root, // 项目根目录
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'), // 设置别名
        '~': resolve(__dirname, 'public') // 设置别名
      }
    },
    plugins: createVitePlugins(viteEnv),
    server: {
      host: '0.0.0.0', // 设置服务器启动的 IP
      port: viteEnv.VITE_PORT, // 设置服务器启动的端口号
      open: viteEnv.VITE_OPEN, // 设置服务器启动时是否自动打开浏览器
      //cors: true // 允许跨域
      https: false // 是否开启 https
      //proxy: createProxy(viteEnv.VITE_PROXY) // 设置代理
    }
  };
});
