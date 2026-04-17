<script setup>
defineProps({
  menuOpen: { type: Boolean, required: true },
  logoSrc: { type: String, required: true },
});

const emit = defineEmits(["toggle-menu", "scroll-to", "go"]);
</script>

<template>
  <header class="header">
    <a class="logo" href="#topo" @click.prevent="emit('scroll-to', 'topo')">
      <span class="visually-hidden">Dina Pita Arquitetura</span>
      <span class="logo__frame" aria-hidden="true">
        <img
          class="logo__img"
          :src="logoSrc"
          alt=""
          width="220"
          height="72"
          decoding="async"
        />
      </span>
    </a>

    <button
      type="button"
      class="menu-toggle"
      :aria-expanded="String(menuOpen)"
      aria-controls="menu-principal"
      @click="emit('toggle-menu')"
    >
      <span class="menu-toggle__text">{{ menuOpen ? "Fechar" : "Menu" }}</span>
      <span class="menu-toggle__icon" aria-hidden="true"></span>
    </button>

    <nav
      id="menu-principal"
      class="nav"
      :aria-hidden="String(!menuOpen)"
    >
      <div class="nav__brand" aria-hidden="true">
        <span class="logo__frame logo__frame--nav">
          <img
            class="logo__img"
            :src="logoSrc"
            alt=""
            width="240"
            height="72"
            decoding="async"
          />
        </span>
      </div>
      <ul class="nav__list">
        <li>
          <a href="#projetos" @click.prevent="emit('go', 'projetos')">Projetos</a>
        </li>
        <li>
          <a href="#escritorio" @click.prevent="emit('go', 'escritorio')">Escritório</a>
        </li>
        <li>
          <a href="#contato" @click.prevent="emit('go', 'contato')">Contato</a>
        </li>
      </ul>
      <p class="nav__note">
        Substitua os links acima por páginas reais ou âncoras conforme o site final.
      </p>
    </nav>
  </header>
</template>
