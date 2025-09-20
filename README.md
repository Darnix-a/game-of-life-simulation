# 🎮 Conway's Game of Life

A beautiful, interactive implementation of Conway's Game of Life cellular automaton, built with vanilla JavaScript and Node.js.

## ✨ Features

### 🎯 Core Functionality
- **Interactive Grid**: Click any cell to toggle its state between alive and dead
- **Real-time Simulation**: Watch cellular evolution with smooth animations
- **Adjustable Speed**: Control simulation speed from 1-30 FPS with a responsive slider
- **Start/Pause/Reset Controls**: Full simulation control at your fingertips

### 🎨 Pattern Library
Pre-loaded with classic Conway's Game of Life patterns:
- 🚀 **Glider** - A simple spaceship that moves diagonally
- 💫 **Blinker** - Oscillates between two states
- 🐸 **Toad** - A period-2 oscillator
- 🏮 **Beacon** - Another period-2 oscillator
- ⭐ **Pulsar** - A period-3 oscillator with beautiful symmetry
- 🛸 **Lightweight Spaceship (LWSS)** - Travels horizontally
- 🔫 **Gosper Glider Gun** - Continuously generates gliders

### 📊 Statistics & Visualization
- **Generation Counter**: Track evolution progress
- **Living Cell Count**: Monitor population changes
- **Population Bar**: Visual representation of grid density
- **Pattern Preview**: See patterns before loading them

### 🎛️ Additional Tools
- **Clear Grid**: Start with a blank canvas
- **Random Fill**: Generate random initial patterns
- **Responsive Design**: Works on desktop, tablet, and mobile

## 🚀 Quick Start

### Prerequisites
- **Node.js** (v12 or higher)
- **npm** (comes with Node.js)

### Installation & Setup

1. **Clone or download** this repository
2. **Navigate** to the project directory:
   ```bash
   cd game-of-life-simulation
   ```
3. **Start the server**:
   ```bash
   npm start
   ```
4. **Open your browser** and visit: `http://localhost:8080`

That's it! 🎉

## 🎮 How to Play

### Basic Controls
1. **Click cells** on the grid to make them alive (black) or dead (white)
2. **Select a pattern** from the dropdown to get started quickly
3. **Press Start** to begin the simulation
4. **Adjust the speed** using the slider (1-30 FPS)
5. **Pause** anytime to examine the current state
6. **Reset** to clear everything and start over

### Conway's Rules
The simulation follows the classic rules:
- **Survival**: A living cell with 2 or 3 neighbors survives
- **Birth**: A dead cell with exactly 3 neighbors becomes alive
- **Death**: All other cells die or remain dead

### Pro Tips
- Try the **Glider Gun** pattern and let it run - it creates an endless stream of gliders!
- Use **Random Fill** to create chaotic starting conditions
- Experiment with **different speeds** to observe patterns more clearly
- **Pause and click** to manually modify running simulations

## 📁 Project Structure

```
game-of-life-simulation/
├── server.js           # Node.js HTTP server
├── package.json        # Project configuration
├── README.md          # This file
└── public/            # Client-side files
    ├── index.html     # Main HTML structure
    ├── style.css      # Responsive CSS styling
    └── script.js      # Game of Life implementation
```

## 🛠️ Technical Details

### Architecture
- **Backend**: Node.js HTTP server serving static files
- **Frontend**: Vanilla JavaScript with HTML5 Canvas
- **No Dependencies**: Pure Node.js implementation, no external packages

### Performance Features
- **Canvas Rendering**: Optimized drawing with HTML5 Canvas
- **RequestAnimationFrame**: Smooth, efficient animations
- **Responsive Grid**: Automatically adapts to canvas size
- **Memory Efficient**: Clean 2D array representation

### Browser Compatibility
- ✅ Chrome/Chromium (recommended)
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ✅ Mobile browsers

## 🔧 Development

### Running Locally
```bash
# Start development server
npm start

# Server will be available at http://localhost:8080
# Edit files in the public/ directory
# Refresh browser to see changes
```

### Customization Ideas
- **Change cell colors** in `style.css`
- **Add new patterns** to the `patterns` object in `script.js`
- **Modify grid size** by adjusting `cellSize` in `GameOfLife` class
- **Add sound effects** for births/deaths
- **Implement different rule sets** (e.g., HighLife, Day & Night)

## 🎯 Future Enhancements

- [ ] **Export/Import** patterns as files
- [ ] **Fullscreen mode** for larger grids
- [ ] **Touch gestures** for mobile pattern drawing
- [ ] **Color themes** and visual customization
- [ ] **Rule set selection** (not just Conway's rules)
- [ ] **Pattern editor** with drag-and-drop
- [ ] **Population graphs** over time
- [ ] **Zoom controls** for detailed viewing

## 🐛 Troubleshooting

### Server Won't Start
- Ensure Node.js is installed: `node --version`
- Check if port 8080 is available
- Try running: `npm install` first

### Performance Issues
- Large patterns may slow down on older devices
- Try reducing the grid size by increasing `cellSize`
- Lower the simulation speed for better performance

### Browser Issues
- Hard refresh (Ctrl+F5) if styles don't load
- Check browser console for JavaScript errors
- Ensure JavaScript is enabled

## 📜 License

MIT License - feel free to use this project for learning, teaching, or building upon!

## 🙏 Acknowledgments

- **John Conway** - Creator of the Game of Life
- **The cellular automata community** - For documenting amazing patterns
- **Web development community** - For inspiration and best practices

---

**Enjoy exploring the fascinating world of cellular automata!** 🌟


For questions or suggestions, feel free to open an issue or contribute to the project.
