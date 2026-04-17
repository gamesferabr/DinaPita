<script setup>
defineProps({
  logoSrc: { type: String, required: true },
});
</script>

<template>
  <aside class="rail" aria-hidden="true">
    <div class="rail__logo" title="Dina Pita Arquitetura">
      <img :src="logoSrc" alt="" width="120" height="48" decoding="async" />
    </div>
    <div class="rail__social">
      <a href="#" aria-label="Instagram (substituir URL)">Ig</a>
      <a href="#" aria-label="Behance (substituir URL)">Be</a>
      <a href="#" aria-label="LinkedIn (substituir URL)">In</a>
    </div>
  </aside>
</template>
