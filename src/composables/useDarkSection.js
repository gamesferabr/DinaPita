import { onMounted, onUnmounted, ref } from "vue";

/**
 * Retorna `isOverDark = true` quando qualquer elemento listado em `selectors`
 * estiver cruzando o centro vertical da viewport.
 *
 * Usa `IntersectionObserver` com `rootMargin` que reduz a área de intersecção
 * a uma faixa de 1px no meio da tela — útil para indicadores fixos a `top: 50%`
 * (header lateral, scroller, etc.) que precisam saber sobre que cor estão.
 */
export function useDarkSection(selectors = []) {
  const isOverDark = ref(false);
  let observer = null;
  let observed = [];

  function recompute() {
    isOverDark.value = observed.some((el) => el.dataset.scrollerOverlap === "1");
  }

  onMounted(() => {
    if (!("IntersectionObserver" in window) || selectors.length === 0) {
      return;
    }
    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          entry.target.dataset.scrollerOverlap = entry.isIntersecting ? "1" : "0";
        }
        recompute();
      },
      { root: null, threshold: 0, rootMargin: "-50% 0px -50% 0px" },
    );
    for (const sel of selectors) {
      const els = document.querySelectorAll(sel);
      els.forEach((el) => {
        observed.push(el);
        observer.observe(el);
      });
    }
  });

  onUnmounted(() => {
    if (observer) {
      observer.disconnect();
      observer = null;
    }
    observed = [];
  });

  return { isOverDark };
}
