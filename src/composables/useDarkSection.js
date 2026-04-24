import { onMounted, onUnmounted, ref } from "vue";

/**
 * `true` quando a linha média vertical da viewport está **dentro** do retângulo
 * de uma secção escura (`#topo`, `.footer__content`) — ou seja, o indicador de
 * scroll só fica claro quando o meio do ecrã cruza **efetivamente** o bloco
 * escuro (hero ou painel preto do rodapé), não antes.
 */
export function useDarkSection(selectors = []) {
  const isOverDark = ref(false);
  let raf = 0;

  function crossesVerticalMidpoint(el) {
    const r = el.getBoundingClientRect();
    const mid = window.innerHeight * 0.5;
    return r.top < mid && r.bottom > mid;
  }

  function recompute() {
    if (selectors.length === 0) {
      isOverDark.value = false;
      return;
    }
    let dark = false;
    for (const sel of selectors) {
      document.querySelectorAll(sel).forEach((el) => {
        if (crossesVerticalMidpoint(el)) {
          dark = true;
        }
      });
    }
    isOverDark.value = dark;
  }

  function schedule() {
    if (raf) {
      return;
    }
    raf = requestAnimationFrame(() => {
      raf = 0;
      recompute();
    });
  }

  onMounted(() => {
    recompute();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });
  });

  onUnmounted(() => {
    window.removeEventListener("scroll", schedule);
    window.removeEventListener("resize", schedule);
    if (raf) {
      cancelAnimationFrame(raf);
    }
  });

  return { isOverDark };
}
