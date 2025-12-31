// main.js - Código completo para navegación y funcionalidades

// ============================================
// NAVEGACIÓN MOBILE - MENÚ HAMBURGUESA
// ============================================

const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

// Abrir/Cerrar menú mobile
if (navToggle) {
  navToggle.addEventListener('click', function() {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
    
    // Prevenir scroll cuando el menú está abierto
    if (navMenu.classList.contains('active')) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  });
}

// Cerrar menú al hacer click en un link
navLinks.forEach(link => {
  link.addEventListener('click', function() {
    navMenu.classList.remove('active');
    navToggle.classList.remove('active');
    document.body.style.overflow = '';
  });
});

// Cerrar menú al hacer click fuera
document.addEventListener('click', function(event) {
  const isClickInsideNav = navMenu.contains(event.target);
  const isClickOnToggle = navToggle.contains(event.target);
  
  if (!isClickInsideNav && !isClickOnToggle && navMenu.classList.contains('active')) {
    navMenu.classList.remove('active');
    navToggle.classList.remove('active');
    document.body.style.overflow = '';
  }
});

// ============================================
// SCROLL SUAVE PARA ANCLAS
// ============================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    
    // Si es solo "#" o vacío, no hacer nada
    if (href === '#' || href === '') {
      e.preventDefault();
      return;
    }
    
    const targetId = href.substring(1);
    const targetElement = document.getElementById(targetId);
    
    if (targetElement) {
      e.preventDefault();
      
      // Offset para el navbar fijo
      const navbarHeight = document.querySelector('.navbar').offsetHeight;
      const targetPosition = targetElement.offsetTop - navbarHeight;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// ============================================
// NAVBAR TRANSPARENTE AL HACER SCROLL
// ============================================

const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', function() {
  const currentScroll = window.pageYOffset;
  
  // Agregar fondo sólido al hacer scroll
  if (currentScroll > 100) {
    navbar.style.background = 'rgba(10, 10, 10, 0.98)';
  } else {
    navbar.style.background = 'rgba(10, 10, 10, 0.95)';
  }
  
  lastScroll = currentScroll;
});

// ============================================
// VIDEO BACKGROUND - AUTO PLAY
// ============================================

const bgVideo = document.getElementById('bgVideo');

if (bgVideo) {
  // Asegurar que el video se reproduce en mobile
  bgVideo.play().catch(function(error) {
    console.log('Video autoplay bloqueado:', error);
  });
  
  // Reintentar reproducir el video si se pausa
  bgVideo.addEventListener('pause', function() {
    bgVideo.play().catch(function(error) {
      console.log('No se pudo reproducir el video:', error);
    });
  });
}

// ============================================
// ANIMACIONES AL HACER SCROLL
// ============================================

const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Observar todas las secciones
const sections = document.querySelectorAll('.section');
sections.forEach(section => {
  section.style.opacity = '0';
  section.style.transform = 'translateY(30px)';
  section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(section);
});

// ============================================
// PREVENIR ZOOM EN INPUTS (MOBILE)
// ============================================

document.addEventListener('touchstart', function(event) {
  if (event.touches.length > 1) {
    event.preventDefault();
  }
}, { passive: false });

// ============================================
// OPTIMIZACIÓN DE PERFORMANCE
// ============================================

// Lazy loading para imágenes
if ('loading' in HTMLImageElement.prototype) {
  const images = document.querySelectorAll('img[loading="lazy"]');
  images.forEach(img => {
    img.src = img.dataset.src;
  });
} else {
  // Fallback para navegadores que no soportan lazy loading
  const script = document.createElement('script');
  script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
  document.body.appendChild(script);
}

// ============================================
// ANIMACIÓN DE MÉTRICAS CON CONTADOR
// ============================================

function animateMetrics() {
  const metrics = document.querySelectorAll('.metric-value');
  
  metrics.forEach((metric, index) => {
    const finalValue = metric.textContent.trim();
    
    // Solo animar si tiene números
    if (finalValue.match(/\d/)) {
      // Extraer el número y el sufijo (M, K, etc)
      const matches = finalValue.match(/^([\d.]+)([MK]?)$/);
      
      if (matches) {
        const number = parseFloat(matches[1]);
        const suffix = matches[2] || '';
        
        // Limpiar el contenido inicial
        metric.textContent = '0' + suffix;
        metric.style.opacity = '0.5';
        
        // Delay escalonado para cada métrica
        setTimeout(() => {
          let currentValue = 0;
          const increment = number / 50; // 50 frames de animación
          const duration = 2000; // 2 segundos
          const frameTime = duration / 50;
          
          const counter = setInterval(() => {
            currentValue += increment;
            
            if (currentValue >= number) {
              metric.textContent = finalValue;
              metric.style.opacity = '1';
              clearInterval(counter);
            } else {
              // Formatear el número con decimales si es necesario
              const displayValue = number >= 10 
                ? Math.floor(currentValue) 
                : currentValue.toFixed(1);
              metric.textContent = displayValue + suffix;
              metric.style.opacity = '0.8';
            }
          }, frameTime);
        }, index * 300); // Delay de 300ms entre cada métrica
      }
    }
  });
}

