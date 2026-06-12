// Gerenciador de Estados do Jogo e dos 3 Chefes
const gameData = {
    currentBoss: 0,
    bosses: [
        {
            name: "EROSÃO",
            spriteClass: "sprite-erosao",
            intro: "* Erosão bloqueia o seu caminho! O solo rachado chora poeira e clama por socorro.",
            actSuccess: "* Você plantou mudas de cobertura! As raízes seguram a poeira. O corpo de Erosão parou de rachar!",
            lore: "LORE: Solo desprotegido perde nutrientes com o vento e a chuva. O plantio direto e curvas de nível seguram a vida na terra!",
            projClass: "proj-terra",
            attacks: ["chuva_detritos", "desmoronamento", "poeira_cega", "raios_terra", "terremoto_caotico"],
            hp: 100,
            maxHp: 100
        },
        {
            name: "PRAGA",
            spriteClass: "sprite-praga",
            intro: "* Um enxame furioso de insetos bloqueia o sol! PRAGA quer devorar tudo por vingança.",
            actSuccess: "* Você introduziu o Controle Biológico! As joaninhas equilibram o ambiente. Praga parece confusa e calma.",
            lore: "LORE: O uso excessivo de veneno mata os insetos bons. O Manejo Integrado de Pragas (MIP) usa a própria natureza para proteger a lavoura!",
            projClass: "proj-inseto",
            attacks: ["voo_diagonal", "enxame_frenetico", "ataque_perseguidor", "onda_lagartas", "espiral_nuvem"],
            hp: 120,
            maxHp: 120
        },
        {
            name: "DESPERDIÇADOR",
            spriteClass: "sprite-desperdiçador",
            intro: "* Uma nuvem negra de fumaça de tratores desregulados surge. DESPERDIÇADOR gasta recursos sem pensar.",
            actSuccess: "* Você calibrou os tratores e usou irrigação de precisão. A nuvem negra se dissipa em água limpa!",
            lore: "LORE: Tecnologia no campo evita desperdício de água e diesel. Produzir com consciência gera eficiência e protege a atmosfera!",
            projClass: "proj-acido",
            attacks: ["chuva_acida", "fumaca_expansiva", "vazamento_oleo", "raio_carbono", "tempestade_total"],
            hp: 150,
            maxHp: 150
        }
    ]
};

// Variáveis de Controle de Jogo
let hp = 20;
let maxHp = 20;
let playerX = 117;
let playerY = 92;
const playerSpeed = 3.5;
let currentBossState = gameData.bosses[gameData.currentBoss];
let isBossPacified = false;
let gameInterval;
let activeAttackTimers = [];
const keys = {};
let podeClicar = true;

// Elementos da DOM
const player = document.getElementById('player');
const arena = document.getElementById('battle-arena');
const dialogueElement = document.getElementById('dialogue');
const bossNameElement = document.getElementById('boss-name');
const bossSpriteElement = document.getElementById('boss-sprite');
const bossHpBar = document.getElementById('boss-hp-bar');

window.addEventListener('keydown', (e) => keys[e.key] = true);
window.addEventListener('keyup', (e) => keys[e.key] = false);

function updateMovement() {
    if (keys['ArrowUp'] && playerY > 0) playerY -= playerSpeed;
    if (keys['ArrowDown'] && playerY < 184) playerY += playerSpeed;
    if (keys['ArrowLeft'] && playerX > 0) playerX -= playerSpeed;
    if (keys['ArrowRight'] && playerX < 234) playerX += playerSpeed;

    player.style.left = playerX + 'px';
    player.style.top = playerY + 'px';
    
    checkCollisions();
}

// COMENTÁRIO DE AJUSTE: Força espaços rígidos para evitar que o HTML junte as palavras
function typeWriter(text, callback) {
    dialogueElement.innerText = "";
    let i = 0;
    clearInterval(window.typingTimer);
    
    window.typingTimer = setInterval(() => {
        if (i < text.length) {
            if (text.charAt(i) === " ") {
                dialogueElement.innerText += "\u00A0"; 
            } else {
                dialogueElement.innerText += text.charAt(i);
            }
            i++;
        } else {
            clearInterval(window.typingTimer);
            if (callback) callback();
        }
    }, 25);
}

