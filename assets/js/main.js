const settingsModal = document.querySelector('#settingsModal');
const creditsModal = document.querySelector('#creditsModal');

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
