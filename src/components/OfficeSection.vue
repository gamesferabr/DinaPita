<script setup>
defineProps({
  logoBrancoSrc: { type: String, required: true },
});

const emit = defineEmits(["go"]);
</script>

<template>
  <section id="escritorio" class="section section--split">
    <div class="split__text">
      <h2 class="section__title">Missão &amp; visão</h2>
      <p class="prose">
        Parágrafo editorial: como o escritório enxerga arquitetura, materiais, luz e
        relação com o lugar. Mantenha tom humano e direto.
      </p>
      <p class="prose">
        Segundo parágrafo opcional: processo (estudo preliminar, anteprojeto, executivo,
        obra) ou diferenciais (sustentabilidade, patrimônio, BIM).
      </p>
      <a class="text-link" href="#projetos" @click.prevent="emit('go', 'projetos')">
        Ver projetos selecionados
      </a>
    </div>
    <figure class="split__figure">
      <div class="media-slot media-slot--brand media-slot--brand-dark">
        <img
          :src="logoBrancoSrc"
          alt="Logotipo Dina Pita Arquitetura (versão branca)"
          width="800"
          height="400"
          loading="lazy"
        />
        <figcaption class="media-slot__caption">
          Versão branca do logotipo — ao lado, texto editorial; aqui pode ir foto do
          escritório.
        </figcaption>
      </div>
    </figure>
  </section>
</template>
