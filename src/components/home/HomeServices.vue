<script setup>
defineProps({
  cards: { type: Array, required: true },
});
</script>

<template>
  <section class="gm-services">
    <article
      v-for="(card, i) in cards"
      :key="card.titulo"
      v-reveal="{ delay: i * 110 }"
      class="gm-service-card"
    >
      <span class="gm-service-card__num">{{ String(i + 1).padStart(2, "0") }}</span>
      <h3 class="gm-service-card__title">{{ card.titulo }}</h3>
      <p class="gm-service-card__text">{{ card.texto }}</p>
    </article>
  </section>
</template>
