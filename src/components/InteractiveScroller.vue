<script setup>
import { computed, onMounted, onUnmounted, ref } from "vue";

defineProps({
  /** true = trilho claro (hero escuro). */
  lightTrack: { type: Boolean, default: false },
});

const lineExpanded = ref(false);
const dragging = ref(false);
const dragStartY = ref(0);
const dragStartScroll = ref(0);
const activePointerId = ref(null);

const progressTarget = ref(0);
const progressLerp = ref(0);
let raf = 0;

function scrollMax() {
  const el = document.documentElement;
  return Math.max(0, el.scrollHeight - window.innerHeight);
}

function tick() {
  const diff = progressTarget.value - progressLerp.value;
  if (Math.abs(diff) < 0.01) {
    progressLerp.value = progressTarget.value;
    raf = 0;
    return;
  }
  progressLerp.value += diff * 0.18;
  raf = requestAnimationFrame(tick);
}

function kickRaf() {
  if (!raf) {
    raf = requestAnimationFrame(tick);
  }
}

function syncFromScroll() {
  if (dragging.value) {
    return;
  }
  const max = scrollMax();
  progressTarget.value = max <= 0 ? 0 : Math.min(100, Math.max(0, (window.scrollY / max) * 100));
  kickRaf();
}

function onPointerDown(e) {
  dragging.value = true;
  lineExpanded.value = true;
  activePointerId.value = e.pointerId;
  dragStartY.value = e.clientY;
  dragStartScroll.value = window.scrollY;
  window.addEventListener("pointermove", onWindowPointerMove);
  window.addEventListener("pointerup", onWindowPointerUp);
  window.addEventListener("pointercancel", onWindowPointerUp);
  e.preventDefault();
}

function onWindowPointerMove(e) {
  if (!dragging.value || e.pointerId !== activePointerId.value) {
    return;
  }
  const max = scrollMax();
  if (max <= 0) {
    return;
  }
  const trackPx = 150;
  const delta = e.clientY - dragStartY.value;
  const next = Math.min(max, Math.max(0, dragStartScroll.value + (delta / trackPx) * max));
  window.scrollTo({ top: next, behavior: "auto" });
  progressTarget.value = (next / max) * 100;
  kickRaf();
}

function onWindowPointerUp(e) {
  if (e.pointerId !== activePointerId.value) {
    return;
  }
  dragging.value = false;
  lineExpanded.value = false;
  activePointerId.value = null;
  window.removeEventListener("pointermove", onWindowPointerMove);
  window.removeEventListener("pointerup", onWindowPointerUp);
  window.removeEventListener("pointercancel", onWindowPointerUp);
  syncFromScroll();
}

function onOverEnter() {
  if (!dragging.value) {
    lineExpanded.value = true;
  }
}

function onOverLeave() {
  if (!dragging.value) {
    lineExpanded.value = false;
  }
}

const knobY = computed(() => (150 * progressLerp.value) / 100);
const lineScaleY = computed(() => (lineExpanded.value ? 1 : 0.33333));
const cursorScale = computed(() => (lineExpanded.value ? 1 : 0.66667));

onMounted(() => {
  syncFromScroll();
  window.addEventListener("scroll", syncFromScroll, { passive: true });
  window.addEventListener("resize", syncFromScroll, { passive: true });
});

onUnmounted(() => {
  window.removeEventListener("scroll", syncFromScroll);
  window.removeEventListener("resize", syncFromScroll);
  window.removeEventListener("pointermove", onWindowPointerMove);
  window.removeEventListener("pointerup", onWindowPointerUp);
  window.removeEventListener("pointercancel", onWindowPointerUp);
  if (raf) {
    cancelAnimationFrame(raf);
  }
});
</script>

<template>
  <div
    id="interactive-scroller"
    class="interactive-scroller"
    :class="{ 'interactive-scroller--light': lightTrack }"
    aria-hidden="true"
  >
    <div class="interactive-scroller__inner">
      <div
        class="interactive-scroller__over-area"
        @pointerenter="onOverEnter"
        @pointerleave="onOverLeave"
      >
        <div
          class="interactive-scroller__cursor-container"
          :style="{ transform: `translate3d(0px, ${knobY - 64}px, 0px)` }"
        >
          <div
            class="interactive-scroller__cursor"
            :style="{ transform: `translate3d(0px,0px,0px) scale(${cursorScale}, ${cursorScale})` }"
            @pointerdown="onPointerDown"
          />
        </div>
        <div
          class="interactive-scroller__line-container"
          :style="{ transform: `translate(0%, 55%) translate3d(0px, ${knobY * 0.35}px, 0px)` }"
        >
          <div
            class="interactive-scroller__line"
            :style="{ transform: `scale(1, ${lineScaleY})` }"
          />
          <div class="interactive-scroller__label">Scroll</div>
        </div>
      </div>
    </div>
  </div>
</template>
