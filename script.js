let ambiente = 50;
let producao = 50;
let comunidade = 50;

let fase = 0;
let travado = false;

const personagens = ["🌱", "💧", "🌳", "🚜", "🏘️"];

const textos = [
  "Uma nascente está ameaçada por uma plantação.",
  "O solo começa a perder nutrientes.",
  "Uma mata pode ser recuperada ou expandida.",
  "Novas tecnologias chegam à região.",
  "A comunidade precisa de decisões sobre o futuro."
];

function iniciarJogo() {
  document.getElementById("start").style.display = "none";
  document.getElementById("game").style.display = "block";
  mostrarTexto(textos[0]);
  atualizarStatus();
}

function atualizarStatus() {
  document.getElementById("ambiente").innerText = ambiente;
  document.getElementById("producao").innerText = producao;
  document.getElementById("comunidade").innerText = comunidade;

  document.getElementById("personagem").innerText =
    personagens[fase] || "🌾";
}

/* 🔤 DIGITAÇÃO */
function digitarTexto(texto, i = 0) {
  travado = true;

  if (i < texto.length) {
    document.getElementById("texto").innerHTML += texto.charAt(i);
    setTimeout(() => digitarTexto(texto, i + 1), 20);
  } else {
    travado = false;
  }
}

function mostrarTexto(txt) {
  document.getElementById("texto").innerHTML = "";
  digitarTexto(txt);
}

/* 🎯 ESCOLHAS */
function escolher(opcao) {
  if (travado) return;

  if (fase === 0) {
    if (opcao === 1) { ambiente += 15; producao -= 5; }
    else { producao += 15; ambiente -= 15; }
  }

  if (fase === 1) {
    if (opcao === 1) { ambiente += 10; producao += 10; }
    else { producao += 15; ambiente -= 10; }
  }

  if (fase === 2) {
    if (opcao === 1) { ambiente += 15; comunidade += 5; }
    else { producao += 15; ambiente -= 15; }
  }

  if (fase === 3) {
    if (opcao === 1) { producao += 10; ambiente += 10; }
    else { producao -= 5; }
  }

  if (fase === 4) {
    if (opcao === 1) { comunidade += 15; ambiente += 5; }
    else { producao += 10; comunidade -= 10; }
  }

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

  let txt = "";

  if (ambiente >= 80 && producao >= 80 && comunidade >= 80) {
    txt = "FINAL VERDADEIRO: Equilíbrio perfeito alcançado em Vale Verde.";
  }
  else if (ambiente >= 70 && producao >= 70) {
    txt = "FINAL DOURADO: Desenvolvimento sustentável atingido.";
  }
  else if (producao > ambiente + 25) {
    txt = "FINAL PRODUÇÃO: Alta produção, mas colapso ambiental.";
  }
  else if (ambiente > producao + 25) {
    txt = "FINAL PRESERVAÇÃO: Natureza preservada, produção limitada.";
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
