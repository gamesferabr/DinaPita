<script setup>
defineProps({
  servicos: { type: Array, required: true },
});
</script>

<template>
  <section class="gm-list-card" v-reveal>
    <h2 class="gm-list-card__title">Serviços</h2>
    <ul class="gm-list">
      <li v-for="servico in servicos" :key="servico">{{ servico }}</li>
    </ul>
  </section>
</template>
