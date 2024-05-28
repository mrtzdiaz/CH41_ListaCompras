// El código va aquí -> 
let btnAgregar = document.getElementById("btnAgregar");
let btnClear = document.getElementById("btnClear");
let txtNombre = document.getElementById("Name");
let txtNumero = document.getElementById("Number");
let tabla = document.getElementsByTagName("tbody");
let alerta = document.getElementById("alertValidacionesTexto");
let recuadro_alerta = document.getElementById("alertValidaciones");

function validarCantidad(){
    if (txtNumero.value.length == 0){
        return false;
    }
    return true;
}


btnAgregar.addEventListener("click", function (event) {
    event.preventDefault();
    recuadro_alerta.style.display = "none";
    alerta.innerHTML = "";
    txtNombre.style.border = "";
    txtNumero.style.border = "";


    if (txtNombre.value.length < 3) {
        recuadro_alerta.style.display = "block";
        alerta.innerHTML = "El <strong>nombre</strong> no es correcto<br>";
        txtNombre.style.border = "solid red medium";
        

    }
    
    if (! validarCantidad()) {
        recuadro_alerta.style.display = "block";
        alerta.innerHTML += "La <strong>cantidad</strong> no es correcta";
        txtNumero.style.border = "solid red medium";

    } else {
        let producto = txtNombre.value;
        let cantidad = txtNumero.value;
    }

});

btnClear.addEventListener("click", function (event) {
    event.preventDefault();
    txtNombre.value = "";
    txtNumero.value = "";
});
