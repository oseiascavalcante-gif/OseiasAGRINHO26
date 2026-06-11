// Banco de Dados dos Inimigos e da Lore Pedagógica Desbloqueada por Abate/Piedade
const enemyDatabase = [
    {
        name: "Gárgula da Erosão",
        sprite: "🏜️",
        hp: 100,
        actText: "* Você decide fazer o terraceamento mecânico e plantar árvores nativas nas encostas para segurar o solo.",
        spawnText: "* A Gárgula da Erosão impede o avanço! O solo está rachado e desprotegido.",
        loreTitle: "Crônica I: O Escudo da Terra (Curitiba, PR)",
        loreText: "Registros antigos mostram que o Paraná perdeu toneladas de terra fértil antes da chegada do plantio direto e das curvas de nível. Ao pacificar ou conter a erosão, descobrimos que manter o solo coberto com palhada reduz o impacto da chuva em até 90%. O Agro forte nasce protegendo a base de tudo."
    },
    {
        name: "Espírito da Água Turva",
        sprite: "🌊",
        hp: 120,
        actText: "* Você inicia o isolamento das fontes e o plantio de mata ciliar nas margens dos rios da propriedade.",
        spawnText: "* O Espírito da Água Turva surge chorando defensivos químicos e resíduos industriais.",
        loreTitle: "Crônica II: As Veias do Estado Hídrico",
        loreText: "A água que abastece as cidades nasce no interior de pequenas propriedades rurais. Quando o produtor protege as matas ciliares (Mata de Galeria), ele impede que defensivos ou terra caiam no leito dos rios. Preservar as bacias hidrográficas do Paraná garante energia barata e alimentos puros."
    },
    {
        name: "Titã do Desperdício",
        sprite: "🗑️",
        hp: 150,
        actText: "* Você implementa sensores automáticos de irrigação por gotejamento e compostagem orgânica de restos de grãos.",
        spawnText: "* O Titã do Desperdício espalha fumaça de queimadas e queima recursos preciosos.",
        loreTitle: "Crônica III: O Amanhã Conectado",
        loreText: "A tecnologia no campo não serve apenas para produzir mais, mas para erradicar o desperdício. O equilíbrio moderno usa tratores guiados por GPS e drones agrícolas para aplicar insumos na quantidade milimétrica necessária. O futuro sustentável une o conhecimento tradicional à inteligência dos dados digitais."
    }
];

let currentEnemyIndex = 0;
let currentEnemy = null;
let enemyHP = 100;
let enemyMercy = 0;

const dbBox = document.getElementById("dialogue-box");
const hpFill = document.getElementById("enemy-hp-fill");
const mercyFill = document.getElementById("enemy-mercy-fill");
const spareBtn = document.getElementById("spare-btn");
const spriteEl = document.getElementById("enemy-sprite");
const nameEl = document.getElementById("enemy-name");

function loadEnemy() {
    if (currentEnemyIndex >= enemyDatabase.length) {
        dbBox.innerHTML = "* Parabéns! Você limpou toda a corrupção da região e garantiu o Futuro Sustentável do Agro! O Selo Ouro do Agrinho é seu.";
        document.querySelectorAll(".menu-btn").forEach(b => b.disabled = true);
        nameEl.innerText = "Vitória Total!";
        spriteEl.innerHTML = "🏆";
        return;
    }

    currentEnemy = enemyDatabase[currentEnemyIndex];
    enemyHP = currentEnemy.hp;
    enemyMercy = 0;

    nameEl.innerText = currentEnemy.name;
    spriteEl.innerHTML = currentEnemy.sprite;
    dbBox.innerHTML = currentEnemy.spawnText;

    updateBars();
}

function updateBars() {
    const hpPercent = (enemyHP / currentEnemy.hp) * 100;
    hpFill.style.width = Math.max(0, hpPercent) + "%";
    mercyFill.style.width = enemyMercy + "%";

    // Libera botão SPARE se a barra de Mercy (Piedade) atingir 100%
    if (enemyMercy >= 100) {
        spareBtn.disabled = false;
        spareBtn.style.color = "#e6ff00";
        spareBtn.style.borderColor = "#e6ff00";
    } else {
        spareBtn.disabled = true;
        spareBtn.style.color = "#333";
        spareBtn.style.borderColor = "#222";
    }
}

// Ação 1: Lutar
function handleAttack() {
    spriteEl.style.transform = "scale(0.8)";
    setTimeout(() => spriteEl.style.transform = "scale(1)", 200);

    const damage = 35;
    enemyHP -= damage;
    dbBox.innerHTML = `* Você atacou a criatura! Causou ${damage} de dano mecânico direto. Ela cambaleia com agressividade.`;
    
    updateBars();

    if (enemyHP <= 0) {
        setTimeout(() => triggerLoreReveal("defeat"), 800);
    }
}

// Ação 2: Agir
function handleAct() {
    spriteEl.style.transform = "translateY(-10px)";
    setTimeout(() => spriteEl.style.transform = "translateY(0)", 200);

    enemyMercy += 50; 
    dbBox.innerHTML = currentEnemy.actText;

    updateBars();
}

// Ação 3: Poupar/Salvar
function handleSpare() {
    dbBox.innerHTML = `* Você poupou ${currentEnemy.name}! A criatura sorri em paz e se torna uma força protetora da natureza local.`;
    setTimeout(() => triggerLoreReveal("spare"), 1000);
}

// Abre o pop-up com as crônicas e dados reais do Agrinho
function triggerLoreReveal(method) {
    const overlay = document.getElementById("lore-overlay");
    const titleEl = document.getElementById("lore-title");
    const textEl = document.getElementById("lore-text");

    let prefix = method === "spare" ? "✨ Criatura Pacificada! " : "⚔️ Criatura Abatida! ";
    titleEl.innerText = prefix + currentEnemy.loreTitle;
    textEl.innerText = currentEnemy.loreText;

    overlay.style.display = "flex";
}

function closeLore() {
    document.getElementById("lore-overlay").style.display = "none";
    currentEnemyIndex++; 
    loadEnemy();
}

// Inicia o jogo rodando a primeira entidade do banco de dados
loadEnemy();
