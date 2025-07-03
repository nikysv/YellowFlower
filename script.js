// Funciones de navegación entre páginas
function goToFlowers() {
  window.location.href = "flores.html";
}

function goToMessage() {
  window.location.href = "mensaje.html";
}

function goHome() {
  window.location.href = "index.html";
}

// Función para efecto de escritura en la página de inicio
function typeWriterWelcome() {
  const message = "Tengo un regalo especial para ti";
  const element = document.getElementById("welcome-typewriter");
  if (!element) return;

  let charIndex = 0;

  // Agregar cursor parpadeante
  element.innerHTML = '<span class="typewriter-cursor">|</span>';

  function type() {
    if (charIndex < message.length) {
      // Quitar cursor, agregar letra, volver a agregar cursor
      element.innerHTML =
        message.substring(0, charIndex + 1) +
        '<span class="typewriter-cursor">|</span>';
      charIndex++;
      setTimeout(type, 100); // 100ms entre cada letra
    } else {
      // Después de terminar, quitar el cursor después de un tiempo
      setTimeout(() => {
        element.innerHTML = message;
      }, 1000);
    }
  }

  // Pequeña pausa antes de comenzar
  setTimeout(type, 800);
}

// Función para efecto de escritura en el mensaje
function typeWriter() {
  const messages = [
    "Espero que cada vez que veas una flor amarilla, recuerdes lo especial que eres para mí.",
    "Que este pequeño detalle llene tu día de la misma felicidad que tú traes al mío.",
  ];

  const element = document.getElementById("typed-message");
  if (!element) return;

  let messageIndex = 0;
  let charIndex = 0;

  function type() {
    if (messageIndex < messages.length) {
      if (charIndex < messages[messageIndex].length) {
        element.innerHTML += messages[messageIndex].charAt(charIndex);
        charIndex++;
        setTimeout(type, 50);
      } else {
        element.innerHTML += "<br><br>";
        messageIndex++;
        charIndex = 0;
        setTimeout(type, 800);
      }
    }
  }

  type();
}

// Función para crear efectos de partículas adicionales
function createFloatingElements() {
  const container = document.querySelector(
    ".welcome-container, .flowers-container, .message-page"
  );
  if (!container) return;

  for (let i = 0; i < 10; i++) {
    const particle = document.createElement("div");
    particle.className = "floating-particle";
    particle.innerHTML = ["✨", "💛", "🌟", "💫"][
      Math.floor(Math.random() * 4)
    ];
    particle.style.position = "absolute";
    particle.style.fontSize = "1rem";
    particle.style.opacity = "0.6";
    particle.style.pointerEvents = "none";
    particle.style.left = Math.random() * 100 + "%";
    particle.style.animationDelay = Math.random() * 5 + "s";
    particle.style.animation = "float 6s ease-in-out infinite";

    container.appendChild(particle);

    // Remover después de la animación
    setTimeout(() => {
      if (particle.parentNode) {
        particle.parentNode.removeChild(particle);
      }
    }, 6000);
  }
}

// Función para añadir efectos de hover a las flores
function addFlowerEffects() {
  const flowers = document.querySelectorAll(".flower");

  flowers.forEach((flower, index) => {
    flower.addEventListener("mouseenter", function () {
      this.style.transform = "scale(1.15)";
      this.style.transition = "transform 0.4s ease";
      this.style.zIndex = "10";

      // Crear múltiples efectos de brillo
      for (let i = 0; i < 3; i++) {
        setTimeout(() => {
          const sparkle = document.createElement("div");
          sparkle.innerHTML = ["✨", "💫", "⭐", "🌟"][
            Math.floor(Math.random() * 4)
          ];
          sparkle.style.position = "absolute";
          sparkle.style.top = -30 + Math.random() * 60 + "px";
          sparkle.style.left = 50 + Math.random() * 40 - 20 + "%";
          sparkle.style.transform = "translateX(-50%)";
          sparkle.style.fontSize = 1.2 + Math.random() * 0.8 + "rem";
          sparkle.style.animation = "sparkleOnFlower 1.5s ease-out forwards";
          sparkle.style.pointerEvents = "none";
          sparkle.style.zIndex = "20";

          this.appendChild(sparkle);

          setTimeout(() => {
            if (sparkle.parentNode) {
              sparkle.parentNode.removeChild(sparkle);
            }
          }, 1500);
        }, i * 200);
      }

      // Efecto de ondas en los pétalos
      const petals = this.querySelectorAll(".petal");
      petals.forEach((petal, i) => {
        setTimeout(() => {
          petal.style.animation = "petalBreathe 0.8s ease-in-out";
        }, i * 100);
      });
    });

    flower.addEventListener("mouseleave", function () {
      this.style.transform = "scale(1)";
      this.style.zIndex = "1";

      // Restaurar animación normal de pétalos
      const petals = this.querySelectorAll(".petal");
      petals.forEach((petal, i) => {
        petal.style.animation = `petalBreathe 4s ease-in-out infinite ${
          i * 0.5
        }s`;
      });
    });

    // Efecto de clic para hacer "florecer" más
    flower.addEventListener("click", function () {
      this.style.animation = "none";
      setTimeout(() => {
        this.style.animation = "growFlowerFromGround 1s ease-out";
      }, 10);

      // Crear lluvia de pétalos
      createPetalShower(this);
    });
  });
}

