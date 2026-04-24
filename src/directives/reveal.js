/**
 * Diretiva `v-reveal` — adiciona a classe `is-visible` quando o elemento
 * entra no viewport. Aceita modificadores/valores para ajustar o atraso:
 *
 *   <h2 v-reveal>Texto</h2>
 *   <p v-reveal="{ delay: 120 }">Texto</p>
 *
 * O estado inicial é controlado via CSS (classe `reveal`).
 */

const observers = new WeakMap();

let sharedObserver = null;

/**
 * Garante que o browser pinta o estado `.reveal` antes de `.is-visible`,
 * para as transições CSS correrem também no carregamento inicial da página.
 */
function scheduleRevealClass(el, delayMs) {
  const apply = () => {
    el.classList.add("is-visible");
  };
  if (typeof window === "undefined") {
    apply();
    return;
  }
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    apply();
    return;
  }
  window.requestAnimationFrame(() => {
    window.requestAnimationFrame(() => {
      if (delayMs > 0) {
        window.setTimeout(apply, delayMs);
      } else {
        apply();
      }
    });
  });
}

function getObserver() {
  if (sharedObserver) {
    return sharedObserver;
  }
  if (typeof window === "undefined" || !("IntersectionObserver" in window)) {
    return null;
  }
  sharedObserver = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) {
          continue;
        }
        const el = entry.target;
        const meta = observers.get(el);
        const delay = meta?.delay ?? 0;
        sharedObserver.unobserve(el);
        observers.delete(el);
        scheduleRevealClass(el, delay);
      }
    },
    { root: null, threshold: 0.16, rootMargin: "0px 0px -8% 0px" },
  );
  return sharedObserver;
}

export const revealDirective = {
  mounted(el, binding) {
    el.classList.add("reveal");
    const delay = typeof binding.value === "object" ? binding.value.delay ?? 0 : 0;
    const observer = getObserver();
    if (!observer) {
      scheduleRevealClass(el, delay);
      return;
    }
    observers.set(el, { delay });
    observer.observe(el);
  },
  unmounted(el) {
    if (sharedObserver) {
      sharedObserver.unobserve(el);
    }
    observers.delete(el);
  },
};
