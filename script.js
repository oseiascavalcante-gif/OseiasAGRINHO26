let ambiente = 50;
let producao = 50;
let comunidade = 50;

let fase = 0;

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

  if (fase < textos.length) {
    mostrarTexto(textos[fase]);
  } else {
    final();
  }
}

function final() {

  document.getElementById("botoes").style.display = "none";

  let txt = "";

  if (ambiente >= 70 && producao >= 70 && comunidade >= 70) {
    txt = "FINAL DOURADO: Vale Verde virou exemplo de equilíbrio sustentável.";
  }
  else if (producao > ambiente + 20) {
    txt = "FINAL PRODUÇÃO: Crescimento alto, mas com degradação ambiental.";
  }
  else if (ambiente > producao) {
    txt = "FINAL PRESERVAÇÃO: Natureza protegida, mas produção limitada.";
  }
  else {
    txt = "FINAL EQUILÍBRIO: Um meio-termo foi alcançado.";
  }

  mostrarTexto(txt);
}
