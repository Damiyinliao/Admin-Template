<template>
  <svg aria-hidden="true" :width="props.size" :height="props.size">
    <use :xlink:href="symbolId" :fill="color" />
  </svg>
</template>
<script setup lang="ts" name="SvgIcon">
import { computed } from 'vue';
import { string } from 'vue-types';

const props = defineProps({
  name: string().isRequired,
  size: string().def('1em'),
  color: string().def('currentColor'),
  prefix: string().def('icon')
});

const symbolId = computed(() => `#${props.prefix}-${props.name}`);
</script>
<style scoped>
svg {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>
