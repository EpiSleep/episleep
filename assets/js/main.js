document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialisation des Modales (Settings & Credits)
  setupModal('#openSettings', '#settingsModal');
  setupModal('#openCredits', '#creditsModal');

  // 2. Initialisation du Volume
  initAudioSetting();
});

function launchGame(){
  setCookie('score', 0, 2);
  setCookie('woman', 0, 2);
  setCookie('decat', 0, 2);
  setCookie('cve', 0, 2);
  setCookie('ergo', 0, 2);
  setCookie('linux', 0, 2);
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

// --- GESTION DES COOKIES ET VOLUME (VOTRE CODE D'ORIGINE) ---
function setCookie(name, value, days) {
  let expires = "";
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "")  + expires + "; path=/; SameSite=Lax";
}

function getCookie(name) {
  const nameEQ = name + "=";
  const ca = document.cookie.split(';');
  for(let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}

function initAudioSetting() {
  const slider = document.querySelector('#audio');
  if (!slider) return;

  const cookieVal = getCookie('audioVolume');
  let initial = cookieVal !== null ? Number(cookieVal) : Number(slider.value || 80);
  if (isNaN(initial)) initial = 80;
  initial = Math.max(0, Math.min(100, initial));
  slider.value = initial;

  applyVolumeToAll(initial / 100);

  slider.addEventListener('input', (e) => {
    const v = Number(e.target.value);
    setCookie('audioVolume', String(v), 365);
    applyVolumeToAll(v / 100);
  });
}

function applyVolumeToAll(volume) {
  document.querySelectorAll('audio,video').forEach(el => {
    el.volume = Math.max(0, Math.min(1, volume));
    el.muted = (volume === 0);
  });
}