function createProjectile(startX, startY, speedX, speedY) {
    const proj = document.createElement('div');
    proj.classList.add('projectile', currentBossState.projClass);
    proj.style.left = startX + 'px';
    proj.style.top = startY + 'px';
    arena.appendChild(proj);

    let curX = startX;
    let curY = startY;

    const timer = setInterval(() => {
        curX += speedX;
        curY += speedY;
        proj.style.left = curX + 'px';
        proj.style.top = curY + 'px';

        if (curY > 200 || curY < -20 || curX > 250 || curX < -20) {
            clearInterval(timer);
            proj.remove();
        }
    }, 20);

    activeAttackTimers.push(timer);
}

function executePattern(patternName) {
    let count = 0;
    if (patternName === "chuva_detritos") {
        const t = setInterval(() => { createProjectile(Math.random() * 230, 0, 0, 4); }, 300);
        activeAttackTimers.push(t);
    } 
    else if (patternName === "desmoronamento") {
        const t = setInterval(() => {
            createProjectile(0, Math.random() * 180, 3, 0);
            createProjectile(240, Math.random() * 180, -3, 0);
        }, 500);
        activeAttackTimers.push(t);
    } 
    else if (patternName === "poeira_cega") {
        const t = setInterval(() => { createProjectile(Math.random() * 230, 0, (Math.random() * 2 - 1), 2); }, 600);
        activeAttackTimers.push(t);
    } 
    else if (patternName === "raios_terra") {
        const t = setInterval(() => { createProjectile(0, 180, 4, -1); createProjectile(230, 180, -4, -1); }, 400);
        activeAttackTimers.push(t);
    } 
    else if (patternName === "terremoto_caotico") {
        const t = setInterval(() => {
            createProjectile(117, 92, 3, 0); createProjectile(117, 92, -3, 0);
            createProjectile(117, 92, 0, 3); createProjectile(117, 92, 0, -3);
        }, 800);
        activeAttackTimers.push(t);
    }
    else if (patternName === "voo_diagonal") {
        const t = setInterval(() => { createProjectile(Math.random() * 100, 0, 3, 3); }, 250);
        activeAttackTimers.push(t);
    } 
    else if (patternName === "enxame_frenetico") {
        const t = setInterval(() => { createProjectile(Math.random() * 230, 0, 0, 5); createProjectile(Math.random() * 230, 190, 0, -5); }, 400);
        activeAttackTimers.push(t);
    } 
    else if (patternName === "ataque_perseguidor") {
        const t = setInterval(() => {
            let dx = playerX - 117; let dy = playerY - 0;
            let angle = Math.atan2(dy, dx);
            createProjectile(117, 0, Math.cos(angle) * 4, Math.sin(angle) * 4);
        }, 600);
        activeAttackTimers.push(t);
    } 
    else if (patternName === "onda_lagartas") {
        const t = setInterval(() => { createProjectile(0, 170, 5, 0); createProjectile(240, 140, -5, 0); }, 500);
        activeAttackTimers.push(t);
    } 
    else if (patternName === "espiral_nuvem") {
        let angle = 0;
        const t = setInterval(() => { angle += 0.5; createProjectile(117 + Math.sin(angle)*60, 0, 0, 4); }, 150);
        activeAttackTimers.push(t);
    }
    else if (patternName === "chuva_acida") {
        const t = setInterval(() => { let drift = Math.sin(count++ * 0.5) * 2; createProjectile(Math.random() * 230, 0, drift, 4.5); }, 200);
        activeAttackTimers.push(t);
    } 
    else if (patternName === "fumaca_expansiva") {
        const t = setInterval(() => { createProjectile(Math.random() * 200, Math.random() * 160, 0, 0); }, 400);
        activeAttackTimers.push(t);
    } 
    else if (patternName === "vazamento_oleo") {
        const t = setInterval(() => { createProjectile(0, 50, 4, 0); createProjectile(240, 120, -4, 0); }, 600);
        activeAttackTimers.push(t);
    } 
    else if (patternName === "raio_carbono") {
        const t = setInterval(() => { createProjectile(0, playerY, 6, 0); }, 800);
        activeAttackTimers.push(t);
    } 
    else if (patternName === "tempestade_total") {
        const t = setInterval(() => { createProjectile(Math.random() * 230, 0, 0, 6); createProjectile(0, Math.random() * 180, 4, 0); }, 300);
        activeAttackTimers.push(t);
    }
}

function checkCollisions() {
    const projectiles = document.querySelectorAll('.projectile');
    projectiles.forEach((proj) => {
        const pRect = player.getBoundingClientRect();
        const bRect = proj.getBoundingClientRect();

        if (!(pRect.right < bRect.left || pRect.left > bRect.right || pRect.bottom < bRect.top || pRect.top > bRect.bottom)) {
            proj.remove();
            takeDamage();
        }
    });
}

