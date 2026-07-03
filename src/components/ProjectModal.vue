<script setup>
import { computed, watch } from "vue";
import { withBasePath } from "../utils/basePath.js";

const props = defineProps({
  project: { type: Object, default: null },
});
const emit = defineEmits(["close"]);

const isOpen = computed(() => !!props.project);

watch(isOpen, (open) => {
  document.body.classList.toggle("modal-open", open);
});

function onBackdropClick() {
  emit("close");
}

function onClose() {
  emit("close");
}
</script>

<template>
  <transition name="modal">
    <section
      v-if="project"
      class="modal modal--project"
      role="dialog"
      aria-modal="true"
      :aria-label="project.nome"
    >
      <div class="modal__backdrop" @click="onBackdropClick" />

      <article class="modal__panel modal__panel--project">
        <header class="modal__bar">
          <span class="modal__crumb">
            <span class="modal__crumb-tag">{{ project.tipo }}</span>
            <span class="modal__crumb-sep">·</span>
            <span class="modal__crumb-name">{{ project.nome }}</span>
          </span>

          <div class="modal__actions">
            <a
              class="modal__action"
              :href="withBasePath(`/projetos/${project.slug}`)"
              target="_blank"
              rel="noopener"
              aria-label="Abrir este projeto numa nova aba"
              @click.stop
            >
              <span class="modal__action-label">Abrir em nova aba</span>
              <svg
                class="modal__action-icon"
                viewBox="0 0 16 16"
                width="14"
                height="14"
                aria-hidden="true"
              >
                <path
                  d="M9 1h6v6M15 1L7 9M11 9v5H1V4h5"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.4"
                  stroke-linecap="square"
                />
              </svg>
            </a>

            <button
              type="button"
              class="modal__close"
              aria-label="Fechar projeto"
              @click="onClose"
            >
              <span class="modal__close-x" aria-hidden="true">×</span>
              <span class="modal__close-label">Fechar</span>
            </button>
          </div>
        </header>

        <div class="modal__scroll">
          <header class="project-page__hero">
            <p class="project-page__overtitle">{{ project.tipo }}</p>
            <h1 class="project-page__title">{{ project.nome }}</h1>
            <p class="project-page__lead">{{ project.resumo }}</p>
          </header>

          <figure class="project-page__cover">
            <img
              :src="project.img"
              :alt="project.alt"
              width="1600"
              height="1100"
              loading="eager"
            />
          </figure>

          <section class="project-page__body">
            <div class="project-page__text">
              <p
                v-for="(p, i) in project.descricao"
                :key="i"
                class="project-page__paragraph"
              >
                {{ p }}
              </p>
            </div>

            <aside class="project-page__meta">
              <h2 class="project-page__meta-title">Ficha técnica</h2>
              <dl class="project-page__meta-list">
                <template v-for="(value, label) in project.meta" :key="label">
                  <dt>{{ label }}</dt>
                  <dd>{{ value }}</dd>
                </template>
              </dl>
            </aside>
          </section>

          <section class="project-page__gallery">
            <figure
              v-for="(src, i) in project.galeria"
              :key="src"
              class="project-page__shot"
              :class="{ 'project-page__shot--wide': i % 3 === 0 }"
            >
              <img
                :src="src"
                :alt="`${project.nome} — vista ${i + 1}`"
                loading="lazy"
              />
            </figure>
          </section>

          <footer class="project-page__cta">
            <p>Quer ver este projeto na íntegra ou conversar sobre o seu?</p>
            <a class="text-link" :href="withBasePath('/contato')" @click.prevent="emit('close', { open: 'contato' })">
              Falar com o escritório
            </a>
          </footer>
        </div>
      </article>
    </section>
  </transition>
</template>
