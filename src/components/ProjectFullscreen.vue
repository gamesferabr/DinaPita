<script setup>
import { computed, onMounted, onUnmounted, ref, watch } from "vue";
import { withBasePath } from "../utils/basePath.js";

const props = defineProps({
  project: { type: Object, required: true },
  projects: { type: Array, required: true },
});
const emit = defineEmits(["select", "close"]);

const direction = ref(0);
const scrollEl = ref(null);

const currentIndex = computed(() =>
  props.projects.findIndex((p) => p.id === props.project.id),
);

const prevProject = computed(() => {
  const i = currentIndex.value;
  if (i <= 0) {
    return props.projects[props.projects.length - 1];
  }
  return props.projects[i - 1];
});

const nextProject = computed(() => {
  const i = currentIndex.value;
  if (i < 0 || i >= props.projects.length - 1) {
    return props.projects[0];
  }
  return props.projects[i + 1];
});

function go(target, dir) {
  if (!target || target.id === props.project.id) {
    return;
  }
  direction.value = dir;
  emit("select", target);
}

function goPrev() {
  go(prevProject.value, -1);
}

function goNext() {
  go(nextProject.value, 1);
}

function goTo(project) {
  if (!project) {
    return;
  }
  const dir = props.projects.indexOf(project) > currentIndex.value ? 1 : -1;
  go(project, dir);
}

function onClose() {
  emit("close");
}

function onKey(e) {
  if (e.key === "ArrowLeft") {
    goPrev();
  } else if (e.key === "ArrowRight") {
    goNext();
  }
}

watch(
  () => props.project?.id,
  () => {
    if (scrollEl.value) {
      scrollEl.value.scrollTop = 0;
    }
  },
);

onMounted(() => {
  document.body.classList.add("modal-open");
  window.addEventListener("keydown", onKey);
});

onUnmounted(() => {
  document.body.classList.remove("modal-open");
  window.removeEventListener("keydown", onKey);
});

const slideClass = computed(() =>
  direction.value > 0 ? "fs-slide--right" : "fs-slide--left",
);
</script>

<template>
  <main class="project-fullscreen" aria-label="Página de projeto">
    <header class="project-fullscreen__topbar">
      <a
        class="project-fullscreen__brand"
        :href="withBasePath('/')"
        aria-label="Voltar à página inicial"
        @click.prevent="onClose"
      >
        <span class="project-fullscreen__brand-name">Dina Pita</span>
        <span class="project-fullscreen__brand-sub">Arquitetura</span>
      </a>

      <div class="project-fullscreen__progress">
        <span>{{ String(currentIndex + 1).padStart(2, "0") }}</span>
        <span class="project-fullscreen__progress-sep">/</span>
        <span>{{ String(projects.length).padStart(2, "0") }}</span>
      </div>

      <div class="project-fullscreen__topbar-actions">
        <a
          class="modal__action"
          :href="withBasePath('/')"
          aria-label="Voltar ao site"
          @click.prevent="onClose"
        >
          <span class="modal__action-label">Ver site</span>
          <svg
            class="modal__action-icon"
            viewBox="0 0 16 16"
            width="14"
            height="14"
            aria-hidden="true"
          >
            <path
              d="M9.5 2L3 8l6.5 6"
              fill="none"
              stroke="currentColor"
              stroke-width="1.4"
              stroke-linecap="square"
            />
          </svg>
        </a>
      </div>
    </header>

    <div ref="scrollEl" class="project-fullscreen__scroll">
      <transition :name="slideClass" mode="out-in">
        <article :key="project.id" class="project-fullscreen__article">
          <header class="project-fullscreen__hero">
            <p class="project-fullscreen__overtitle">{{ project.tipo }}</p>
            <h1 class="project-fullscreen__title">{{ project.nome }}</h1>
            <p class="project-fullscreen__lead">{{ project.resumo }}</p>
          </header>

          <figure class="project-fullscreen__cover">
            <img
              :src="project.img"
              :alt="project.alt"
              width="1600"
              height="1100"
              loading="eager"
            />
          </figure>

          <section class="project-fullscreen__body">
            <div class="project-fullscreen__text">
              <p
                v-for="(p, i) in project.descricao"
                :key="i"
                class="project-fullscreen__paragraph"
              >
                {{ p }}
              </p>
            </div>

            <aside class="project-fullscreen__meta">
              <h2 class="project-fullscreen__meta-title">Ficha técnica</h2>
              <dl class="project-fullscreen__meta-list">
                <template v-for="(value, label) in project.meta" :key="label">
                  <dt>{{ label }}</dt>
                  <dd>{{ value }}</dd>
                </template>
              </dl>
            </aside>
          </section>

          <section class="project-fullscreen__gallery">
            <figure
              v-for="(src, i) in project.galeria"
              :key="src"
              class="project-fullscreen__shot"
              :class="{ 'project-fullscreen__shot--wide': i % 3 === 0 }"
            >
              <img
                :src="src"
                :alt="`${project.nome} — vista ${i + 1}`"
                loading="lazy"
              />
            </figure>
          </section>
        </article>
      </transition>

      <nav class="project-fullscreen__pager" aria-label="Navegação entre projetos">
        <button
          type="button"
          class="project-fullscreen__pager-btn project-fullscreen__pager-btn--prev"
          @click="goPrev"
          :aria-label="`Projeto anterior: ${prevProject?.nome}`"
        >
          <span class="project-fullscreen__pager-arrow" aria-hidden="true">←</span>
          <span class="project-fullscreen__pager-meta">
            <span class="project-fullscreen__pager-label">Anterior</span>
            <span class="project-fullscreen__pager-name">{{ prevProject?.nome }}</span>
          </span>
        </button>

        <button
          type="button"
          class="project-fullscreen__pager-btn project-fullscreen__pager-btn--next"
          @click="goNext"
          :aria-label="`Próximo projeto: ${nextProject?.nome}`"
        >
          <span class="project-fullscreen__pager-meta">
            <span class="project-fullscreen__pager-label">Próximo</span>
            <span class="project-fullscreen__pager-name">{{ nextProject?.nome }}</span>
          </span>
          <span class="project-fullscreen__pager-arrow" aria-hidden="true">→</span>
        </button>
      </nav>

      <ol class="project-fullscreen__strip" aria-label="Todos os projetos">
        <li v-for="(p, i) in projects" :key="p.id">
          <button
            type="button"
            class="project-fullscreen__strip-btn"
            :class="{ 'is-current': p.id === project.id }"
            :aria-current="p.id === project.id"
            @click="goTo(p)"
          >
            <span class="project-fullscreen__strip-num">
              {{ String(i + 1).padStart(2, "0") }}
            </span>
            <span class="project-fullscreen__strip-name">{{ p.nome }}</span>
          </button>
        </li>
      </ol>
    </div>
  </main>
</template>
