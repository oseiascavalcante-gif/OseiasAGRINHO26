let ambiente = 50;
let producao = 50;
let comunidade = 50;

let fase = 0;
let travado = false;

/* TRAILER */
let trailerIndex = 0;

const trailerTextos = [
  "Em um mundo onde a agricultura cresceu sem limites...",
  "A natureza começou a reagir...",
  "O solo, a água e a vida entraram em desequilíbrio...",
  "Agora, cada decisão pode mudar o futuro de Vale Verde...",
  "🌾 AGROTALE"
];

/* GAME */
const fases = [
  { texto:"Uma nascente ameaçada.", ea:{ambiente:15}, eb:{producao:15, ambiente:-15} },
  { texto:"Solo em risco.", ea:{ambiente:10}, eb:{producao:15, ambiente:-10} },
  { texto:"Floresta em perigo.", ea:{ambiente:20}, eb:{producao:20, ambiente:-15} },
  { texto:"Tecnologia chega.", ea:{ambiente:10, producao:10}, eb:{producao:20} },
  { texto:"Comunidade precisa de comida.", ea:{comunidade:10}, eb:{producao:15} }
];

const eventos = [
  { texto:"Chuva melhorou o solo", e:{ambiente:10} },
  { texto:"Seca afetou a produção", e:{producao:-10} }
];

/* EPÍLOGO */
let epilogoIndex = 0;

const epilogoTextos = [
  "Anos se passaram em Vale Verde...",
  "As escolhas moldaram o futuro da região.",
  "A natureza respondeu às ações humanas.",
  "Nada foi esquecido...",
  "🌾 FIM DE AGROTALE"
];

/* TRAILER */
function iniciarTrailer(){
  document.getElementById("trailer").style.display="flex";
  trailerIndex=0;
  escreverTrailer();
}

function escreverTrailer(i=0){
  let t=trailerTextos[trailerIndex];
  let el=document.getElementById("trailer-texto");

  if(i===0) el.textContent="";

  if(i<t.length){
    el.textContent+=t[i];
    setTimeout(()=>escreverTrailer(i+1),35);
  } else {
    setTimeout(()=>{
      trailerIndex++;
      if(trailerIndex<trailerTextos.length) escreverTrailer(0);
      else {
        document.getElementById("trailer").style.display="none";
        document.getElementById("start").style.display="flex";
      }
    },1200);
  }
}

/* START */
window.onload=()=>iniciarTrailer();

function iniciarJogo(){
  document.getElementById("start").style.display="none";
  document.getElementById("game").style.display="flex";
  atualizar();
  mostrar();
}

/* HUD */
function atualizar(){
  document.getElementById("ambiente").innerText=ambiente;
  document.getElementById("producao").innerText=producao;
  document.getElementById("comunidade").innerText=comunidade;

  document.getElementById("bar-ambiente").style.width=ambiente+"%";
  document.getElementById("bar-producao").style.width=producao+"%";
  document.getElementById("bar-comunidade").style.width=comunidade+"%";
}

/* GAME */
function mostrar(){
  if(fase>=fases.length){
    final();
    return;
  }

  document.getElementById("texto").textContent=fases[fase].texto;
}

function escolher(op){
  if(travado) return;

  let f=fases[fase];
  let e=op==="a"?f.ea:f.eb;

  if(e.ambiente) ambiente+=e.ambiente;
  if(e.producao) producao+=e.producao;
  if(e.comunidade) comunidade+=e.comunidade;

  if(Math.random()<0.4){
    let ev=eventos[Math.floor(Math.random()*eventos.length)];
    document.getElementById("texto").textContent="⚠️ "+ev.texto;
  }

  fase++;
  atualizar();
  mostrar();
}

/* FINAL */
function final(){
  document.getElementById("game").innerHTML+=`
    <div id="dashboard" style="display:block">
      <h2>FINAL DE VALE VERDE</h2>
      <p>Ambiente: ${ambiente}</p>
      <p>Produção: ${producao}</p>
      <p>Comunidade: ${comunidade}</p>
    </div>
  `;

  setTimeout(()=>epilogo(),2000);
}

/* EPÍLOGO */
function epilogo(){
  document.getElementById("dashboard").style.display="none";
  document.getElementById("epilogo").style.display="flex";

  epilogoIndex=0;
  escreverEpi();
}

function escreverEpi(i=0){
  let t=epilogoTextos[epilogoIndex];
  let el=document.getElementById("epilogo-texto");

  if(i===0) el.textContent="";

  if(i<t.length){
    el.textContent+=t[i];
    setTimeout(()=>escreverEpi(i+1),40);
  } else {
    setTimeout(()=>{
      epilogoIndex++;
      if(epilogoIndex<epilogoTextos.length) escreverEpi(0);
    },1200);
  }
}
