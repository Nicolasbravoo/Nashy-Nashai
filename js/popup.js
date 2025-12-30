const popup = document.getElementById("albumPopup");
const closeBtn = document.getElementById("closePopup");

if (localStorage.getItem("popupSeen")) {
  popup.style.display = "none";
}

closeBtn.addEventListener("click", () => {
  popup.style.display = "none";
  localStorage.setItem("popupSeen", "true");
});
