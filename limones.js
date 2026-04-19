let canvas = document.getElementById("areaJuego");
let ctx=canvas.getContext("2d");

const ALTURA_SUELO=20;
const ALTURA_PERSONAJE=60;
const ANCHO_PERSONAJE=40;
const ALTO_LIMON=20;
const ANCHO_LIMON=20;
let personajeX=(canvas.width/2)-(ANCHO_PERSONAJE /2);
let personajeY=canvas.height-ALTURA_SUELO-ALTURA_PERSONAJE;
let limonX=canvas.width/2;
let limonY=20;
let puntaje=0;
let vidas=3;
let velocidadCaida=100;

function iniciar(){
    setInterval(bajarLimon,100);
    dibujarSuelo();
    dibujarPersonaje();
    aparecerLimon();
}


function dibujarSuelo(){
    ctx.fillStyle="#11F21C";
    ctx.fillRect(0,canvas.height-ALTURA_SUELO,canvas.width,ALTURA_SUELO);
}

function dibujarPersonaje(){
    ctx.fillStyle="yellow";
    ctx.fillRect(personajeX,personajeY,ANCHO_PERSONAJE,ALTURA_PERSONAJE);
}

function moverIzquierda(){
    personajeX=personajeX-10;
    if(personajeX < 0){
        personajeX = 0;
    }
    actualizarPantalla();
}

function moverDerecha(){
    personajeX=personajeX+10;
    if(personajeX + ANCHO_PERSONAJE > canvas.width){
        personajeX = canvas.width - ANCHO_PERSONAJE;
    }
    actualizarPantalla();
}

function actualizarPantalla(){
    limpiarCanva();
    dibujarSuelo();
    dibujarPersonaje();
    dibujarLimon();
}

function limpiarCanva(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
}

function dibujarLimon(){
    ctx.fillStyle="green";
    ctx.fillRect(limonX,limonY,ALTO_LIMON,ANCHO_LIMON)    
}

function bajarLimon(){
    limonY = limonY +10; 
    actualizarPantalla();
    detectarAtrapado();
    detectarPiso();
}

function detectarAtrapado(){
    if(limonX+ANCHO_LIMON> personajeX && limonX< personajeY+ANCHO_PERSONAJE 
        && limonY + ALTO_LIMON>personajeY && limonY < personajeY+ALTURA_PERSONAJE ){
        //alert("ATRAPADO!!!!!");
        aparecerLimon();
        puntaje=puntaje+1;
        mostrarEnSpan("txtPuntaje",puntaje);
    }
}

function detectarPiso(){
    if(limonY+ALTO_LIMON==canvas.height-ALTURA_SUELO){
        aparecerLimon();
        vidas=vidas-1;
        mostrarEnSpan("txtVidas",vidas);
        if(vidas == 0){
            alert ("GAME OVER");
        }
    }
}

function generarAleatorio(min,max){
    let random=Math.random();
    let numero=random*(max-min);
    let numeroEntero=parseInt(numero);
    numeroEntero = numeroEntero+min;
    return numeroEntero;
}

function aparecerLimon(){
    limonX=generarAleatorio(0,canvas.width-ANCHO_LIMON);
    limonY=0;
    actualizarPantalla();
}