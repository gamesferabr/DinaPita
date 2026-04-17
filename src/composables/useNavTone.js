import { onMounted, onUnmounted, ref } from "vue";

/** true = fundo escuro no herói → nav com texto claro (classe nav-white). */
export function useNavTone(heroSelector = "#topo") {
  const heroIsVisible = ref(true);

  let observer;

  onMounted(() => {
    const hero = document.querySelector(heroSelector);
    if (!hero || !("IntersectionObserver" in window)) {
      return;
    }
    observer = new IntersectionObserver(
      (entries) => {
        const e = entries[0];
        heroIsVisible.value = e.isIntersecting;
      },
      { root: null, threshold: 0.12, rootMargin: "-48px 0px 0px 0px" },
    );
    observer.observe(hero);
  });

  onUnmounted(() => {
    if (observer) {
      observer.disconnect();
    }
  });

  return { heroIsVisible };
}
