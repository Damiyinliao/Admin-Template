import { defineConfig, ConfigEnv, UserConfig, loadEnv } from 'vite';
import { createVitePlugins } from './build/plugins';
import { wrapperEnv } from './build/getEnv';
import { resolve } from 'path';

// 根据启动命令会自动传入mode参数，可通过mode参数区分开发环境和生产环境 在本项目mode可以是development production test
export default defineConfig(({ mode }: ConfigEnv): UserConfig => {
  // 项目根目录
  const root = process.cwd();
  // 环境变量
  const env = loadEnv(mode, root); // 根据当前工作目录中的 `mode` 加载 .env 文件
  console.log('mode', mode, 'env', env, 'root', root);
  // 环境变量
  const viteEnv = wrapperEnv(env); // 将环境变量转换为对象 其中数字和布尔值会被转换为字符串
  console.log('viteEnv', viteEnv);
  return {
    base: env.VITE_BASE_PATH, // 部署时的路径(即打包路径)
    root, // 项目根目录(index.html 文件所在的位置，此处为根目录F:\Geeker\Vue3-Admin)
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
    },
    build: {
      outDir: viteEnv.VITE_OUT_DIR || 'dist', // 指定输出路径
      //minify: 'esbuild', // 指定构建后的代码压缩方式 // esbuild 打包更快，但是不能去除 console.log，terser打包慢，但能去除 console.log
      minify: 'terser',
      // terser打包的配置项
      terserOptions: {
        compress: {
          drop_console: viteEnv.VITE_DROP_CONSOLE,
          drop_debugger: true
        }
      },
      // 禁用 gzip 压缩大小报告，可略微减少打包时间
      reportCompressedSize: false,
      // 规定触发警告的 chunk 大小
      chunkSizeWarningLimit: 2000,
      rollupOptions: {
        output: {
          // Static resource classification and packaging
          chunkFileNames: 'assets/js/[name]-[hash].js',
          entryFileNames: 'assets/js/[name]-[hash].js',
          assetFileNames: 'assets/[ext]/[name]-[hash].[ext]'
        }
      }
    }
  };
});
