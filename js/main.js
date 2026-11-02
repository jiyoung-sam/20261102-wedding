// 사진을 누르면 화면 위에 크게 보여주는 라이트박스 기능
const lightbox = document.querySelector("#lightbox");
const lightboxImage = document.querySelector("#lightbox-image");

document.querySelectorAll(".photo-open").forEach((photo) => {
  photo.addEventListener("click", () => {
    lightboxImage.src = photo.src;
    lightboxImage.alt = photo.alt;
    lightbox.classList.add("is-open");
    lightbox.setAttribute("aria-hidden", "false");
  });
});

function closeLightbox() {
  lightbox.classList.remove("is-open");
  lightbox.setAttribute("aria-hidden", "true");
}
lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox || event.target.classList.contains("modal-close")) {
    closeLightbox();
  }
});

// 계좌번호 복사 후 별도의 안내 팝업을 표시합니다.
const toastModal = document.querySelector("#toast-modal");
const toastMessage = document.querySelector("#toast-message");

document.querySelectorAll(".copy-btn").forEach((button) => {
  button.addEventListener("click", async () => {
    const accountNumber = button.dataset.copy;
    try {
      await navigator.clipboard.writeText(accountNumber);
      toastMessage.textContent = `${accountNumber} 계좌번호를 복사했습니다.`;
    } catch (error) {
      // 로컬 파일 등에서 클립보드 권한이 제한될 경우 번호를 직접 안내합니다.
      toastMessage.textContent = `복사 기능을 사용할 수 없습니다. 계좌번호: ${accountNumber}`;
    }
    toastModal.classList.add("is-open");
    toastModal.setAttribute("aria-hidden", "false");
  });
});

function closeToast() {
  toastModal.classList.remove("is-open");
  toastModal.setAttribute("aria-hidden", "true");
}
document.querySelector("#toast-close").addEventListener("click", closeToast);
toastModal.addEventListener("click", (event) => {
  if (event.target === toastModal) closeToast();
});

// ESC 키로 열려 있는 팝업을 닫습니다.
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeLightbox();
    closeToast();
  }
});