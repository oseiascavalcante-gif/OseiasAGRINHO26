// Banco de Dados Expandido com 5 Inimigos do Ecossistema Paranaense
const enemyDatabase = [
    {
        name: "Gárgula da Erosão",
        baseSprite: "🏜️",
        happySprite: "🌱",
        hp: 100,
        actText: "* Você decide fazer o terraceamento mecânico e plantar árvores nativas nas encostas para segurar o solo.",
        spawnText: "* A Gárgula da Erosão impede o avanço! O solo está rachado e desprotegido.",
        loreTitle: "Crônica I: O Escudo da Terra",
        loreText: "Registros históricos mostram que o Paraná perdia toneladas de terra fértil antes da popularização do plantio direto e das curvas de nível. Ao conter a erosão, descobrimos que manter o solo coberto com palhada reduz o impacto da chuva em até 90%. O Agro forte nasce protegendo a base de tudo.",
        // Padrões de ataque dinâmicos baseados no HP
        attacks: {
            healthy: "* O inimigo faz rochas desabarem das encostas! Desvie!",
            critical: "* RANGER DE DIENTES! A poeira da tempestade de terra bloqueia sua visão! O ataque ficou mais rápido!"
        }
    },
    {
        name: "Espírito da Água Turva",
        baseSprite: "🌊",
        happySprite: "💧",
        hp: 120,
        actText: "* Você inicia o isolamento das fontes e o plantio de mata ciliar nas margens dos rios da propriedade.",
        spawnText: "* O Espírito da Água Turva surge chorando resíduos de poluição e lodo.",
        loreTitle: "Crônica II: As Veias Hidrográficas do Estado",
        loreText: "A água que abastece as cidades nasce no interior de pequenas propriedades rurais. Quando o produtor protege as matas ciliares, ele impede que defensivos ou terra caiam no leito dos rios. Preservar as bacias hidrográficas do Paraná garante energia barata e alimentos puros.",
        attacks: {
            healthy: "* Uma onda de água barrenta e contaminada avança em sua direção!",
            critical: "* REDEMOINHO! O rio corre furioso com enxurradas ácidas! O perigo dobrou!"
        }
    },
    {
        name: "Titã do Desperdício",
        baseSprite: "🗑️",
        happySprite: "📦",
        hp: 150,
        actText: "* Você implementa sensores automáticos de irrigação por gotejamento e compostagem orgânica.",
        spawnText: "* O Titã do Desperdício espalha fumaça de queima de recursos preciosos.",
        loreTitle: "Crônica III: O Amanhã Digital",
        loreText: "A tecnologia no campo não serve apenas para produzir mais, mas para erradicar o desperdício. O equilíbrio moderno usa tratores guiados por GPS e drones agrícolas para aplicar insumos na quantidade milimétrica necessária. O futuro sustentável une o conhecimento tradicional à inteligência de dados.",
        attacks: {
            healthy: "* Uma chuva de fumaça tóxica de queimadas polui a arena de batalha!",
            critical: "* INCÊNDIO FLORESTAL! Chamas descontroladas reduzem o seu tempo de reação!"
        }
    },
    {
        name: "Nuvem de Pragas Resistentes",
        baseSprite: "🪰",
        happySprite: "🐝",
        hp: 130,
        actText: "* Você introduz o Manejo Integrado de Pragas (MIP) usando vespas e predadores biológicos naturais.",
        spawnText: "* Uma nuvem ensurdecedora de insetos corrompidos ameaça devorar toda a plantação.",
        loreTitle: "Crônica IV: O Equilíbrio da Fauna Agrícola",
        loreText: "O uso indiscriminado de defensivos químicos elimina os predadores naturais e cria superpragas resistentes. O MIP (Manejo Integrado de Pragas) monitora a lavoura e só intervém no momento correto, preferindo o controle biológico. Isso protege os polinizadores, como as abelhas, cruciais para a biodiversidade do Paraná.",
        attacks: {
            healthy: "* A nuvem avança em um ataque rasante desordenado!",
            critical: "* ENXAME FURIOSO! Insetos atacam em formação de pinça por múltiplos lados ao mesmo tempo!"
        }
    },
    {
        name: "Guardião da Mata Devastada",
        baseSprite: "🪓",
        happySprite: "🌳",
        hp: 180,
        actText: "* Você cadastra a fazenda no CAR (Cadastro Ambiental Rural) e isola a área de Reserva Legal.",
        spawnText: "* O chefe final surge! Uma árvore centenária corrompida por machados de desmatamento ilegal.",
        loreTitle: "Crônica V: O Pacto Verde Paranaense",
        loreText: "Produção e preservação caminham juntas. O Código Florestal exige que propriedades tenham áreas de Reserva Legal e Áreas de Preservação Permanente (APP) intocadas. Fazendas sustentáveis que mantém florestas em pé ajudam a regular o regime de chuvas, protegendo a própria colheita contra secas extremas.",
        attacks: {
            healthy: "* Raízes secas brotam violentamente do chão tentando prender seus movimentos!",
            critical: "* DESABAMENTO DA COPA! Galhos pesados e troncos caem em sequência rítmica devastadora!"
        }
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
        dbBox.innerHTML = "* PARABÉNS! Você limpou toda a corrupção da região e garantiu o Futuro Sustentável do Agro! O Selo Ouro do Agrinho foi conquistado com sucesso e honra!";
        document.querySelectorAll(".menu-btn").forEach(b => b.disabled = true);
        nameEl.innerText = "Vitória Absoluta!";
        spriteEl.innerHTML = "🏆";
        return;
    }

    currentEnemy = enemyDatabase[currentEnemyIndex];
    enemyHP = currentEnemy.hp;
    enemyMercy = 0;

    nameEl.innerText = currentEnemy.name;
    spriteEl.innerHTML = currentEnemy.baseSprite;
    dbBox.innerHTML = currentEnemy.spawnText;

    updateBars();
}

