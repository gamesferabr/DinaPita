import { onMounted, onUnmounted } from "vue";

/**
 * Aplica parallax suave a elementos com atributo `data-parallax` dentro do
 * escopo informado. O valor do atributo é a intensidade (default: 0.12).
 *
 * Usa apenas `requestAnimationFrame` + `transform: translate3d` para manter
 * 60 fps e respeita `prefers-reduced-motion`.
 */
export function useParallax(selector = "[data-parallax]") {
  let raf = 0;
  let targets = [];

  function collect() {
    targets = Array.from(document.querySelectorAll(selector));
  }

  function onScroll() {
    if (raf) {
      return;
    }
    raf = requestAnimationFrame(update);
  }

  function update() {
    const viewportH = window.innerHeight;
    for (const el of targets) {
      const rect = el.getBoundingClientRect();
      if (rect.bottom < -200 || rect.top > viewportH + 200) {
        continue;
      }
      const strength = Number(el.dataset.parallax) || 0.12;
      const center = rect.top + rect.height / 2;
      const delta = (center - viewportH / 2) * strength;
      el.style.transform = `translate3d(0, ${-delta.toFixed(1)}px, 0)`;
    }
    raf = 0;
  }

  onMounted(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }
    collect();
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", collect, { passive: true });
  });

  onUnmounted(() => {
    window.removeEventListener("scroll", onScroll);
    window.removeEventListener("resize", collect);
    if (raf) {
      cancelAnimationFrame(raf);
    }
  });
}