// Nueva función para crear lluvia de pétalos cuando se hace clic
function createPetalShower(flower) {
  const rect = flower.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;

  for (let i = 0; i < 8; i++) {
    const petal = document.createElement("div");
    petal.innerHTML = "🌼";
    petal.style.position = "fixed";
    petal.style.left = centerX + "px";
    petal.style.top = centerY + "px";
    petal.style.fontSize = "1.5rem";
    petal.style.pointerEvents = "none";
    petal.style.zIndex = "1000";
    petal.style.animation = `petalExplosion 2s ease-out forwards`;
    petal.style.transform = `rotate(${i * 45}deg)`;

    document.body.appendChild(petal);

    setTimeout(() => {
      if (petal.parentNode) {
        petal.parentNode.removeChild(petal);
      }
    }, 2000);
  }
}

// Función para añadir estilo de brillo (sparkle)
function addSparkleStyle() {
  const style = document.createElement("style");
  style.textContent = `
        @keyframes sparkle {
            0% {
                opacity: 0;
                transform: translateX(-50%) translateY(0) scale(0);
            }
            50% {
                opacity: 1;
                transform: translateX(-50%) translateY(-10px) scale(1);
            }
            100% {
                opacity: 0;
                transform: translateX(-50%) translateY(-20px) scale(0);
            }
        }
        
        @keyframes petalExplosion {
            0% {
                opacity: 1;
                transform: translate(-50%, -50%) scale(1) rotate(0deg);
            }
            100% {
                opacity: 0;
                transform: translate(-50%, -50%) translateX(${
                  Math.random() * 200 - 100
                }px) 
                          translateY(${
                            Math.random() * 200 - 100
                          }px) scale(0.3) rotate(720deg);
            }
        }
    `;
  document.head.appendChild(style);
}

// Función para reproducir música suave (opcional)
function playBackgroundMusic() {
  // Esta función puede ser expandida para incluir música de fondo
  // Por ahora solo añade efectos de sonido en los clics
  const buttons = document.querySelectorAll("button");

  buttons.forEach((button) => {
    button.addEventListener("click", function () {
      // Efecto visual en el clic
      this.style.transform = "scale(0.95)";
      setTimeout(() => {
        this.style.transform = "";
      }, 150);
    });
  });
}

// Función para crear corazones flotantes aleatorios
function createRandomHearts() {
  const body = document.body;

  setInterval(() => {
    const heart = document.createElement("div");
    heart.innerHTML = ["💛", "💕", "🌻", "✨"][Math.floor(Math.random() * 4)];
    heart.style.position = "fixed";
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.top = "100vh";
    heart.style.fontSize = "1.5rem";
    heart.style.pointerEvents = "none";
    heart.style.zIndex = "1000";
    heart.style.animation = "floatUp 4s linear forwards";

    body.appendChild(heart);

    setTimeout(() => {
      if (heart.parentNode) {
        heart.parentNode.removeChild(heart);
      }
    }, 4000);
  }, 3000);
}

// Añadir estilo para la animación floatUp
function addFloatUpStyle() {
  const style = document.createElement("style");
  style.textContent = `
        @keyframes floatUp {
            0% {
                transform: translateY(0) rotate(0deg);
                opacity: 1;
            }
            100% {
                transform: translateY(-100vh) rotate(360deg);
                opacity: 0;
            }
        }
    `;
  document.head.appendChild(style);
}

// Inicialización cuando la página carga
document.addEventListener("DOMContentLoaded", function () {
  // Añadir estilos adicionales
  addSparkleStyle();
  addFloatUpStyle();

  // Inicializar efectos según la página actual
  const currentPage = window.location.pathname.split("/").pop();

  switch (currentPage) {
    case "index.html":
    case "":
      typeWriterWelcome();
      createFloatingElements();
      playBackgroundMusic();
      break;

    case "flores.html":
      addFlowerEffects();
      createFloatingElements();
      playBackgroundMusic();
      createRandomHearts();
      break;

    case "mensaje.html":
      typeWriter();
      createFloatingElements();
      playBackgroundMusic();
      break;
  }
});

// Función para precargar las páginas para una navegación más suave
function preloadPages() {
  const pages = ["flores.html", "mensaje.html", "index.html"];

  pages.forEach((page) => {
    const link = document.createElement("link");
    link.rel = "prefetch";
    link.href = page;
    document.head.appendChild(link);
  });
}

// Llamar a precargar páginas
preloadPages();

// Funciones adicionales para mejorar la experiencia
window.addEventListener("beforeunload", function () {
  // Pequeña pausa para efectos de transición
  document.body.style.opacity = "0";
});

// Efecto de aparición suave al cargar
window.addEventListener("load", function () {
  document.body.style.transition = "opacity 0.5s ease-in";
  document.body.style.opacity = "1";
});
