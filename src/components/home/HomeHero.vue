<script setup>
defineProps({
  hero: { type: Object, required: true },
  whatsappUrl: { type: String, default: "" },
});

const emit = defineEmits(["ver-projetos", "diagnostico"]);
</script>

<template>
  <header id="inicio" class="gm-hero">
    <div class="gm-hero__card">
      <img class="gm-hero__img" :src="hero.imagem" :alt="hero.imagemAlt" />
      <div class="gm-hero__body">
        <p class="gm-eyebrow gm-hero__eyebrow">{{ hero.eyebrow }}</p>
        <h1 class="gm-hero__title">{{ hero.titulo }}</h1>
        <p class="gm-hero__sub">{{ hero.subtitulo }}</p>

        <div class="gm-hero__actions">
          <button
            type="button"
            class="gm-btn gm-btn--light gm-hero__cta"
            @click="emit('diagnostico')"
          >
            {{ hero.ctaDiagnostico }}
          </button>
          <a
            class="gm-btn gm-btn--ghost"
            :href="whatsappUrl"
            target="_blank"
            rel="noopener noreferrer"
          >
            {{ hero.ctaPrimario }}
          </a>
        </div>
      </div>
    </div>
  </header>
</template>
