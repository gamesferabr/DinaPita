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
        window.setTimeout(() => {
          el.classList.add("is-visible");
        }, delay);
        sharedObserver.unobserve(el);
        observers.delete(el);
      }
    },
    { root: null, threshold: 0.16, rootMargin: "0px 0px -8% 0px" },
  );
  return sharedObserver;
}

export const revealDirective = {
  mounted(el, binding) {
    el.classList.add("reveal");
    const observer = getObserver();
    if (!observer) {
      el.classList.add("is-visible");
      return;
    }
    const delay = typeof binding.value === "object" ? binding.value.delay ?? 0 : 0;
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
