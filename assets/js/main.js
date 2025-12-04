const settingsModal = document.querySelector('#settingsModal');
const creditsModal = document.querySelector('#creditsModal');

// Cookie helpers for persisting simple settings
function setCookie(name, value, days) {
  const d = new Date();
  d.setTime(d.getTime() + (days || 365) * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${encodeURIComponent(value)};path=/;expires=${d.toUTCString()};SameSite=Lax`;
}

function getCookie(name) {
  const match = document.cookie.split('; ').find(row => row.startsWith(name + '='));
  return match ? decodeURIComponent(match.split('=')[1]) : null;
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

// Apply volume (0..1) to a media element safely
function applyVolumeToElement(el, volume) {
  try {
    // ensure volume is between 0 and 1
    const v = Math.max(0, Math.min(1, Number(volume) || 0));
    el.volume = v;
    // reflect mute state so volume=0 behaves as mute
    el.muted = v === 0;
  } catch (e) {
    // ignore elements that don't support volume
  }
}

function applyVolumeToAll(volume) {
  document.querySelectorAll('audio,video').forEach(el => applyVolumeToElement(el, volume));
}

function initAudioSetting() {
  const slider = document.querySelector('#audio');
  if (!slider) return;

  // Stored as 0..100 for user-friendly slider; convert to 0..1 for media
  const cookieVal = getCookie('audioVolume');
  let initial = cookieVal !== null ? Number(cookieVal) : Number(slider.value || 80);
  if (isNaN(initial)) initial = 80;
  // clamp
  initial = Math.max(0, Math.min(100, initial));
  slider.value = initial;

  applyVolumeToAll(initial / 100);

  // Debounced save to cookie
  let saveTimer = null;
  slider.addEventListener('input', (e) => {
    const v = Number(e.target.value);
    const clamped = Math.max(0, Math.min(100, v));
    const norm = clamped / 100;
    applyVolumeToAll(norm);

    if (saveTimer) clearTimeout(saveTimer);
    saveTimer = setTimeout(() => {
      setCookie('audioVolume', String(clamped), 365);
      saveTimer = null;
    }, 150);
  });

  // Ensure dynamically added media elements receive the current volume
  const observer = new MutationObserver(mutations => {
    mutations.forEach(m => {
      m.addedNodes && m.addedNodes.forEach(node => {
        if (node.nodeType !== 1) return;
        const currentNorm = (Number(slider.value) || 80) / 100;
        if (node.matches && (node.matches('audio,video'))) {
          applyVolumeToElement(node, currentNorm);
        } else if (node.querySelectorAll) {
          node.querySelectorAll('audio,video').forEach(el => applyVolumeToElement(el, currentNorm));
        }
      });
    });
  });

  observer.observe(document.body, { childList: true, subtree: true });
}

document.addEventListener('DOMContentLoaded', () => {
  bindModal('#openSettings', settingsModal);
  bindModal('#openCredits', creditsModal);
  initAudioSetting();
});
