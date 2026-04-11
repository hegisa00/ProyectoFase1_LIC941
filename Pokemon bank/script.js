function escribirTexto(elemento, texto, velocidad = 30) {

    elemento.innerHTML = `<span class="texto"></span><span class="cursor">▍</span>`;

    const textoSpan = elemento.querySelector(".texto");
    const cursor = elemento.querySelector(".cursor");

    let i = 0;

    const intervalo = setInterval(() => {

        textoSpan.innerText += texto[i];
        i++;

        if (i >= texto.length) {
            clearInterval(intervalo);

            // deja el cursor parpadeando al final
            cursor.style.display = "inline-block";
        }

    }, velocidad);
}

window.abrir = function(tipo) {

    const dialogo = document.getElementById("dialogo");
    const titulo = document.getElementById("dialogo-titulo");
    const contenido = document.getElementById("dialogo-contenido");

    dialogo.classList.remove("oculto");

    if (tipo === "saldo") {

        titulo.innerText = "Consultar Saldo";

        contenido.innerHTML = `<p id="texto-dinamico"></p>`;

        escribirTexto(
            document.getElementById("texto-dinamico"),
            "Tu saldo es: $100",
            25
        );
    }

    if (tipo === "deposito") {

        titulo.innerText = "Depositar";

        contenido.innerHTML = `
            <p id="texto-dinamico"></p>
            <input type="number" placeholder="Cantidad">
            <button>Depositar</button>
        `;

        escribirTexto(
            document.getElementById("texto-dinamico"),
            "Ingrese la cantidad a depositar",
            25
        );
    }

    if (tipo === "retiro") {

        titulo.innerText = "Retirar";

        contenido.innerHTML = `
            <p id="texto-dinamico"></p>
            <input type="number" placeholder="Cantidad">
            <button>Retirar</button>
        `;

        escribirTexto(
            document.getElementById("texto-dinamico"),
            "Ingrese la cantidad a retirar",
            25
        );
    }
    if (tipo === "movimientos") {

        titulo.innerText = "Movimientos de la cuenta";

        contenido.innerHTML = `
            <p> Transacciones Realizadas :</p>
            <input type="number" placeholder="Tipo de Transaccion">
            <button>Buscar</button>
            <p id="transaccion 1"></p>
            <p id="transaccion 2"></p>
            <p id="transaccion 3"></p>
        `;

        escribirTexto(
            document.getElementById("transaccion 1"),
            " * Pago de servicio de Energia Electrica ($ 45)",
            50
        );
        escribirTexto(
            document.getElementById("transaccion 2"),
            "* Pago de servicio de Agua potable ($ 15)",
            50
        );
        escribirTexto(
            document.getElementById("transaccion 3"),
            "* Pago de Cuota Universitaria ($ 85)" ,
            50
        );
    }
    if (tipo === "pago") {

        titulo.innerText = "Pago de servicio";

        contenido.innerHTML = `
            <p id="texto-dinamico"></p>
            <input type="number" placeholder="NIE">
            <button>Pagar.</button>
        `;

        escribirTexto(
            document.getElementById("texto-dinamico"),
            "Ingrese el NIE de la factura",
            25
        );
    }
    if (tipo === "salir") {

        titulo.innerText = "Cerrar Sesion";

        contenido.innerHTML = `
            <p id="texto-dinamico"></p>
            <button>Salir.</button>
        `;

        escribirTexto(
            document.getElementById("texto-dinamico"),
            "Esta seguro de querer Cerrar Sesion? ",
            25
        );
    }
};

window.cerrarDialogo = function() {
    document.getElementById("dialogo").classList.add("oculto");
};