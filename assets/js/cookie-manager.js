// Cookie Manager - Centralized cookie management for the game
// This module handles all cookie operations and game progress tracking

/**
 * Cookie utility functions
 */
function setCookie(name, value, days) {
  let expires = "";
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/; SameSite=Lax";
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

/**
 * Game progress constants
 */
const GAME_COOKIES = {
  SCORE: 'score',
  WOMAN: 'woman',
  DECATHLON: 'decat',
  CVE: 'cve',
  ERGONOMICS: 'ergo',
  LINUX: 'linux',
  AUDIO_VOLUME: 'audioVolume'
};

/**
 * Game ID to cookie constant mapping
 * Maps game IDs (used in function calls) to GAME_COOKIES keys
 */
const GAME_ID_MAP = {
  'woman': 'WOMAN',
  'decat': 'DECATHLON',
  'cve': 'CVE',
  'ergo': 'ERGONOMICS',
  'linux': 'LINUX'
};

const COOKIE_EXPIRY_DAYS = 365;

/**
 * Initialize game cookies if they don't exist
 * This should be called on page load, not when starting the game
 */
function initializeGameCookies() {
  // Only initialize if cookies don't exist
  if (getCookie(GAME_COOKIES.SCORE) === null) {
    setCookie(GAME_COOKIES.SCORE, '0', COOKIE_EXPIRY_DAYS);
  }
  if (getCookie(GAME_COOKIES.WOMAN) === null) {
    setCookie(GAME_COOKIES.WOMAN, '0', COOKIE_EXPIRY_DAYS);
  }
  if (getCookie(GAME_COOKIES.DECATHLON) === null) {
    setCookie(GAME_COOKIES.DECATHLON, '0', COOKIE_EXPIRY_DAYS);
  }
  if (getCookie(GAME_COOKIES.CVE) === null) {
    setCookie(GAME_COOKIES.CVE, '0', COOKIE_EXPIRY_DAYS);
  }
  if (getCookie(GAME_COOKIES.ERGONOMICS) === null) {
    setCookie(GAME_COOKIES.ERGONOMICS, '0', COOKIE_EXPIRY_DAYS);
  }
  if (getCookie(GAME_COOKIES.LINUX) === null) {
    setCookie(GAME_COOKIES.LINUX, '0', COOKIE_EXPIRY_DAYS);
  }
  if (getCookie(GAME_COOKIES.AUDIO_VOLUME) === null) {
    setCookie(GAME_COOKIES.AUDIO_VOLUME, '80', COOKIE_EXPIRY_DAYS);
  }
}

/**
 * Get current score
 * @returns {number} Current score (0-5)
 */
function getScore() {
  const score = getCookie(GAME_COOKIES.SCORE);
  return score !== null ? parseInt(score, 10) : 0;
}

/**
 * Mark a game as completed and increment score
 * @param {string} gameId - The game identifier (woman, decat, cve, ergo, linux)
 * @returns {boolean} True if game was newly completed, false if already completed
 */
function completeGame(gameId) {
  // Map game ID to cookie constant key
  const cookieKey = GAME_ID_MAP[gameId];

  if (!cookieKey) {
    console.error(`❌ Invalid game ID: ${gameId}`);
    console.error(`Valid game IDs: ${Object.keys(GAME_ID_MAP).join(', ')}`);
    return false;
  }

  const cookieName = GAME_COOKIES[cookieKey];

  // Check if game was already completed
  const currentValue = getCookie(cookieName);
  if (currentValue === '1') {
    console.log(`ℹ️  Game '${gameId}' was already completed`);
    return false;
  }

  // Mark game as completed
  setCookie(cookieName, '1', COOKIE_EXPIRY_DAYS);

  // Increment score
  const currentScore = getScore();
  const newScore = Math.min(currentScore + 1, 5); // Max score is 5
  setCookie(GAME_COOKIES.SCORE, newScore.toString(), COOKIE_EXPIRY_DAYS);

  console.log(`🎉 Game '${gameId}' completed!`);
  console.log(`📊 Score: ${newScore}/5 (${newScore * 20}% complete)`);
  console.log(`✅ Cookie '${cookieName}' set to 1`);
  console.log(`📈 Progress updated`);

  return true;
}

/**
 * Check if a specific game is completed
 * @param {string} gameId - The game identifier (woman, decat, cve, ergo, linux)
 * @returns {boolean} True if completed, false otherwise
 */
function isGameCompleted(gameId) {
  const cookieKey = GAME_ID_MAP[gameId];
  if (!cookieKey) {
    return false;
  }
  const cookieName = GAME_COOKIES[cookieKey];
  return getCookie(cookieName) === '1';
}

/**
 * Force complete a game (for testing purposes)
 * This bypasses the "already completed" check and increments score
 * @param {string} gameId - The game identifier (woman, decat, cve, ergo, linux)
 * @returns {boolean} True if successful, false otherwise
 */
function forceCompleteGame(gameId) {
  // Map game ID to cookie constant key
  const cookieKey = GAME_ID_MAP[gameId];

  if (!cookieKey) {
    console.error(`❌ Invalid game ID: ${gameId}`);
    console.error(`Valid game IDs: ${Object.keys(GAME_ID_MAP).join(', ')}`);
    return false;
  }

  const cookieName = GAME_COOKIES[cookieKey];
  const wasCompleted = getCookie(cookieName) === '1';

  // Mark game as completed
  setCookie(cookieName, '1', COOKIE_EXPIRY_DAYS);

  // Increment score only if not already completed
  if (!wasCompleted) {
    const currentScore = getScore();
    const newScore = Math.min(currentScore + 1, 5);
    setCookie(GAME_COOKIES.SCORE, newScore.toString(), COOKIE_EXPIRY_DAYS);
    console.log(`🔧 FORCED completion of game '${gameId}'`);
    console.log(`📊 Score: ${newScore}/5 (${newScore * 20}% complete)`);
  } else {
    console.log(`🔧 FORCED re-completion of game '${gameId}' (score unchanged)`);
    console.log(`📊 Score: ${getScore()}/5 (already completed)`);
  }

  console.log(`✅ Cookie '${cookieName}' set to 1`);

  return true;
}

/**
 * Get audio volume from cookies
 * @returns {number} Volume percentage (0-100)
 */
function getAudioVolume() {
  const volume = getCookie(GAME_COOKIES.AUDIO_VOLUME);
  if (volume === null) return 80;
  const parsed = parseInt(volume, 10);
  return isNaN(parsed) ? 80 : Math.max(0, Math.min(100, parsed));
}

/**
 * Set audio volume in cookies
 * @param {number} volume - Volume percentage (0-100)
 */
function setAudioVolume(volume) {
  const clamped = Math.max(0, Math.min(100, volume));
  setCookie(GAME_COOKIES.AUDIO_VOLUME, clamped.toString(), COOKIE_EXPIRY_DAYS);
}

/**
 * Reset all game progress (for testing or new game)
 */
function resetGameProgress() {
  setCookie(GAME_COOKIES.SCORE, '0', COOKIE_EXPIRY_DAYS);
  setCookie(GAME_COOKIES.WOMAN, '0', COOKIE_EXPIRY_DAYS);
  setCookie(GAME_COOKIES.DECATHLON, '0', COOKIE_EXPIRY_DAYS);
  setCookie(GAME_COOKIES.CVE, '0', COOKIE_EXPIRY_DAYS);
  setCookie(GAME_COOKIES.ERGONOMICS, '0', COOKIE_EXPIRY_DAYS);
  setCookie(GAME_COOKIES.LINUX, '0', COOKIE_EXPIRY_DAYS);
  console.log('Game progress reset');
}

/**
 * Get all game completion status
 * @returns {Object} Object with completion status for each game
 */
function getAllGameStatus() {
  return {
    score: getScore(),
    woman: isGameCompleted('woman'),
    decathlon: isGameCompleted('decat'),
    cve: isGameCompleted('cve'),
    ergonomics: isGameCompleted('ergo'),
    linux: isGameCompleted('linux')
  };
}

// Initialize cookies when script loads
if (typeof window !== 'undefined') {
  initializeGameCookies();
}

