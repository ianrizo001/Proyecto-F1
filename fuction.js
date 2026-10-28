
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
            if (window.Swal) {
                Swal.fire({
                    icon: "warning",
                    title: "Revisa tus datos",
                    text: "El nombre debe tener al menos 3 caracteres y la opinión al menos 10."
                });
            } else {
                alert("El nombre debe tener al menos 3 caracteres y la opinión al menos 10.");
            }
            return;
        }

        try {
            const contactos = JSON.parse(
                localStorage.getItem("contactosF1Apex") || "[]"
            );

            contactos.push(datos);
            localStorage.setItem("contactosF1Apex", JSON.stringify(contactos));

            if (window.Swal) {
                Swal.fire({
                    icon: "success",
                    title: "¡Formulario registrado!",
                    text: "Gracias por compartir tu opinión sobre la Fórmula 1."
                });
            } else {
                alert("¡Formulario registrado correctamente!");
            }

            formulario.reset();

            if (resultado) {
                resultado.textContent = "El registro se guardó en este navegador.";
            }
        } catch (error) {
            if (window.Swal) {
                Swal.fire({
                    icon: "error",
                    title: "No se pudo guardar",
                    text: "El navegador no permitió almacenar los datos."
                });
            } else {
                alert("No se pudieron guardar los datos en este navegador.");
            }
        }
    });

    formulario.addEventListener("reset", function () {
        if (resultado) {
            resultado.textContent = "";
        }
    });
}
