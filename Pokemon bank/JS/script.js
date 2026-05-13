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
        let saldoActual = localStorage.getItem("saldo") || "500.00";
        escribirTexto(document.getElementById("texto-dinamico"), "Tu saldo es: $" + saldoActual, 25);
    }

    if (tipo === "deposito") {
        titulo.innerText = "Depositar";
        contenido.innerHTML = `
            <p id="texto-dinamico"></p>
            <input type="number" id="monto-deposito" placeholder="Cantidad">
            <button onclick="realizarDeposito()">Depositar</button>
        `;
        escribirTexto(document.getElementById("texto-dinamico"), "Ingrese la cantidad a depositar", 25);
    }

    if (tipo === "retiro") {
        titulo.innerText = "Retirar";
        contenido.innerHTML = `
            <p id="texto-dinamico"></p>
            <input type="number" id="monto-retiro" placeholder="Cantidad">
            <button onclick="realizarRetiro()">Retirar</button>
        `;
        escribirTexto(document.getElementById("texto-dinamico"), "Ingrese la cantidad a retirar", 25);
    }

    if (tipo === "movimientos") {
        titulo.innerText = "Historial de Movimientos";
        
        let historial = JSON.parse(localStorage.getItem("transacciones")) || [];
        
        if (historial.length === 0) {
            contenido.innerHTML = `<p id="texto-dinamico"></p>`;
            escribirTexto(document.getElementById("texto-dinamico"), "No hay transacciones registradas aún.", 25);
        } else {
            // Creamos la estructura base con contenedores <p> vacíos y el botón de borrar
            let htmlMovimientos = `
                <p id="texto-dinamico" style="color: #007bff; font-weight: bold;"></p>
                <div style="max-height: 200px; overflow-y: auto; text-align: left; font-size: 14px; margin-bottom: 15px; background: #f8f9fa; padding: 10px; border-radius: 5px;">
            `;
            
            // Sacamos los últimos 5 para no saturar la pantalla
            const ultimosMovimientos = historial.slice(-5).reverse(); 
            
            // Generamos un párrafo vacío con un ID único para cada movimiento
            ultimosMovimientos.forEach((m, index) => {
                htmlMovimientos += `<p id="mov-${index}" style="margin: 5px 0; border-bottom: 1px dashed #ccc; min-height: 20px;"></p>`;
            });
            
            htmlMovimientos += `
                </div>
                <button onclick="borrarHistorial()" style="background-color: #dc3545; color: white; border: none; padding: 10px; border-radius: 5px; cursor: pointer; width: 100%;">Borrar Historial</button>
            `;
            
            contenido.innerHTML = htmlMovimientos;

            // 1. Animamos el título primero
            escribirTexto(document.getElementById("texto-dinamico"), "Cargando tus últimos movimientos...", 30);

            // 2. Animamos cada transacción con un pequeño retraso (escalonado) para que se vea increíble
            ultimosMovimientos.forEach((m, index) => {
                let textoPlano = `> ${m.fecha} ${m.hora} | ${m.tipo}: $${m.monto} (Saldo: $${m.saldoResultante})`;
                
                // Usamos setTimeout para que se animen uno después del otro
                setTimeout(() => {
                    escribirTexto(document.getElementById(`mov-${index}`), textoPlano, 15);
                }, 800 + (index * 500)); // 800ms de pausa inicial, luego 500ms entre cada línea
            });
        }
    }

    if (tipo === "pago") {
        titulo.innerText = "Pago de servicio";
        contenido.innerHTML = `
            <p id="texto-dinamico"></p>
            <input type="text" id="nie-pago" placeholder="NIE (Ej. 123456)">
            <input type="number" id="monto-pago" placeholder="Monto a pagar" style="margin-top: 10px;">
            <button onclick="realizarPago()">Pagar</button>
        `;
        escribirTexto(document.getElementById("texto-dinamico"), "Ingrese el NIE y el monto de la factura", 25);
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






//Transacciones y validaciones

//Inicializar saldo
if (!localStorage.getItem("saldo")) {
    localStorage.setItem("saldo", "500.00");
}
if (!localStorage.getItem("transacciones")) {
    localStorage.setItem("transacciones", JSON.stringify([]));
}

//Estilo
const SwalPokemon = Swal.mixin({
    customClass: {
        popup: 'swal-pokemon-popup',
        title: 'swal-pokemon-title',
        confirmButton: 'swal-pokemon-btn swal-pokemon-confirm',
        cancelButton: 'swal-pokemon-btn swal-pokemon-cancel'
    },
    buttonsStyling: false // Esto apaga los estilos aburridos por defecto
});

//Guardar y actualizar saldo
function registrarTransaccion(tipo, monto) {
    let saldoAnterior = parseFloat(localStorage.getItem("saldo"));
    let nuevoSaldo;
    
    if (tipo === "Depósito") {
        nuevoSaldo = saldoAnterior + monto;
    } else {
        nuevoSaldo = saldoAnterior - monto;
    }
    
    //Actualizar saldo en LocalStorage
    localStorage.setItem("saldo", nuevoSaldo.toFixed(2));

    //Obtener historial actual o crear uno vacío
    let historial = JSON.parse(localStorage.getItem("transacciones")) || [];

    //Formato estándar para Miembros 2 y 3
    const nuevaOperacion = {
        id: Date.now(), // Identificador único
        fecha: new Date().toLocaleDateString(),
        hora: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        tipo: tipo,
        monto: monto.toFixed(2),
        saldoResultante: nuevoSaldo.toFixed(2),
        estado: "Completado"
    };
    
    historial.push(nuevaOperacion);
    localStorage.setItem("transacciones", JSON.stringify(historial));
}

//Reglas de validación
const reglasMonto = {
    monto: {
        presence: { allowEmpty: false, message: "^El monto es requerido" },
        numericality: { greaterThan: 0, message: "^Debe ser un número mayor a $0" }
    }
};

const reglasPago = {
    nie: {
        presence: { allowEmpty: false, message: "^El NIE es requerido" },
        format: { pattern: "[0-9]+", message: "^El NIE solo debe contener números" }
    },
    monto: reglasMonto.monto
};

//Funciones de los botones

window.realizarDeposito = function() {
    let montoInput = document.getElementById("monto-deposito").value;
    let montoNum = parseFloat(montoInput);

    //Validar
    let errores = validate({ monto: montoNum }, reglasMonto);
    if (errores) {
        SwalPokemon.fire('Error', errores.monto[0], 'error');
        return;
    }

    //Ejecutar
    registrarTransaccion("Depósito", montoNum);
    SwalPokemon.fire('¡Éxito!', `Has depositado $${montoNum.toFixed(2)} correctamente.`, 'success');
    cerrarDialogo();
};

window.realizarRetiro = function() {
    let montoInput = document.getElementById("monto-retiro").value;
    let montoNum = parseFloat(montoInput);
    let saldoActual = parseFloat(localStorage.getItem("saldo"));

    //Validar
    let errores = validate({ monto: montoNum }, reglasMonto);
    if (errores) {
        SwalPokemon.fire('Error', errores.monto[0], 'error');
        return;
    }

    //Validar fondos
    if (montoNum > saldoActual) {
        SwalPokemon.fire('Fondos insuficientes', 'No tienes suficiente dinero para este retiro.', 'warning');
        return;
    }

    //Ejecutar
    registrarTransaccion("Retiro", montoNum);
    SwalPokemon.fire('¡Éxito!', `Has retirado $${montoNum.toFixed(2)}.`, 'success');
    cerrarDialogo();
};

window.realizarPago = function() {
    let nieInput = document.getElementById("nie-pago").value;
    let montoInput = document.getElementById("monto-pago").value;
    let montoNum = parseFloat(montoInput);
    let saldoActual = parseFloat(localStorage.getItem("saldo"));

    //Validar
    let errores = validate({ nie: nieInput, monto: montoNum }, reglasPago);
    if (errores) {
        let mensaje = errores.nie ? errores.nie[0] : errores.monto[0];
        SwalPokemon.fire('Error de validación', mensaje, 'error');
        return;
    }

    //Validar fondos
    if (montoNum > saldoActual) {
        SwalPokemon.fire('Fondos insuficientes', 'No tienes suficiente dinero para pagar este servicio.', 'warning');
        return;
    }

    //Ejecutar
    registrarTransaccion(`Pago Servicio (NIE: ${nieInput})`, montoNum);
    SwalPokemon.fire('¡Pagado!', `Has pagado $${montoNum.toFixed(2)} del servicio con éxito.`, 'success');
    cerrarDialogo();
};

//Borrar el historial de transacciones
window.borrarHistorial = function() {
    SwalPokemon.fire({
        title: '¿Estás seguro?',
        text: "Se eliminarán todos los registros de movimientos. (Tu saldo no se verá afectado).",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Sí, borrar historial',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            // Vaciamos el arreglo en el LocalStorage
            localStorage.setItem("transacciones", JSON.stringify([]));
            
            SwalPokemon.fire(
                'Borrado!',
                'Tu historial de transacciones ha sido limpiado.',
                'success'
            );
            
            // Volvemos a renderizar la ventana para que se vea vacía
            abrir('movimientos');
        }
    });
};