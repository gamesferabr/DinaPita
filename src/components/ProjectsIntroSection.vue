<script setup>
import { onMounted, onUnmounted, ref } from "vue";

defineProps({
  title: { type: String, default: "Projetos" },
  homeHref: { type: String, default: "#topo" },
  logoSrc: { type: String, required: true },
  videoSrc: { type: String, default: "/assets/dina-reel.mp4" },
  posterSrc: { type: String, default: "/assets/placeholder-hero.svg" },
});

const emit = defineEmits(["scroll-to"]);

const videoEl = ref(null);
let observer = null;

onMounted(() => {
  if (!videoEl.value) {
    return;
  }
  videoEl.value.play?.().catch(() => {});
  if (!("IntersectionObserver" in window)) {
    return;
  }
  observer = new IntersectionObserver(
    (entries) => {
      const e = entries[0];
      if (!videoEl.value) {
        return;
      }
      if (e.isIntersecting) {
        videoEl.value.play().catch(() => {});
      } else {
        videoEl.value.pause();
      }
    },
    { threshold: 0.15 },
  );
  observer.observe(videoEl.value);
});

onUnmounted(() => {
  if (observer) {
    observer.disconnect();
  }
});
</script>

<template>
  <section id="topo" class="projects-intro page-page" data-background-color="dark">
    <div class="projects-intro__media" aria-hidden="true">
      <video
        ref="videoEl"
        class="projects-intro__video"
        :src="videoSrc"
        :poster="posterSrc"
        muted
        loop
        playsinline
        autoplay
        preload="auto"
      />
      <div class="projects-intro__overlay" />
    </div>

    <div class="page-content_wrapper projects-intro__wrapper">
      <a
        class="big-letter big-letter-position big-letter--logo big-letter--on-media introduction"
        :href="homeHref"
        aria-label="Voltar ao início — Dina Pita Arquitetura"
        @click.prevent="emit('scroll-to', 'topo')"
      >
        <img
          :src="logoSrc"
          alt=""
          class="big-letter__img"
          width="320"
          height="320"
          decoding="async"
        />
      </a>
    </div>

    <div class="container-fluid page-content-wrapper projects-intro__head">
      <div class="row">
        <div class="offset-4 col-7 col-md-6">
          <div class="container-fluid introduction_wrapper">
            <div class="row">
              <h1
                v-reveal
                class="introduction introduction--on-media page-block no-padding no-margin"
              >
                {{ title }}
              </h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
