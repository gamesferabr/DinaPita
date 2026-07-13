<script setup>
defineProps({
  statement: { type: Object, required: true },
});
</script>

<template>
  <section id="escritorio" class="gm-intro">
    <p v-reveal class="gm-intro__text">
      {{ statement.intro }} <span class="gm-serif">{{ statement.destaque }}</span>
      {{ statement.resto }}
    </p>
  </section>
</template>
