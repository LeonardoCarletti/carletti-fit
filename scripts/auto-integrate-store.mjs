#!/usr/bin/env node
/**
 * Integra a loja no repo diabeticoimortal existente.
 * Rode na raiz do diabeticoimortal:
 *   node ../carletti-fit/scripts/auto-integrate-store.mjs ../carletti-fit/store-module
 */
import fs from "fs";
import path from "path";
import { execSync } from "child_process";

const MODULE = process.argv[2] || "../carletti-fit/store-module";
const ROOT = process.cwd();

function copyDir(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const s = path.join(src, entry.name);
    const d = path.join(dest, entry.name);
    if (entry.isDirectory()) copyDir(s, d);
    else fs.copyFileSync(s, d);
  }
}

function findFile(name) {
  const candidates = [
    path.join(ROOT, "src", name),
    path.join(ROOT, name),
  ];
  for (const c of candidates) if (fs.existsSync(c)) return c;
  // shallow search
  for (const dir of ["src", "."]) {
    const base = path.join(ROOT, dir);
    if (!fs.existsSync(base)) continue;
    for (const f of fs.readdirSync(base, { recursive: true })) {
      if (String(f).endsWith(name)) return path.join(base, String(f));
    }
  }
  return null;
}

console.log("📦 Integrando loja em", ROOT);

// 1. Copy store files
const copies = [
  [path.join(MODULE, "src/data"), path.join(ROOT, "src/data")],
  [path.join(MODULE, "src/components/store"), path.join(ROOT, "src/components/store")],
  [path.join(MODULE, "src/pages/Store.tsx"), path.join(ROOT, "src/pages/Store.tsx")],
];
for (const [src, dest] of copies) {
  if (!fs.existsSync(src)) { console.error("❌ Não encontrado:", src); process.exit(1); }
  if (src.endsWith(".tsx")) {
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    fs.copyFileSync(src, dest);
  } else copyDir(src, dest);
}
copyDir(path.join(MODULE, "src/pages/tools"), path.join(ROOT, "src/pages/tools"));
console.log("✅ Arquivos da loja copiados");

// 2. react-router-dom
const pkgPath = path.join(ROOT, "package.json");
if (fs.existsSync(pkgPath)) {
  const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf8"));
  if (!pkg.dependencies?.["react-router-dom"]) {
    console.log("📥 Instalando react-router-dom...");
    execSync("npm install react-router-dom", { stdio: "inherit", cwd: ROOT });
  }
}

// 3. Patch App.tsx
const appFile = findFile("App.tsx");
if (appFile) {
  let app = fs.readFileSync(appFile, "utf8");
  const imports = `import { Store } from "./pages/Store";
import { CalculadoraCargaGlicemica } from "./pages/tools/CalculadoraCargaGlicemica";
import { GuiaMarcas } from "./pages/tools/GuiaMarcas";
import { Top10Enganos } from "./pages/tools/Top10Enganos";
`;
  if (!app.includes('path="/loja"')) {
    if (!app.includes('from "./pages/Store"')) {
      app = imports + app;
    }
    const routeBlock = `
          <Route path="/loja" element={<Store />} />
          <Route path="/loja/ferramentas/calculadora-carga-glicemica" element={<CalculadoraCargaGlicemica />} />
          <Route path="/loja/ferramentas/guia-marcas-expandido" element={<GuiaMarcas />} />
          <Route path="/loja/ferramentas/top-10-enganos" element={<Top10Enganos />} />`;
    if (app.includes("</Routes>")) {
      app = app.replace("</Routes>", routeBlock + "\n        </Routes>");
    } else if (app.includes("<Routes>")) {
      app = app.replace("<Routes>", "<Routes>" + routeBlock);
    }
    fs.writeFileSync(appFile, app);
    console.log("✅ Rotas adicionadas em", appFile);
  } else {
    console.log("ℹ️  Rotas /loja já existem em", appFile);
  }
} else {
  console.log("⚠️  App.tsx não encontrado — adicione rotas manualmente (veja INTEGRATION.md)");
}

// 4. Patch nav — procura link Loja
const navCandidates = ["Navbar.tsx", "Nav.tsx", "Header.tsx", "Navigation.tsx"];
let navPatched = false;
for (const name of navCandidates) {
  const navFile = findFile(name);
  if (!navFile) continue;
  let nav = fs.readFileSync(navFile, "utf8");
  if (nav.includes("/loja") || nav.includes("Loja")) { navPatched = true; break; }
  if (nav.includes("react-router-dom") || nav.includes('from "react-router-dom"')) {
    if (!nav.includes("Link")) {
      nav = nav.replace(/from "react-router-dom"/, 'import { Link } from "react-router-dom";\nimport { Routes, Route } from "react-router-dom"');
    }
    // insert before closing nav tag or last </div> in nav
    const lojaLink = `\n            <Link to="/loja" className="hover:text-white transition-colors">Loja</Link>`;
    if (nav.includes("</nav>")) {
      nav = nav.replace("</nav>", lojaLink + "\n          </nav>");
      fs.writeFileSync(navFile, nav);
      console.log("✅ Link Loja adicionado em", navFile);
      navPatched = true;
      break;
    }
  }
}
if (!navPatched) console.log("⚠️  Adicione manualmente <Link to=\"/loja\">Loja</Link> no menu");

// 5. vercel.json
const vercelPath = path.join(ROOT, "vercel.json");
if (!fs.existsSync(vercelPath)) {
  fs.copyFileSync(path.join(MODULE, "vercel.json"), vercelPath);
  console.log("✅ vercel.json criado");
}

console.log("\n🚀 Pronto! Agora rode:");
console.log("   git add -A && git commit -m 'feat: adicionar loja de produtos' && git push");
