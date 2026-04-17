<script setup>
defineProps({
  imageSrc: { type: String, default: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80" },
  imageAlt: { type: String, default: "Imagem de arquitetura — substituir por foto do cliente" },
});
</script>

<template>
  <section id="showcase" class="showcase section page-block" aria-label="Vitrine">
    <div class="showcase__grid">
      <div v-reveal class="showcase__text">
        <span class="eyebrow">Apresentação</span>
        <h2 class="section__title showcase__title">
          Um olhar em<br /><em>movimento</em>
        </h2>
        <p class="prose">
          Pequena amostra do processo do escritório — da maquete ao detalhe construído —
          que revela como cada projeto nasce do diálogo entre luz, material e lugar.
        </p>
      </div>

      <figure v-reveal="{ delay: 120 }" class="showcase__media" data-parallax="0.08">
        <img
          class="showcase__image"
          :src="imageSrc"
          :alt="imageAlt"
          loading="lazy"
          width="1200"
          height="1500"
        />
        <figcaption class="showcase__caption">
          Imagem provisória — substituir
        </figcaption>
      </figure>
    </div>
  </section>
</template>
