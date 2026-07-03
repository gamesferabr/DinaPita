import { writeFileSync } from "node:fs";
import { join } from "node:path";

const distDir = "dist";
const pathSegmentsToKeep = 1;

const redirect404 = `<!DOCTYPE html>
<html lang="pt-BR">
  <head>
    <meta charset="utf-8" />
    <title>Dina Pita</title>
    <script type="text/javascript">
      var pathSegmentsToKeep = ${pathSegmentsToKeep};
      var locationRef = window.location;
      locationRef.replace(
        locationRef.protocol +
          "//" +
          locationRef.hostname +
          (locationRef.port ? ":" + locationRef.port : "") +
          locationRef.pathname
            .split("/")
            .slice(0, 1 + pathSegmentsToKeep)
            .join("/") +
          "/?/" +
          locationRef.pathname
            .slice(1)
            .split("/")
            .slice(pathSegmentsToKeep)
            .join("/")
            .replace(/&/g, "~and~") +
          (locationRef.search
            ? "&" + locationRef.search.slice(1).replace(/&/g, "~and~")
            : "") +
          locationRef.hash
      );
    </script>
  </head>
  <body></body>
</html>
`;

writeFileSync(join(distDir, "404.html"), redirect404);
console.log("dist/404.html criado para rotas SPA no GitHub Pages.");
