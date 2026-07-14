<script setup>
defineProps({
  cta: { type: Object, required: true },
  whatsappUrl: { type: String, required: true },
});
</script>

<template>
  <section class="gm-cta" v-reveal>
    <h2 class="gm-cta__title">{{ cta.titulo }}</h2>
    <p class="gm-cta__sub">{{ cta.subtitulo }}</p>
    <div class="gm-cta__actions">
      <a
        class="gm-btn gm-btn--wa"
        :href="whatsappUrl"
        target="_blank"
        rel="noopener noreferrer"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path
            d="M17.5 14.4c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.06 2.87 1.21 3.07.15.2 2.09 3.2 5.07 4.49.71.31 1.26.49 1.69.62.71.23 1.36.2 1.87.12.57-.09 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.13-.27-.2-.57-.35z"
          />
          <path
            d="M12 2A10 10 0 0 0 3.5 17.3L2 22l4.8-1.5A10 10 0 1 0 12 2zm0 18.2c-1.5 0-3-.4-4.3-1.16l-.3-.18-2.85.9.9-2.78-.2-.32A8.2 8.2 0 1 1 12 20.2z"
          />
        </svg>
        {{ cta.whatsapp }}
      </a>
    </div>
  </section>
</template>
