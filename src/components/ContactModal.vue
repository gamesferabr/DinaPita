<script setup>
import { computed, reactive, ref, watch } from "vue";

const props = defineProps({
  open: { type: Boolean, required: true },
  contact: { type: Object, required: true },
});
const emit = defineEmits(["close"]);

const form = reactive({
  nome: "",
  email: "",
  assunto: "Conversar sobre projeto",
  mensagem: "",
});
const sent = ref(false);
const sending = ref(false);

const isOpen = computed(() => props.open);

watch(isOpen, (open) => {
  document.body.classList.toggle("modal-open", open);
  if (!open) {
    sent.value = false;
  }
});

function onClose() {
  emit("close");
}

async function onSubmit() {
  if (sending.value) {
    return;
  }
  sending.value = true;
  // Simulação local. Plugar no backend/Formspree depois substituindo este bloco.
  await new Promise((r) => setTimeout(r, 600));
  sending.value = false;
  sent.value = true;
  Object.assign(form, { nome: "", email: "", mensagem: "" });
}
</script>

<template>
  <transition name="modal">
    <section
      v-if="open"
      class="modal modal--contact"
      role="dialog"
      aria-modal="true"
      aria-label="Contato"
    >
      <div class="modal__backdrop" @click="onClose" />

      <article class="modal__panel modal__panel--contact">
        <header class="modal__bar modal__bar--dark">
          <span class="modal__crumb">
            <span class="modal__crumb-tag">Contato</span>
            <span class="modal__crumb-sep">·</span>
            <span class="modal__crumb-name">Dina Pita Arquitetura</span>
          </span>

          <button
            type="button"
            class="modal__close modal__close--light"
            aria-label="Fechar contato"
            @click="onClose"
          >
            <span class="modal__close-x" aria-hidden="true">×</span>
            <span class="modal__close-label">Fechar</span>
          </button>
        </header>

        <div class="modal__scroll contact-page">
          <div class="contact-page__intro">
            <p class="contact-page__overtitle">Vamos conversar</p>
            <h2 class="contact-page__title">
              Conta para nós o projeto que tens em mente.
            </h2>
            <p class="contact-page__lead">
              Respondemos em até 2 dias úteis. Para projetos comerciais com prazo
              curto, indica isso no assunto.
            </p>
          </div>

          <div class="contact-page__grid">
            <form class="contact-page__form" @submit.prevent="onSubmit">
              <label class="contact-page__field">
                <span>Nome</span>
                <input v-model="form.nome" type="text" required autocomplete="name" />
              </label>

              <label class="contact-page__field">
                <span>E-mail</span>
                <input v-model="form.email" type="email" required autocomplete="email" />
              </label>

              <label class="contact-page__field">
                <span>Assunto</span>
                <select v-model="form.assunto">
                  <option>Conversar sobre projeto</option>
                  <option>Reforma residencial</option>
                  <option>Projeto comercial</option>
                  <option>Consultoria</option>
                  <option>Imprensa</option>
                </select>
              </label>

              <label class="contact-page__field">
                <span>Mensagem</span>
                <textarea v-model="form.mensagem" rows="5" required />
              </label>

              <button
                type="submit"
                class="contact-page__submit"
                :disabled="sending"
              >
                {{ sending ? "A enviar…" : sent ? "Mensagem enviada ✓" : "Enviar mensagem" }}
              </button>
            </form>

            <aside class="contact-page__details">
              <div class="contact-page__block">
                <p class="contact-page__label">Telefone</p>
                <a :href="`tel:${contact.telefone}`">{{ contact.telefone }}</a>
              </div>
              <div class="contact-page__block">
                <p class="contact-page__label">E-mail</p>
                <a :href="`mailto:${contact.email}`">{{ contact.email }}</a>
              </div>
              <div class="contact-page__block">
                <p class="contact-page__label">Endereço</p>
                <p v-for="line in contact.endereco" :key="line">{{ line }}</p>
              </div>
              <div class="contact-page__block">
                <p class="contact-page__label">Atendimento</p>
                <p>{{ contact.horario }}</p>
              </div>
              <div class="contact-page__block">
                <p class="contact-page__label">Redes</p>
                <ul class="contact-page__social">
                  <li v-for="s in contact.social" :key="s.label">
                    <a :href="s.href" target="_blank" rel="noopener">{{ s.label }}</a>
                  </li>
                </ul>
              </div>
            </aside>
          </div>
        </div>
      </article>
    </section>
  </transition>
</template>
