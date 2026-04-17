<script setup>
import { watch } from "vue";
import { projetos, brand, contato } from "./data/siteContent.js";
import { useScrollTo } from "./composables/useScrollTo.js";
import { useNavTone } from "./composables/useNavTone.js";
import { useDarkSection } from "./composables/useDarkSection.js";
import { useParallax } from "./composables/useParallax.js";
import { useUrlModal } from "./composables/useUrlModal.js";
import SiteShellNav from "./components/SiteShellNav.vue";
import InteractiveScroller from "./components/InteractiveScroller.vue";
import SiteCursor from "./components/SiteCursor.vue";
import ProjectsIntroSection from "./components/ProjectsIntroSection.vue";
import ShowcaseVideoSection from "./components/ShowcaseVideoSection.vue";
import ProjectsSection from "./components/ProjectsSection.vue";
import SiteFooter from "./components/SiteFooter.vue";
import ProjectModal from "./components/ProjectModal.vue";
import ProjectFullscreen from "./components/ProjectFullscreen.vue";
import ContactModal from "./components/ContactModal.vue";

const ano = new Date().getFullYear();
const { menuOpen, scrollTo } = useScrollTo();
const { heroIsVisible } = useNavTone("#topo");
const { isOverDark } = useDarkSection(["#topo", ".footer__content"]);
const {
  openProject,
  contactOpen,
  fullscreen,
  openProjectModal,
  openContactModal,
  selectProject,
  closeAll,
} = useUrlModal(projetos);

useParallax("[data-parallax]");

function toggleMenu() {
  menuOpen.value = !menuOpen.value;
}

/** O nav e o footer chamam `go(id)` para itens do menu — interceptamos
 * "contato" para abrir o modal em vez de apenas rolar. */
function go(id) {
  menuOpen.value = false;
  if (id === "contato") {
    openContactModal();
    return;
  }
  scrollTo(id);
}

function onProjectModalClose(payload) {
  closeAll();
  if (payload && payload.open === "contato") {
    openContactModal();
  }
}

watch(menuOpen, (open) => {
  document.body.classList.toggle("nav-open", open);
});
</script>

<template>
  <div class="app app--shell DefaultPage" :class="{ 'app--fullscreen': fullscreen }">
    <a class="skip-link" href="#conteudo">Ir para o conteúdo</a>

    <SiteShellNav
      v-if="!fullscreen"
      :menu-open="menuOpen"
      :hero-nav="heroIsVisible"
      :logo-src="brand.logoPreto"
      @toggle-menu="toggleMenu"
      @scroll-to="scrollTo"
      @go="go"
    />

    <InteractiveScroller v-if="!fullscreen" :light-track="isOverDark" />
    <SiteCursor v-if="!fullscreen" />

    <main id="main-container" class="scroll-container" aria-live="polite">
      <div
        id="conteudo"
        class="page-content page-content--dinapita projects-page static"
        data-background-color="white"
      >
        <div class="page-content_inner">
          <div id="scroll" class="o-scroll">
            <div class="scroll-content">
              <ProjectsIntroSection
                :logo-src="brand.logoPreto"
                @scroll-to="scrollTo"
              />
              <ShowcaseVideoSection />
              <ProjectsSection
                :projects="projetos"
                @go="go"
                @open-project="openProjectModal"
              />
              <SiteFooter
                :ano="ano"
                :logo-src="brand.logoPreto"
                :logo-branco-src="brand.logoBranco"
                @scroll-to="scrollTo"
                @go="go"
              />
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- Fullscreen quando a URL é aberta direto (nova aba/refresh) -->
    <ProjectFullscreen
      v-if="fullscreen && openProject"
      :project="openProject"
      :projects="projetos"
      @select="selectProject"
      @close="closeAll"
    />

    <!-- Modal lateral quando o projeto é aberto por clique interno -->
    <ProjectModal
      v-if="!fullscreen"
      :project="openProject"
      @close="onProjectModalClose"
    />

    <ContactModal :open="contactOpen" :contact="contato" @close="closeAll" />
  </div>
</template>
