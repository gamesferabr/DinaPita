<script setup>
defineProps({
  ano: { type: Number, required: true },
  logoSrc: { type: String, required: true },
  logoBrancoSrc: { type: String, required: true },
});

const emit = defineEmits(["scroll-to"]);
</script>

<template>
  <footer class="footer" aria-label="Rodapé">
    <div class="footer__shape" aria-hidden="true" />

    <div class="footer__content container-fluid">
      <div class="footer__content-bg" aria-hidden="true" />

      <div class="row footer__first-line">
        <div class="offset-1 col-10 col-md-5 col-xl-4 footer__column footer__info-container">
          <a
            href="#topo"
            class="big-letter big-letter--logo big-letter--inverted d-md-none"
            aria-label="Voltar ao topo"
            @click.prevent="emit('scroll-to', 'topo')"
          >
            <img :src="logoBrancoSrc" alt="" width="160" height="160" />
          </a>

          <div class="row footer__line">
            <div v-reveal class="footer__info footer__column col-md-6">
              <p class="footer__label">Telefone</p>
              <p><a href="tel:+5500000000000">+55 (00) 00000-0000</a></p>
            </div>
            <div v-reveal="{ delay: 80 }" class="footer__info footer__column col-md-6">
              <p class="footer__label">Contato</p>
              <p><a href="mailto:contato@dinapita.com">contato@dinapita.com</a></p>
            </div>
          </div>

          <div class="row footer__line">
            <div v-reveal="{ delay: 160 }" class="footer__info footer__column col-md-6">
              <p class="footer__label">Endereço</p>
              <p>
                Rua Exemplo, 100 — sala 00<br />
                [Bairro]<br />
                [Cidade] · [UF]
              </p>
            </div>
            <div v-reveal="{ delay: 240 }" class="footer__info footer__column col-md-6">
              <p class="footer__label">Siga</p>
              <p class="socials">
                <a href="#" rel="noopener">Ig</a>
                <a href="#" rel="noopener">Lk</a>
                <a href="#" rel="noopener">Be</a>
              </p>
            </div>
          </div>
        </div>

        <div
          class="footer__column footer__brand offset-1 offset-md-0 offset-xl-2 col-10 col-md-3 col-xl-2"
        >
          <a
            v-reveal
            href="#topo"
            class="big-letter big-letter--logo big-letter--inverted"
            aria-label="Voltar ao topo"
            @click.prevent="emit('scroll-to', 'topo')"
          >
            <img :src="logoBrancoSrc" alt="" width="180" height="180" />
          </a>
          <p v-reveal="{ delay: 160 }">
            Dina Pita Arquitetura — projetos de arquitetura e interiores que equilibram
            precisão técnica e sensibilidade ao lugar. Atendimento em [Cidade] e região.
          </p>
        </div>
      </div>

      <div class="row footer__second-line">
        <div class="offset-1 col-10 col-md-5 col-xl-4 footer__column">
          <div class="row footer__line">
            <div v-reveal="{ delay: 60 }" class="footer__info footer__column col-md-6">
              <div class="photos-copyright">Fotos © respectivos autores</div>
            </div>
            <div v-reveal="{ delay: 120 }" class="footer__info footer__column col-md-6">
              <ul class="footer__nav">
                <li><a href="#" rel="nofollow">Política de privacidade</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div
          class="row footer__line offset-1 offset-md-0 offset-xl-2 col-12 col-md-3 col-xl-2"
        >
          <div v-reveal="{ delay: 180 }" class="footer__info">
            © {{ ano }} — Dina Pita Arquitetura
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>
