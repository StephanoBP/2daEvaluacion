"use strict";

let cont=0;

window.addEventListener("load",inicio);

function inicio(){
    document.getElementById("boton").addEventListener("click",consumirPromesa);
}
function consumirPromesa(){
    let contador=++cont;
    let h2=document.getElementById("h2");
    h2.insertAdjacentHTML("beforeend",contador+") Empieza el código síncrono <br/>");
    let promesa=new Promise((resolve,reject)=>{
        h2.insertAdjacentHTML("beforeend",contador +") Dentro de la promesa antes de timeOut.Esto es un código asíncrono <br/>");
        window.setTimeout(function(){
            resolve(contador)},Math.random()*4000+1000)});
        promesa.then(
        function(val){
            h2.insertAdjacentHTML("beforeend",contador +") Dentro de then.Asincronía terminada<br/>")});
            h2.insertAdjacentHTML("beforeend",contador+") Código después del then.Sincronía terminada<br/>");   
    //let promesa= new Promise(promesa());
    //promesa.then(pintar(cont+": then"));
    //pintar(cont+" Después del then");
}

/*
function promesa(resolve,reject){
    
    pintar(cont+": dentro de la promesa y antes del time out");
    setTimeout( ()=>resolve(cont),Math.random()*4000+1000);
    pintar(cont+": dentro de la promesa, Después del resolve");
}
function pintar(texto){
    let cont=document.getElementById("div");
    let p=document.createElement("p");
    p.innerText=texto;
    cont.appendChild(p);
}
*/