document.addEventListener('DOMContentLoaded', () => {
    const starsContainer = document.querySelector('.stars-container');
    const flowersContainer = document.querySelector('.flowers-container');
    const numStars = 100; // Cantidad de estrellas iniciales (estáticas)
    const numFallingStars = 30; // Cantidad de estrellas cayendo
    const numFallingFlowers = 20; // Cantidad de flores cayendo

    // Función para crear un elemento (estrella o flor)
    function createElement(type) {
        const element = document.createElement('div');
        const duration = Math.random() * 8 + 6; // Duración de caída entre 6s y 14s
        const delay = Math.random() * 5;      // Retraso inicial aleatorio hasta 5s
        const initialX = Math.random() * 100; // Posición horizontal inicial (porcentaje)

        element.style.left = `${initialX}vw`;
        element.style.animationDuration = `${duration}s`;
        element.style.animationDelay = `${delay}s`;

        if (type === 'star') {
            element.classList.add('star');
            const size = Math.random() * 2 + 1; // Tamaño entre 1px y 3px
            element.style.width = `${size}px`;
            element.style.height = `${size}px`;
            // Añadir una ligera variación horizontal para que no caigan rectas
            element.animate([
                { transform: `translateY(-5vh) translateX(0vw)` },
                { transform: `translateY(105vh) translateX(${Math.random() * 4 - 2}vw)` } // Desvío horizontal leve
            ], {
                duration: duration * 1000, // ms
                delay: delay * 1000, // ms
                iterations: Infinity,
                easing: 'linear'
            });
            starsContainer.appendChild(element);

        } else if (type === 'flower') {
            element.classList.add('flower');
            // Elige un emoji de flor aleatorio
            const flowerEmojis = ['🌸', '💮', '🌼', '🌷', '💖']; // Puedes añadir más
            element.textContent = flowerEmojis[Math.floor(Math.random() * flowerEmojis.length)];
            const size = Math.random() * 10 + 15; // Tamaño de fuente entre 15px y 25px
            element.style.fontSize = `${size}px`;
            // Añadir rotación y variación horizontal
             element.animate([
                { transform: `translateY(-5vh) translateX(0vw) rotate(0deg)` },
                { transform: `translateY(105vh) translateX(${Math.random() * 8 - 4}vw) rotate(${Math.random() * 720 - 360}deg)` } // Desvío y rotación
            ], {
                duration: duration * 1000, // ms
                delay: delay * 1000, // ms
                iterations: Infinity,
                easing: 'linear' // Puedes probar 'ease-in-out' para variedad
            });
            flowersContainer.appendChild(element);
        }

        // Eliminar el elemento del DOM después de que termine su primera animación
        // (Aunque la animación CSS sea infinita, el animate() de JS sí tiene fin)
        // Esto es opcional y ayuda a limpiar, pero puede causar "saltos" si la densidad es baja
        // setTimeout(() => {
        //     element.remove();
        //     // Opcionalmente, crear uno nuevo para reemplazarlo
        //     // createElement(type);
        // }, (duration + delay) * 1000);
    }

     // Crear estrellas y flores cayendo
     for (let i = 0; i < numFallingStars; i++) {
        createElement('star');
    }
    for (let i = 0; i < numFallingFlowers; i++) {
        createElement('flower');
    }

    // Crear algunas estrellas estáticas de fondo (opcional)
    // Podríamos añadir más complejidad aquí (twinkling) pero lo mantenemos simple
    for (let i = 0; i < numStars; i++) {
        const staticStar = document.createElement('div');
        staticStar.classList.add('star');
        staticStar.style.position = 'absolute'; // Asegurarse de que es absoluto
        staticStar.style.top = `${Math.random() * 100}%`;
        staticStar.style.left = `${Math.random() * 100}%`;
        const size = Math.random() * 1.5 + 0.5; // Más pequeñas
        staticStar.style.width = `${size}px`;
        staticStar.style.height = `${size}px`;
        staticStar.style.opacity = Math.random() * 0.5 + 0.2; // Opacidad variada
        staticStar.style.animation = 'none'; // Sin animación de caída
        starsContainer.appendChild(staticStar);
    }

    // Efecto sutil de "twinkle" para las estrellas estáticas (opcional)
    const staticStars = starsContainer.querySelectorAll('.star:not([style*="animation-duration"])'); // Selecciona solo las estáticas
    setInterval(() => {
        staticStars.forEach(star => {
            star.style.opacity = Math.random() * 0.5 + 0.3; // Cambia opacidad periódicamente
        });
    }, 1500); // Cambia cada 1.5 segundos

});