let ambiente = 50;
let producao = 50;
let comunidade = 50;

let fase = 0;

const personagens = [
  "🌱",
  "💧",
  "🌳",
  "🚜",
  "🏘️"
];

const textos = [
  "Uma nascente está ameaçada por uma nova plantação...",
  "O solo começa a perder nutrientes...",
  "Uma mata pode ser recuperada ou usada para expansão...",
  "Novas tecnologias chegam à região...",
  "A comunidade precisa decidir seu futuro..."
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
}

function digitarTexto(texto, i = 0) {
  if (i < texto.length) {
    document.getElementById("texto").innerHTML += texto.charAt(i);
    setTimeout(() => digitarTexto(texto, i + 1), 20);
  }
}

function mostrarTexto(txt) {
  document.getElementById("texto").innerHTML = "";
  digitarTexto(txt);
}
 function atualizarPersonagem() {
  document.getElementById("personagem").innerText = personagens[fase] || "🌾";
 }
function escolher(opcao) {

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
  atualizarPersonagem();
  if (fase < textos.length) {
    mostrarTexto(textos[fase]);
  } else {
    final();
  }
}

function final() {

  document.getElementById("botoes").style.display = "none";

  let txt = "";

  // ⭐ FINAL SECRETO (EQUILÍBRIO PERFEITO REAL)
  if (ambiente >= 80 && producao >= 80 && comunidade >= 80) {
    txt = "FINAL VERDADEIRO: Você encontrou o equilíbrio perfeito entre natureza, produção e comunidade. Vale Verde virou um exemplo mundial de sustentabilidade.";
  }

  // 🌱 FINAL SUSTENTÁVEL
  else if (ambiente >= 70 && producao >= 70) {
    txt = "FINAL DOURADO: Desenvolvimento sustentável alcançado com sucesso.";
  }

  // 🚜 FINAL PRODUÇÃO
  else if (producao > ambiente + 25) {
    txt = "FINAL PRODUÇÃO: Alta produtividade, mas o meio ambiente entrou em colapso.";
  }

  // 🌳 FINAL PRESERVAÇÃO
  else if (ambiente > producao + 25) {
    txt = "FINAL PRESERVAÇÃO: A natureza foi protegida, mas a produção não sustentou a comunidade.";
  }

  // ⚖️ FINAL NEUTRO
  else {
    txt = "FINAL NEUTRO: Um equilíbrio instável foi alcançado.";
  }

  mostrarTexto(txt);
}