function takeDamage() {
    hp -= 4;
    if (hp <= 0) {
        hp = 0;
        typeWriter("* Sua semente murchou... O Solo virou deserto permanente. FIM DE JOGO.");
        clearAllAttackTimers();
        clearInterval(gameInterval);
        podeClicar = false;
    }
    document.getElementById('hp-bar-current').style.width = (hp / maxHp * 100) + '%';
    document.getElementById('hp-text').innerText = `${hp} / ${maxHp}`;
}

function clearAllAttackTimers() {
    activeAttackTimers.forEach(timer => clearInterval(timer));
    activeAttackTimers = [];
    document.querySelectorAll('.projectile').forEach(p => p.remove());
}

function alternarBotoes(status) {
    podeClicar = status;
    const botoes = document.querySelectorAll('.menu-btn');
    botoes.forEach(btn => btn.disabled = !status);
}

function selectAction(action) {
    if (!podeClicar || hp <= 0) return;
    alternarBotoes(false);

    if (action === 'agir') {
        isBossPacified = true;
        typeWriter(currentBossState.actSuccess, () => {
            setTimeout(startBossTurn, 2000);
        });
    } 
    else if (action === 'atacar') {
        isBossPacified = false;
        currentBossState.hp -= 30; 
        if (currentBossState.hp < 0) currentBossState.hp = 0;
        
        bossHpBar.style.width = (currentBossState.hp / currentBossState.maxHp * 100) + '%';
        
        if (currentBossState.hp <= 0) {
            setTimeout(nextBoss, 2500);
        });
    } else {
        typeWriter(`* Você golpeou ${currentBossState.name}! O monstro ficou instável e contra-ataca furiosamente!`, () => {
            setTimeout(startBossTurn, 2000);
        });
    }
} 
else if (action === 'item') {
    hp = maxHp;
    document.getElementById('hp-bar-current').style.width = '100%';
    document.getElementById('hp-text').innerText = `${hp} / ${maxHp}`;
    
    typeWriter("* Você consumiu 'Adubo Orgânico'. Seu HP foi restaurado!", () => {
        setTimeout(startBossTurn, 2000);
    });
} 
else if (action === 'poupar') {
    if (isBossPacified) {
        typeWriter(currentBossState.lore + "  [POUPADO COMPLEMENTE!]", () => {
            clearAllAttackTimers();
            setTimeout(nextBoss, 4000);
        });
    } else {
        typeWriter(`* ${currentBossState.name} recusa seus termos. Use AGIR com práticas corretas primeiro!`, () => {
            setTimeout(() => { alternarBotoes(true); }, 1500);
        });
    }
}
}

function startBossTurn() {
if (hp <= 0 || currentBossState.hp <= 0) return;
clearAllAttackTimers();

const attackList = currentBossState.attacks;
const randomAttack = attackList[Math.floor(Math.random() * attackList.length)];
executePattern(randomAttack);

setTimeout(() => {
    clearAllAttackTimers();
    if (hp > 0) {
        typeWriter("* O ataque cessou. O ambiente ainda precisa de ajustes de manejo!", () => {
            alternarBotoes(true);
        });
    }
}, 5000);
}

function nextBoss() {
gameData.currentBoss++;
isBossPacified = false;

if (gameData.currentBoss < gameData.bosses.length) {
    currentBossState = gameData.bosses[gameData.currentBoss];
    bossNameElement.innerText = `* ${currentBossState.name}`;
    bossSpriteElement.className = currentBossState.spriteClass;
    bossHpBar.style.width = '100%';
    
    typeWriter(currentBossState.intro, () => {
        setTimeout(() => { alternarBotoes(true); }, 1000);
    });
} else {
    bossNameElement.innerText = "* REVOLUÇÃO VERDE";
    bossSpriteElement.style.backgroundColor = "#00ff00";
    bossSpriteElement.style.borderRadius = "50%";
    if (bossHpBar.parentElement) bossHpBar.parentElement.remove();
    
    typeWriter("🌟 FINAL PACIFISTA: Você aplicou todas as diretrizes do Agrinho! O solo prospera, os insetos polinizam em paz e o campo vive em equilíbrio sustentável tecnológico!");
    clearInterval(gameInterval);
}
}

// Inicialização segura
typeWriter(currentBossState.intro, () => {
alternarBotoes(true);
});
gameInterval = setInterval(updateMovement, 1000 / 60);
