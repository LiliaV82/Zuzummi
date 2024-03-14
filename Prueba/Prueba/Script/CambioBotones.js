document.addEventListener("DOMContentLoaded", () => {
    const mainContent = document.querySelector("#main-content");
    const navigationLinks = document.querySelectorAll('.nav-item.nav-link');
    const botonSalir = document.getElementById("logoutButton");
    const confirmacionSalir = document.getElementById("confirmacion-salir");
    const confirmarSalir = document.getElementById("confirmar-salir");
    const cancelarSalir = document.getElementById("cancelar-salir");

    // Variable para controlar si el modal de confirmación está activo
    let modalActivo = false;

    navigationLinks.forEach(enlace => {
        enlace.addEventListener('click', function(event) {
            if (!modalActivo) {
                event.preventDefault();
                navigationLinks.forEach(link => link.classList.remove('active'));
                this.classList.add('active');
                const url = this.getAttribute('data-link');
                cargarContenido(url);
            }
        });
    });

    // Función para cargar contenido dinámicamente
    function cargarContenido(url) {
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.text();
            })
            .then(html => {
                const parser = new DOMParser();
                const doc = parser.parseFromString(html, 'text/html');
                mainContent.innerHTML = doc.querySelector("main").innerHTML;
            })
            .catch(error => {
                mainContent.innerHTML = `<p>Error al cargar el contenido: ${error}</p>`;
            });
    }

    // Mostrar el modal de confirmación al hacer clic en el botón "Salir"
    botonSalir.addEventListener("click", () => {
        confirmacionSalir.classList.remove("modal-oculto");
        modalActivo = true;
        // Deshabilitar eventos de clic en los botones de navegación
        navigationLinks.forEach(enlace => enlace.style.pointerEvents = "none");
    });

    // Ocultar el modal de confirmación al hacer clic en "Cancelar"
    cancelarSalir.addEventListener("click", () => {
        confirmacionSalir.classList.add("modal-oculto");
        modalActivo = false;
        // Habilitar eventos de clic en los botones de navegación
        navigationLinks.forEach(enlace => enlace.style.pointerEvents = "auto");
    });

    // Evento para cerrar la sesión al confirmar
    confirmarSalir.addEventListener("click", () => {
        console.log("Sesión cerrada");
        // Agrega aquí la lógica para cerrar la sesión
        // Después de cerrar la sesión, puedes redirigir al usuario a la página de inicio de sesión u otra página
        //confirmacionSalir.classList.add("modal-oculto");
        //modalActivo = false;
        // Habilitar eventos de clic en los botones de navegación
        //navigationLinks.forEach(enlace => enlace.style.pointerEvents = "auto");
        window.location.href = "Index.html";

    });
});
