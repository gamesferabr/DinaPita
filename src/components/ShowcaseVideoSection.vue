<script setup>
import { onBeforeUnmount, onMounted, ref } from "vue";
import { contato } from "../data/siteContent.js";

const props = defineProps({
  /** Link do WhatsApp (com mensagem pré-preenchida). Fallback para `siteContent`. */
  whatsappHref: { type: String, default: contato.whatsappUrl },
  /** Texto do CTA gigante. */
  ctaLabel: { type: String, default: "Vamos conversar?" },
  /**
   * Mensagens encenadas no “telemóvel” — aparecem com delay progressivo,
   * simulando uma conversa real antes do CTA final.
   */
  mensagens: {
    type: Array,
    default: () => [
      { from: "cliente", text: "Oi! Vi o portfólio de vocês — muito bom." },
      { from: "dina", text: "Oi 👋 Obrigada! Quer me contar um pouco do projeto?" },
      { from: "cliente", text: "Tô pensando em reformar um apto. de 180 m² em SP." },
      { from: "dina", text: "Adorei o briefing. Dá para marcarmos uma call rápida?" },
    ],
  },
});

const rootEl = ref(null);
const visible = ref(false);
const reducedMotion = ref(false);
let observer = null;

onMounted(() => {
  reducedMotion.value = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (!rootEl.value || reducedMotion.value) {
    visible.value = true;
    return;
  }
  if (!("IntersectionObserver" in window)) {
    visible.value = true;
    return;
  }
  observer = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          visible.value = true;
          observer.unobserve(e.target);
        }
      }
    },
    { threshold: 0.25 },
  );
  observer.observe(rootEl.value);
});

onBeforeUnmount(() => {
  if (observer) {
    observer.disconnect();
    observer = null;
  }
});

/** Hora “atual” formatada (hh:mm) para o balão — ilusão de conversa em tempo real. */
function now() {
  const d = new Date();
  const hh = String(d.getHours()).padStart(2, "0");
  const mm = String(d.getMinutes()).padStart(2, "0");
  return `${hh}:${mm}`;
}

const horario = now();

/**
 * Atraso de entrada de cada balão.
 * - cada mensagem: 1.1s depois da anterior
 * - indicador de “digitando” aparece 0.5s antes da resposta da Dina
 */
function bubbleDelay(i) {
  return `${0.4 + i * 1.1}s`;
}
</script>

