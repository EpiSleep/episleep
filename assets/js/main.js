const settingsModal = document.querySelector('#settingsModal');
const creditsModal = document.querySelector('#creditsModal');

function setCookie(name, value, days) {
  let expires = "";
  if (days) {
    const date = new Date();
    // Calcule la date d'expiration
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    expires = "; expires=" + date.toUTCString();
  }
  // Crée la chaîne de cookie. Le "path=/" rend le cookie accessible sur tout le site.
  document.cookie = name + "=" + (value || "")  + expires + "; path=/; SameSite=Lax";
}

function launchGame(){
  setCookie('score', 0, 2);
  window.location.replace("level-select.html");
}

function bindModal(triggerSelector, modal) {
  const trigger = document.querySelector(triggerSelector);
  if (!trigger || !modal) return;

  // Helper to handle Escape key
  function handleEscape(event) {
    if (event.key === 'Escape' || event.key === 'Esc') {
      modal.classList.remove('active');
    }
  }

  function openModal() {
    modal.classList.add('active');
    document.addEventListener('keydown', handleEscape);
  }

  function closeModal() {
    modal.classList.remove('active');
    document.removeEventListener('keydown', handleEscape);
  }

  trigger.addEventListener('click', openModal);
  modal.querySelectorAll('.close-btn').forEach(btn =>
    btn.addEventListener('click', closeModal)
  );
  modal.addEventListener('click', (event) => {
    if (event.target === modal) {
      closeModal();
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  bindModal('#openSettings', settingsModal);
  bindModal('#openCredits', creditsModal);
});
