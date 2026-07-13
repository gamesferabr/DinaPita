<script setup>
defineProps({
  ano: { type: Number, required: true },
  contato: { type: Object, required: true },
  items: { type: Array, required: true },
});

const emit = defineEmits(["nav", "contato"]);
</script>

<template>
  <footer class="gm-footer">
    <div class="gm-footer__grid">
      <div>
        <p class="gm-footer__brand-name">Dina Pita</p>
        <p class="gm-footer__brand-sub">
          Arquitetura e interiores com propósito — projeto, reforma e consultoria.
        </p>
      </div>

      <div class="gm-footer__col">
        <h4>Navegar</h4>
        <a
          v-for="item in items"
          :key="item.id"
          :href="`#${item.id}`"
          @click.prevent="emit('nav', item)"
        >
          {{ item.label }}
        </a>
      </div>

      <div class="gm-footer__col">
        <h4>Contato</h4>
        <a :href="`mailto:${contato.email}`">{{ contato.email }}</a>
        <a :href="contato.whatsappUrl" target="_blank" rel="noopener">WhatsApp</a>
        <a
          v-for="s in contato.social"
          :key="s.label"
          :href="s.href"
          target="_blank"
          rel="noopener"
        >
          {{ s.label }}
        </a>
      </div>
    </div>

    <div class="gm-footer__bottom">
      <span>© {{ ano }} Dina Pita Arquitetura. Todos os direitos reservados.</span>
      <span>Feito com intenção.</span>
    </div>
  </footer>
</template>
