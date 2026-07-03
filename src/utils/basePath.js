/** Prefixo do GitHub Pages: `/DinaPita` em produção, vazio no dev local. */
export const BASE_PATH = import.meta.env.BASE_URL.replace(/\/$/, "");

export function withBasePath(path) {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${BASE_PATH}${normalized}`;
}

export function stripBasePath(pathname) {
  if (BASE_PATH && pathname.startsWith(BASE_PATH)) {
    const rest = pathname.slice(BASE_PATH.length);
    return rest || "/";
  }
  return pathname;
}
