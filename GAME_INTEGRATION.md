# Game Integration Guide

This guide explains how to properly integrate your game with the cookie-based progress tracking system.

## Cookie Manager Overview

The `cookie-manager.js` file provides centralized cookie management for:
- Game completion tracking
- Score tracking (total completed games)
- Audio volume preferences

## How to Mark a Game as Complete

When a player successfully completes your game, call the `completeGame()` function with your game's identifier.

### Step 1: Include cookie-manager.js

Make sure your game's HTML file includes the cookie-manager script:

```html
<script src="../../assets/js/cookie-manager.js"></script>
```

### Step 2: Call completeGame() on completion

When the player successfully completes your game, call:

```javascript
// Game identifiers:
// 'woman' - Women & IT game
// 'decat' - Decathlon game
// 'cve' - CVE Explorer game
// 'ergo' - Ergonomics game
// 'linux' - Linux Installation game

completeGame('yourGameId');
```

### Example Implementation

```javascript
// Example: At the end of your game when player wins
function onGameWin() {
  // Show win message
  showWinMessage();
  
  // Mark game as complete and update score
  const wasNewlyCompleted = completeGame('linux'); // Use your game's ID
  
  if (wasNewlyCompleted) {
    console.log('Congratulations! Game completed for the first time!');
    // Optionally show a special message for first-time completion
  } else {
    console.log('You already completed this game before.');
  }
  
  // Redirect to level select after a delay
  setTimeout(() => {
    window.location.href = '../../level-select.html';
  }, 3000);
}
```

## Available Functions

### Core Functions

#### `completeGame(gameId)`
Marks a game as completed and increments the score.
- **Parameters**: `gameId` (string) - One of: 'woman', 'decat', 'cve', 'ergo', 'linux'
- **Returns**: `boolean` - True if newly completed, false if already completed
- **Side effects**: Updates score cookie, updates game completion cookie

#### `isGameCompleted(gameId)`
Check if a specific game has been completed.
- **Parameters**: `gameId` (string)
- **Returns**: `boolean` - True if completed, false otherwise

#### `getScore()`
Get the current total score (number of games completed).
- **Returns**: `number` - Score from 0 to 5

#### `getAllGameStatus()`
Get completion status for all games.
- **Returns**: Object with score and completion status for each game

### Audio Functions

#### `getAudioVolume()`
Get the current audio volume setting.
- **Returns**: `number` - Volume from 0 to 100

#### `setAudioVolume(volume)`
Set the audio volume.
- **Parameters**: `volume` (number) - Volume from 0 to 100

### Utility Functions

#### `resetGameProgress()`
Reset all game progress (useful for testing).
- **Side effects**: Resets all completion cookies and score to 0

## Game IDs Reference

| Game Name | Game ID | Cookie Name |
|-----------|---------|-------------|
| Women & IT | `woman` | `woman` |
| Decathlon | `decat` | `decat` |
| CVE Explorer | `cve` | `cve` |
| Ergonomics | `ergo` | `ergo` |
| Linux Install | `linux` | `linux` |

## Testing Your Integration

1. Open your game in a browser
2. Open the browser console (F12)
3. Check initial status:
   ```javascript
   console.log('Current score:', getScore());
   console.log('Game status:', getAllGameStatus());
   ```
4. Complete your game to trigger `completeGame()`
5. Return to level select and verify:
   - Progress bar has increased
   - Your game's medal is unlocked

## Troubleshooting

### Game completion not saving
- Ensure `cookie-manager.js` is loaded before your game script
- Check browser console for errors
- Verify you're using the correct game ID

### Medal not unlocking
- Check that the game ID matches the one in the badge map
- Verify cookies are enabled in the browser
- Check the browser console for cookie-related errors

### Score not incrementing
- The score only increments once per game
- If `completeGame()` returns `false`, the game was already completed
- Use `resetGameProgress()` to reset for testing

## Example: Complete Game Integration

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>My Game</title>
  <!-- Include cookie manager BEFORE your game script -->
  <script src="../../assets/js/cookie-manager.js"></script>
</head>
<body>
  <div id="game-container">
    <!-- Your game HTML -->
  </div>
  
  <script>
    // Your game code
    let gameWon = false;
    
    function checkWinCondition() {
      if (/* your win condition */) {
        if (!gameWon) {
          gameWon = true;
          onGameComplete();
        }
      }
    }
    
    function onGameComplete() {
      // Mark game as complete
      const newCompletion = completeGame('yourGameId');
      
      if (newCompletion) {
        alert('Congratulations! You earned a badge!');
      } else {
        alert('You completed this game again!');
      }
      
      // Return to level select
      setTimeout(() => {
        window.location.href = '../../level-select.html';
      }, 2000);
    }
    
    // Game loop
    setInterval(checkWinCondition, 100);
  </script>
</body>
</html>
```

