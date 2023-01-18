
let tablero,tamaño,bombas,ganador; //creo las variables globales que voy a usar durante todo el js

function generarTableroJS(){ //esta función genera el tablero con todas sus variables arrays etc
    ganador=0; //la variable ganador la pongo en 0 para que se sepa que no ha ganado todavía
    tamaño = tamaño=document.getElementById("tamaño").value; //le añado el tamaño que ha pedido el usuario
    bombas=document.getElementById("bombas").value; //le añado las bombas que ha pedido el usuario
    dibujarTableroHTML(); //llamo a la función dibujarTableroHTML
    crearMatriz(); //llamo a la función crearMatriz
    console.log(tablero); 
    setInterval(comprobarGanador,1000); //pongo un intervalo al método comprobarGanador de 1 segundo para que al instante que ganes te lo muestre por pantalla.
}

function dibujarTableroHTML(){ //esta función dibuja el tablero por HTML
    let pantalla=""; //creo la variable que voy a usar para crear el relleno de la tabla
    for(let i=0;i<tamaño;i++){ //con un bucle for voy colocando las filas y las columnas de la tabla añadiendo los métodos HTML de "oncontextmenu" en el que uso el método banderas, onclick con el que uso el método mostrar
        pantalla+="<tr>"; //a cada columna le doy el identificador del iterador i y j, añado la clase noVisitado 
        for(let j=0;j<tamaño;j++){
            pantalla+="<td oncontextmenu=\"javascript:banderas(\'"+i+j+"\');return false;\" class='noVisitado' id='"+i+j+"' onclick='mostrar(this.id)'></td>";
        }
        pantalla+="</tr>";
    }
    document.getElementById("tablero").innerHTML=pantalla; //meto el relleno de la tabla
}

function banderas(id){ //esta función se usa cuando el usuario pulsa el botón derecho en alguna celda de la tabla para poner o quitar banderas
    if(document.getElementById(id).outerText=="🚩"){ //compruebo si hay una bandera en la celda con el id dado y si es así la borro, añado una bomba y actualizo el contador de banderas
        document.getElementById(id).innerText="";
        bombas++;
        document.getElementById("banderas").innerText="Banderas restantes: "+bombas;
    }else if(bombas>0){ //compruebo si hay almenos una bandera por usar y si es así pongo una bandera en la celda, quito una bomba y actualizo el contador de banderas
        document.getElementById(id).innerText="🚩";
        bombas--;
        document.getElementById("banderas").innerText="Banderas restantes: "+bombas;
    }
}

function mostrar(id){ //esta función pide el id de la celda para mostrar el valor de cada celda al usuario
    let y,x; //creo dos variables para separar los valores del id de la celda mediante el metodo substring
    x=id.substr(0,1);
    y=id.substr(1,1);
    doc=document.getElementById(id); 
    //compruebo usando los valores que antes substraje si la matriz en esa posición no es ni una bomba ni un 0 y que sea una bandera para que no haya error si el usuario pone una bandera usando el botón derecho y la quita usando el botón izquierdo
    if(tablero[x][y]!=0&&tablero[x][y]!="x"&&doc.outerText=="🚩"){ 
        doc.innerText=tablero[x][y]; //muestro al usuario el valor de esa posición de la matriz
        bombas++; //añado una bomba y actualizo el contador de banderas y le doy la clase visitado
        document.getElementById("banderas").innerText="Banderas restantes: "+bombas;
        doc.setAttribute("class","visitado")
        //compruebo si el tablero no es ni una bomba ni un cero y le muestro al usuario el valor de esa posición de la matriz y le doy la clase visitado
    }else if(tablero[x][y]!=0&&tablero[x][y]!="x"){
        doc.innerText=tablero[x][y];
        doc.setAttribute("class","visitado");
        //compruebo que la tabla sea una bomba para acabar la partida y usar el método mostrarTodo
    }else if(tablero[x][y]=="x"){
        alert("Has perdido");
        mostrarTodo();
        //llamo a limpiar zona si la posición en la matriz es un 0 
    }else if(tablero[x][y]==0)limpiarZona(x,y);
}

