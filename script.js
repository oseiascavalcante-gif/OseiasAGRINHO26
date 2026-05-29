// Estado Inicial do Jogo
let turno = 1;
let producao = 100;
let solo = 100;
let biodiversidade = 100;
let moedas = 500;

// Lista de eventos baseados em problemas agrícolas reais
const eventos = [
    {
        texto: "ATENÇÃO: Uma infestação de pulgões surgiu na lavoura de soja!",
        tipo: "praga"
    },
    {
        texto: "ALERTA: Chuvas intensas começaram. Há risco de erosão severa no solo descoberto.",
        tipo: "clima"
    },
    {
        texto: "INFORME: Pragas menores surgiram, mas os predadores naturais estão tentando controlar.",
        tipo: "equilibrio"
    }
];

let eventoAtual = eventos[0];

function atualizarInterface() {
    document.getElementById("turno-atual").innerText = turno;
    document.getElementById("status-producao").innerText = producao + "%";
    document.getElementById("status-solo").innerText = solo + "%";
    document.getElementById("status-biodiversidade").innerText = biodiversidade + "%";
    document.getElementById("status-moedas").innerText = moedas;
}

function jogarAcao(acao) {
    if (moedas < 150) {
        alert("Orçamento insuficiente para realizar manejos neste turno!");
        return;
    }

    moedas -= 150; // Custo de qualquer ação ecológica ou corretiva

    if (acao === 'rotacao') {
        solo = Math.min(100, solo + 25);
        producao = Math.min(100, producao + 10);
        document.getElementById("texto-evento").innerText = "Sucesso! A rotação de culturas quebrou o ciclo de pragas e nutriu o solo naturalmente.";
    } 
    else if (acao === 'biologico') {
        biodiversidade = Math.min(100, biodiversidade + 20);
        producao = Math.min(100, producao + 15);
        document.getElementById("texto-evento").innerText = "Excelente! As joaninhas controlaram os pulgões sem agredir o meio ambiente.";
    } 
    else if (acao === 'floresta') {
        biodiversidade = Math.min(100, biodiversidade + 30);
        solo = Math.min(100, solo + 15);
        document.getElementById("texto-evento").innerText = "Ótima escolha! A mata ciliar protege os rios e atrai polinizadores e predadores naturais.";
    } 
    else if (acao === 'quimico') {
        // O agrotóxico resolve a produção no curto prazo, mas destrói o ecossistema
        producao = Math.min(100, producao + 20);
        biodiversidade = Math.max(0, biodiversidade - 40);
        solo = Math.max(0, solo - 20);
        document.getElementById("texto-evento").innerText = "Cuidado! O agrotóxico eliminou as pragas, mas reduziu drasticamente a biodiversidade e enfraqueceu o solo.";
    }

    atualizarInterface();
}

function proximoTurno() {
    if (turno >= 10) {
        finalizarJogo();
        return;
    }

    turno++;
    moedas += 200; // Renda gerada a cada turno pela fazenda

    // Aplica consequências automáticas baseadas no estado da fazenda
    if (biodiversidade < 50) {
        producao = Math.max(0, producao - 15); // Sem biodiversidade, surgem mais pragas
        document.getElementById("texto-evento").innerText = "Efeito colateral: Baixa biodiversidade causou um surto de pragas secundárias. A produção caiu!";
    } else if (solo < 50) {
        producao = Math.max(0, producao - 20); // Solo infértil reduz colheita
        document.getElementById("texto-evento").innerText = "Efeito colateral: O solo está degradado e as plantas não conseguem crescer com vigor.";
    } else {
        // Escolhe um evento aleatório para o novo turno
        let rand = Math.floor(Math.random() * eventos.length);
        eventoAtual = eventos[rand];
        document.getElementById("texto-evento").innerText = eventoAtual.texto;
        
        // Penalidades iniciais do evento se não tratado
        if (eventoAtual.tipo === "praga") producao = Math.max(0, producao - 10);
        if (eventoAtual.tipo === "clima") solo = Math.max(0, solo - 15);
    }

    atualizarInterface();
}

function finalizarJogo() {
    let pontuacaoFinal = producao + solo + biodiversidade;
    let mensagemFinal = "";

    if (pontuacaoFinal >= 250) {
        mensagemFinal = `Nota Máxima no Agrinho! 🏆 Pontuação: ${pontuacaoFinal}. Você provou que a sustentabilidade e a tecnologia andam juntas! Sua fazenda é próspera e o meio ambiente está protegido.`;
    } else if (pontuacaoFinal >= 150) {
        mensagemFinal = `Bom trabalho! Pontuação: ${pontuacaoFinal}. Sua fazenda produziu bem, mas com alguns prejuízos ao solo ou fauna locais. Tente usar mais controle biológico na próxima!`;
    } else {
        mensagemFinal = `Alerta de Crise Ambiental! ⚠️ Pontuação: ${pontuacaoFinal}. O uso excessivo de químicos ou a falta de manejo destruíram os recursos naturais. Lembre-se das lições do Agrinho sobre conservação!`;
    }

    alert(mensagemFinal);
    // Reinicia o jogo
    turno = 1; producao = 100; solo = 100; biodiversidade = 100; moedas = 500;
    atualizarInterface();
}

// Inicializa a tela
atualizarInterface();
