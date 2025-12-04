const settingsModal = document.querySelector('#settingsModal');
const creditsModal = document.querySelector('#creditsModal');

function bindModal(triggerSelector, modal) {
  const trigger = document.querySelector(triggerSelector);
  if (!trigger || !modal) return;

  trigger.addEventListener('click', () => modal.classList.add('active'));
  modal.querySelectorAll('.close-btn').forEach(btn =>
    btn.addEventListener('click', () => modal.classList.remove('active'))
  );
  modal.addEventListener('click', (event) => {
    if (event.target === modal) {
      modal.classList.remove('active');
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  bindModal('#openSettings', settingsModal);
  bindModal('#openCredits', creditsModal);
});