function mostrarTodo(){ //esta función muestra todos los valores de la matriz y los imprime en cada celda del tablero dandole la clase visitado
    for(let i=0;i<tablero.length;i++){
        for(let j=0;j<tablero.length;j++){
            document.getElementById(i+""+j).innerText=tablero[i][j];
            document.getElementById(i+""+j).setAttribute("class","visitado");
        }
    }
}

function limpiarZona(x,y){ //esta función limpia la zona de ceros continuos y sus celdas adyacentes
    let maxj=-50; //creo una variable para que sea la máxima longitud del iterador j
    let minj=-50; //creo una variable para que sea la mínima longitud del iterador j
    for(let i=Number(x),contx=-1,salir=0;i<tablero.length;i=contx+i){ //creo un bucle para recorrer las filas dandole al iterador i la variable "x" y creo 2 variables el contador de x y salir para terminar el bucle, que no termina hasta que i sea menor que el tamaño del tablero y la variable i se actualice sumando el contador de x más i
        if(i==0)contx=1; //si i es igual a 0 el contador de x es 1 y abro otro bucle para recorrer las columnas
        for (let j=Number(y),conty=-1;j<tablero.length;j=conty+j){ //el iterador j es la variable "y" y creo un contador de y al que le asigno el valor -1, el bucle acaba al llegar al ser mayor o igual al tamaño de las columnas y se va añadiendo al iterador j el contador y sumando la j.
            if(j==0){ //compruebo que el iterador j sea 0 y si es así la mínima longitud de j es 0 y el contador de y se vuelve 1
                minj=j;
                conty=1;
            }
            if(tablero[i][j]==0){ // compruebo que la posición i y j del tablero sea 0 y si es así pongo que la celda tenga la clase visitada
                document.getElementById(i+""+j).setAttribute("class","visitado");
                if(i<tablero.length-1&&j<tablero.length-1){//compruebo los márgenes de abajo y la derecha (tamaño fila, tamaño columna) y después voy asignando la calse visitado al siguiente valor de la i y la j y enseñando al usuario sus respectivos valores
                    document.getElementById(Number(i+1)+""+Number(j+1)).setAttribute("class","visitado");
                    if(tablero[i+1][j+1]!=0)document.getElementById(Number(i+1)+""+Number(j+1)).innerText=tablero[i+1][j+1];
                }//compruebo los márgenes de arriba y la izquierda (0,0) y después voy asignando la calse visitado al anterior valor de la i y la j y enseñando al usuario sus respectivos valores
                if(i>0&&j>0){
                    document.getElementById(Number(i-1)+""+Number(j-1)).setAttribute("class","visitado");
                    if(tablero[i-1][j-1]!=0)document.getElementById(Number(i-1)+""+Number(j-1)).innerText=tablero[i-1][j-1];
                }//compruebo los márgenes de arriba y la derecha (0,tamaño columna) y después voy asignando la calse visitado al anterior y el siguiente valor de la i y la j y enseñando al usuario sus respectivos valores
                if(i>0&&j<tablero.length-1){
                    document.getElementById(Number(i-1)+""+Number(j+1)).setAttribute("class","visitado");
                    if(tablero[i-1][j+1]!=0)document.getElementById(Number(i-1)+""+Number(j+1)).innerText=tablero[i-1][j+1];
                }//compruebo los márgenes de abajo y la izquierda (tamaño fila,0) y después voy asignando la calse visitado al anterior y el siguiente valor de la i y la j y enseñando al usuario sus respectivos valores
                if(i<tablero.length-1&&j>0){
                    document.getElementById(Number(i+1)+""+Number(j-1)).setAttribute("class","visitado");
                    if(tablero[i+1][j-1]!=0)document.getElementById(Number(i+1)+""+Number(j-1)).innerText=tablero[i+1][j-1];
                }
                salir++;//le añado 1 a la variable salir para demostrar que tiene que seguir la función
            }else if(conty==1){ //si el contador de y es 1 le añado al máximo valor de j el actual valor del iterador j y salgo del bucle
                maxj=j;
                j=tablero.length;
            }else { //si el contador de y es -1 le añado al mínimo contador de j el valor actual del iterador j y hago que el contador y sea 1
                minj=j;
                conty=1;
            }
        }
        if(salir==0&&maxj!=-50&&tablero[i][maxj]==0){ //si no hay que salir y el valor máx de j no es igual a 0 se llama otra vez a la función con la i y el max j
            limpiarZona(i,maxj);
        }
        if(salir==0&&minj!=-50&&tablero[i][minj]==0){ //si no hay que salir y el valor min de j no es igual a 0 se llama otra vez a la función con la i y el min j
            limpiarZona(i,minj);
        }
        
        if(salir==0&&contx==1)i=tablero.length; //si el valor del contador de x es 1 salir de la función
        else if(salir==0)contx=1; //si no si salir es igual a 0 darle al contador x el valor 1
        salir=0; //poner la salida otra vez a 0
    }
}

