let ambiente = 50;
let producao = 50;
let comunidade = 50;

let fase = 0;
let travado = false;
let introIndex = 0;

const personagens = ["🌱", "💧", "🌳", "🚜", "🏘️"];

const introTextos = [
  "Em uma região chamada Vale Verde...",
  "A produção agrícola cresceu rapidamente...",
  "Mas o equilíbrio com a natureza começou a ser afetado...",
  "Agora, o futuro depende das suas escolhas...",
  "AGROTALE"
];

/* 🌍 DILEMAS REAIS */
const fases = [
  {
    texto: "Uma nascente está ameaçada pela expansão agrícola.",
    a: "Proteger a nascente e limitar irrigação.",
    b: "Expandir irrigação para aumentar produção.",
    efeitoA: { ambiente: 15, producao: -5 },
    efeitoB: { producao: 15, ambiente: -15 }
  },
  {
    texto: "O solo está perdendo nutrientes importantes.",
    a: "Recuperar o solo com práticas sustentáveis.",
    b: "Usar fertilizantes para produção rápida.",
    efeitoA: { ambiente: 10, producao: 5 },
    efeitoB: { producao: 15, ambiente: -10 }
  },
  {
    texto: "Uma área de floresta está sob pressão.",
    a: "Criar área de preservação.",
    b: "Liberar área para plantio.",
    efeitoA: { ambiente: 20 },
    efeitoB: { producao: 20, ambiente: -15 }
  },
  {
    texto: "Uma nova tecnologia chegou à região.",
    a: "Usar tecnologia para equilíbrio sustentável.",
    b: "Usar tecnologia para maximizar produção.",
    efeitoA: { ambiente: 10, producao: 10 },
    efeitoB: { producao: 20 }
  },
  {
    texto: "A comunidade precisa de mais alimentos e renda.",
    a: "Buscar equilíbrio entre produção e natureza.",
    b: "Priorizar produção imediata.",
    efeitoA: { comunidade: 10, ambiente: 10 },
    efeitoB: { producao: 15, comunidade: 5 }
  }
];

/* 🎬 INTRO */
function iniciarIntro() {
  document.getElementById("intro").style.display = "flex";
  document.getElementById("introTexto").innerHTML = "";
  introIndex = 0;
  mostrarIntroTexto();
}

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
          document.getElementById("intro").style.display = "none";
          document.getElementById("start").style.display = "block";
        }
      }, 800);
    }
  }

  escrever();
}

/* ▶️ JOGO */
function iniciarJogo() {
  document.getElementById("start").style.display = "none";
  document.getElementById("game").style.display = "block";

  mostrarTexto();
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

/* 💬 TEXTO */
function mostrarTexto() {
  document.getElementById("texto").innerHTML = "";
  digitarTexto(fases[fase].texto);
}

/* ✍️ DIGITAÇÃO */
function digitarTexto(texto, i = 0) {
  travado = true;
  document.getElementById("botoes").style.pointerEvents = "none";

  if (i < texto.length) {
    document.getElementById("texto").innerHTML += texto[i];
    setTimeout(() => digitarTexto(texto, i + 1), 20);
  } else {
    travado = false;
    document.getElementById("botoes").style.pointerEvents = "auto";
  }
}

/* 🎯 ESCOLHAS */
function escolher(opcao) {
  if (travado) return;

  let atual = fases[fase];
  let efeito = opcao === "a" ? atual.efeitoA : atual.efeitoB;

  if (efeito.ambiente) ambiente += efeito.ambiente;
  if (efeito.producao) producao += efeito.producao;
  if (efeito.comunidade) comunidade += efeito.comunidade;

  ambiente = Math.max(0, Math.min(100, ambiente));
  producao = Math.max(0, Math.min(100, producao));
  comunidade = Math.max(0, Math.min(100, comunidade));

  fase++;
  atualizarStatus();

  if (fase < fases.length) {
    mostrarTexto();
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

  let media = Math.round((ambiente + producao + comunidade) / 3);

  let txt = "";

  if (ambiente >= 80 && producao >= 80 && comunidade >= 80) {
    txt = "FINAL VERDADEIRO 🌍\nEquilíbrio perfeito em Vale Verde.";
  }
  else if (ambiente > producao + 25) {
    txt = "FINAL PRESERVAÇÃO 🌳\nNatureza protegida, produção limitada.";
  }
  else if (producao > ambiente + 25) {
    txt = "FINAL PRODUÇÃO 🚜\nAlta produção com impacto ambiental.";
  }
  else {
    txt = "FINAL NEUTRO ⚖️\nEquilíbrio instável alcançado.";
  }

  txt += "\n\n📊 Média geral: " + media + "%";

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
