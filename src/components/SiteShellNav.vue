<script setup>
import { computed } from "vue";

const props = defineProps({
  menuOpen: { type: Boolean, required: true },
  heroNav: { type: Boolean, required: true },
  logoSrc: { type: String, required: true },
});

const emit = defineEmits(["toggle-menu", "scroll-to", "go"]);

const mainLinks = [
  { id: "projetos", label: "Projetos" },
  { id: "showcase", label: "Escritório" },
  { id: "contato", label: "Contato" },
];

const navThemeClass = computed(() => (props.heroNav ? "site-nav--on-media" : "site-nav--on-light"));
</script>

<template>
  <div
    class="nav__overlay"
    :class="{ 'nav__overlay--open': menuOpen }"
    @click="emit('toggle-menu')"
  />

  <header class="site-nav" :class="navThemeClass" aria-label="Navegação principal">
    <a
      class="site-nav__brand"
      href="#topo"
      aria-label="Dina Pita Arquitetura — início"
      @click.prevent="emit('scroll-to', 'topo')"
    >
      <img class="site-nav__logo" :src="logoSrc" alt="" width="44" height="44" decoding="async" />
      <span class="site-nav__brand-text">
        <span class="site-nav__brand-name">Dina Pita</span>
        <span class="site-nav__brand-sub">Arquitetura</span>
      </span>
    </a>

    <nav class="site-nav__links" aria-label="Seções">
      <ul class="site-nav__list">
        <li v-for="item in mainLinks" :key="item.id">
          <a
            :href="`#${item.id}`"
            class="site-nav__link"
            @click.prevent="emit('go', item.id)"
          >{{ item.label }}</a>
        </li>
      </ul>
    </nav>

    <button
      type="button"
      class="site-nav__toggle"
      :aria-expanded="String(menuOpen)"
      aria-controls="site-nav-drawer"
      @click="emit('toggle-menu')"
    >
      <span class="site-nav__toggle-label">{{ menuOpen ? "Fechar" : "Menu" }}</span>
      <span class="site-nav__toggle-icon" aria-hidden="true">
        <span />
        <span />
      </span>
    </button>
  </header>

  <aside
    id="site-nav-drawer"
    class="site-nav-drawer"
    :class="{ 'site-nav-drawer--open': menuOpen }"
    :aria-hidden="String(!menuOpen)"
  >
    <ul class="site-nav-drawer__list">
      <li v-for="item in mainLinks" :key="item.id">
        <a
          :href="`#${item.id}`"
          class="site-nav-drawer__link"
          @click.prevent="emit('go', item.id)"
        >{{ item.label }}</a>
      </li>
    </ul>
  </aside>
</template>
