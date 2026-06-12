/* =========================
   🌾 AGROTALE - COMPLETO
========================= */

/* 🌍 ESTADO DO JOGO */
let ambiente = 50;
let producao = 50;
let comunidade = 50;

let fase = 0;
let travado = false;

/* 🎬 TRAILER */
let trailerIndex = 0;

const trailerTextos = [
  "Em um mundo onde a agricultura cresceu sem limites...",
  "A natureza começou a reagir...",
  "O solo, a água e a vida entraram em desequilíbrio...",
  "Agora, cada decisão pode mudar o futuro de Vale Verde...",
  "🌾 AGROTALE"
];

/* 🎮 FASES DO JOGO */
const fases = [
  { texto:"Uma nascente está ameaçada.", a:"Proteger", b:"Expandir", ea:{ambiente:15}, eb:{producao:15, ambiente:-15} },
  { texto:"O solo começa a perder nutrientes.", a:"Recuperar", b:"Forçar produção", ea:{ambiente:10}, eb:{producao:15, ambiente:-10} },
  { texto:"Uma floresta pode ser salva.", a:"Preservar", b:"Desmatar", ea:{ambiente:20}, eb:{producao:20, ambiente:-15} },
  { texto:"Tecnologia chega ao campo.", a:"Sustentável", b:"Intensivo", ea:{ambiente:10, producao:10}, eb:{producao:20} },
  { texto:"A comunidade precisa de alimentos.", a:"Equilibrar", b:"Produzir mais", ea:{comunidade:10}, eb:{producao:15} }
];

/* ⚡ EVENTOS ALEATÓRIOS */
const eventos = [
  { texto:"Chuva melhorou o solo", e:{ambiente:10} },
  { texto:"Praga reduziu produção", e:{producao:-10} },
  { texto:"Boa safra inesperada", e:{producao:10} },
  { texto:"Seca afetou a região", e:{ambiente:-10} }
];

/* =========================
   🎬 TRAILER
========================= */

function iniciarTrailer() {
  document.getElementById("trailer").style.display = "flex";
  document.getElementById("trailer-texto").textContent = "";
  trailerIndex = 0;
  escreverTrailer();
}

function escreverTrailer(i = 0) {
  let texto = trailerTextos[trailerIndex];
  let el = document.getElementById("trailer-texto");

  if (i === 0) el.textContent = "";

  if (i < texto.length) {
    el.textContent += texto[i];
    setTimeout(() => escreverTrailer(i + 1), 35);
  } else {
    setTimeout(() => {
      trailerIndex++;

      if (trailerIndex < trailerTextos.length) {
        escreverTrailer(0);
      } else {
        document.getElementById("trailer").style.display = "none";
        document.getElementById("start").style.display = "flex";
      }
    }, 1200);
  }
}

/* =========================
   🎮 INÍCIO DO JOGO
========================= */

function iniciarJogo() {
  document.getElementById("start").style.display = "none";
  document.getElementById("game").style.display = "flex";

  atualizarHUD();
  mostrarFase();
}

/* =========================
   📊 HUD
========================= */

function atualizarHUD() {
  document.getElementById("ambiente").innerText = ambiente;
  document.getElementById("producao").innerText = producao;
  document.getElementById("comunidade").innerText = comunidade;

  document.getElementById("bar-ambiente").style.width = ambiente + "%";
  document.getElementById("bar-producao").style.width = producao + "%";
  document.getElementById("bar-comunidade").style.width = comunidade + "%";
}

/* =========================
   📖 TEXTO DA FASE
========================= */

function mostrarFase() {
  document.getElementById("texto").textContent = "";

  if (fase >= fases.length) {
    final();
    return;
  }

  digitarTexto(fases[fase].texto);
}

function digitarTexto(texto, i = 0) {
  travado = true;

  const el = document.getElementById("texto");

  if (i < texto.length) {
    el.textContent += texto[i];
    setTimeout(() => digitarTexto(texto, i + 1), 25);
  } else {
    travado = false;
  }
}

/* =========================
   🎯 ESCOLHAS
========================= */

function escolher(op) {
  if (travado) return;

  let f = fases[fase];
  let efeito = op === "a" ? f.ea : f.eb;

  if (efeito.ambiente) ambiente += efeito.ambiente;
  if (efeito.producao) producao += efeito.producao;
  if (efeito.comunidade) comunidade += efeito.comunidade;

  gerarEvento();

  fase++;
  atualizarHUD();
  mostrarFase();
}

/* =========================
   ⚡ EVENTO ALEATÓRIO
========================= */

function gerarEvento() {
  if (Math.random() < 0.5) {
    let ev = eventos[Math.floor(Math.random() * eventos.length)];

    document.getElementById("texto").textContent =
      "⚠️ " + ev.texto;

    if (ev.e.ambiente) ambiente += ev.e.ambiente;
    if (ev.e.producao) producao += ev.e.producao;
    if (ev.e.comunidade) comunidade += ev.e.comunidade;
  }
}

/* =========================
   🏁 FINAL
========================= */

function final() {
  let media = (ambiente + producao + comunidade) / 3;

  let estado =
    ambiente < 30 ? "🔥 CRISE AMBIENTAL" :
    ambiente < 50 ? "⚠️ ALERTA" :
    "🌱 EQUILÍBRIO";

  document.getElementById("game").innerHTML += `
    <div id="dashboard" style="display:block">
      <h2>FINAL DE VALE VERDE</h2>
      <p>${estado}</p>
      <p>Ambiente: ${ambiente}</p>
      <p>Produção: ${producao}</p>
      <p>Comunidade: ${comunidade}</p>
      <p>Média: ${media.toFixed(1)}</p>

      <button onclick="location.reload()">Reiniciar</button>
    </div>
  `;
}

/* =========================
   🚀 START AUTOMÁTICO
========================= */

window.onload = () => {
  iniciarTrailer();
};
