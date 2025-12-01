// Lista de cores possíveis (adicione mais se quiser)
const colors = [
    "vermelho", "azul", "verde", "amarelo", "roxo",
    "laranja", "rosa", "marrom", "preto", "branco",
    "cinza", "ciano", "magenta"
];

// Sorteia uma cor
let secretColor = colors[Math.floor(Math.random() * colors.length)];
let attempts = 3;

// Seleciona elementos
const input = document.getElementById("color-input");
const guessBtn = document.getElementById("guess-btn");
const restartBtn = document.getElementById("restart-btn");
const feedback = document.getElementById("feedback-message");
const attemptsCount = document.getElementById("attempts-count");

// Função para remover acentos
function normalize(str) {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

// Executa o palpite
guessBtn.addEventListener("click", () => {
    const userGuess = normalize(input.value.trim().toLowerCase());
    const normalizedColor = normalize(secretColor);

    if (userGuess === "") {
        feedback.textContent = "Digite uma cor!";
        feedback.className = "feedback error-msg";
        return;
    }

    if (userGuess === normalizedColor) {
        feedback.textContent = `🎉 Você acertou! A cor era ${secretColor}!`;
        feedback.className = "feedback success-msg";
        endGame();
        return;
    }

    attempts--;
    attemptsCount.textContent = attempts;

    if (attempts > 0) {
        feedback.textContent = "❌ Cor errada! Tente novamente.";
        feedback.className = "feedback error-msg";
    } else {
        feedback.textContent = `💀 Fim de jogo! A cor era: ${secretColor}`;
        feedback.className = "feedback error-msg";
        endGame();
    }
});

// Função para encerrar o jogo
function endGame() {
    input.disabled = true;
    guessBtn.disabled = true;
    restartBtn.style.display = "block";
}

// Botão de reinício
restartBtn.addEventListener("click", () => {
    attempts = 3;
    attemptsCount.textContent = attempts;

    // Resorteia cor
    secretColor = colors[Math.floor(Math.random() * colors.length)];

    input.disabled = false;
    guessBtn.disabled = false;
    input.value = "";
    feedback.textContent = "";
    restartBtn.style.display = "none";
});
