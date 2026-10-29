const formulario = document.getElementById("formulario-contacto");
const resultado = document.getElementById("resultado-formulario");

if (formulario) {
    formulario.addEventListener("submit", function (evento) {
        evento.preventDefault();

        if (!formulario.checkValidity()) {
            formulario.reportValidity();
            return;
        }

        const datos = {
            nombre: document.getElementById("nombre").value.trim(),
            correo: document.getElementById("correo").value.trim(),
            edad: document.getElementById("edad").value,
            equipo: document.getElementById("equipo").value,
            tema: document.getElementById("tema").value,
            mensaje: document.getElementById("mensaje").value.trim(),
            fecha: new Date().toLocaleString()
        };

        if (datos.nombre.length < 3 || datos.mensaje.length < 10) {
            mostrarAlerta(
                "warning",
                "Revisa tus datos",
                "El nombre debe tener al menos 3 caracteres y el mensaje al menos 10."
            );
            return;
        }

        try {
            const contactos = JSON.parse(
                localStorage.getItem("contactosF1Apex") || "[]"
            );

            if (!Array.isArray(contactos)) {
                throw new Error("Los datos guardados no tienen un formato válido.");
            }

            contactos.push(datos);

            localStorage.setItem(
                "contactosF1Apex",
                JSON.stringify(contactos)
            );

            formulario.reset();

            if (resultado) {
                resultado.textContent = "El registro se guardó en este navegador.";
            }

            mostrarAlerta(
                "success",
                "¡Formulario registrado!",
                "Gracias por compartir tu opinión sobre la Fórmula 1."
            );
        } catch (error) {
            mostrarAlerta(
                "error",
                "No se pudo guardar",
                "El navegador no permitió almacenar los datos. Comprueba que el almacenamiento local esté disponible."
            );
        }
    });

    formulario.addEventListener("reset", function () {
        if (resultado) {
            resultado.textContent = "";
        }
    });
}

function mostrarAlerta(icono, titulo, mensaje) {
    if (window.Swal) {
        Swal.fire({
            icon: icono,
            title: titulo,
            text: mensaje,
            confirmButtonColor: "#e10600",
            background: "#20242c",
            color: "#f3f4f6"
        });
    } else {
        alert(titulo + "\n\n" + mensaje);
    }
}