// Ejecutar animación cuando la sección sea visible
const heroSection = document.querySelector('.hero');
if (heroSection) {
  const metricsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Pequeño delay antes de iniciar
        setTimeout(() => {
          animateMetrics();
        }, 800);
        metricsObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });
  
  metricsObserver.observe(heroSection);
}

// ============================================
// EFECTO DE "CARGANDO DATOS" EN MÉTRICAS
// ============================================

function showLoadingEffect() {
  const metricLabels = document.querySelectorAll('.metric-label');
  
  metricLabels.forEach((label, index) => {
    setTimeout(() => {
      // Efecto de typing
      const originalText = label.textContent;
      label.textContent = '';
      label.style.opacity = '0.6';
      
      let charIndex = 0;
      const typingInterval = setInterval(() => {
        if (charIndex < originalText.length) {
          label.textContent += originalText[charIndex];
          charIndex++;
        } else {
          clearInterval(typingInterval);
          label.style.opacity = '1';
        }
      }, 50);
    }, index * 400);
  });
}

// Ejecutar efecto de carga
if (heroSection) {
  setTimeout(() => {
    showLoadingEffect();
  }, 500);
}

// ============================================
// HERO TITLE - EFECTOS INTERACTIVOS
// ============================================

const heroTitle = document.getElementById('heroTitle');
const titleLetters = document.querySelectorAll('.title-letter');

if (heroTitle && titleLetters.length > 0) {
  
  // Efecto de onda al hacer hover
  titleLetters.forEach((letter, index) => {
    letter.addEventListener('mouseenter', function() {
      // Activar onda en letras adyacentes
      titleLetters.forEach((l, i) => {
        const distance = Math.abs(i - index);
        if (distance <= 2) {
          setTimeout(() => {
            l.classList.add('wave');
            setTimeout(() => l.classList.remove('wave'), 600);
          }, distance * 50);
        }
      });
    });
  });
  
  // Efecto parallax con el mouse
  heroTitle.addEventListener('mousemove', function(e) {
    const rect = heroTitle.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const percentX = (x - centerX) / centerX;
    const percentY = (y - centerY) / centerY;
    
    titleLetters.forEach((letter, index) => {
      const offset = (index - titleLetters.length / 2) * 2;
      const moveX = percentX * (10 + offset);
      const moveY = percentY * (10 + offset);
      
      letter.style.transform = `translate(${moveX}px, ${moveY}px)`;
    });
  });
  
  // Resetear posición al salir
  heroTitle.addEventListener('mouseleave', function() {
    titleLetters.forEach(letter => {
      letter.style.transform = 'translate(0, 0)';
    });
  });
  
  // Efecto de glitch aleatorio cada 8 segundos
  setInterval(() => {
    if (Math.random() > 0.7) { // 30% de probabilidad
      const randomLetter = titleLetters[Math.floor(Math.random() * titleLetters.length)];
      randomLetter.style.animation = 'glitch 0.3s ease';
      setTimeout(() => {
        randomLetter.style.animation = '';
      }, 300);
    }
  }, 8000);
  
  // Efecto parallax con scroll
  window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const heroSection = document.querySelector('.hero');
    
    if (heroSection) {
      const heroHeight = heroSection.offsetHeight;
      if (scrolled < heroHeight) {
        const parallaxSpeed = scrolled * 0.3;
        heroTitle.style.transform = `translateY(${parallaxSpeed}px) scale(${1 - scrolled / heroHeight * 0.2})`;
        heroTitle.style.opacity = 1 - (scrolled / heroHeight) * 0.8;
      }
    }
  });
}

// ============================================
// HERO SUBTITLE - EFECTO TYPING
// ============================================

const heroSubtitle = document.querySelector('.hero-subtitle');

if (heroSubtitle) {
  const originalText = heroSubtitle.textContent;
  heroSubtitle.textContent = '';
  heroSubtitle.style.opacity = '1';
  
  let charIndex = 0;
  
  setTimeout(() => {
    const typingInterval = setInterval(() => {
      if (charIndex < originalText.length) {
        heroSubtitle.textContent += originalText[charIndex];
        charIndex++;
      } else {
        clearInterval(typingInterval);
        // Efecto de cursor parpadeante
        heroSubtitle.style.borderRight = '2px solid var(--text-secondary)';
        setTimeout(() => {
          heroSubtitle.style.borderRight = 'none';
        }, 3000);
      }
    }, 80);
  }, 1500); // Espera a que termine la animación del título
}

console.log('✅ Navegación mobile y animaciones inicializadas correctamente');