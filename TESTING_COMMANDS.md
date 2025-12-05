# Testing Commands for Cookie System

## 🧪 Browser Console Testing Commands

Open your browser's Developer Tools (F12) and use these commands in the Console tab.

> **Note:** All game IDs are now properly mapped. The 'ergo' game ID works correctly!

---

## Basic Status Commands

### Check Current Game Status
```javascript
getAllGameStatus()
```
**Output:** Shows score and completion status for all games
```
{
  score: 2,
  woman: true,
  decathlon: false,
  cve: true,
  ergonomics: false,
  linux: false
}
```

### Get Current Score
```javascript
getScore()
```
**Output:** Returns current score (0-5)

### Check Specific Game Completion
```javascript
isGameCompleted('linux')   // Returns: true or false
isGameCompleted('woman')   // Returns: true or false
isGameCompleted('decat')   // Returns: true or false
isGameCompleted('cve')     // Returns: true or false
isGameCompleted('ergo')    // Returns: true or false
```

---

## 🔧 Force Complete Games (Testing)

### Complete a Single Game
```javascript
forceCompleteGame('linux')
```
**Output:**
```
🔧 FORCED completion of game 'linux'
📊 Score: 3/5 (60% complete)
✅ Cookie 'linux' set to 1
```

### Complete All Games at Once
```javascript
forceCompleteGame('woman');
forceCompleteGame('decat');
forceCompleteGame('cve');
forceCompleteGame('ergo');
forceCompleteGame('linux');
```

### Complete Multiple Games (One-Liner)
```javascript
['woman', 'decat', 'cve', 'ergo', 'linux'].forEach(game => forceCompleteGame(game));
```

---

## 🔄 Progress Testing

### Force Complete and Refresh Badges
```javascript
forceCompleteGame('linux');
updateProgressAndBadges();
```
**Output:** Game completes, then badges update immediately

### Complete Game and Check New Status
```javascript
console.log('Before:', getAllGameStatus());
forceCompleteGame('linux');
console.log('After:', getAllGameStatus());
```

---

## 🗑️ Reset Commands

### Reset All Progress
```javascript
resetGameProgress()
```
**Output:**
```
Game progress reset
```
All cookies set to 0, score set to 0.

### Reset and Refresh Display
```javascript
resetGameProgress();
updateProgressAndBadges();
```

### Reset Individual Game (Manual)
```javascript
// Not recommended - use forceCompleteGame instead
// But if you need to manually uncomplete a game:
setCookie('linux', '0', 365);
// Then manually adjust score
setCookie('score', '0', 365);
updateProgressAndBadges();
```

---

## 🎯 Complete Testing Workflow

### Test 1: Complete Fresh Install
```javascript
// 1. Reset everything
resetGameProgress();

// 2. Check status
console.log('Initial:', getAllGameStatus());

// 3. Complete one game
forceCompleteGame('linux');

// 4. Verify
console.log('After Linux:', getAllGameStatus());
updateProgressAndBadges();
```

### Test 2: Complete All Games Progressively
```javascript
// Reset
resetGameProgress();
updateProgressAndBadges();

// Complete one by one
forceCompleteGame('woman');
updateProgressAndBadges();

forceCompleteGame('decat');
updateProgressAndBadges();

forceCompleteGame('cve');
updateProgressAndBadges();

forceCompleteGame('ergo');
updateProgressAndBadges();

forceCompleteGame('linux');
updateProgressAndBadges();

// Final check
console.log('Final Status:', getAllGameStatus());
```

### Test 3: Duplicate Completion Detection
```javascript
// Complete a game
console.log('First completion:', forceCompleteGame('linux'));
// Output: true

// Try to complete again
console.log('Duplicate completion:', forceCompleteGame('linux'));
// Output: false (score doesn't increase)
```

---

## 📊 Detailed Logging

All functions now include detailed console logging:

### completeGame() Logs:
- ❌ Invalid game ID error
- ℹ️  Already completed message
- 🎉 New completion celebration
- 📊 Score update
- ✅ Cookie confirmation
- 📈 Progress update

### forceCompleteGame() Logs:
- 🔧 Forced completion notice
- 📊 Score with percentage
- ✅ Cookie confirmation

### updateProgressAndBadges() Logs:
- 🔄 Update start
- 📊 Current score
- ✅ Progress bar update
- 🏅 Each badge unlock
- 🔒 Locked badges
- ⚠️  Missing elements
- ✅ Update summary

---

## 🎮 Game-Specific Testing

### Test Linux Installation Game
```javascript
// Force complete
forceCompleteGame('linux');

// Check status
console.log('Linux completed?', isGameCompleted('linux'));

// Check badge
console.log('Score:', getScore(), '/5');
```

