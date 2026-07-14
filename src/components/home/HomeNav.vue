<script setup>
import { ref } from "vue";

defineProps({
  brandName: { type: String, default: "Dina Pita" },
  monograma: { type: String, default: "dp" },
  logoSrc: { type: String, default: "" },
  items: { type: Array, required: true },
  ctaLabel: { type: String, default: "Fale comigo" },
  whatsappUrl: { type: String, default: "" },
});

const emit = defineEmits(["nav"]);
const mobileOpen = ref(false);

function onNav(item) {
  mobileOpen.value = false;
  emit("nav", item);
}

function closeMobile() {
  mobileOpen.value = false;
}
</script>

<template>
  <div class="gm-nav">
    <nav class="gm-nav__bar" aria-label="Navegação principal">
      <a class="gm-nav__brand" href="#inicio" @click.prevent="onNav({ id: 'inicio', type: 'scroll' })">
        <span class="gm-nav__mark">
          <img v-if="logoSrc" class="gm-nav__logo" :src="logoSrc" :alt="brandName" />
          <template v-else>{{ monograma }}</template>
        </span>
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
        <a
          class="gm-btn gm-btn--ink gm-nav__cta"
          :href="whatsappUrl"
          target="_blank"
          rel="noopener noreferrer"
        >
          {{ ctaLabel }}
        </a>
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
      <a :href="whatsappUrl" target="_blank" rel="noopener noreferrer" @click="closeMobile">
        {{ ctaLabel }}
      </a>
    </div>
  </div>
</template>
