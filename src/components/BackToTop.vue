<script setup>
const emit = defineEmits(["click"]);

function onClick() {
  emit("click");
  window.scrollTo({ top: 0, behavior: "smooth" });
}
</script>

<template>
  <button type="button" class="back-to-top" aria-label="Voltar ao topo" @click="onClick">
    <span class="back-to-top__el" aria-hidden="true">
      <span class="back-to-top__el-top back-to-top__el-top-left" />
      <span class="back-to-top__el-top back-to-top__el-top-right" />
      <span class="back-to-top__el-bottom" />
    </span>
  </button>
</template>
