document.addEventListener("DOMContentLoaded", () => {
    const cloud = document.getElementById("cloud");
    const barraLateral = document.querySelector(".barra-lateral");
    const spans = document.querySelectorAll(".barra-lateral span");
    const palanca = document.querySelector(".switch");
    const circulo = document.querySelector(".circulo");
    const menu = document.querySelector(".menu");
    const mainContent = document.querySelector("main");
    const navigationLinks = document.querySelectorAll('.navegacion a');

    // Alternar barra lateral
    menu.addEventListener("click", () => {
        barraLateral.classList.toggle("max-barra-lateral");
        menu.children[0].style.display = barraLateral.classList.contains("max-barra-lateral") ? "none" : "block";
        menu.children[1].style.display = barraLateral.classList.contains("max-barra-lateral") ? "block" : "none";
    });

    // Modo oscuro
    palanca.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
        circulo.classList.toggle("prendido");
    });

    // Reducir barra lateral
    cloud.addEventListener("click", () => {
        barraLateral.classList.toggle("mini-barra-lateral");
        mainContent.classList.toggle("min-main");
        spans.forEach(span => span.classList.toggle("oculto"));
    });

    // Manejo de clics en los enlaces de navegación para cargar contenido
    navigationLinks.forEach(enlace => {
        enlace.addEventListener('click', function(event) {
            event.preventDefault();
            const url = this.getAttribute('data-link');
            
            // Elimina la clase activa de todos los enlaces y la añade al que se le dio clic
            navigationLinks.forEach(link => link.classList.remove('active'));
            this.classList.add('active');

            cargarContenido(url);
        });
    });

    // Función para cargar contenido en el elemento <main>
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
                // Si hay scripts o inicializaciones, los ejecutaría aquí.
            })
            .catch(error => {
                mainContent.innerHTML = `<p>Error al cargar el contenido: ${error.message}</p>`;
            });
    }
});
