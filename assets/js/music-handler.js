// Music Handler Utility
// Shared music functionality for all games
// Requires: cookie-manager.js to be loaded before this script

/**
 * Initialize background music with volume from cookie
 * @param {string} musicFileName - The name of the music file (e.g., 'linux-install.mp3')
 * @param {string} audioElementId - The ID of the audio element (default: 'background-music')
 * @returns {HTMLAudioElement|null} - The audio element or null if not found
 */
function initGameMusic(musicFileName, audioElementId = 'background-music') {
  const music = document.getElementById(audioElementId);
  if (!music) {
    console.warn(`Audio element with ID "${audioElementId}" not found`);
    return null;
  }

  // Get volume from cookie (stored as 0..100) using cookie-manager.js
  const volumePercent = getAudioVolume();

  // Convert to 0..1 range for audio element
  music.volume = volumePercent / 100;
  music.muted = volumePercent === 0;

  // Try to play the music (with user interaction fallback)
  const playMusic = () => {
    music.play().catch(() => {
      console.log('Music autoplay blocked. Will play on user interaction.');
      // Play on first user interaction
      const playOnInteraction = () => {
        music.play().catch(e => console.log('Could not play music:', e));
        document.removeEventListener('click', playOnInteraction);
        document.removeEventListener('keydown', playOnInteraction);
      };
      document.addEventListener('click', playOnInteraction, { once: true });
      document.addEventListener('keydown', playOnInteraction, { once: true });
    });
  };

  // Start playing
  playMusic();

  // Listen for volume changes from settings
  window.addEventListener('volumechange', (e) => {
    if (e.detail && typeof e.detail.volume === 'number') {
      const vol = Math.max(0, Math.min(100, e.detail.volume));
      music.volume = vol / 100;
      music.muted = vol === 0;
    }
  });

  return music;
}

/**
 * Create and initialize a music element dynamically
 * @param {string} musicFileName - The name of the music file (e.g., 'linux-install.mp3')
 * @param {string} basePath - The base path to the music folder (default: '../../assets/music/')
 * @param {string} audioElementId - The ID for the audio element (default: 'background-music')
 * @returns {HTMLAudioElement} - The created audio element
 */
function createGameMusic(musicFileName, basePath = '../../assets/music/', audioElementId = 'background-music') {
  // Check if element already exists
  let music = document.getElementById(audioElementId);
  if (music) {
    return music;
  }

  // Create new audio element
  music = document.createElement('audio');
  music.id = audioElementId;
  music.loop = true;

  const source = document.createElement('source');
  source.src = basePath + musicFileName;
  source.type = 'audio/mpeg';

  music.appendChild(source);
  document.body.appendChild(music);

  // Initialize with volume settings
  initGameMusic(musicFileName, audioElementId);

  return music;
}

