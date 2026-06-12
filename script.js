let trailerIndex = 0;

const trailerTextos = [
  "Em um mundo onde a agricultura cresceu sem limites...",
  "A natureza começou a reagir...",
  "O solo, a água e a vida entraram em desequilíbrio...",
  "Agora, cada decisão pode mudar o futuro de Vale Verde...",
  "🌾 AGROTALE"
];

function iniciarTrailer() {
  document.getElementById("trailer-texto").textContent = "";
  trailerIndex = 0;
  mostrarTrailerTexto();
}

function mostrarTrailerTexto(i = 0) {
  let texto = trailerTextos[trailerIndex];
  let el = document.getElementById("trailer-texto");

  if (i === 0) el.textContent = "";

  if (i < texto.length) {
    el.textContent += texto[i];
    setTimeout(() => mostrarTrailerTexto(i + 1), 40);
  } else {
    setTimeout(() => {
      trailerIndex++;

      if (trailerIndex < trailerTextos.length) {
        mostrarTrailerTexto(0);
      } else {
        document.getElementById("trailer").style.display = "none";
        document.getElementById("start").style.display = "flex";
      }
    }, 1200);
  }
}

/* INICIA TRAILER */
window.onload = () => {
  iniciarTrailer();
};

/* GAME START */
function iniciarJogo() {
  document.getElementById("start").style.display = "none";
  document.getElementById("game").style.display = "flex";
}
