<script setup>
import { computed, ref } from "vue";

const props = defineProps({
  data: { type: Object, required: true },
});

const phase = ref("intro");
const current = ref(0);
const answers = ref([]);

const perguntas = computed(() => props.data.perguntas);
const total = computed(() => perguntas.value.length);
const pergunta = computed(() => perguntas.value[current.value]);
const progresso = computed(() => Math.round((current.value / total.value) * 100));

const resultado = computed(() => {
  const tally = {};
  for (const estilo of answers.value) {
    tally[estilo] = (tally[estilo] ?? 0) + 1;
  }
  const chaves = Object.keys(props.data.estilos);
  const vencedor = chaves.reduce(
    (melhor, chave) => ((tally[chave] ?? 0) > (tally[melhor] ?? 0) ? chave : melhor),
    chaves[0],
  );
  return props.data.estilos[vencedor];
});

const whatsappHref = computed(() => {
  const numero = (props.data.meta.whatsapp ?? "").replace(/\D/g, "");
  const texto = encodeURIComponent(
    `Olá! Fiz o diagnóstico e meu estilo é ${resultado.value.nome}. Quero conversar sobre um projeto.`,
  );
  return `https://wa.me/${numero}?text=${texto}`;
});

function iniciar() {
  answers.value = [];
  current.value = 0;
  phase.value = "quiz";
}

function responder(estilo) {
  answers.value[current.value] = estilo;
  if (current.value < total.value - 1) {
    current.value += 1;
    return;
  }
  phase.value = "result";
}

function voltar() {
  if (current.value > 0) {
    current.value -= 1;
  }
}

function refazer() {
  phase.value = "intro";
}
</script>

<template>
  <section id="diagnostico" class="gm-quiz">
    <div
      class="gm-quiz__card"
      :style="phase === 'result' ? { '--gm-quiz-accent': resultado.cor } : null"
    >
      <!-- Intro -->
      <div v-if="phase === 'intro'" class="gm-quiz__intro">
        <p class="gm-eyebrow">Diagnóstico de estilo</p>
        <h2 class="gm-quiz__title">{{ data.meta.titulo }}</h2>
        <p class="gm-quiz__sub">{{ data.meta.subtitulo }}</p>
        <p class="gm-quiz__nota">{{ data.meta.nota }}</p>
        <button type="button" class="gm-btn gm-btn--ink" @click="iniciar">
          Começar o diagnóstico
        </button>
      </div>

      <!-- Perguntas -->
      <div v-else-if="phase === 'quiz'" class="gm-quiz__q">
        <div class="gm-quiz__bar" aria-hidden="true">
          <span :style="{ width: `${progresso}%` }" />
        </div>
        <p class="gm-quiz__count">Pergunta {{ current + 1 }} de {{ total }}</p>
        <h3 class="gm-quiz__pergunta">{{ pergunta.pergunta }}</h3>

        <div class="gm-quiz__options">
          <button
            v-for="(op, i) in pergunta.opcoes"
            :key="i"
            type="button"
            class="gm-quiz__opt"
            :class="{ 'is-active': answers[current] === op.estilo }"
            @click="responder(op.estilo)"
          >
            <span class="gm-quiz__opt-emoji">{{ op.emoji }}</span>
            <span class="gm-quiz__opt-text">{{ op.texto }}</span>
          </button>
        </div>

        <button
          v-if="current > 0"
          type="button"
          class="gm-quiz__back"
          @click="voltar"
        >
          ← Voltar
        </button>
      </div>

      <!-- Resultado -->
      <div v-else class="gm-quiz__result">
        <p class="gm-eyebrow">Seu estilo é</p>
        <h2 class="gm-quiz__result-name">{{ resultado.nome }}</h2>
        <p class="gm-quiz__result-word">{{ resultado.palavra }}</p>
        <p class="gm-quiz__result-desc">{{ resultado.descricao }}</p>
        <p class="gm-quiz__result-frase">"{{ resultado.frase }}"</p>

        <div class="gm-quiz__fotos">
          <figure v-for="foto in resultado.fotos" :key="foto.url">
            <img :src="foto.url" :alt="foto.label" loading="lazy" />
            <figcaption>{{ foto.label }}</figcaption>
          </figure>
        </div>

        <ul class="gm-quiz__itens">
          <li v-for="item in resultado.itens" :key="item.titulo">
            <span class="gm-quiz__item-icon">{{ item.icon }}</span>
            <span>
              <strong>{{ item.titulo }}</strong>
              <span class="gm-quiz__item-desc">{{ item.desc }}</span>
            </span>
          </li>
        </ul>

        <div class="gm-quiz__result-actions">
          <a
            class="gm-btn gm-btn--wa"
            :href="whatsappHref"
            target="_blank"
            rel="noopener noreferrer"
          >
            Quero um projeto assim
          </a>
          <button type="button" class="gm-btn gm-btn--ghost" @click="refazer">
            Refazer diagnóstico
          </button>
        </div>
      </div>
    </div>
  </section>
</template>
