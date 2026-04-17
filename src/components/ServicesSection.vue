<script setup>
defineProps({
  items: { type: Array, required: true },
});
</script>

<template>
  <section id="servicos" class="section section--tight">
    <div class="section__head">
      <h2 class="section__title">O que fazemos</h2>
      <p class="section__intro">
        Lista editável de frentes de trabalho — alinhe ao posicionamento do cliente.
      </p>
    </div>
    <ul class="skills">
      <li v-for="item in items" :key="item" class="skills__item">{{ item }}</li>
    </ul>
  </section>
</template>
