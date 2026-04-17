<script setup>
defineProps({
  ano: { type: Number, required: true },
  logoBrancoSrc: { type: String, required: true },
});
</script>

<template>
  <section id="contato" class="section section--contact">
    <div class="footer-brand" aria-hidden="true">
      <div class="footer-brand__frame">
        <img
          class="footer-brand__img"
          :src="logoBrancoSrc"
          alt=""
          width="400"
          height="160"
          decoding="async"
        />
      </div>
    </div>
    <div class="contact__grid">
      <div>
        <h2 class="section__title">Contato</h2>
        <p class="prose contact__intro">
          Convite breve para visita ao escritório ou reunião online.
        </p>
      </div>
      <address class="contact__details">
        <div>
          <span class="contact__label">Telefone</span>
          <a href="tel:+5500000000000">+55 (00) 00000-0000</a>
        </div>
        <div>
          <span class="contact__label">E-mail</span>
          <a href="mailto:contato@escritorio.com">contato@escritorio.com</a>
        </div>
        <div>
          <span class="contact__label">Endereço</span>
          <p>
            Rua Exemplo, 100 — sala 00<br />
            [Bairro] · [Cidade] · [UF] · CEP 00000-000
          </p>
        </div>
      </address>
    </div>
    <p class="footer-legal">
      © {{ ano }} — Dina Pita Arquitetura.
      <a href="#">Política de privacidade</a>
    </p>
  </section>
</template>
