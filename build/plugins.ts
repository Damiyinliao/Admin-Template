import vue from '@vitejs/plugin-vue';
import vueDevTools from 'vite-plugin-vue-devtools'; // Vite 和 Vue Devtools 的整合工具
import UnoCSS from 'unocss/vite'; // 使用UnoCSS
import vueSetupExtend from 'unplugin-vue-setup-extend-plus/vite'; // 使用VueSetupExtend

import { resolve } from 'path';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import viteCompression from 'vite-plugin-compression';
import { PluginOption } from 'vite';

export const createVitePlugins = (viteEnv: ViteEnv): PluginOption[] => {
  return [
    // vue3
    vue(),
    // name 可以写在 script 标签上
    vueSetupExtend({}),
    // Vite 和 Vue Devtools 的整合工具
    vueDevTools(),
    // 使用UnoCSS
    UnoCSS(),
    // 使用 svg 图标
    createSvgIconsPlugin({
      iconDirs: [resolve(process.cwd(), 'src/assets/icons')],
      symbolId: 'icon-[dir]-name'
    }),
    // 自动全局引入组件
    AutoImport({
      include: [
        /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
        /\.vue$/,
        /\.vue\?vue/, // .vue
        /\.md$/ // .md
      ],
      imports: ['vue', 'vue-router'],
      dts: 'src/types/auto-imports.d.ts'
    }),
    // 自动全局注册组件
    Components({
      // 要搜索组件的目录的相对路径
      dirs: ['src/components'],
      // 组件的有效文件扩展名
      extensions: ['vue'],
      // 搜索子目录
      deep: true,
      include: [/\.vue$/, /\.vue\?vue/],
      // 生成自定义 `auto-components.d.ts` 全局声明
      dts: 'src/types/auto-components.d.ts',
      exclude: [/[\\/]node_modules[\\/]/]
    }),
    // 根据 compress 配置，生成不同的压缩规则
    createCompression(viteEnv)
  ];
};

/**
 * @description 根据 compress 配置，生成不同的压缩规则
 * @param viteEnv
 */
const createCompression = (viteEnv: ViteEnv): PluginOption | PluginOption[] => {
  const { VITE_BUILD_COMPRESS } = viteEnv;
  if (!VITE_BUILD_COMPRESS) {
    return [];
  }
  const compressList = VITE_BUILD_COMPRESS.split(',');
  const compressPlugins: PluginOption[] = [];
  if (compressList.includes('gzip')) {
    compressPlugins.push(
      viteCompression({
        verbose: true,
        disable: false,
        threshold: 1024,
        algorithm: 'gzip',
        ext: '.gz',
        deleteOriginFile: false
      })
    );
  }
  if (compressList.includes('brotli')) {
    compressPlugins.push(
      viteCompression({
        verbose: true,
        disable: false,
        threshold: 1024,
        algorithm: 'brotliCompress', //压缩算法,可选 [ 'gzip' , 'brotliCompress' ,'deflate' , 'deflateRaw']
        ext: '.br',
        deleteOriginFile: false
      })
    );
  }
  return compressPlugins;
};
