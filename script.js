let ambiente = 50;
let producao = 50;
let comunidade = 50;

let fase = 0;
let travado = false;
let introIndex = 0;

let escolhasSustentaveis = 0; // 🧠 memória de escolhas

const personagens = ["🌱", "💧", "🌳", "🚜", "🏘️"];

const introTextos = [
  "Em uma região chamada Vale Verde...",
  "A produção agrícola cresceu rapidamente...",
  "Mas o equilíbrio com a natureza começou a ser afetado...",
  "Agora, o futuro depende das suas escolhas...",
  "AGROTALE"
];

const textos = [
  "Uma nascente está ameaçada por uma plantação.",
  "O solo começa a perder nutrientes.",
  "Uma mata pode ser recuperada ou expandida.",
  "Novas tecnologias chegam à região.",
  "A comunidade precisa de decisões sobre o futuro."
];

/* 🎬 INTRO */
function iniciarIntro() {
  document.getElementById("intro").style.display = "flex";
  document.getElementById("introTexto").innerText = "";
  mostrarIntroTexto();
}

function mostrarIntroTexto(i = 0) {
  let texto = introTextos[introIndex];

  if (i === 0) {
    document.getElementById("introTexto").innerText = "";
  }

  if (i < texto.length) {
    document.getElementById("introTexto").innerText += texto.charAt(i);
    setTimeout(() => mostrarIntroTexto(i + 1), 40);
  } else {
    setTimeout(() => {
      introIndex++;

      if (introIndex < introTextos.length) {
        mostrarIntroTexto(0);
      } else {
        setTimeout(() => {
          document.getElementById("intro").style.display = "none";
          document.getElementById("start").style.display = "block";
        }, 500);
      }
    }, 1000);
  }
}

/* ▶️ START */
function iniciarJogo() {
  document.getElementById("start").style.display = "none";
  document.getElementById("game").style.display = "block";

  mostrarTexto(textos[0]);
  atualizarStatus();
}

/* 📊 STATUS */
function atualizarStatus() {
  document.getElementById("ambiente").innerText = ambiente;
  document.getElementById("producao").innerText = producao;
  document.getElementById("comunidade").innerText = comunidade;

  document.getElementById("personagem").innerText =
    personagens[fase] || "🌾";
}

/* 🔤 TEXTO */
function digitarTexto(texto, i = 0) {
  travado = true;

  document.getElementById("botoes").style.pointerEvents = "none";

  if (i < texto.length) {
    document.getElementById("texto").innerHTML += texto.charAt(i);
    setTimeout(() => digitarTexto(texto, i + 1), 20);
  } else {
    travado = false;
    document.getElementById("botoes").style.pointerEvents = "auto";
  }
}

function mostrarTexto(txt) {
  document.getElementById("texto").innerHTML = "";
  digitarTexto(txt);
}

/* 🎯 ESCOLHAS AGORA FIXAS */
function escolher(opcao) {
  if (travado) return;

  // 🌱 OPÇÃO A = sustentável
  if (opcao === 1) {
    escolhasSustentaveis++;

    if (fase === 0) { ambiente += 15; producao -= 5; }
    if (fase === 1) { ambiente += 10; producao += 5; }
    if (fase === 2) { ambiente += 15; comunidade += 5; }
    if (fase === 3) { ambiente += 10; producao += 5; }
    if (fase === 4) { comunidade += 15; ambiente += 5; }
  }

  // 🚜 OPÇÃO B = produtiva
  else {
    if (fase === 0) { producao += 15; ambiente -= 15; }
    if (fase === 1) { producao += 15; ambiente -= 10; }
    if (fase === 2) { producao += 15; ambiente -= 15; }
    if (fase === 3) { producao += 10; producao += 5; }
    if (fase === 4) { producao += 10; comunidade -= 10; }
  }

  // limite seguro
  ambiente = Math.max(0, Math.min(100, ambiente));
  producao = Math.max(0, Math.min(100, producao));
  comunidade = Math.max(0, Math.min(100, comunidade));

  fase++;
  atualizarStatus();

  if (fase < textos.length) {
    mostrarTexto(textos[fase]);
  } else {
    final();
  }
}

/* 🏁 FINAL MELHORADO */
function final() {

  document.getElementById("botoes").style.display = "none";
  document.getElementById("personagem").style.display = "none";
  document.getElementById("dialogo").style.display = "none";
  document.getElementById("status").style.display = "none";

  let txt = "";

  if (ambiente >= 80 && producao >= 80 && comunidade >= 80) {
    txt = "FINAL VERDADEIRO: Equilíbrio perfeito entre produção e natureza. Vale Verde virou referência mundial.";
  }

  else if (escolhasSustentaveis >= 4) {
    txt = "FINAL SUSTENTÁVEL: Suas decisões priorizaram o meio ambiente, garantindo um futuro equilibrado.";
  }

  else if (producao > ambiente + 25) {
    txt = "FINAL PRODUÇÃO: Crescimento econômico alto, mas com forte impacto ambiental.";
  }

  else if (ambiente > producao + 25) {
    txt = "FINAL PRESERVAÇÃO: Natureza protegida, mas produção limitada.";
  }

  else {
    txt = "FINAL NEUTRO: Um equilíbrio instável foi alcançado.";
  }

  document.getElementById("fim").style.display = "block";
  document.getElementById("textoFinal").innerText = txt;
}

/* 🔁 REINICIAR */
function reiniciar() {
  location.reload();
}

/* 🚀 START */
window.onload = function () {
  iniciarIntro();
};
