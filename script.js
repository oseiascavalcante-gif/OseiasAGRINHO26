let ambiente = 50;
let producao = 50;
let comunidade = 50;

let fase = 0;
let travado = false;
let introIndex = 0;

let escolhasSustentaveis = 0;

const personagens = ["🌱", "💧", "🌳", "🚜", "🏘️"];

const impactoFases = [
  "água",
  "solo",
  "floresta",
  "tecnologia",
  "comunidade"
];

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
  document.getElementById("introTexto").innerHTML = "";
  introIndex = 0;
  mostrarIntroTexto();
}

/* ✨ INTRO TIPO RPG */
function mostrarIntroTexto() {
  let texto = introTextos[introIndex];
  let el = document.getElementById("introTexto");

  let i = 0;
  el.innerHTML = "";

  function escrever() {
    if (i < texto.length) {
      el.innerHTML += texto[i];
      i++;
      setTimeout(escrever, 40);
    } else {
      el.innerHTML += "<br><br>";

      introIndex++;

      setTimeout(() => {
        if (introIndex < introTextos.length) {
          mostrarIntroTexto();
        } else {
          setTimeout(() => {
            document.getElementById("intro").style.display = "none";
            document.getElementById("start").style.display = "block";
          }, 800);
        }
      }, 800);
    }
  }

  escrever();
}

/* ▶️ INÍCIO */
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

  let narrativa = [
    "O equilíbrio do Vale Verde começa a mudar...",
    "As decisões começam a afetar o ecossistema...",
    "A região reage às escolhas feitas...",
    "O impacto se torna mais visível...",
    "O futuro da comunidade está sendo moldado..."
  ][fase] || "";

  if (narrativa) {
    txt = narrativa + "\n\n" + txt;
  }

  digitarTexto(txt);
}

/* 🎯 ESCOLHAS */
function escolher(opcao) {
  if (travado) return;

  if (opcao === 1) {
    escolhasSustentaveis++;

    if (fase === 0) { ambiente += 15; producao -= 5; }
    if (fase === 1) { ambiente += 10; producao += 5; }
    if (fase === 2) { ambiente += 15; comunidade += 5; }
    if (fase === 3) { ambiente += 10; producao += 5; }
    if (fase === 4) { comunidade += 15; ambiente += 5; }
  }

  else {
    if (fase === 0) { producao += 15; ambiente -= 15; }
    if (fase === 1) { producao += 15; ambiente -= 10; }
    if (fase === 2) { producao += 15; ambiente -= 15; }
    if (fase === 3) { producao += 10; producao += 5; }
    if (fase === 4) { producao += 10; comunidade -= 10; }
  }

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

/* 🏁 FINAL */
function final() {

  document.getElementById("botoes").style.display = "none";
  document.getElementById("personagem").style.display = "none";
  document.getElementById("dialogo").style.display = "none";
  document.getElementById("status").style.display = "none";

  let tendencia = escolhasSustentaveis > 3 ? "SUSTENTÁVEL 🌱" : "PRODUTIVA 🚜";
  let mediaFinal = Math.round((ambiente + producao + comunidade) / 3);
  let desequilibrio = Math.abs(ambiente - producao);

  let txt = "";

  if (ambiente >= 80 && producao >= 80 && comunidade >= 80) {
    txt = "FINAL VERDADEIRO 🌍\nEquilíbrio perfeito alcançado em Vale Verde.";
  }

  else if (escolhasSustentaveis >= 4) {
    txt = "FINAL SUSTENTÁVEL 🌱\nVocê priorizou o meio ambiente e construiu um futuro equilibrado.";
  }

  else if (producao > ambiente + 25) {
    txt = "FINAL PRODUÇÃO 🚜\nCrescimento econômico alto, mas com impacto ambiental.";
  }

  else if (ambiente > producao + 25) {
    txt = "FINAL PRESERVAÇÃO 🌳\nNatureza protegida, mas produção limitada.";
  }

  else {
    txt = "FINAL NEUTRO ⚖️\nUm equilíbrio instável foi alcançado.";
  }

  txt += "\n\n📊 Resultado do jogador:";
  txt += "\n🌱 Tendência: " + tendencia;
  txt += "\n📈 Média geral: " + mediaFinal + "%";
  txt += "\n⚖️ Desequilíbrio: " + desequilibrio;
  txt += "\n🌍 Área mais impactada: " + impactoFases[fase - 1];

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
