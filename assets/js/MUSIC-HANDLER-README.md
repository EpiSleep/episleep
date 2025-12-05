# Music Handler - Usage Guide

This utility provides reusable music functionality for all games with automatic volume synchronization from the audioVolume cookie.

## Quick Start

### Option 1: Using Existing Audio Element (Recommended)

1. **Add the audio element to your HTML:**
```html
<audio id="background-music" loop>
  <source src="../../assets/music/your-music-file.mp3" type="audio/mpeg">
</audio>
```

2. **Include the music-handler script:**
```html
<script src="../../assets/js/music-handler.js"></script>
<script src="your-game.js"></script>
```

3. **Initialize music in your game's JavaScript:**
```javascript
document.addEventListener('DOMContentLoaded', () => {
  initGameMusic('your-music-file.mp3');
  // ... rest of your game initialization
});
```

### Option 2: Create Audio Element Dynamically

If you don't want to add HTML:

```javascript
document.addEventListener('DOMContentLoaded', () => {
  createGameMusic('your-music-file.mp3');
  // ... rest of your game initialization
});
```

## API Reference

### `initGameMusic(musicFileName, audioElementId = 'background-music')`

Initializes background music with volume from cookie.

**Parameters:**
- `musicFileName` (string): The name of the music file (e.g., 'linux-install.mp3')
- `audioElementId` (string, optional): The ID of the audio element. Default: 'background-music'

**Returns:** HTMLAudioElement or null if not found

**Example:**
```javascript
initGameMusic('linux-install.mp3');
```

### `createGameMusic(musicFileName, basePath = '../../assets/music/', audioElementId = 'background-music')`

Creates and initializes a music element dynamically.

**Parameters:**
- `musicFileName` (string): The name of the music file
- `basePath` (string, optional): Path to music folder. Default: '../../assets/music/'
- `audioElementId` (string, optional): ID for the audio element. Default: 'background-music'

**Returns:** HTMLAudioElement

**Example:**
```javascript
createGameMusic('my-game-music.mp3');
```

## Features

- ✅ Automatic volume synchronization from `audioVolume` cookie
- ✅ Handles browser autoplay restrictions gracefully
- ✅ Falls back to play on first user interaction if autoplay is blocked
- ✅ Supports dynamic volume changes
- ✅ Loops music automatically
- ✅ Mutes when volume is 0

## Example Implementation

See `games/linux-install/` for a complete working example.

## Music Files

Place your music files in: `assets/music/`

Supported format: MP3 (recommended for browser compatibility)

