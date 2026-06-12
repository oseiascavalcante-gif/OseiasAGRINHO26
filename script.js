let ambiente = 50;
let producao = 50;
let comunidade = 50;

let fase = 0;
let travado = false;
let cutsceneAtiva = false;

/* 🌍 DILEMAS */
const fases = [
  { texto:"Uma nascente ameaçada.", a:"Proteger", b:"Expandir", efeitoA:{ambiente:15}, efeitoB:{producao:15, ambiente:-15} },
  { texto:"Solo fraco.", a:"Recuperar", b:"Fertilizar", efeitoA:{ambiente:10}, efeitoB:{producao:15, ambiente:-10} },
  { texto:"Floresta em risco.", a:"Preservar", b:"Desmatar", efeitoA:{ambiente:20}, efeitoB:{producao:20, ambiente:-15} },
  { texto:"Tecnologia chegou.", a:"Sustentável", b:"Produção", efeitoA:{ambiente:10, producao:10}, efeitoB:{producao:20} },
  { texto:"Comunidade precisa de comida.", a:"Equilíbrio", b:"Produção", efeitoA:{comunidade:10}, efeitoB:{producao:15} }
];

/* 🌪️ EVENTOS */
const eventos = [
  { texto:"Chuva melhorou o solo", efeito:{ambiente:10} },
  { texto:"Calor reduziu produção", efeito:{producao:-10} },
  { texto:"Polinização aumentou produção", efeito:{producao:10} },
  { texto:"Tempestade causou danos", efeito:{ambiente:-10} }
];

/* 🎬 CUTSCENE */
function mostrarCutscene(texto, callback){
  cutsceneAtiva = true;

  document.getElementById("cutscene").style.display = "flex";
  document.getElementById("cutscene-texto").innerText = "";

  let i = 0;

  function escrever(){
    if(i < texto.length){
      document.getElementById("cutscene-texto").innerText += texto[i];
      i++;
      setTimeout(escrever, 25);
    } else {
      setTimeout(()=>{
        document.getElementById("cutscene").style.display = "none";
        cutsceneAtiva = false;
        if(callback) callback();
      }, 1000);
    }
  }

  escrever();
}

/* INICIO */
function iniciarJogo(){
  document.getElementById("start").style.display="none";
  document.getElementById("game").style.display="block";
  mostrarTexto();
  atualizarStatus();
}

/* STATUS */
function atualizarStatus(){
  document.getElementById("ambiente").innerText=ambiente;
  document.getElementById("producao").innerText=producao;
  document.getElementById("comunidade").innerText=comunidade;

  document.getElementById("bar-ambiente").style.width=ambiente+"%";
  document.getElementById("bar-producao").style.width=producao+"%";
  document.getElementById("bar-comunidade").style.width=comunidade+"%";
}

/* TEXTO + CUTSCENE */
function mostrarTexto(){

  document.getElementById("texto").innerHTML="";

  let cenas=[
    "O futuro de Vale Verde continua...",
    "As decisões moldam o mundo...",
    "O equilíbrio está em jogo...",
    "Novos desafios surgem..."
  ];

  let cena = cenas[fase] || "Uma nova decisão surge...";

  mostrarCutscene(cena, ()=>{
    gerarEvento();
    digitarTexto(fases[fase].texto);
  });
}

/* DIGITAR */
function digitarTexto(t,i=0){
  travado=true;

  if(i<t.length){
    document.getElementById("texto").innerHTML+=t[i];
    setTimeout(()=>digitarTexto(t,i+1),20);
  } else travado=false;
}

/* EVENTO */
function gerarEvento(){
  if(Math.random()<0.5){
    let ev = eventos[Math.floor(Math.random()*eventos.length)];
    document.getElementById("texto").innerHTML="⚠️ "+ev.texto+"<br><br>";

    if(ev.efeito.ambiente) ambiente+=ev.efeito.ambiente;
    if(ev.efeito.producao) producao+=ev.efeito.producao;
    if(ev.efeito.comunidade) comunidade+=ev.efeito.comunidade;
  }
}

/* ESCOLHA */
function escolher(op){
  if(travado || cutsceneAtiva) return;

  let f=fases[fase];
  let e=op==="a"?f.efeitoA:f.efeitoB;

  if(e.ambiente) ambiente+=e.ambiente;
  if(e.producao) producao+=e.producao;
  if(e.comunidade) comunidade+=e.comunidade;

  fase++;
  atualizarStatus();

  if(fase<fases.length) mostrarTexto();
  else final();
}

/* CRISE */
function crise(){
  if(ambiente<30) return "🔥 CRISE";
  if(ambiente<50) return "⚠️ ALERTA";
  return "🌱 ESTÁVEL";
}

/* FINAL */
function final(){
  let media=(ambiente+producao+comunidade)/3;
  let c=crise();

  document.getElementById("game").innerHTML+=`
  <div id="dashboard" style="display:block">
    <h2>FINAL DE VALE VERDE</h2>
    <p>${c}</p>
    <p>Ambiente:${ambiente} Produção:${producao} Comunidade:${comunidade}</p>
    <p>Média:${media.toFixed(1)}</p>
    <button onclick="location.reload()">Reiniciar</button>
  </div>`;
}

/* START */
window.onload=()=>{
  document.getElementById("intro").style.display="flex";
};
