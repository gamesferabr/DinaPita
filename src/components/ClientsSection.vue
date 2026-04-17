<script setup>
defineProps({
  slotCount: { type: Number, default: 8 },
});
</script>

<template>
  <section class="section section--clients">
    <h2 class="section__title section__title--center">Parceiros &amp; clientes</h2>
    <p class="clients__hint">
      Logotipos em escala de cinza — substitua pelos SVGs/PNGs do cliente.
    </p>
    <ul class="clients">
      <li v-for="n in slotCount" :key="n" class="clients__slot">Logo {{ n }}</li>
    </ul>
  </section>
</template>
