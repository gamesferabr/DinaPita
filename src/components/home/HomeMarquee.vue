<script setup>
import { computed } from "vue";

const props = defineProps({
  items: { type: Array, required: true },
});

// Duplica a lista para o loop do marquee ficar contínuo (translateX -50%).
const loop = computed(() => [...props.items, ...props.items]);
</script>

<template>
  <div class="gm-marquee" aria-hidden="true">
    <div class="gm-marquee__track">
      <span v-for="(item, i) in loop" :key="i" class="gm-marquee__item">{{ item }}</span>
    </div>
  </div>
</template>
