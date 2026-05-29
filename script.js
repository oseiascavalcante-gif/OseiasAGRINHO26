/**
 * CLASSE DE ABSTRAÇÃO: Representa uma escolha que o jogador pode fazer.
 */
class Choice {
    constructor(text, nextNodeId, pointsReward) {
        this.text = text;             // Texto que aparece no botão
        this.nextNodeId = nextNodeId; // ID do próximo cenário/nó
        this.pointsReward = pointsReward; // Pontuação gerada por essa escolha
    }
}

/**
 * CLASSE DE ABSTRAÇÃO: Representa um cenário/nó da história do RPG.
 */
class StoryNode {
    constructor(id, text, choices = []) {
        this.id = id;         // Identificador único do nó
        this.text = text;     // Texto descritivo da situação ambiental
        this.choices = choices; // Array de instâncias da classe Choice
    }
}

/**
 * MOTOR DO JOGO (ENGINE): Gerencia o estado, pontuação e renderização.
 */
class GameEngine {
    constructor(storyData) {
        this.storyMap = new Map(storyData.map(node => [node.id, node]));
        this.currentNode = this.storyMap.get(1); // Inicia no Nó ID 1
        this.score = 0;
        
        // Elementos do DOM Cacheando para performance
        this.storyTextElement = document.getElementById('story-text');
        this.choiceButtonsElement = document.getElementById('choice-buttons');
        this.scoreElement = document.getElementById('score');
    }

    // Inicializa o jogo
    init() {
        this.render();
    }

    // Atualiza a interface gráfica
    render() {
        this.storyTextElement.innerText = this.currentNode.text;
        this.scoreElement.innerText = this.score;
        this.choiceButtonsElement.innerHTML = ''; // Limpa botões anteriores

        this.currentNode.choices.forEach(choice => {
            const button = document.createElement('button');
            button.innerText = choice.text;
            button.classList.add('btn-choice');
            button.addEventListener('click', () => this.makeChoice(choice));
            this.choiceButtonsElement.appendChild(button);
        });
    }

    // Processa a escolha do jogador e avança na árvore de decisão
    makeChoice(choice) {
        this.score += choice.pointsReward;
        
        if (this.storyMap.has(choice.nextNodeId)) {
            this.currentNode = this.storyMap.get(choice.nextNodeId);
            this.render();
        } else {
            // Caso chegue a um nó inexistente, reinicia (Tratamento de erro robusto)
            console.error("Nó não encontrado: " + choice.nextNodeId);
            this.resetGame();
        }
    }

    resetGame() {
        this.score = 0;
        this.currentNode = this.storyMap.get(1);
        this.render();
    }
}

/**
 * BANCO DE DADOS DO RPG (Estrutura de dados complexa e expansível)
 * Focado na temática Agrinho: Sustentabilidade, agricultura e preservação.
 */
const gameStoryData = [
    new StoryNode(1, 
        "Você herdou uma propriedade rural que está com o solo desgastado e uma mata ciliar degradada próxima a um rio. O que você decide fazer primeiro?",
        [
            new Choice("Investir em monocultura intensiva usando forte carga de defensivos químicos.", 2, 0),
            new Choice("Adotar a agricultura sintrópica e iniciar o reflorestamento da margem do rio.", 3, 20),
            new Choice("Vender as terras para uma madeireira explorar a floresta restante.", 4, -10)
        ]
    ),
    new Choice().nextNodeId = 2, // Correção lógica fluida mapeada abaixo:
    new StoryNode(2,
        "A monocultura trouxe lucro rápido, mas o solo compactou, as pragas ficaram resistentes e a água do rio foi contaminada. A comunidade local está protestando.",
        [
            new Choice("Ignorar os protestos e comprar mais insumos químicos.", 5, -20),
            new Choice("Mudar a estratégia, suspender os químicos e iniciar a rotação de culturas.", 3, 15)
        ]
    ),
    new StoryNode(3,
        "Anos depois, sua propriedade virou referência! A fauna voltou, a água está limpa e a produção agrícola orgânica é altamente lucrativa. O sindicato rural te convida para palestrar.",
        [
            new Choice("Aceitar o convite para educar outros produtores sobre práticas sustentáveis.", 6, 30),
            new Choice("Recusar o convite e focar apenas em lucrar sozinho com seu novo selo verde.", 7, 5)
        ]
    ),
    new StoryNode(4,
        "A madeireira destruiu o ecossistema. O rio secou, a terra perdeu valor e você carrega o peso de ter acabado com o patrimônio natural da região. Fim de jogo amargo.",
        [
            new Choice("Tentar novamente (Reiniciar Jornada)", 1, 0)
        ]
    ),
    new StoryNode(5,
        "O solo faliu completamente e a justiça ambiental interditou suas terras por contaminação de lençol freático. Sua jornada termina em prejuízo e crime ambiental.",
        [
            new Choice("Tentar novamente (Reiniciar Jornada)", 1, 0)
        ]
    ),
    new StoryNode(6,
        "Parabéns! Sua palestra inspirou dezenas de agricultores a mudarem suas práticas. Você salvou sua propriedade e transformou a realidade da sua região. Você ganhou o prêmio máximo de Sustentabilidade!",
        [
            new Choice("Jogar Novamente", 1, 0)
        ]
    ),
    new StoryNode(7,
        "Sua fazenda vai bem, mas a região ao redor continua sofrendo com a seca e queimadas por falta de conscientização dos vizinhos. O sucesso isolado não protegeu a região como um todo.",
        [
            new Choice("Tentar Novamente para buscar um impacto maior", 1, 0)
        ]
    )
];

// Instanciação e Inicialização do sistema do Jogo
document.addEventListener("DOMContentLoaded", () => {
    const game = new GameEngine(gameStoryData);
    game.init();
});
