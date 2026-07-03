import { onMounted, onUnmounted, ref } from "vue";
import { stripBasePath, withBasePath } from "../utils/basePath.js";

/**
 * Sincroniza o estado de modais com a barra de endereço usando History API.
 *
 * Rotas suportadas:
 *   /                       → nenhum modal
 *   /contato                → contato
 *   /projetos/<slug>        → projeto com aquele slug
 *
 * `fullscreen.value === true`  → URL aberta diretamente (nova aba/refresh):
 *                                deve ser apresentado em página inteira.
 * `fullscreen.value === false` → URL alterada via clique interno: modal lateral.
 */
export function useUrlModal(projetos) {
  const openProject = ref(null);
  const contactOpen = ref(false);
  const fullscreen = ref(false);

  function projectFromPath(path) {
    const m = path.match(/^\/projetos\/([^/?#]+)/);
    if (!m) {
      return null;
    }
    return projetos.find((p) => p.slug === m[1]) ?? null;
  }

  function syncFromUrl({ initial = false } = {}) {
    const path = stripBasePath(window.location.pathname);
    if (/^\/contato/.test(path)) {
      openProject.value = null;
      contactOpen.value = true;
      if (initial) {
        fullscreen.value = true;
      }
      return;
    }
    const proj = projectFromPath(path);
    if (proj) {
      contactOpen.value = false;
      openProject.value = proj;
      if (initial) {
        fullscreen.value = true;
      }
      return;
    }
    contactOpen.value = false;
    openProject.value = null;
    fullscreen.value = false;
  }

  function pushUrl(url, replace = false) {
    const fullUrl = withBasePath(url);
    if (window.location.pathname + window.location.search === fullUrl) {
      return;
    }
    if (replace) {
      window.history.replaceState({}, "", fullUrl);
    } else {
      window.history.pushState({}, "", fullUrl);
    }
  }

  /** Aberto por clique interno → modal lateral. */
  function openProjectModal(project) {
    if (!project) {
      return;
    }
    contactOpen.value = false;
    fullscreen.value = false;
    openProject.value = project;
    pushUrl(`/projetos/${project.slug}`);
  }

  function openContactModal() {
    openProject.value = null;
    fullscreen.value = false;
    contactOpen.value = true;
    pushUrl("/contato");
  }

  /** Mudança de slug DENTRO do modo fullscreen (carrossel prev/next). */
  function selectProject(project) {
    if (!project) {
      return;
    }
    openProject.value = project;
    pushUrl(`/projetos/${project.slug}`, true);
  }

  function closeAll() {
    if (!openProject.value && !contactOpen.value) {
      return;
    }
    openProject.value = null;
    contactOpen.value = false;
    fullscreen.value = false;
    pushUrl("/");
  }

  function onPopState() {
    syncFromUrl();
  }

  function onKeyDown(e) {
    if (e.key === "Escape") {
      closeAll();
    }
  }

  onMounted(() => {
    syncFromUrl({ initial: true });
    window.addEventListener("popstate", onPopState);
    window.addEventListener("keydown", onKeyDown);
  });

  onUnmounted(() => {
    window.removeEventListener("popstate", onPopState);
    window.removeEventListener("keydown", onKeyDown);
  });

  return {
    openProject,
    contactOpen,
    fullscreen,
    openProjectModal,
    openContactModal,
    selectProject,
    closeAll,
  };
}
