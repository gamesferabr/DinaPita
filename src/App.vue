<script setup>
import { watch } from "vue";
import { projetos, brand } from "./data/siteContent.js";
import { useScrollTo } from "./composables/useScrollTo.js";
import { useNavTone } from "./composables/useNavTone.js";
import { useParallax } from "./composables/useParallax.js";
import SiteShellNav from "./components/SiteShellNav.vue";
import InteractiveScroller from "./components/InteractiveScroller.vue";
import SiteCursor from "./components/SiteCursor.vue";
import ProjectsIntroSection from "./components/ProjectsIntroSection.vue";
import ShowcaseVideoSection from "./components/ShowcaseVideoSection.vue";
import ProjectsSection from "./components/ProjectsSection.vue";
import SiteFooter from "./components/SiteFooter.vue";

const ano = new Date().getFullYear();
const { menuOpen, scrollTo, go } = useScrollTo();
const { heroIsVisible } = useNavTone("#topo");

useParallax("[data-parallax]");

function toggleMenu() {
  menuOpen.value = !menuOpen.value;
}

watch(menuOpen, (open) => {
  document.body.classList.toggle("nav-open", open);
});
</script>

<template>
  <div class="app app--shell DefaultPage">
    <a class="skip-link" href="#conteudo">Ir para o conteúdo</a>

    <SiteShellNav
      :menu-open="menuOpen"
      :hero-nav="heroIsVisible"
      :logo-src="brand.logoPreto"
      @toggle-menu="toggleMenu"
      @scroll-to="scrollTo"
      @go="go"
    />

    <InteractiveScroller :light-track="false" />
    <SiteCursor />

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
              <ProjectsSection :projects="projetos" @go="go" />
              <SiteFooter
                :ano="ano"
                :logo-src="brand.logoPreto"
                :logo-branco-src="brand.logoBranco"
                @scroll-to="scrollTo"
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>
