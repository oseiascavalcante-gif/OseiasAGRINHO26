let ambiente = 50;
let producao = 50;
let comunidade = 50;

let fase = 0;

const texto = document.getElementById("texto");

function atualizarStatus() {
  document.getElementById("ambiente").innerText = ambiente;
  document.getElementById("producao").innerText = producao;
  document.getElementById("comunidade").innerText = comunidade;
}

function mostrarFase() {
  const fases = [
    "Uma nascente está ameaçada por uma nova plantação. O que fazer?",
    "O solo começa a perder nutrientes. Como agir?",
    "Uma mata pode ser recuperada ou usada para expansão agrícola.",
    "Novas tecnologias chegam à região.",
    "A comunidade precisa de decisões sobre o futuro."
  ];

  texto.innerText = fases[fase];
}

function escolher(opcao) {

  // Fase 1
  if (fase === 0) {
    if (opcao === 1) {
      ambiente += 15;
      producao -= 5;
    } else {
      producao += 15;
      ambiente -= 15;
    }
  }

  // Fase 2
  if (fase === 1) {
    if (opcao === 1) {
      ambiente += 10;
      producao += 10;
    } else {
      producao += 15;
      ambiente -= 10;
    }
  }

  // Fase 3
  if (fase === 2) {
    if (opcao === 1) {
      ambiente += 15;
      comunidade += 5;
    } else {
      producao += 15;
      ambiente -= 15;
    }
  }

  // Fase 4
  if (fase === 3) {
    if (opcao === 1) {
      producao += 10;
      ambiente += 10;
    } else {
      producao -= 5;
    }
  }

  // Fase 5
  if (fase === 4) {
    if (opcao === 1) {
      comunidade += 15;
      ambiente += 5;
    } else {
      producao += 10;
      comunidade -= 10;
    }
  }

  fase++;

  atualizarStatus();

  if (fase < 5) {
    mostrarFase();
  } else {
    final();
  }
}

function final() {

  document.getElementById("botoes").style.display = "none";

  if (ambiente >= 70 && producao >= 70 && comunidade >= 70) {
    texto.innerText = "FINAL DOURADO: Equilíbrio perfeito em Vale Verde. Agro forte e sustentável.";
  }

  else if (ambiente > producao) {
    texto.innerText = "FINAL PRESERVAÇÃO: A natureza floresceu, mas a produção foi limitada.";
  }

  else if (producao > ambiente + 20) {
    texto.innerText = "FINAL PRODUÇÃO: Alta produção, mas o meio ambiente foi degradado.";
  }

  else {
    texto.innerText = "FINAL SUSTENTÁVEL: Um equilíbrio foi alcançado em Vale Verde.";
  }
}

mostrarFase();
atualizarStatus();
