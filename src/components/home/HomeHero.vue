<script setup>
defineProps({
  hero: { type: Object, required: true },
});

const emit = defineEmits(["cta", "ver-projetos", "diagnostico"]);
</script>

<template>
  <header id="inicio" class="gm-hero">
    <div class="gm-hero__card">
      <img class="gm-hero__img" :src="hero.imagem" :alt="hero.imagemAlt" />
      <div class="gm-hero__body">
        <p class="gm-eyebrow gm-hero__eyebrow">{{ hero.eyebrow }}</p>
        <h1 class="gm-hero__title">{{ hero.titulo }}</h1>
        <p class="gm-hero__sub">{{ hero.subtitulo }}</p>

        <button
          v-if="hero.badge"
          type="button"
          class="gm-hero__badge"
          @click="emit('diagnostico')"
        >
          <span class="gm-hero__badge-dot" aria-hidden="true" />
          {{ hero.badge }}
          <span class="gm-hero__badge-arrow" aria-hidden="true">→</span>
        </button>

        <div class="gm-hero__actions">
          <button type="button" class="gm-btn gm-btn--ink" @click="emit('diagnostico')">
            {{ hero.ctaDiagnostico }}
          </button>
          <button type="button" class="gm-btn gm-btn--ghost" @click="emit('ver-projetos')">
            {{ hero.ctaSecundario }}
          </button>
        </div>
      </div>
    </div>
  </header>
</template>
