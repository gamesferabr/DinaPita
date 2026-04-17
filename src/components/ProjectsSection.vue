<script setup>
defineProps({
  projects: { type: Array, required: true },
});

const emit = defineEmits(["go", "open-project"]);

/** Permite Ctrl/Cmd/Shift/Middle-click abrirem em nova aba (comportamento
 * nativo do <a>); só intercepta o clique simples para abrir o modal. */
function onCardClick(event, project) {
  if (
    event.metaKey ||
    event.ctrlKey ||
    event.shiftKey ||
    event.altKey ||
    event.button === 1
  ) {
    return;
  }
  event.preventDefault();
  emit("open-project", project);
}
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
          <a
            class="project-image-link project"
            :href="p.href"
            @click="onCardClick($event, p)"
            @auxclick.stop
          >
            <div
              class="project-image"
              :class="index % 2 === 0 ? 'even' : 'odd'"
            >
              <div class="project-image_inner">
                <div class="project-image_inner-reverse">
                  <div class="o-background">
                    <img
                      class="project-image_background"
                      :src="p.img"
                      :alt="p.alt"
                      width="800"
                      height="600"
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>
            </div>
          </a>
          <div class="project-info">
            <a
              class="project-info_wrapper"
              :href="p.href"
              @click="onCardClick($event, p)"
            >
              <div class="project-info_date overtitle">{{ p.tipo }}</div>
              <h2 class="project-info_name">{{ p.nome }}</h2>
              <p v-if="p.resumo" class="project-info_excerpt">{{ p.resumo }}</p>
            </a>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>
