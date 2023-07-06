<!-- ./SvgRaw.vue -->
<script setup lang="ts">
import type { Component } from 'vue';
import { computed } from 'vue';

/** 获得所有的svg */
const modules = import.meta.glob('@/assets/icons/*.svg', {
  eager: true, // 直接引入而非动态引入
  as: 'component'
});
const props = withDefaults(defineProps<{ name: string }>(), {});
const currentComponent = computed<Component>(() => {
  const fileName = '/' + props.name + '.svg';
  for (const path in modules) {
    const mod = modules[path];
    if (path.endsWith(fileName)) {
      console.log('fileName:', fileName);
      console.log('modules:', modules);

      console.log('path:', path);

      console.log('mod as Component:', mod, typeof mod);
      // return () => import('/src/assets/icons/vue.svg?component');
      return mod as Component;
    }
  }
  throw new Error('not found svg file:' + fileName);
});
</script>
<template>
  <component :is="currentComponent" />
</template>
