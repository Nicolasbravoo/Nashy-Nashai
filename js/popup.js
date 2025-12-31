// popup.js - Código completo con todos los eventos funcionando

const popup = document.getElementById("albumModal");
const closeBtn = document.getElementById("closeModal");
const backdrop = document.querySelector(".modal-backdrop");

// Función para mostrar el popup
function showPopup() {
  setTimeout(() => {
    popup.style.display = "block";
    setTimeout(() => {
      popup.classList.add("active");
    }, 10);
  }, 500);
}

// Función para cerrar el popup
function closePopup() {
  popup.classList.remove("active");
  setTimeout(() => {
    popup.style.display = "none";
  }, 300);
}

// Mostrar el popup al cargar la página
showPopup();

// Cerrar con el botón X
if (closeBtn) {
  closeBtn.addEventListener("click", function(e) {
    e.preventDefault();
    closePopup();
  });
}

// Cerrar al hacer click en el backdrop
if (backdrop) {
  backdrop.addEventListener("click", function(e) {
    e.preventDefault();
    closePopup();
  });
}

// Cerrar con la tecla ESC
document.addEventListener("keydown", function(e) {
  if (e.key === "Escape" && popup.style.display === "block") {
    closePopup();
  }
});