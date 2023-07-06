<template>
  <component
    v-if="currentComponent"
    :is="currentComponent"
    ref="svgRef"
    :name="name"
    class="svg-raw"
    v-bind="attrs"
  />
</template>
<script lang="ts" name="SvgRawPro" setup>
import type { Component } from 'vue';
import { computed, useAttrs, getCurrentInstance, ref, nextTick, watch } from 'vue';
import { string } from 'vue-types';

// 导入 {  as: 'component' }
const modules = import.meta.glob('@/assets/icons/*.svg', {
  eager: true, // 直接引入而非动态引入
  as: 'component'
});

const props = defineProps({
  name: string().isRequired
});
// 透传 attrs
const attrs = useAttrs();
// 获取当前组件实例 以便为了拿到data-v-hash
const instance = getCurrentInstance();
// 组件实例ref
const svgRef = ref();

const currentComponent = computed<Component | undefined>(() => {
  const fileName = '/' + props.name + '.svg';
  console.log('fileName:' + fileName);

  for (const path in modules) {
    const mod = modules[path];
    if (path.endsWith(fileName)) {
      return mod as Component;
    }
  }
  return undefined;
});

// 为了拿到data-v-hash 即 __scopeId
let scopeId = ref('');
if (instance?.type) {
  // __scopeId 存在的条件是 <style scoped>
  const __scopeId = (instance?.type as { __scopeId?: string })?.__scopeId;
  if (__scopeId) {
    scopeId.value = __scopeId;
  }
}
// 给svg dom添加属性data-v-hash
const attachAttr = async () => {
  await nextTick();
  // 获取到svg dom
  const svg = svgRef.value;
  if (!svg) return;
  if (!scopeId.value) return;
  // 给svg dom添加属性data-v-hash
  svg.$el.setAttribute(scopeId.value, '');
  // 获取到svg dom下的所有子元素
  const children = svg.$el.querySelectorAll('*');
  // 给svg dom下的所有子元素添加属性data-v-hash
  children.forEach((child: any) => {
    child.setAttribute(scopeId.value, '');
  });
};
// 监听props.name的变化
watch(
  () => props.name,
  async () => {
    await nextTick();
    attachAttr();
  },
  {
    immediate: true
  }
);
</script>
<style scoped>
svg,
path {
  transition: fill 250ms;
}
</style>
