import { ref } from "vue";

/**
 * Rolagem suave por id de seção e controle do menu mobile.
 * Para alvos especiais (ex.: "contato") devolve true para que o caller decida
 * abrir um modal em vez de rolar.
 */
export function useScrollTo() {
  const menuOpen = ref(false);

  function scrollTo(id) {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    menuOpen.value = false;
  }

  function go(id) {
    scrollTo(id);
  }

  return { menuOpen, scrollTo, go };
}
