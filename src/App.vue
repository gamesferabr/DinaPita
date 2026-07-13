<script setup>
import { projetos, servicos, contato, brand, home } from "./data/siteContent.js";
import { useUrlModal } from "./composables/useUrlModal.js";
import { withBasePath } from "./utils/basePath.js";
import diagnostico from "./data/diagnostico.json";
import HomeNav from "./components/home/HomeNav.vue";
import HomeHero from "./components/home/HomeHero.vue";
import HomeMarquee from "./components/home/HomeMarquee.vue";
import HomeIntro from "./components/home/HomeIntro.vue";
import HomeServices from "./components/home/HomeServices.vue";
import HomeQuiz from "./components/home/HomeQuiz.vue";
import HomeCases from "./components/home/HomeCases.vue";
import HomeServicesList from "./components/home/HomeServicesList.vue";
import HomeCta from "./components/home/HomeCta.vue";
import HomeFooter from "./components/home/HomeFooter.vue";
import ProjectModal from "./components/ProjectModal.vue";
import ProjectFullscreen from "./components/ProjectFullscreen.vue";
import ContactModal from "./components/ContactModal.vue";

const ano = new Date().getFullYear();
const {
  openProject,
  contactOpen,
  fullscreen,
  openProjectModal,
  openContactModal,
  selectProject,
  closeAll,
} = useUrlModal(projetos);

function scrollToId(id) {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

function onNav(item) {
  if (item.type === "modal") {
    openContactModal();
    return;
  }
  scrollToId(item.id);
}

function onProjectModalClose(payload) {
  closeAll();
  if (payload && payload.open === "contato") {
    openContactModal();
  }
}
</script>

<template>
  <div class="gm-root" :class="{ 'app--fullscreen': fullscreen }">
    <template v-if="!fullscreen">
      <HomeNav
        :items="home.nav"
        :monograma="brand.monograma"
        :logo-src="withBasePath(brand.logoPreto)"
        :cta-label="home.hero.ctaPrimario"
        @nav="onNav"
        @cta="openContactModal"
      />

      <main id="conteudo">
        <HomeHero
          :hero="home.hero"
          @cta="openContactModal"
          @ver-projetos="scrollToId('projetos')"
        />
        <HomeMarquee :items="home.marquee" />
        <HomeIntro :statement="home.statement" />
        <HomeServices :cards="home.serviceCards" />
        <HomeCases :projects="projetos" @open-project="openProjectModal" />
        <HomeQuiz :data="diagnostico" />
        <HomeServicesList :servicos="servicos" />
        <HomeCta
          :cta="home.cta"
          :whatsapp-url="contato.whatsappUrl"
          @mensagem="openContactModal"
        />
        <HomeFooter
          :ano="ano"
          :contato="contato"
          :items="home.nav"
          @nav="onNav"
          @contato="openContactModal"
        />
      </main>
    </template>

    <ProjectFullscreen
      v-if="fullscreen && openProject"
      :project="openProject"
      :projects="projetos"
      @select="selectProject"
      @close="closeAll"
    />

    <ProjectModal
      v-if="!fullscreen"
      :project="openProject"
      @close="onProjectModalClose"
    />

    <ContactModal :open="contactOpen" :contact="contato" @close="closeAll" />
  </div>
</template>
