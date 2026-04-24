<script setup>
import { computed } from "vue";
import { contato } from "../data/siteContent.js";

const mapaAbrir = computed(() => {
  const q = (contato.endereco || []).filter(Boolean).join(", ");
  if (!q) {
    return "https://www.google.com/maps";
  }
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`;
});
</script>

<template>
  <section
    id="local"
    class="showcase section page-block"
    aria-labelledby="local-title"
    data-background-color="white"
  >
    <div class="showcase__grid">
      <div v-reveal class="showcase__text">
        <span class="eyebrow">Local</span>
        <h2 id="local-title" class="section__title showcase__title">
          Onde
          <em>estamos</em>
        </h2>
        <p
          v-for="(line, i) in contato.endereco"
          :key="`addr-${i}`"
          class="prose"
        >
          {{ line }}
        </p>
        <p class="prose">{{ contato.horario }}</p>
        <a
          class="text-link"
          :href="mapaAbrir"
          target="_blank"
          rel="noopener noreferrer"
        >
          Abrir no mapa
        </a>
      </div>
      <figure
        v-reveal="{ delay: 120 }"
        class="showcase__media"
        data-parallax="0.08"
      >
        <img
          class="showcase__image"
          :src="contato.fotoLocalUrl"
          :alt="contato.fotoLocalAlt"
          width="1200"
          height="1500"
          loading="lazy"
        />
        <figcaption class="showcase__caption">
          {{ contato.fotoLocalLegenda }}
        </figcaption>
      </figure>
    </div>
  </section>
</template>