<template>
  <section
    id="showcase"
    ref="rootEl"
    class="wa-showcase"
    :class="{ 'is-visible': visible, 'is-reduced': reducedMotion }"
    aria-labelledby="wa-showcase-title"
    data-background-color="white"
  >
    <div class="wa-showcase__grid">
      <div class="wa-showcase__text">
        <span class="eyebrow">Fale com o escritório</span>
        <h2 id="wa-showcase-title" class="wa-showcase__title">
          Projeto começa com
          <em>uma boa conversa</em>.
        </h2>
        <p class="wa-showcase__lead">
          Manda uma mensagem no WhatsApp. A Dina responde pessoalmente —
          sem formulário, sem robô, sem follow-up automático.
        </p>

        <ul class="wa-showcase__facts" aria-label="Como funciona">
          <li>
            <span class="wa-showcase__fact-num">01</span>
            <span>Conta em 2 linhas o que tens em mente.</span>
          </li>
          <li>
            <span class="wa-showcase__fact-num">02</span>
            <span>Combinamos uma call de 20 min (grátis).</span>
          </li>
          <li>
            <span class="wa-showcase__fact-num">03</span>
            <span>Se fizer sentido, seguimos para proposta.</span>
          </li>
        </ul>
      </div>

      <!-- “Telemóvel” com conversa a decorrer -->
      <div class="wa-showcase__phone-wrap">
        <div class="wa-showcase__phone" aria-hidden="true">
          <div class="wa-showcase__phone-notch" />

          <header class="wa-showcase__phone-topbar">
            <span class="wa-showcase__phone-avatar">D</span>
            <span class="wa-showcase__phone-meta">
              <strong>Dina Pita</strong>
              <small>online agora</small>
            </span>
            <span class="wa-showcase__phone-call">
              <span />
              <span />
            </span>
          </header>

          <div class="wa-showcase__phone-feed">
            <div
              v-for="(m, i) in mensagens"
              :key="i"
              class="wa-showcase__bubble"
              :class="[
                m.from === 'dina'
                  ? 'wa-showcase__bubble--dina'
                  : 'wa-showcase__bubble--cliente',
              ]"
              :style="{ '--bubble-delay': bubbleDelay(i) }"
            >
              <p>{{ m.text }}</p>
              <span class="wa-showcase__bubble-time">{{ horario }}</span>
            </div>

            <!-- Indicador “a escrever…”, aparece depois da última mensagem -->
            <div
              class="wa-showcase__bubble wa-showcase__bubble--dina wa-showcase__bubble--typing"
              :style="{
                '--bubble-delay': `${0.4 + mensagens.length * 1.1}s`,
              }"
              aria-hidden="true"
            >
              <span class="wa-showcase__dot" />
              <span class="wa-showcase__dot" />
              <span class="wa-showcase__dot" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- CTA gigante inspirado em lusion / awwwards -->
    <a
      class="wa-cta"
      :href="whatsappHref"
      target="_blank"
      rel="noopener"
      :aria-label="`${ctaLabel} Abre uma nova conversa no WhatsApp.`"
    >
      <span class="wa-cta__line">
        <span class="wa-cta__word" data-text="Vamos">Vamos</span>
        <span class="wa-cta__word wa-cta__word--accent" data-text="conversar?">
          conversar?
        </span>
      </span>

      <span class="wa-cta__meta">
        <span class="wa-cta__icon" aria-hidden="true">
          <svg viewBox="0 0 32 32" fill="none" width="28" height="28">
            <path
              d="M16 3C8.82 3 3 8.82 3 16c0 2.29.6 4.45 1.64 6.32L3 29l6.88-1.81A12.93 12.93 0 0 0 16 29c7.18 0 13-5.82 13-13S23.18 3 16 3Zm7.21 17.94c-.3.85-1.73 1.63-2.42 1.73-.62.09-1.41.13-2.28-.14-.52-.16-1.2-.38-2.06-.76-3.63-1.58-5.99-5.31-6.17-5.55-.18-.24-1.47-1.96-1.47-3.74 0-1.78.93-2.65 1.27-3.01.34-.36.73-.45.97-.45.24 0 .49.0.7.01.22.01.52-.08.82.62.3.7 1.02 2.48 1.11 2.66.09.18.15.4.03.64-.12.24-.18.4-.36.62-.18.22-.38.49-.54.66-.18.18-.37.38-.16.74.2.36.91 1.5 1.95 2.43 1.34 1.19 2.47 1.56 2.83 1.74.36.18.57.15.79-.09.22-.24.91-1.06 1.15-1.43.24-.36.48-.3.82-.18.34.12 2.14 1.01 2.51 1.2.36.18.6.27.7.42.09.15.09.85-.22 1.69Z"
              fill="currentColor"
            />
          </svg>
        </span>
        <span class="wa-cta__sub">
          <small>WhatsApp · resposta em horário comercial</small>
          <strong>{{ ctaLabel }}</strong>
        </span>
      </span>
    </a>
  </section>
</template>

<style scoped>
/* ============================================================
 * Showcase CTA — WhatsApp conversational
 * Inspiração: lusion.co (big type), humaan.com (phone mock),
 * awwwards header hovers (data-text duplicado)
 * ========================================================== */
.wa-showcase {
  --wa-green: #25d366;
  --wa-green-ink: #075e54;
  --wa-paper: #ece5dd;
  --wa-cliente: #ffffff;
  --wa-dina: #dcf8c6;
  --wa-ink: #0b1414;

  position: relative;
  padding: clamp(5rem, 10vw, 8rem) max(var(--space-lg), 8.333vw)
    clamp(4rem, 8vw, 6rem);
  background: var(--bg);
  color: var(--text);
  overflow: hidden;
}

.wa-showcase__grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: clamp(2rem, 5vw, 4.5rem);
  align-items: center;
}

@media (min-width: 900px) {
  .wa-showcase__grid {
    grid-template-columns: 1.05fr 0.95fr;
  }
}

.wa-showcase__text .eyebrow {
  display: inline-block;
  font-size: 0.72rem;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--text-muted);
  margin-bottom: 1.2rem;
}

.wa-showcase__title {
  font-family: var(--font-display);
  font-weight: 600;
  font-size: clamp(2.1rem, 4.7vw, 3.4rem);
  line-height: 1.04;
  letter-spacing: -0.025em;
  margin: 0 0 1.25rem;
}

.wa-showcase__title em {
  font-style: italic;
  font-weight: 500;
  color: var(--wa-green-ink);
}