function updateBars() {
    const hpPercent = (enemyHP / currentEnemy.hp) * 100;
    hpFill.style.width = Math.max(0, hpPercent) + "%";
    mercyFill.style.width = enemyMercy + "%";

    // Mudança dinâmica de Expressão Baseada no Progresso do ACT / MERCY
    if (enemyMercy >= 50 && enemyHP > 0) {
        spriteEl.innerHTML = currentEnemy.happySprite; // Muda o emoji indicando cura/alívio
        spriteEl.style.filter = "drop-shadow(0 0 10px #e6ff00)";
    } else if (enemyHP <= (currentEnemy.hp * 0.4) && enemyHP > 0) {
        spriteEl.innerHTML = "💢"; // Expressão de fúria se a vida cair abaixo de 40%
        spriteEl.style.filter = "drop-shadow(0 0 10px #ff0055)";
    } else if (enemyHP > 0) {
        spriteEl.innerHTML = currentEnemy.baseSprite;
        spriteEl.style.filter = "none";
    }

    // Gerencia o gatilho de liberação do botão SPARE
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

// Retorna o texto do padrão de ataque dependendo do HP atual do Boss
function getEnemyAttackText() {
    const criticalThreshold = currentEnemy.hp * 0.4; // 40% de vida ou menos
    if (enemyHP <= criticalThreshold) {
        return `<br><span style='color: #ff0055; font-weight: bold;'>${currentEnemy.attacks.critical}</span>`;
    }
    return `<br><span style='color: #ff9800;'>${currentEnemy.attacks.healthy}</span>`;
}

// Comando FIGHT
function handleAttack() {
    spriteEl.style.transform = "scale(0.7) rotate(-5deg)";
    setTimeout(() => spriteEl.style.transform = "scale(1) rotate(0deg)", 200);

    const damage = 35;
    enemyHP -= damage;
    
    if (enemyHP <= 0) {
        dbBox.innerHTML = `* Você desferiu um golpe crítico! Causou ${damage} de dano mecânico direto. A corrupção foi dissipada à força!`;
        setTimeout(() => triggerLoreReveal("defeat"), 1000);
    } else {
        dbBox.innerHTML = `* Você atacou a criatura! Causou ${damage} de dano. ${getEnemyAttackText()}`;
    }
    
    updateBars();
}

// Comando ACT (Muda expressão e mostra a reação do inimigo)
function handleAct() {
    spriteEl.style.transform = "translateY(-15px) scale(1.1)";
    setTimeout(() => spriteEl.style.transform = "translateY(0) scale(1)", 250);

    enemyMercy += 50; 
    
    if (enemyMercy >= 100) {
        dbBox.innerHTML = `${currentEnemy.actText}<br><span style='color: #e6ff00; font-weight: bold;'>* O coração da criatura se encheu de esperança sustentável! Ela está pronta para ser poupada!</span>`;
    } else {
        dbBox.innerHTML = `${currentEnemy.actText} ${getEnemyAttackText()}`;
    }

    updateBars();
}

// Comando SPARE
function handleSpare() {
    spriteEl.style.transform = "scale(0)";
    dbBox.innerHTML = `* Você estendeu a mão e poupou ${currentEnemy.name}! Os fragmentos da natureza voltaram ao perfeito equilíbrio.`;
    setTimeout(() => triggerLoreReveal("spare"), 1000);
}

function triggerLoreReveal(method) {
    const overlay = document.getElementById("lore-overlay");
    const titleEl = document.getElementById("lore-title");
    const textEl = document.getElementById("lore-text");

    let prefix = method === "spare" ? "✨ Natureza Pacificada! " : "⚔️ Força Contida! ";
    titleEl.innerText = prefix + currentEnemy.loreTitle;
    textEl.innerText = currentEnemy.loreText;

    overlay.style.display = "flex";
}

function closeLore() {
    document.getElementById("lore-overlay").style.display = "none";
    spriteEl.style.transform = "scale(1)"; // Reseta escala para o próximo boss
    currentEnemyIndex++; 
    loadEnemy();
}

// Execução inicial
loadEnemy();
