<script setup>
import { ref } from "vue";

defineProps({
  brandName: { type: String, default: "Dina Pita" },
  monograma: { type: String, default: "dp" },
  items: { type: Array, required: true },
  ctaLabel: { type: String, default: "Fale comigo" },
});

const emit = defineEmits(["nav", "cta"]);
const mobileOpen = ref(false);

function onNav(item) {
  mobileOpen.value = false;
  emit("nav", item);
}

function onCta() {
  mobileOpen.value = false;
  emit("cta");
}
</script>

<template>
  <div class="gm-nav">
    <nav class="gm-nav__bar" aria-label="Navegação principal">
      <a class="gm-nav__brand" href="#inicio" @click.prevent="onNav({ id: 'inicio', type: 'scroll' })">
        <span class="gm-nav__mark">{{ monograma }}</span>
        <span class="gm-nav__brand-name">{{ brandName }}</span>
      </a>

      <div class="gm-nav__links">
        <a
          v-for="item in items"
          :key="item.id"
          class="gm-nav__link"
          :href="`#${item.id}`"
          @click.prevent="onNav(item)"
        >
          {{ item.label }}
        </a>
        <button type="button" class="gm-btn gm-btn--ink gm-nav__cta" @click="onCta">
          {{ ctaLabel }}
        </button>
      </div>

      <button
        type="button"
        class="gm-nav__toggle"
        :aria-expanded="mobileOpen"
        aria-label="Abrir menu"
        @click="mobileOpen = !mobileOpen"
      >
        <span />
      </button>
    </nav>

    <div class="gm-nav__mobile" :class="{ 'is-open': mobileOpen }">
      <a
        v-for="item in items"
        :key="item.id"
        :href="`#${item.id}`"
        @click.prevent="onNav(item)"
      >
        {{ item.label }}
      </a>
      <button type="button" @click="onCta">{{ ctaLabel }}</button>
    </div>
  </div>
</template>
