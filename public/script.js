// Conway's Game of Life Implementation
class GameOfLife {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.previewCanvas = document.getElementById('previewCanvas');
        this.previewCtx = this.previewCanvas.getContext('2d');
        
        // Grid settings
        this.cellSize = 8;
        this.rows = Math.floor(this.canvas.height / this.cellSize);
        this.cols = Math.floor(this.canvas.width / this.cellSize);
        
        // Game state
        this.grid = this.createEmptyGrid();
        this.running = false;
        this.generation = 0;
        this.speed = 10; // FPS
        this.animationId = null;
        this.lastTime = 0;
        
        // Initialize UI and events
        this.initializeEventListeners();
        this.initializePatterns();
        this.draw();
        this.updateStats();
    }

    createEmptyGrid() {
        return Array(this.rows).fill(null).map(() => Array(this.cols).fill(false));
    }

    initializeEventListeners() {
        // Control buttons
        document.getElementById('startBtn').addEventListener('click', () => this.start());
        document.getElementById('pauseBtn').addEventListener('click', () => this.pause());
        document.getElementById('resetBtn').addEventListener('click', () => this.reset());
        document.getElementById('clearBtn').addEventListener('click', () => this.clearGrid());
        document.getElementById('randomBtn').addEventListener('click', () => this.randomFill());
        
        // Speed control
        const speedSlider = document.getElementById('speedSlider');
        speedSlider.addEventListener('input', (e) => {
            this.speed = parseInt(e.target.value);
            document.getElementById('speedValue').textContent = this.speed;
        });
        
        // Pattern controls
        const patternSelect = document.getElementById('patternSelect');
        const loadPatternBtn = document.getElementById('loadPatternBtn');
        
        patternSelect.addEventListener('change', (e) => {
            const selected = e.target.value;
            loadPatternBtn.disabled = !selected;
            if (selected) {
                this.showPatternPreview(selected);
            } else {
                this.clearPreview();
            }
        });
        
        loadPatternBtn.addEventListener('click', () => {
            const selected = patternSelect.value;
            if (selected) {
                this.loadPattern(selected);
            }
        });
        
        // Canvas interaction
        this.canvas.addEventListener('click', (e) => this.handleCanvasClick(e));
        this.canvas.addEventListener('mousemove', (e) => this.handleCanvasHover(e));
    }

    initializePatterns() {
        this.patterns = {
            glider: [
                [0, 1, 0],
                [0, 0, 1],
                [1, 1, 1]
            ],
            blinker: [
                [1],
                [1],
                [1]
            ],
            toad: [
                [0, 1, 1, 1],
                [1, 1, 1, 0]
            ],
            beacon: [
                [1, 1, 0, 0],
                [1, 1, 0, 0],
                [0, 0, 1, 1],
                [0, 0, 1, 1]
            ],
            pulsar: [
                [0,0,1,1,1,0,0,0,1,1,1,0,0],
                [0,0,0,0,0,0,0,0,0,0,0,0,0],
                [1,0,0,0,0,1,0,1,0,0,0,0,1],
                [1,0,0,0,0,1,0,1,0,0,0,0,1],
                [1,0,0,0,0,1,0,1,0,0,0,0,1],
                [0,0,1,1,1,0,0,0,1,1,1,0,0],
                [0,0,0,0,0,0,0,0,0,0,0,0,0],
                [0,0,1,1,1,0,0,0,1,1,1,0,0],
                [1,0,0,0,0,1,0,1,0,0,0,0,1],
                [1,0,0,0,0,1,0,1,0,0,0,0,1],
                [1,0,0,0,0,1,0,1,0,0,0,0,1],
                [0,0,0,0,0,0,0,0,0,0,0,0,0],
                [0,0,1,1,1,0,0,0,1,1,1,0,0]
            ],
            spaceship: [
                [1, 0, 0, 1, 0],
                [0, 0, 0, 0, 1],
                [1, 0, 0, 0, 1],
                [0, 1, 1, 1, 1]
            ],
            gliderGun: [
                [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1],
                [0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1],
                [1,1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                [1,1,0,0,0,0,0,0,0,0,1,0,0,0,1,0,1,1,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
            ]
        };
    }

    handleCanvasClick(e) {
        const rect = this.canvas.getBoundingClientRect();
        const scaleX = this.canvas.width / rect.width;
        const scaleY = this.canvas.height / rect.height;
        
        const x = (e.clientX - rect.left) * scaleX;
        const y = (e.clientY - rect.top) * scaleY;
        
        const col = Math.floor(x / this.cellSize);
        const row = Math.floor(y / this.cellSize);
        
        if (row >= 0 && row < this.rows && col >= 0 && col < this.cols) {
            this.grid[row][col] = !this.grid[row][col];
            this.draw();
            this.updateStats();
        }
    }

    handleCanvasHover(e) {
        // Optional: Add hover effects here
        const rect = this.canvas.getBoundingClientRect();
        const scaleX = this.canvas.width / rect.width;
        const scaleY = this.canvas.height / rect.height;
        
        const x = (e.clientX - rect.left) * scaleX;
        const y = (e.clientY - rect.top) * scaleY;
        
        const col = Math.floor(x / this.cellSize);
        const row = Math.floor(y / this.cellSize);
        
        // Store hovered cell for potential highlighting
        this.hoveredCell = { row, col };
    }

    countNeighbors(row, col) {
        let count = 0;
        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                if (i === 0 && j === 0) continue;
                
                const newRow = row + i;
                const newCol = col + j;
                
                if (newRow >= 0 && newRow < this.rows && 
                    newCol >= 0 && newCol < this.cols) {
                    if (this.grid[newRow][newCol]) count++;
                }
            }
        }
        return count;
    }

    nextGeneration() {
        const newGrid = this.createEmptyGrid();
        
        for (let row = 0; row < this.rows; row++) {
            for (let col = 0; col < this.cols; col++) {
                const neighbors = this.countNeighbors(row, col);
                const currentCell = this.grid[row][col];
                
                // Apply Conway's rules
                if (currentCell) {
                    // Living cell survives with 2 or 3 neighbors
                    newGrid[row][col] = neighbors === 2 || neighbors === 3;
                } else {
                    // Dead cell becomes alive with exactly 3 neighbors
                    newGrid[row][col] = neighbors === 3;
                }
            }
        }
        
        this.grid = newGrid;
        this.generation++;
    }

    draw() {
        // Clear canvas
        this.ctx.fillStyle = '#f8f9fa';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Draw grid lines (subtle)
        this.ctx.strokeStyle = '#e9ecef';
        this.ctx.lineWidth = 0.5;
        
        // Vertical lines
        for (let col = 0; col <= this.cols; col++) {
            const x = col * this.cellSize;
            this.ctx.beginPath();
            this.ctx.moveTo(x, 0);
            this.ctx.lineTo(x, this.canvas.height);
            this.ctx.stroke();
        }
        
        // Horizontal lines
        for (let row = 0; row <= this.rows; row++) {
            const y = row * this.cellSize;
            this.ctx.beginPath();
            this.ctx.moveTo(0, y);
            this.ctx.lineTo(this.canvas.width, y);
            this.ctx.stroke();
        }
        
        // Draw living cells
        this.ctx.fillStyle = '#343a40';
        for (let row = 0; row < this.rows; row++) {
            for (let col = 0; col < this.cols; col++) {
                if (this.grid[row][col]) {
                    this.ctx.fillRect(
                        col * this.cellSize + 1,
                        row * this.cellSize + 1,
                        this.cellSize - 2,
                        this.cellSize - 2
                    );
                }
            }
        }
    }

    drawPattern(ctx, pattern, cellSize = 8, offsetX = 0, offsetY = 0) {
        ctx.fillStyle = '#343a40';
        for (let row = 0; row < pattern.length; row++) {
            for (let col = 0; col < pattern[row].length; col++) {
                if (pattern[row][col]) {
                    ctx.fillRect(
                        offsetX + col * cellSize,
                        offsetY + row * cellSize,
                        cellSize - 1,
                        cellSize - 1
                    );
                }
            }
        }
    }

    showPatternPreview(patternName) {
        const pattern = this.patterns[patternName];
        if (!pattern) return;
        
        // Clear preview canvas
        this.previewCtx.fillStyle = '#f8f9fa';
        this.previewCtx.fillRect(0, 0, this.previewCanvas.width, this.previewCanvas.height);
        
        // Calculate cell size and centering
        const previewCellSize = Math.min(
            Math.floor(this.previewCanvas.width / pattern[0].length) - 1,
            Math.floor(this.previewCanvas.height / pattern.length) - 1,
            8
        );
        
        const offsetX = (this.previewCanvas.width - pattern[0].length * previewCellSize) / 2;
        const offsetY = (this.previewCanvas.height - pattern.length * previewCellSize) / 2;
        
        this.drawPattern(this.previewCtx, pattern, previewCellSize, offsetX, offsetY);
    }

    clearPreview() {
        this.previewCtx.fillStyle = '#f8f9fa';
        this.previewCtx.fillRect(0, 0, this.previewCanvas.width, this.previewCanvas.height);
    }

    loadPattern(patternName) {
        const pattern = this.patterns[patternName];
        if (!pattern) return;
        
        // Calculate center position
        const startRow = Math.floor((this.rows - pattern.length) / 2);
        const startCol = Math.floor((this.cols - pattern[0].length) / 2);
        
        // Clear grid first
        this.clearGrid();
        
        // Place pattern
        for (let row = 0; row < pattern.length; row++) {
            for (let col = 0; col < pattern[row].length; col++) {
                const gridRow = startRow + row;
                const gridCol = startCol + col;
                
                if (gridRow >= 0 && gridRow < this.rows && 
                    gridCol >= 0 && gridCol < this.cols) {
                    this.grid[gridRow][gridCol] = pattern[row][col] === 1;
                }
            }
        }
        
        this.draw();
        this.updateStats();
    }

    countAliveCells() {
        let count = 0;
        for (let row = 0; row < this.rows; row++) {
            for (let col = 0; col < this.cols; col++) {
                if (this.grid[row][col]) count++;
            }
        }
        return count;
    }

    updateStats() {
        const aliveCells = this.countAliveCells();
        const totalCells = this.rows * this.cols;
        const populationPercentage = ((aliveCells / totalCells) * 100).toFixed(1);
        
        document.getElementById('generationCount').textContent = this.generation;
        document.getElementById('aliveCells').textContent = aliveCells;
        
        const populationBar = document.getElementById('populationBar');
        populationBar.style.setProperty('--population', populationPercentage + '%');
    }

    animate(currentTime) {
        if (currentTime - this.lastTime >= 1000 / this.speed) {
            this.nextGeneration();
            this.draw();
            this.updateStats();
            this.lastTime = currentTime;
        }
        
        if (this.running) {
            this.animationId = requestAnimationFrame((time) => this.animate(time));
        }
    }

    start() {
        if (this.running) return;
        
        this.running = true;
        document.getElementById('startBtn').disabled = true;
        document.getElementById('pauseBtn').disabled = false;
        
        this.lastTime = 0;
        this.animationId = requestAnimationFrame((time) => this.animate(time));
    }

    pause() {
        this.running = false;
        document.getElementById('startBtn').disabled = false;
        document.getElementById('pauseBtn').disabled = true;
        
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
    }

    reset() {
        this.pause();
        this.grid = this.createEmptyGrid();
        this.generation = 0;
        this.draw();
        this.updateStats();
    }

    clearGrid() {
        this.grid = this.createEmptyGrid();
        this.draw();
        this.updateStats();
    }

    randomFill(probability = 0.3) {
        this.clearGrid();
        for (let row = 0; row < this.rows; row++) {
            for (let col = 0; col < this.cols; col++) {
                this.grid[row][col] = Math.random() < probability;
            }
        }
        this.draw();
        this.updateStats();
    }
}

// Initialize the game when the page loads
document.addEventListener('DOMContentLoaded', () => {
    const game = new GameOfLife();
    
    // Make game accessible globally for debugging
    window.game = game;
    
    console.log('🎮 Conway\'s Game of Life initialized!');
    console.log('Grid size:', game.cols, 'x', game.rows);
    console.log('Total cells:', game.cols * game.rows);
});