function crearMatriz(){ //en este método creo las filas y las columnas del array con el tamaño dado y les doy el valor 0
    tablero=new Array(Number(tamaño));
    for (let i = 0;i<tablero.length; i++) {
        tablero[i]=new Array(Number(tamaño));
    }
    for(let i=0;i<tamaño;i++){
        for(let j=0;j<tamaño;j++){
            tablero[i][j]=0;
        }
    }
    colocarBombasTableroJS(bombas); //llamo al método colocarBombasTableroJS con la variable global bombas y después recorro el array para darle los valores que me devuelva el metodo contarBombasAlrededor
    for(let i=0;i<tamaño;i++){
        for(let j=0;j<tamaño;j++){
            if(tablero[i][j]=="0")tablero[i][j]=contarBombasAlrededor(i,j);
        }
    }
}

function colocarBombasTableroJS(bombaSinColocar){//este método pide las bombas que hacen falta por colocar y las va poniendo de forma aleatoria por el tablero mediante un doble bucle for que recorre las filas y las columnas 
    for(let i=0;i<tamaño;i++){
        for(let j=0;j<tamaño;j++){
            if(numeroAleatorio()&&bombaSinColocar>0&&tablero[i][j]!="x"){ //comprueba que el número aleatorio devuelva true, que las bombas que falten no sean 0 y que la posición de la matriz no sea una bomba y después coloca la bomba y resta uno a las bombas que faltan
                tablero[i][j]="x";
                bombaSinColocar--;
            }
        }
    }
    if(bombaSinColocar>0)colocarBombasTableroJS(bombaSinColocar); //si faltan bombas por colocar se llama de nuevo creando recursividad

}

function numeroAleatorio(){ //este método devuelve true 1 de cada 4 veces mediante el math random que crea un número aleatorio entre 0 y 100 y si ese número es menor de 10 devuelve true
    let probabilidad= Math.random()*100;
    if(probabilidad<10)return true;
    return false;
}

function contarBombasAlrededor(fila,columna){ // este método mediante la fila y la columna hace una barrida 3x3 para devolver cuantas bombas hay alrededor
    let cont=0,x,y; //creo 3 variables, al contador le asigno 0 y le voy sumando cada vez que encuentro una bomba, a la "x" le asigno la fila + el iterador "i" y a la "y" le asigno la columna + el iterador "j"
    for(let i=-1;i<=1;i++){ //el bucle termina cuando el iterador llega a 1
        x=Number(fila+i);
        for(let j=-1;j<=1;j++){
            y=Number(columna+j);
            if(x>=0&&x<tablero.length&&y>=0&&y<tablero.length){
                if(tablero[x][y]=="x")cont++;
            }
        }
    }
    return cont;
}

function comprobarGanador(){ //esta función determina si has ganado si has puesto todas las banderas en su respectiva bomba
    let cont=0;
    if(document.getElementById("banderas").outerText=="Banderas restantes: 0"&&ganador==0){ //compruebo que no falten banderas y que el ganador sea 0 para saber si ha colocado todas las banderas bien comprobando que en cada bandera haya una bomba y si no es así se le asigna al contador 1 más
        for(let i=0;i<tablero.length;i++){
            for(let j=0;j<tablero.length;j++){
            if(tablero[i][j]!="x"&&document.getElementById(i+""+j).outerText=="🚩")cont++;
        }
    }
        if(cont==0){ //si no se ha encontrado ningun fallo se muestra todo el tablero y te avisa que has ganado dandole a la variable ganador 1 más para que no se repita el proceso 
            alert("Has ganado");
            mostrarTodo();
            ganador=1;
            document.getElementById("banderas").innerText="Banderas restantes: ?"; //pongo el texto de las banderas como al principio
        }
    }
}