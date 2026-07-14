<script setup>
import { computed, onMounted, onUnmounted, ref, watch } from "vue";
import { withBasePath } from "../utils/basePath.js";

const props = defineProps({
  project: { type: Object, required: true },
  projects: { type: Array, required: true },
  whatsappUrl: { type: String, default: "" },
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

    <a
      v-if="whatsappUrl"
      class="wa-fab"
      :href="whatsappUrl"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar no WhatsApp"
    >
      <svg class="wa-fab__icon" width="26" height="26" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path
          d="M17.5 14.4c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.06 2.87 1.21 3.07.15.2 2.09 3.2 5.07 4.49.71.31 1.26.49 1.69.62.71.23 1.36.2 1.87.12.57-.09 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.13-.27-.2-.57-.35z"
        />
        <path
          d="M12 2A10 10 0 0 0 3.5 17.3L2 22l4.8-1.5A10 10 0 1 0 12 2zm0 18.2c-1.5 0-3-.4-4.3-1.16l-.3-.18-2.85.9.9-2.78-.2-.32A8.2 8.2 0 1 1 12 20.2z"
        />
      </svg>
      <span class="wa-fab__label">Fale no WhatsApp</span>
    </a>
  </main>
</template>
