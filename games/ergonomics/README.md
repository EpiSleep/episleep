# Dark Pattern Lab - Impossible Date Challenge

## Description
This game illustrates "dark patterns" in user interfaces by presenting a deliberately complex and frustrating date input form. Users must pass through 7 validation steps for a simple date.

## Game Steps

1. **Initial Input** (📅)
   - User enters a simple date using a standard date input
   
2. **Chinese Calendar** (🐉)
   - Convert the year to the Chinese calendar
   - Must find the corresponding animal and element
   - Help provided on the 60-year cycle
   - **Show Answer button available** (only challenging step with this feature)

3. **Islamic Calendar** (🌙)
   - Convert Gregorian year to Hijri year
   - Formula provided: (Year - 622) × 1.030684
   - Margin of error of ±1 year accepted

4. **Timezone** (🗺️)
   - Interactive world map with Leaflet
   - User must click on their geographic location
   - System detects timezone from browser and validates the clicked region
   - Simplified timezone detection using approximate geographic bounds

5. **Written Date** (✍️)
   - Manual retyping of the complete date
   - Copy-paste disabled
   - Must match exactly (case and space sensitive)

6. **Roman Numerals** (🏛️)
   - Convert the year to Roman numerals
   - Help provided with correspondences (I, V, X, L, C, D, M)

7. **Backwards Date** (🔄)
   - Character-by-character reversal of the date in DD/MM/YYYY format
   - Example: 25/12/2023 → 3202/21/52

8. **Success** (🎉)
   - Congratulations message
   - Educational explanation about dark patterns

## Technologies Used

- **HTML5**: Game structure
- **CSS3**: Styles with cyberpunk/neon theme
- **JavaScript (Vanilla)**: Game logic in OOP
- **Leaflet.js**: Interactive mapping library
- **OpenStreetMap (CARTO Dark)**: Dark theme map tiles

## Educational Objective

This game demonstrates the importance of good UX design by showing how frustrating an interface can be when deliberately poorly designed. It raises awareness of "dark patterns" which are interface design practices aimed at deceiving or manipulating users.

## Files

- `index.html`: HTML game structure
- `style.css`: Game-specific styles
- `game.js`: Game logic (DateGame class)
- `README.md`: Documentation

## Features

- Visual progress bar
- Persistent date display
- Animated error messages
- Precise answer validation
- Smooth animations and transitions
- Design consistent with the site's overall theme
- **Show Answer** button only on the Chinese Calendar step (the most difficult)

