<script setup>
defineProps({
  projects: { type: Array, required: true },
});

const emit = defineEmits(["go"]);
</script>

<template>
  <section id="projetos" class="section section--projects-list page-block">
    <div class="section__head section__head--row projects-list__head">
      <h2 v-reveal class="section__title introduction-scale">Projetos selecionados</h2>
      <a
        v-reveal="{ delay: 120 }"
        class="text-link"
        href="#contato"
        @click.prevent="emit('go', 'contato')"
      >
        Solicitar apresentação completa
      </a>
    </div>

    <div class="project-list_wrapper page-block">
      <div class="project-line" aria-hidden="true" />
      <div class="project-list">
        <article
          v-for="(p, index) in projects"
          :key="p.id"
          v-reveal="{ delay: index * 90 }"
          class="project-list_item"
          :class="index % 2 === 0 ? 'project-list_item--even' : 'project-list_item--odd'"
        >
          <a class="project-image-link project" :href="p.href" @click.prevent>
            <div
              class="project-image"
              :class="index % 2 === 0 ? 'even' : 'odd'"
            >
              <div class="project-image_inner" data-parallax="0.06">
                <div class="project-image_inner-reverse">
                  <div class="o-background">
                    <img
                      class="project-image_background"
                      :src="p.img"
                      :alt="p.alt"
                      width="900"
                      height="1200"
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>
            </div>
          </a>
          <div class="project-info">
            <a class="project-info_wrapper" href="#" @click.prevent>
              <div class="project-info_date overtitle">{{ p.tipo }}</div>
              <h3 class="project-info_name">{{ p.nome }}</h3>
              <p v-if="p.resumo" class="project-info_excerpt">{{ p.resumo }}</p>
            </a>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>
