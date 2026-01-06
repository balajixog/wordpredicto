# Word Predicto

A React-based word guessing game where players must identify a hidden word within 8 attempts to save the programming world from Assembly.

## Description

Word Predicto is an interactive word puzzle game that combines classic word-guessing mechanics with a programming theme. Players attempt to guess a randomly selected word by choosing letters from an on-screen keyboard. Each incorrect guess causes a programming language to be lost to Assembly, creating an engaging race against diminishing attempts.

## Features

- Random word generation for each game session
- Interactive virtual keyboard with visual feedback
- Programming language chips that track remaining attempts
- Real-time letter reveal system
- Celebratory confetti animation on victory
- Dramatic particle effects on defeat
- Custom farewell messages for each lost programming language
- Full accessibility support with ARIA labels and screen reader compatibility
- Responsive game state management
- New game functionality to play repeatedly

## Game Rules

### Objective
Correctly guess all letters in the hidden word before exhausting all 8 attempts.

### Gameplay
1. A random word is selected at the start of each game
2. Click letters on the virtual keyboard to make guesses
3. Correct letters appear in their positions within the word
4. Incorrect letters are marked and consume one attempt
5. Each wrong guess removes one programming language from the chip display
6. Win by revealing all letters before running out of attempts
7. Lose if all 8 attempts are used before completing the word

### Visual Indicators
- **Green keyboard buttons**: Letters present in the word
- **Red keyboard buttons**: Letters not in the word
- **Gray language chips**: Lost attempts
- **Colored language chips**: Remaining attempts
- **Red highlighted letters**: Unrevealed letters shown after losing

## Installation

### Prerequisites
- Node.js (version 14 or higher)
- npm or yarn package manager

### Dependencies
Install required packages:
```bash
npm install react react-dom clsx react-confetti canvas-confetti
```

### Project Setup
1. Clone the repository
2. Navigate to the project directory
3. Install dependencies
4. Start the development server
```bash
npm install
npm start
```

## Project Structure
```
src/
├── App.js    # Main game component
├── language.js            # Programming language data
├── utils.js              # Utility functions
└── words.js              # Word list
```

## Required Files

### language.js
Must export an array of language objects:
```javascript
export const languages = [
  {
    name: "JavaScript",
    backgroundColor: "#f7df1e",
    color: "#000000"
  },
  // ... more languages
]
```

### utils.js
Must export two functions:
```javascript
export function getRandomWord() {
  // Returns a random word string
}

export function getFarewellText(languageName) {
  // Returns farewell message for given language
}
```

## Component API

### Props
The `AssemblyEndgame` component accepts no props and manages its own state.

### State Variables
- `currentWord`: Currently selected word to guess
- `guessedLetters`: Array of all letters the player has guessed

### Derived Values
- `wrongGuessCount`: Total incorrect guesses made
- `numGuessesLeft`: Remaining attempts
- `isGameWon`: True when word is completely guessed
- `isGameLost`: True when all attempts exhausted
- `isGameOver`: True when game has ended (won or lost)

## Styling

The component requires a CSS file with the following classes:

### Required CSS Classes
- `.chip` - Language chip base styling
- `.chip.lost` - Styling for lost language chips
- `.game-status` - Game status container
- `.won` - Victory state styling
- `.lost` - Defeat state styling
- `.farewell` - Farewell message styling
- `.farewell-message` - Individual farewell text
- `.language-chips` - Container for language chips
- `.word` - Word display container
- `.keyboard` - Keyboard button container
- `.correct` - Correct letter button state
- `.wrong` - Incorrect letter button state
- `.missed-letter` - Unrevealed letters on game loss
- `.new-game` - New game button styling
- `.sr-only` - Screen reader only content (visually hidden)

## Accessibility

The game implements comprehensive accessibility features:

- ARIA labels on all interactive elements
- Live regions for dynamic content announcements
- Screen reader status updates for game progress
- Semantic HTML structure
- Keyboard navigation support
- Disabled state management for game completion

## Browser Support

Requires modern browser with support for:
- ES6+ JavaScript features (arrow functions, destructuring, spread operator)
- React 16.8+ (Hooks support)
- Canvas API (for confetti effects)
- CSS3 features

## Customization

### Modifying Attempts
Change the number of attempts by adjusting the `languages` array length in `language.js`.

### Changing Animations
The game includes commented-out alternative confetti animations:
- Emoji confetti (skull emoji on loss)
- Burst confetti (continuous celebration on win)

Uncomment the desired effect in the `useEffect` hooks.

### Word List
Modify the word pool by updating the word list in `utils.js` or `words.js`.

## Performance Considerations

- Confetti animations are set to not recycle for optimal performance
- Game state updates are optimized with React's state management
- Event handlers use functional updates to prevent stale closures
- DOM updates are minimized through conditional rendering

## Known Limitations

- Words must be lowercase in the word list
- Single-word support only (no phrases with spaces)
- Language chips display is fixed at 8 maximum

## Future Enhancements

Potential features for future versions:
- Difficulty levels with varying word lengths
- Hint system
- Score tracking across multiple games
- Timed mode
- Multiplayer support
- Custom word list upload
- Sound effects
- Dark mode theme

## License

This project is available for educational and personal use.

## Contributing

Contributions are welcome. Please follow these guidelines:
1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a pull request

## Author

BALAJI GOVINDAN

## Acknowledgments

- React team for the framework
- Contributors to react-confetti and canvas-confetti libraries
- Programming language community for inspiration
