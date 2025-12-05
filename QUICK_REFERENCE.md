# Quick Testing Reference Card

## 🎮 Working Game IDs (ALL FIXED!)

| Game | Game ID | Command |
|------|---------|---------|
| Women & IT | `'woman'` | `forceCompleteGame('woman')` |
| Decathlon | `'decat'` | `forceCompleteGame('decat')` |
| CVE Explorer | `'cve'` | `forceCompleteGame('cve')` |
| Ergonomics | `'ergo'` | `forceCompleteGame('ergo')` ✅ **FIXED** |
| Linux Install | `'linux'` | `forceCompleteGame('linux')` |

---

## ⚡ One-Line Commands

### Complete All Games
```javascript
['woman', 'decat', 'cve', 'ergo', 'linux'].forEach(g => forceCompleteGame(g));
```

### Check All Statuses
```javascript
getAllGameStatus()
```

### Reset Everything
```javascript
resetGameProgress()
```

### Complete One & Verify
```javascript
forceCompleteGame('ergo'); isGameCompleted('ergo')
```

---

## 🧪 Full Test (Copy & Paste)

```javascript
console.log('🧪 Running full cookie system test...\n');

// 1. Reset
console.log('1️⃣ Resetting...');
resetGameProgress();

// 2. Complete all
console.log('\n2️⃣ Completing all games...');
['woman', 'decat', 'cve', 'ergo', 'linux'].forEach(g => forceCompleteGame(g));

// 3. Verify
console.log('\n3️⃣ Verification:');
console.log('Status:', getAllGameStatus());
console.log('Score:', getScore() + '/5');

// 4. Individual checks
console.log('\n4️⃣ Individual checks:');
['woman', 'decat', 'cve', 'ergo', 'linux'].forEach(g => {
  console.log(`${g}: ${isGameCompleted(g) ? '✅' : '❌'}`);
});

console.log('\n✅ Test complete!');
```

---

## 📊 Expected Output

```
🧪 Running full cookie system test...

1️⃣ Resetting...
Game progress reset

2️⃣ Completing all games...
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

3️⃣ Verification:
Status: {score: 5, woman: true, decathlon: true, cve: true, ergonomics: true, linux: true}
Score: 5/5

4️⃣ Individual checks:
woman: ✅
decat: ✅
cve: ✅
ergo: ✅
linux: ✅

✅ Test complete!
```

---

## 🎯 Common Tasks

### Test Just Ergo (the previously broken one)
```javascript
resetGameProgress();
forceCompleteGame('ergo');
console.log('Ergo works:', isGameCompleted('ergo') ? '✅' : '❌');
```

### Complete Games One by One
```javascript
resetGameProgress();
forceCompleteGame('woman');  // 20%
forceCompleteGame('decat');  // 40%
forceCompleteGame('cve');    // 60%
forceCompleteGame('ergo');   // 80%
forceCompleteGame('linux');  // 100%
getAllGameStatus();
```

### Update Display After Changes
```javascript
updateProgressAndBadges();
```

---

**All game IDs now work perfectly!** 🎉

