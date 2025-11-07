# MiniProj1 — SPA (Vue.js)

# Execução do Build PRD:
* Obter python na "Microsoft Store", caso necessário.

cd C:\Temp\MiniProj1\dist> 
python -m http.server 8080
Abrir a URL http://localhost:8080

 * Desinstalar o Python caso necessário (powershell):
 Get-AppxPackage *Python* | Remove-AppxPackage

 -----------------------------------------------------------------------------
# Como executar o projeto fonte DEV:
  Disponibilizar a pasta em "C:\Temp\MiniProj1"

  npm install
  npm run dev
  
  Abrir a URL http://localhost:5173

# Build (gerar SPA final):
  npm run build
  Os ficheiros finais ficam em "/dist" (um "index.html" + "assets").

# Deploy (Vercel):
  - Importar o repositório na Vercel (framework: Vite).  
  - O "vercel.json" já garante as rotas SPA (history mode).
  - Alternativa: GitHub Pages usando a pasta "/dist".