### Test All Games
```javascript
const games = ['woman', 'decat', 'cve', 'ergo', 'linux'];

games.forEach(game => {
  console.log(`${game}:`, isGameCompleted(game) ? '✅' : '❌');
});
```

---

## 🔍 Debug Commands

### View All Cookies
```javascript
console.log(document.cookie);
```

### Check Cookie Values Manually
```javascript
console.log('Score:', getCookie('score'));
console.log('Linux:', getCookie('linux'));
console.log('Woman:', getCookie('woman'));
console.log('Decat:', getCookie('decat'));
console.log('CVE:', getCookie('cve'));
console.log('Ergo:', getCookie('ergo'));
console.log('Audio:', getCookie('audioVolume'));
```

### Comprehensive Debug Output
```javascript
console.log('=== COOKIE DEBUG ===');
console.log('Raw Cookies:', document.cookie);
console.log('\n=== PARSED STATUS ===');
console.log(getAllGameStatus());
console.log('\n=== INDIVIDUAL CHECKS ===');
['woman', 'decat', 'cve', 'ergo', 'linux'].forEach(game => {
  console.log(`${game}:`, 
    isGameCompleted(game) ? '✅ Complete' : '❌ Not Complete',
    `(cookie: ${getCookie(game)})`
  );
});
console.log('\n=== SCORE ===');
console.log(`${getScore()}/5 (${getScore() * 20}%)`);
```

---

## 🎨 Visual Testing

### Update Badges Without Completing Games
```javascript
// Manually set a cookie (for testing UI only)
setCookie('linux', '1', 365);
updateProgressAndBadges();
// Badge should unlock without score changing
```

### Test Progress Bar Animation
```javascript
resetGameProgress();
updateProgressAndBadges();
setTimeout(() => { forceCompleteGame('linux'); updateProgressAndBadges(); }, 1000);
setTimeout(() => { forceCompleteGame('woman'); updateProgressAndBadges(); }, 2000);
setTimeout(() => { forceCompleteGame('decat'); updateProgressAndBadges(); }, 3000);
setTimeout(() => { forceCompleteGame('cve'); updateProgressAndBadges(); }, 4000);
setTimeout(() => { forceCompleteGame('ergo'); updateProgressAndBadges(); }, 5000);
```

---

## 📝 Quick Reference

| Command | Purpose |
|---------|---------|
| `getAllGameStatus()` | View complete status |
| `getScore()` | Get current score |
| `isGameCompleted('gameId')` | Check specific game |
| `forceCompleteGame('gameId')` | Complete a game (testing) |
| `completeGame('gameId')` | Complete game (production) |
| `resetGameProgress()` | Reset all progress |
| `updateProgressAndBadges()` | Refresh UI |

### Game IDs:
- `'woman'` - Women & IT
- `'decat'` - Decathlon
- `'cve'` - CVE Explorer
- `'ergo'` - Ergonomics
- `'linux'` - Linux Installation

---

## 🚀 Quick Start Testing

**Complete test in 30 seconds:**

```javascript
// 1. Reset
resetGameProgress();

// 2. Complete all games
['woman', 'decat', 'cve', 'ergo', 'linux'].forEach(g => forceCompleteGame(g));

// 3. Update display
updateProgressAndBadges();

// 4. Verify
console.log('Status:', getAllGameStatus());
```

**Expected output:**
```
🔧 FORCED completion of game 'woman'
📊 Score: 1/5 (20% complete)
✅ Cookie 'woman' set to 1
🔧 FORCED completion of game 'decat'
📊 Score: 2/5 (40% complete)
✅ Cookie 'decat' set to 1
🔧 FORCED completion of game 'cve'
📊 Score: 3/5 (60% complete)
✅ Cookie 'cve' set to 1
🔧 FORCED completion of game 'ergo'
📊 Score: 4/5 (80% complete)
✅ Cookie 'ergo' set to 1
🔧 FORCED completion of game 'linux'
📊 Score: 5/5 (100% complete)
✅ Cookie 'linux' set to 1
🔄 Updating progress bar and badges...
📊 Current score: 5/5 (100%)
✅ Progress bar updated to 100%
🏅 Badge 'women' unlocked (woman)
🏅 Badge 'decat' unlocked (decat)
🏅 Badge 'cve' unlocked (cve)
🏅 Badge 'ergo' unlocked (ergo)
🏅 Badge 'linux' unlocked (linux)
✅ Update complete: 5/5 badges unlocked
Status: {score: 5, woman: true, decathlon: true, cve: true, ergonomics: true, linux: true}
```

---

Happy Testing! 🎉

