<script setup>
defineProps({
  title: { type: String, default: "Projetos" },
  homeHref: { type: String, default: "#topo" },
  logoSrc: { type: String, required: true },
  whatsappHref: { type: String, required: true },
  whatsappHeadline: { type: String, default: "Vamos falar de projeto?" },
  whatsappSub: {
    type: String,
    default: "Mensagem direta no WhatsApp — respondemos em horário comercial.",
  },
});

const emit = defineEmits(["scroll-to"]);
</script>

<template>
  <section id="topo" class="projects-intro page-page" data-background-color="dark">
    <div class="projects-intro__media">
      <div class="projects-intro__whatsapp-slab">
        <div class="whatsapp-slab__pattern" aria-hidden="true" />
        <div class="whatsapp-slab__bubbles" aria-hidden="true">
          <p class="whatsapp-slab__bubble whatsapp-slab__bubble--in">
            Dá para contar a ideia do terreno e prazos por aqui?
          </p>
          <p class="whatsapp-slab__bubble whatsapp-slab__bubble--out">
            Com certeza. Te retorno com agenda e próximos passos.
          </p>
        </div>
        <div class="whatsapp-slab__copy">
          <p class="whatsapp-slab__eyebrow">Contato no WhatsApp</p>
          <h2 class="whatsapp-slab__headline">{{ whatsappHeadline }}</h2>
          <p class="whatsapp-slab__sub">{{ whatsappSub }}</p>
          <a
            :href="whatsappHref"
            class="whatsapp-slab__btn"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span class="whatsapp-slab__btn-icon" aria-hidden="true">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="22"
                height="22"
                fill="currentColor"
              >
                <path
                  d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"
                />
              </svg>
            </span>
            <span>Abrir WhatsApp</span>
          </a>
        </div>
      </div>
      <div class="projects-intro__overlay" />
    </div>

    <div class="page-content_wrapper projects-intro__wrapper">
      <a
        class="big-letter big-letter-position big-letter--logo big-letter--on-media introduction"
        :href="homeHref"
        aria-label="Voltar ao início — Dina Pita Arquitetura"
        @click.prevent="emit('scroll-to', 'topo')"
      >
        <img
          :src="logoSrc"
          alt=""
          class="big-letter__img"
          width="320"
          height="320"
          decoding="async"
        />
      </a>
    </div>

    <div class="container-fluid page-content-wrapper projects-intro__head">
      <div class="row">
        <div class="offset-4 col-7 col-md-6">
          <div class="container-fluid introduction_wrapper">
            <div class="row">
              <h1
                v-reveal
                class="introduction introduction--on-media page-block no-padding no-margin"
              >
                {{ title }}
              </h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
