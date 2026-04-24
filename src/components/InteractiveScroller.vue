<script setup>
import { computed, onMounted, onUnmounted, ref } from "vue";

const props = defineProps({
  /** true = trilho claro (hero escuro, rodapé escuro, etc.) */
  lightTrack: { type: Boolean, default: false },
});

const TRACK_HEIGHT = 220;

const progressTarget = ref(0);
const progressLerp = ref(0);
const active = ref(false);
const dragging = ref(false);
const trackEl = ref(null);
let raf = 0;
let activePointerId = null;

function scrollMax() {
  const el = document.documentElement;
  return Math.max(0, el.scrollHeight - window.innerHeight);
}

function tick() {
  const diff = progressTarget.value - progressLerp.value;
  if (Math.abs(diff) < 0.05) {
    progressLerp.value = progressTarget.value;
    raf = 0;
    return;
  }
  progressLerp.value += diff * 0.22;
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
  const pct = max <= 0 ? 0 : Math.min(100, Math.max(0, (window.scrollY / max) * 100));
  progressTarget.value = pct;
  active.value = window.scrollY > 40;
  kickRaf();
}

function pctFromClientY(clientY) {
  if (!trackEl.value) {
    return 0;
  }
  const rect = trackEl.value.getBoundingClientRect();
  const y = clientY - rect.top;
  const pct = (y / rect.height) * 100;
  return Math.min(100, Math.max(0, pct));
}

function jumpTo(pct) {
  const max = scrollMax();
  if (max <= 0) {
    return;
  }
  window.scrollTo({ top: (pct / 100) * max, behavior: "auto" });
  progressTarget.value = pct;
  progressLerp.value = pct;
}

function onTrackPointerDown(e) {
  dragging.value = true;
  active.value = true;
  activePointerId = e.pointerId;
  e.target.setPointerCapture?.(e.pointerId);
  jumpTo(pctFromClientY(e.clientY));
  e.preventDefault();
}

function onTrackPointerMove(e) {
  if (!dragging.value || e.pointerId !== activePointerId) {
    return;
  }
  jumpTo(pctFromClientY(e.clientY));
}

function onTrackPointerUp(e) {
  if (e.pointerId !== activePointerId) {
    return;
  }
  dragging.value = false;
  activePointerId = null;
  e.target.releasePointerCapture?.(e.pointerId);
}

function onEnter() {
  active.value = true;
}

function onLeave() {
  if (!dragging.value) {
    active.value = window.scrollY > 40;
  }
}

const knobY = computed(() => (TRACK_HEIGHT * progressLerp.value) / 100);

onMounted(() => {
  syncFromScroll();
  window.addEventListener("scroll", syncFromScroll, { passive: true });
  window.addEventListener("resize", syncFromScroll, { passive: true });
});

onUnmounted(() => {
  window.removeEventListener("scroll", syncFromScroll);
  window.removeEventListener("resize", syncFromScroll);
  if (raf) {
    cancelAnimationFrame(raf);
  }
});
</script>

<template>
  <div
    id="interactive-scroller"
    class="interactive-scroller"
    :class="{
      'interactive-scroller--light': props.lightTrack,
      'interactive-scroller--active': active,
      'interactive-scroller--dragging': dragging,
    }"
    aria-hidden="true"
    @pointerenter="onEnter"
    @pointerleave="onLeave"
  >
    <span class="interactive-scroller__label">Scroll</span>
    <div
      ref="trackEl"
      class="interactive-scroller__track"
      :style="{ height: `${TRACK_HEIGHT}px` }"
      @pointerdown="onTrackPointerDown"
      @pointermove="onTrackPointerMove"
      @pointerup="onTrackPointerUp"
      @pointercancel="onTrackPointerUp"
    >
      <span class="interactive-scroller__line" />
      <span
        class="interactive-scroller__knob"
        :style="{ transform: `translate3d(-50%, ${knobY}px, 0)` }"
      />
    </div>
  </div>
</template>
