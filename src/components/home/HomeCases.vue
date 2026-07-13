<script setup>
import { computed, ref } from "vue";

const props = defineProps({
  projects: { type: Array, required: true },
  pageSize: { type: Number, default: 6 },
});

const emit = defineEmits(["open-project"]);

const TODOS = "Todos";
const active = ref(TODOS);
const visible = ref(props.pageSize);

const filters = computed(() => [
  TODOS,
  ...Array.from(new Set(props.projects.map((p) => p.tipo))),
]);

const filtered = computed(() =>
  active.value === TODOS
    ? props.projects
    : props.projects.filter((p) => p.tipo === active.value),
);

const shown = computed(() => filtered.value.slice(0, visible.value));
const hasMore = computed(() => visible.value < filtered.value.length);

function setFilter(tipo) {
  active.value = tipo;
  visible.value = props.pageSize;
}

function loadMore() {
  visible.value += props.pageSize;
}
</script>

<template>
  <section id="projetos" class="gm-cases">
    <div class="gm-cases__head">
      <h2 v-reveal class="gm-section-title">Projetos selecionados</h2>
      <div class="gm-cases__filters">
        <button
          v-for="tipo in filters"
          :key="tipo"
          type="button"
          class="gm-chip"
          :class="{ 'is-active': active === tipo }"
          @click="setFilter(tipo)"
        >
          {{ tipo }}
        </button>
      </div>
    </div>

    <div class="gm-cases__grid">
      <button
        v-for="(p, i) in shown"
        :key="p.id"
        v-reveal="{ delay: (i % 3) * 90 }"
        type="button"
        class="gm-case"
        @click="emit('open-project', p)"
      >
        <img class="gm-case__img" :src="p.img" :alt="p.alt" loading="lazy" />
        <div class="gm-case__body">
          <span class="gm-case__tag">{{ p.tipo }}</span>
          <h3 class="gm-case__title">{{ p.nome }}</h3>
        </div>
      </button>
    </div>

    <div v-if="hasMore" class="gm-cases__more">
      <button type="button" class="gm-btn gm-btn--ghost" @click="loadMore">
        Carregar mais projetos
      </button>
    </div>
  </section>
</template>
