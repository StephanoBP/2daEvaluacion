/*window.addEventListener("load", () => {
    document.getElementById("boton").addEventListener('click',abrirGoogle());
    document.getElementById("submit").addEventListener('click', valida());
  });
*/
function abrirGoogle(){
     window.open('https://www.google.com/');
}
function valida(){
    return(validaCheck());
}

function validaCheck(){
    let check=document.getElementsByClassName("dia");
    let ok=0;

    for(i=0;i<check.length;i++){
        if(check[i].checked==true) ok++;
    }
   return (ok>=2);
}
function error(elemento){
    elemento.className='error';
    elemento.focus();
}

function limpiarError(elemento){
    elemento.className='';
}