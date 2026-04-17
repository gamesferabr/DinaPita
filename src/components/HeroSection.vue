<script setup>
defineProps({
  heroImageSrc: { type: String, default: "/assets/placeholder-hero.svg" },
});

const emit = defineEmits(["scroll-to"]);
</script>

<template>
  <section id="topo" class="hero">
    <div class="hero__media">
      <img
        class="hero__img"
        :src="heroImageSrc"
        alt="Imagem em destaque — projeto ou fachada"
        width="1920"
        height="1080"
        loading="eager"
      />
      <div class="hero__overlay"></div>
    </div>
    <div class="hero__content">
      <p class="eyebrow">Portfólio · [Cidade]</p>
      <h1 class="hero__title">
        Espaços pensados<br />
        <em>com precisão</em> e calma.
      </h1>
      <p class="hero__lede">
        Texto curto de abertura: proposta de valor do escritório em duas linhas. Ex.:
        residencial, comercial, retrofit e interiores integrados ao projeto.
      </p>
    </div>
    <a
      class="scroll-hint"
      href="#servicos"
      @click.prevent="emit('scroll-to', 'servicos')"
    >
      <span>Rolar</span>
      <span class="scroll-hint__line" aria-hidden="true"></span>
    </a>
  </section>
</template>
