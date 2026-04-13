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
        escribirTexto(document.getElementById("texto-dinamico"), "Tu saldo es: $100", 25);
    }

    if (tipo === "deposito") {
        titulo.innerText = "Depositar";
        contenido.innerHTML = `
            <p id="texto-dinamico"></p>
            <input type="number" placeholder="Cantidad">
            <button>Depositar</button>
        `;
        escribirTexto(document.getElementById("texto-dinamico"), "Ingrese la cantidad a depositar", 25);
    }

    if (tipo === "retiro") {
        titulo.innerText = "Retirar";
        contenido.innerHTML = `
            <p id="texto-dinamico"></p>
            <input type="number" placeholder="Cantidad">
            <button>Retirar</button>
        `;
        escribirTexto(document.getElementById("texto-dinamico"), "Ingrese la cantidad a retirar", 25);
    }

    if (tipo === "movimientos") {
        titulo.innerText = "Movimientos de la cuenta";
        contenido.innerHTML = `
            <p> Transacciones Realizadas :</p>
            <input type="number" placeholder="Tipo de Transaccion">
            <button>Buscar</button>
            <p id="transaccion1"></p>
            <p id="transaccion2"></p>
            <p id="transaccion3"></p>
        `;
        escribirTexto(document.getElementById("transaccion1"), " * Pago de servicio de Energia Electrica ($ 45)", 50);
        escribirTexto(document.getElementById("transaccion2"), "* Pago de servicio de Agua potable ($ 15)", 50);
        escribirTexto(document.getElementById("transaccion3"), "* Pago de Cuota Universitaria ($ 85)", 50);
    }

    if (tipo === "pago") {
        titulo.innerText = "Pago de servicio";
        contenido.innerHTML = `
            <p id="texto-dinamico"></p>
            <input type="number" placeholder="NIE">
            <button>Pagar.</button>
        `;
        escribirTexto(document.getElementById("texto-dinamico"), "Ingrese el NIE de la factura", 25);
    }

    if (tipo === "salir") {
    titulo.innerText = "Cerrar Sesion";
    contenido.innerHTML = `
        <p id="texto-dinamico"></p>
        <button onclick="cerrarSesion()">Salir</button>
    `;
    escribirTexto(document.getElementById("texto-dinamico"), "¿Está seguro de querer cerrar sesión?", 25);
    }

    // 🔹 Nuevo caso: gráfico
    if (tipo === "Grafico") {
        titulo.textContent = "Movimientos Bancarios";
        contenido.innerHTML = '<canvas id="graficoMovimientos"></canvas>';

        const ctx = document.getElementById('graficoMovimientos').getContext('2d');

        new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo'],
                datasets: [
                    {
                        label: 'Depósitos',
                        data: [500, 700, 400, 900, 650],
                        borderColor: 'rgba(75, 192, 192, 1)',
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                        fill: true,
                        tension: 0.3
                    },
                    {
                        label: 'Retiros',
                        data: [300, 450, 600, 200, 500],
                        borderColor: 'rgba(255, 99, 132, 1)',
                        backgroundColor: 'rgba(255, 99, 132, 0.2)',
                        fill: true,
                        tension: 0.3
                    }
                ]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: { position: 'top' },
                    title: { display: true, text: 'Historial de Depósitos y Retiros' }
                },
                scales: {
                    y: { beginAtZero: true }
                }
            }
        });
    }
};

window.cerrarDialogo = function() {
    document.getElementById("dialogo").classList.add("oculto");
};

function cerrarSesion() {
    // Eliminar el usuario guardado
    localStorage.removeItem("nombreUsuario");

    // Redirigir al login
    window.location.href = "login.html";
}