.wa-showcase__lead {
  font-size: clamp(1rem, 1.2vw, 1.12rem);
  line-height: 1.6;
  max-width: 42ch;
  color: var(--text);
  margin: 0 0 2rem;
}

.wa-showcase__facts {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: 0.75rem;
}

.wa-showcase__facts li {
  display: grid;
  grid-template-columns: 2.25rem 1fr;
  align-items: baseline;
  gap: 0.75rem;
  padding: 0.5rem 0;
  border-top: 1px solid color-mix(in srgb, var(--ash) 55%, transparent);
}

.wa-showcase__facts li:last-child {
  border-bottom: 1px solid color-mix(in srgb, var(--ash) 55%, transparent);
}

.wa-showcase__fact-num {
  font-family: var(--font-display);
  font-size: 0.78rem;
  letter-spacing: 0.18em;
  color: var(--text-muted);
}

/* ============================================================
 * Phone mock — lado direito
 * ========================================================== */
.wa-showcase__phone-wrap {
  display: flex;
  justify-content: center;
  perspective: 1200px;
}

.wa-showcase__phone {
  position: relative;
  width: min(340px, 88vw);
  aspect-ratio: 9 / 19;
  border-radius: 44px;
  background: #0b1414;
  padding: 14px;
  box-shadow:
    0 40px 60px -30px rgba(11, 20, 20, 0.55),
    0 18px 28px -18px rgba(11, 20, 20, 0.35),
    inset 0 0 0 1px color-mix(in srgb, #fff 10%, transparent);
  transform: rotate(-3deg) translateY(20px);
  opacity: 0;
  transition:
    transform 1s var(--ease),
    opacity 0.9s var(--ease);
}

.wa-showcase.is-visible .wa-showcase__phone {
  transform: rotate(-3deg) translateY(0);
  opacity: 1;
}

.wa-showcase__phone-notch {
  position: absolute;
  top: 14px;
  left: 50%;
  transform: translateX(-50%);
  width: 38%;
  height: 22px;
  background: #0b1414;
  border-radius: 0 0 18px 18px;
  z-index: 3;
}

.wa-showcase__phone-topbar {
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: 0.8rem;
  background: var(--wa-green-ink);
  color: #fff;
  padding: 0.9rem 0.9rem 0.8rem;
  border-radius: 30px 30px 0 0;
  position: relative;
  z-index: 1;
}

.wa-showcase__phone-avatar {
  width: 34px;
  height: 34px;
  border-radius: 50%;
  background: color-mix(in srgb, #fff 22%, var(--wa-green-ink));
  color: #fff;
  display: grid;
  place-items: center;
  font-family: var(--font-display);
  font-weight: 600;
  font-size: 1rem;
}

.wa-showcase__phone-meta strong {
  display: block;
  font-size: 0.88rem;
  font-weight: 500;
  letter-spacing: 0.01em;
}

.wa-showcase__phone-meta small {
  display: block;
  font-size: 0.7rem;
  opacity: 0.75;
}

.wa-showcase__phone-call {
  display: inline-flex;
  gap: 4px;
}

.wa-showcase__phone-call span {
  width: 14px;
  height: 14px;
  border: 1.5px solid currentColor;
  border-radius: 50%;
  opacity: 0.6;
}

.wa-showcase__phone-feed {
  position: relative;
  height: calc(100% - 66px);
  background: var(--wa-paper);
  background-image:
    radial-gradient(
      circle at 25% 20%,
      color-mix(in srgb, var(--wa-green-ink) 6%, transparent),
      transparent 45%
    ),
    radial-gradient(
      circle at 80% 70%,
      color-mix(in srgb, var(--wa-green-ink) 5%, transparent),
      transparent 45%
    );
  padding: 1rem 0.85rem 1.2rem;
  display: flex;
  flex-direction: column;
  gap: 0.55rem;
  border-radius: 0 0 30px 30px;
  overflow: hidden;
}

.wa-showcase__bubble {
  position: relative;
  max-width: 78%;
  padding: 0.55rem 0.7rem 0.9rem;
  border-radius: 10px;
  font-size: 0.86rem;
  line-height: 1.35;
  color: var(--wa-ink);
  box-shadow: 0 1px 0.5px rgba(11, 20, 20, 0.08);
  opacity: 0;
  transform: translateY(14px) scale(0.98);
  transition:
    opacity 0.5s var(--ease),
    transform 0.5s var(--ease);
  transition-delay: var(--bubble-delay, 0s);
}

.wa-showcase.is-visible .wa-showcase__bubble {
  opacity: 1;
  transform: translateY(0) scale(1);
}

.wa-showcase__bubble p {
  margin: 0 0 0.1rem;
}

.wa-showcase__bubble-time {
  position: absolute;
  right: 0.55rem;
  bottom: 0.35rem;
  font-size: 0.6rem;
  letter-spacing: 0.02em;
  color: color-mix(in srgb, var(--wa-ink) 55%, transparent);
}

.wa-showcase__bubble--cliente {
  align-self: flex-end;
  background: var(--wa-dina);
  border-bottom-right-radius: 2px;
}

.wa-showcase__bubble--dina {
  align-self: flex-start;
  background: var(--wa-cliente);
  border-bottom-left-radius: 2px;
}

.wa-showcase__bubble--typing {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 0.6rem 0.8rem;
  font-size: 0.8rem;
}

.wa-showcase__dot {
  display: inline-block;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: color-mix(in srgb, var(--wa-ink) 55%, transparent);
  animation: wa-dot 1.2s var(--ease) infinite;
}

.wa-showcase__dot:nth-child(2) {
  animation-delay: 0.15s;
}
.wa-showcase__dot:nth-child(3) {
  animation-delay: 0.3s;
}

@keyframes wa-dot {
  0%, 80%, 100% {
    transform: translateY(0);
    opacity: 0.4;
  }
  40% {
    transform: translateY(-3px);
    opacity: 1;
  }
}

/* ============================================================
 * CTA gigante — inspirado em lusion / awwwards
 * ========================================================== */
.wa-cta {
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  margin-top: clamp(3rem, 6vw, 5rem);
  padding: clamp(1.5rem, 3vw, 2.2rem) 0 0;
  border-top: 1px solid color-mix(in srgb, var(--ash) 45%, transparent);
  color: var(--text);
  text-decoration: none;
  cursor: pointer;
}

.wa-cta__line {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4em 0.55em;
  align-items: baseline;
  font-family: var(--font-display);
  font-weight: 600;
  font-size: clamp(3rem, 9vw, 7.2rem);
  line-height: 0.92;
  letter-spacing: -0.035em;
}

.wa-cta__word {
  position: relative;
  display: inline-block;
  overflow: hidden ;
  transition: color 0.35s var(--ease);
}

.wa-cta__word::after {
  content: attr(data-text);
  position: absolute;
  inset: 0;
  color: var(--wa-green);
  transform: translateY(102%);
  transition: transform 0.55s var(--ease);
}

.wa-cta:hover .wa-cta__word,
.wa-cta:focus-visible .wa-cta__word {
  color: color-mix(in srgb, var(--text) 35%, transparent);
}

.wa-cta:hover .wa-cta__word::after,
.wa-cta:focus-visible .wa-cta__word::after {
  transform: translateY(0);
}

.wa-cta__word--accent {
  font-style: italic;
  font-weight: 500;
  width: 60%;
}

.wa-cta__meta {
  display: inline-flex;
  align-items: center;
  gap: 0.9rem;
  align-self: flex-start;
  padding: 0.65rem 1.1rem 0.65rem 0.75rem;
  border-radius: 999px;
  background: var(--wa-green);
  color: #062918;
  transition: transform 0.35s var(--ease);
}

.wa-cta:hover .wa-cta__meta,
.wa-cta:focus-visible .wa-cta__meta {
  transform: translateX(6px);
}

.wa-cta__icon {
  display: grid;
  place-items: center;
  width: 34px;
  height: 34px;
  border-radius: 50%;
  background: #fff;
  color: var(--wa-green-ink);
}

.wa-cta__sub {
  display: flex;
  flex-direction: column;
  line-height: 1.15;
}

.wa-cta__sub small {
  font-size: 0.68rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  opacity: 0.8;
}

.wa-cta__sub strong {
  font-size: 0.95rem;
  font-weight: 600;
  letter-spacing: -0.005em;
}

/* Reduced motion: tudo aparece de uma vez, sem tilt/typing */
.wa-showcase.is-reduced .wa-showcase__phone {
  transform: none;
  opacity: 1;
}

.wa-showcase.is-reduced .wa-showcase__bubble {
  opacity: 1;
  transform: none;
  transition: none;
}

.wa-showcase.is-reduced .wa-showcase__dot {
  animation: none;
  opacity: 0.6;
}

.wa-showcase.is-reduced .wa-cta__word::after {
  transition: none;
}
</style>
