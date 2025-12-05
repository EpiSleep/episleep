document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialisation des Modales (Settings & Credits)
  setupModal('#openSettings', '#settingsModal');
  setupModal('#openCredits', '#creditsModal');

  // 2. Initialisation du Volume
  initAudioSetting();
});

function launchGame(){
  // Cookies are already initialized by cookie-manager.js
  // Just navigate to level select
  window.location.replace("level-select.html");
}

// --- FONCTION PROPRE POUR GÉRER LES MODALES ---
function setupModal(buttonId, modalId) {
  const trigger = document.querySelector(buttonId);
  const modal = document.querySelector(modalId);

  if (!trigger || !modal) return;

  // Ouvrir
  trigger.addEventListener('click', () => {
    modal.classList.add('active');
  });

  // Fermer (Bouton Croix)
  modal.querySelectorAll('.close-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      modal.classList.remove('active');
    });
  });

  // Fermer (Clic sur le fond gris)
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('active');
    }
  });

  // Fermer (Touche Echap)
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      modal.classList.remove('active');
    }
  });
}

// --- GESTION DU VOLUME (using cookie-manager.js) ---
function initAudioSetting() {
  const slider = document.querySelector('#audio');
  if (!slider) return;

  const initial = getAudioVolume();
  slider.value = initial;

  applyVolumeToAll(initial / 100);

  slider.addEventListener('input', (e) => {
    const v = Number(e.target.value);
    setAudioVolume(v);
    applyVolumeToAll(v / 100);
  });
}

function applyVolumeToAll(volume) {
  document.querySelectorAll('audio,video').forEach(el => {
    el.volume = Math.max(0, Math.min(1, volume));
    el.muted = (volume === 0);
  });
}