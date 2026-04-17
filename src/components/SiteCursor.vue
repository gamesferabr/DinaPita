<script setup>
import { onMounted, onUnmounted, ref } from "vue";

const x = ref(0);
const y = ref(0);
const visible = ref(false);
let raf = 0;
let lx = 0;
let ly = 0;

function onMove(e) {
  lx = e.clientX;
  ly = e.clientY;
  if (raf) {
    return;
  }
  raf = requestAnimationFrame(() => {
    x.value = lx;
    y.value = ly;
    raf = 0;
  });
}

function onLeave() {
  visible.value = false;
}

function onEnter() {
  visible.value = true;
}

onMounted(() => {
  if (window.matchMedia("(max-width: 991px)").matches) {
    return;
  }
  window.addEventListener("mousemove", onMove, { passive: true });
  document.documentElement.addEventListener("mouseenter", onEnter);
  document.documentElement.addEventListener("mouseleave", onLeave);
});

onUnmounted(() => {
  window.removeEventListener("mousemove", onMove);
  document.documentElement.removeEventListener("mouseenter", onEnter);
  document.documentElement.removeEventListener("mouseleave", onLeave);
  if (raf) {
    cancelAnimationFrame(raf);
  }
});
</script>

<template>
  <div
    id="cursor"
    class="site-cursor"
    :class="{ 'site-cursor--visible': visible }"
    :style="{ transform: `translate(${x}px, ${y}px)` }"
    aria-hidden="true"
  >
    <div class="site-cursor__cross site-cursor__cross--a" />
    <div class="site-cursor__cross site-cursor__cross--b" />
  </div>
</template>
