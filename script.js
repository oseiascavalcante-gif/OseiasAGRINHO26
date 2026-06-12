let ambiente = 50;
let producao = 50;
let comunidade = 50;

let fase = 0;
let travado = false;
let introIndex = 0;

let eventoAtual = null;

const personagens = ["🌱", "💧", "🌳", "🚜", "🏘️"];

const introTextos = [
  "Em uma região chamada Vale Verde...",
  "A produção agrícola cresceu rapidamente...",
  "Mas o equilíbrio com a natureza começou a ser afetado...",
  "Agora, o futuro depende das suas escolhas...",
  "AGROTALE"
];

/* 🌍 DILEMAS */
const fases = [
  {
    texto: "Uma nascente está ameaçada pela expansão agrícola.",
    a: "Proteger a nascente.",
    b: "Expandir irrigação.",
    efeitoA: { ambiente: 15, producao: -5 },
    efeitoB: { producao: 15, ambiente: -15 }
  },
  {
    texto: "O solo está perdendo nutrientes.",
    a: "Recuperar o solo.",
    b: "Usar fertilizantes.",
    efeitoA: { ambiente: 10, producao: 5 },
    efeitoB: { producao: 15, ambiente: -10 }
  },
  {
    texto: "Uma floresta está sob pressão.",
    a: "Preservar área.",
    b: "Liberar para plantio.",
    efeitoA: { ambiente: 20 },
    efeitoB: { producao: 20, ambiente: -15 }
  },
  {
    texto: "Tecnologia chegou à região.",
    a: "Uso sustentável.",
    b: "Maximizar produção.",
    efeitoA: { ambiente: 10, producao: 10 },
    efeitoB: { producao: 20 }
  },
  {
    texto: "A comunidade precisa de alimentos.",
    a: "Equilíbrio.",
    b: "Produção imediata.",
    efeitoA: { comunidade: 10, ambiente: 10 },
    efeitoB: { producao: 15, comunidade: 5 }
  }
];

/* 🌪️ EVENTOS ALEATÓRIOS */
const eventos = [
  {
    texto: "🌧️ Chuva forte recuperou parte do solo!",
    efeito: { ambiente: 10 }
  },
  {
    texto: "🔥 O calor extremo reduziu a produção!",
    efeito: { producao: -10 }
  },
  {
    texto: "🐝 Polinização aumentou a produtividade!",
    efeito: { producao: 10 }
  },
  {
    texto: "🏘️ A comunidade pressionou por mudanças sustentáveis!",
    efeito: { ambiente: 5, comunidade: 10 }
  },
  {
    texto: "🌪️ Tempestade causou danos ambientais!",
    efeito: { ambiente: -10, producao: -5 }
  }
];

/* 🎲 EVENTO ALEATÓRIO */
function gerarEvento() {
  if (Math.random() < 0.5) { // 50% de chance
    eventoAtual = eventos[Math.floor(Math.random() * eventos.length)];

    aplicarEvento(eventoAtual);

    document.getElementById("texto").innerHTML =
      "⚠️ EVENTO: " + eventoAtual.texto + "<br><br>";
  } else {
    eventoAtual = null;
  }
}

/* 💥 APLICAR EVENTO */
function aplicarEvento(ev) {
  if (ev.efeito.ambiente) ambiente += ev.efeito.ambiente;
  if (ev.efeito.producao) producao += ev.efeito.producao;
  if (ev.efeito.comunidade) comunidade += ev.efeito.comunidade;
}

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

/* ▶️ INÍCIO */
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

  gerarEvento(); // 🔥 EVENTO ALEATÓRIO AQUI

  setTimeout(() => {
    digitarTexto(fases[fase].texto);
  }, 500);
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
