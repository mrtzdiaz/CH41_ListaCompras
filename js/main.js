// El código va aquí -> 
let btnAgregar = document.getElementById("btnAgregar");
let btnClear = document.getElementById("btnClear");
let txtNombre = document.getElementById("Name");
let txtNumero = document.getElementById("Number");
let alerta = document.getElementById("alertValidacionesTexto");
let recuadro_alerta = document.getElementById("alertValidaciones");

let tabla = document.getElementById("tablaListaCompras");
let cuerpoTabla = tabla.getElementsByTagName("tbody").item(0);

let contadorProductos = document.getElementById("contadorProductos");
let resumenProductos = document.getElementById("productosTotal");
let resumenCosto = document.getElementById("precioTotal");

let isValid = true;
let precio;
let contador = 0;

let totalCosto = 0;
let totalProductos = 0;

let datos = new Array();

function validarCantidad() {
    if (txtNumero.value.length == 0) {
        return false;
    }
    if (isNaN(txtNumero.value)) {
        return false;
    }
    if (Number(txtNumero.value) <= 0) {
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
    isValid = true;

    txtNombre.value = txtNombre.value.trim();
    txtNumero.value = txtNumero.value.trim();

    if (txtNombre.value.length < 3) {
        recuadro_alerta.style.display = "block";
        alerta.innerHTML = "El <strong>nombre</strong> no es correcto<br>";
        txtNombre.style.border = "solid red medium";
        isValid = false;
    }

    if (!validarCantidad()) {
        recuadro_alerta.style.display = "block";
        alerta.innerHTML += "La <strong>cantidad</strong> no es correcta";
        txtNumero.style.border = "solid red medium";
        isValid = false;
    }

    if (isValid) {
        precio = Math.floor(Math.random() * 10000) / 100;
        contador++;
        let row =
            `<tr>
                <td>${contador}</td>
                <td>${txtNombre.value}</td>
                <td>${txtNumero.value}</td>
                <td>${precio}</td>
            </tr>`;

        let elemento = `{ "id":${contador},
                          "nombre":"${txtNombre.value}",
                          "cantidad":"${txtNumero.value}",
                          "precio":${precio}
        }`

        datos.push(JSON.parse(elemento));

        cuerpoTabla.insertAdjacentHTML("beforeend", row);

        totalCosto += precio * parseFloat(txtNumero.value);
        totalProductos += parseFloat(txtNumero.value);

        contadorProductos.innerText = contador;
        resumenProductos.innerText = totalProductos;
        resumenCosto.innerText = `$${totalCosto.toFixed(2)}`;

        localStorage.setItem("contador", contador);
        localStorage.setItem("totalProductos", totalProductos);
        localStorage.setItem("totalCosto", totalCosto);
        localStorage.setItem("datos", JSON.stringify(datos));

        txtNombre.value = "";
        txtNumero.value = "";
        txtNombre.focus();
    };

});

btnClear.addEventListener("click", function (event) {
    event.preventDefault();
    txtNombre.value = "";
    txtNumero.value = "";
    cuerpoTabla.innerHTML = "";
    contadorProductos.innerText = "0";
    resumenProductos.innerText = "0";
    resumenCosto.innerText = "$0";

    contador = 0;
    totalCosto = 0;
    totalProductos = 0;

    localStorage.setItem("contador", contador);
    localStorage.setItem("totalProductos", totalProductos);
    localStorage.setItem("totalCosto", totalCosto);
    datos = new Array();
    localStorage.removeItem("datos");

});

window.addEventListener("load", function (event) {
    event.preventDefault();
    if (this.localStorage.getItem("contador") != null) {
        contador = Number(this.localStorage.getItem("contador"))
    }
    if (this.localStorage.getItem("totalProductos") != null) {
        totalProductos = Number(this.localStorage.getItem("totalProductos"))
    }
    if (this.localStorage.getItem("totalCosto") != null) {
        totalCosto = Number(this.localStorage.getItem("totalCosto"))
    }
    if (this.localStorage.getItem("datos") != null) {
        datos = JSON.parse(this.localStorage.getItem("datos"));
    }
    contadorProductos.innerText = contador;
    resumenProductos.innerText = totalProductos;
    resumenCosto.innerText = `$${totalCosto}`;
    datos.forEach((r) => {
        let row =
            `<tr>
                <td>${r.id}</td>
                <td>${r.nombre}</td>
                <td>${r.cantidad}</td>
                <td>${r.precio}</td>
            </tr>`;
        cuerpoTabla.insertAdjacentHTML("beforeend", row);
    });

});
