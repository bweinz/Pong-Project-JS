//Variaveis da Bolinha
let xBolinha = 300;
let yBolinha = 200;
let diametro = 18;
let raio = diametro/2;

//Variaveis da Raquete
let xRaquete = 5
let yRaquete = 150
let raqueteComprimento = 10
let raqueteAltura = 90

//Variaveis do Oponente
let xRaqueteOponente = 585
let yRaqueteOponente  = 150
let velocidadeYOponente; 

//Velocidade da Bolinha
let velocidadeXBolinha = 6;
let velocidadeYBolinha = 6;

//Placar do jogo
let meusPontos = 0;
let pontosDoOponente = 0;

//Colisão da Biblioteca
let colidiu = false;

//Sons do Jogo
let raquetada;
let ponto;
let trilha;

//Chance de errar
let chanceDeErrar = 0;

function preload (){
  trilha = loadSound("trilha.mp3");
  ponto = loadSound("ponto.mp3");
  raquetada = loadSound("raquetada.mp3");
}
  
function setup() {
  createCanvas(600, 400);
  //trilha.loop();
}

function draw() {
  background(0);
  mostraBolinha ();
  movimentaBolinha ();
  verificaColisaoBorda();
  mostraRaquete (xRaquete, yRaquete);
  movimentaMinhaRaquete();
  mostraRaquete(xRaqueteOponente, yRaqueteOponente);
  movimentaRaqueteOponente();
  //verificaColisaoRaquete();
  verificaColisaoRaqueteBiblioteca(xRaquete, yRaquete);
  verificaColisaoRaqueteBiblioteca(xRaqueteOponente, yRaqueteOponente)
  incluiPlacar();
  marcaPonto();
}




function mostraBolinha () {
  circle(xBolinha,yBolinha,diametro)
}

//+= operação + atribuição xBolinha = xBolinha + velocidadeXBolinha
//teste
function movimentaBolinha (){
  xBolinha += velocidadeXBolinha
  yBolinha += velocidadeYBolinha
  
}

function verificaColisaoBorda (){
   if (xBolinha + raio > width || 
      xBolinha - raio <0){
    velocidadeXBolinha *= -1
}
  
  if (yBolinha + raio > height || yBolinha - raio < 0){
      velocidadeYBolinha *= -1;
      }
}


//Mostrar a raquete
 function mostraRaquete(x,y){
 rect(x,y,raqueteComprimento,raqueteAltura);}

//Mostra raquete oponente
//function mostraRaqueteOponente(){
//rect(xRaqueteOponente,yRaqueteOponente,raqueteComprimento,
//raqueteAltura);}




//movimentação da raquete:
function movimentaMinhaRaquete(){
  if (keyIsDown(UP_ARROW)||keyIsDown(LEFT_ARROW)){
    yRaquete -= 10;
  }
  if (keyIsDown(DOWN_ARROW)||keyIsDown(RIGHT_ARROW)){
    yRaquete += 10; 
                              }
}

//Movimentação da raquete do Inimigo:
function movimentaRaqueteOponente(){
  velocidadeYOponente = yBolinha - yRaqueteOponente - raqueteComprimento /2 - 30;
  yRaqueteOponente += velocidadeYOponente + chanceDeErrar
  calculaChanceDeErrar()
  }
function verificaColisaoRaquete (){
  if (xBolinha - raio < xRaquete + raqueteComprimento && yBolinha - raio < yRaquete + raqueteAltura && yBolinha + raio > yRaquete)
   {
    velocidadeXBolinha *= -1;
     raquetada.play()
  }
}

function verificaColisaoRaqueteBiblioteca(x,y){
  colidiu =
  collideRectCircle(x,y,raqueteComprimento, raqueteAltura,xBolinha,yBolinha,raio);
  if (colidiu){
    velocidadeXBolinha *= -1
    raquetada.play();
  }
}

//Criação do Placar
function incluiPlacar(){
  stroke(255); //Contorno
  textAlign(CENTER); //Centralização
  textSize(20); //Tamanho do texto
  fill(color(255,140,0));//Fundo colorido do placar
  rect(150,10,40,20); // Retangulo
  fill(255);
  text(meusPontos,170,26);
  fill(color(255,140,0));
  rect(450,10,40,20);
  fill(255);
  text(pontosDoOponente,470,26);
}

//Funcionalidade do Placar
function marcaPonto(){
  if (xBolinha > 590){
    meusPontos += 1;
    ponto.play();
    }
  if (xBolinha < 10){
    pontosDoOponente += 1;
    ponto.play();
  }
}

function calculaChanceDeErrar() {
  if (pontosDoOponente >= meusPontos) {
    chanceDeErrar += 1
    if (chanceDeErrar >= 39){
    chanceDeErrar = 40
    }
  } else {
    chanceDeErrar -= 1
    if (chanceDeErrar <= 35){
    chanceDeErrar = 35
    }
  }
}