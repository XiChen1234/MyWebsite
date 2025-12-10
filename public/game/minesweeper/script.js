// 扫雷游戏类
class Minesweeper {
    constructor() {
        // 游戏配置
        this.difficulties = {
            easy: { rows: 9, cols: 9, mines: 10 },
            medium: { rows: 16, cols: 16, mines: 40 },
            hard: { rows: 16, cols: 30, mines: 99 }
        };

        // 游戏状态
        this.gameBoard = [];
        this.gameState = 'ready'; // ready, playing, win, lose
        this.firstClick = true;
        this.timer = 0;
        this.timerInterval = null;
        this.flagsPlaced = 0;

        // DOM元素
        this.gameBoardElement = document.getElementById('gameBoard');
        this.mineCountElement = document.getElementById('mineCount');
        this.timerElement = document.getElementById('timer');
        this.resetBtn = document.getElementById('resetBtn');
        this.difficultySelect = document.getElementById('difficulty');
        this.modal = document.getElementById('gameOverModal');
        this.modalTitle = document.getElementById('modalTitle');
        this.modalMessage = document.getElementById('modalMessage');
        this.playAgainBtn = document.getElementById('playAgainBtn');

        // 初始化游戏
        this.init();
    }

    // 初始化游戏
    init() {
        // 绑定事件
        this.resetBtn.addEventListener('click', () => this.resetGame());
        this.difficultySelect.addEventListener('change', () => this.resetGame());
        this.playAgainBtn.addEventListener('click', () => this.resetGame());

        // 初始化游戏
        this.resetGame();
    }

    // 重置游戏
    resetGame() {
        // 清除计时器
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
            this.timerInterval = null;
        }

        // 重置状态
        this.gameState = 'ready';
        this.firstClick = true;
        this.timer = 0;
        this.flagsPlaced = 0;

        // 获取当前难度
        const difficulty = this.difficultySelect.value;
        this.config = this.difficulties[difficulty];

        // 更新UI
        this.updateMineCount();
        this.updateTimer();
        this.resetBtn.textContent = '😊';
        this.resetBtn.className = 'reset-btn';
        this.modal.classList.add('hidden');

        // 创建游戏棋盘
        this.createGameBoard();
    }

    // 创建游戏棋盘
    createGameBoard() {
        // 清空棋盘
        this.gameBoardElement.innerHTML = '';
        this.gameBoard = [];

        // 设置棋盘网格
        this.gameBoardElement.style.gridTemplateColumns = `repeat(${this.config.cols}, 1fr)`;
        this.gameBoardElement.style.gridTemplateRows = `repeat(${this.config.rows}, 1fr)`;

        // 创建格子
        for (let row = 0; row < this.config.rows; row++) {
            this.gameBoard[row] = [];
            for (let col = 0; col < this.config.cols; col++) {
                const cell = {
                    row,
                    col,
                    isMine: false,
                    isRevealed: false,
                    isFlagged: false,
                    adjacentMines: 0
                };
                this.gameBoard[row][col] = cell;

                // 创建DOM元素
                const cellElement = document.createElement('div');
                cellElement.className = 'cell';
                cellElement.dataset.row = row;
                cellElement.dataset.col = col;

                // 绑定事件
                cellElement.addEventListener('click', (e) => this.handleCellClick(e));
                cellElement.addEventListener('contextmenu', (e) => this.handleCellRightClick(e));

                // 添加到棋盘
                this.gameBoardElement.appendChild(cellElement);
            }
        }
    }

    // 放置地雷
    placeMines(firstClickRow, firstClickCol) {
        let minesPlaced = 0;

        while (minesPlaced < this.config.mines) {
            const row = Math.floor(Math.random() * this.config.rows);
            const col = Math.floor(Math.random() * this.config.cols);

            // 确保不在首次点击的位置或其周围8个格子放置地雷
            if (!(Math.abs(row - firstClickRow) <= 1 && Math.abs(col - firstClickCol) <= 1) && !this.gameBoard[row][col].isMine) {
                this.gameBoard[row][col].isMine = true;
                minesPlaced++;
            }
        }

        // 计算每个格子周围的地雷数量
        this.calculateAdjacentMines();
    }

    // 计算每个格子周围的地雷数量
    calculateAdjacentMines() {
        for (let row = 0; row < this.config.rows; row++) {
            for (let col = 0; col < this.config.cols; col++) {
                if (!this.gameBoard[row][col].isMine) {
                    let count = 0;
                    for (let r = -1; r <= 1; r++) {
                        for (let c = -1; c <= 1; c++) {
                            const newRow = row + r;
                            const newCol = col + c;
                            if (this.isValidPosition(newRow, newCol) && this.gameBoard[newRow][newCol].isMine) {
                                count++;
                            }
                        }
                    }
                    this.gameBoard[row][col].adjacentMines = count;
                }
            }
        }
    }

    // 检查位置是否有效
    isValidPosition(row, col) {
        return row >= 0 && row < this.config.rows && col >= 0 && col < this.config.cols;
    }

    // 处理格子点击
    handleCellClick(event) {
        const cellElement = event.target;
        const row = parseInt(cellElement.dataset.row);
        const col = parseInt(cellElement.dataset.col);

        this.clickCell(row, col);
    }

    // 点击格子
    clickCell(row, col) {
        const cell = this.gameBoard[row][col];

        // 游戏已结束或格子已标记，直接返回
        if (this.gameState !== 'ready' && this.gameState !== 'playing') return;
        if (cell.isFlagged) return;

        // 首次点击，开始游戏并放置地雷
        if (this.firstClick) {
            this.firstClick = false;
            this.gameState = 'playing';
            this.placeMines(row, col);
            this.startTimer();
            // 翻开格子
            this.revealCell(row, col);
        }
        // 如果是已翻开的数字格子，检查是否可以快速翻开周围格子
        else if (cell.isRevealed && cell.adjacentMines > 0) {
            this.quickRevealAround(row, col);
        }
        // 普通点击，翻开格子
        else {
            this.revealCell(row, col);
        }

        // 检查游戏状态
        this.checkGameState();
    }

    // 快速翻开周围格子
    quickRevealAround(row, col) {
        const cell = this.gameBoard[row][col];

        // 计算周围已标记的地雷数量
        let flaggedCount = 0;
        for (let r = -1; r <= 1; r++) {
            for (let c = -1; c <= 1; c++) {
                const newRow = row + r;
                const newCol = col + c;
                if (this.isValidPosition(newRow, newCol) && this.gameBoard[newRow][newCol].isFlagged) {
                    flaggedCount++;
                }
            }
        }

        // 如果已标记数量等于相邻地雷数量，自动翻开周围未标记的格子
        if (flaggedCount === cell.adjacentMines) {
            for (let r = -1; r <= 1; r++) {
                for (let c = -1; c <= 1; c++) {
                    const newRow = row + r;
                    const newCol = col + c;
                    if (this.isValidPosition(newRow, newCol)) {
                        const adjacentCell = this.gameBoard[newRow][newCol];
                        // 只翻开未标记且未翻开的格子
                        if (!adjacentCell.isFlagged && !adjacentCell.isRevealed) {
                            this.revealCell(newRow, newCol);
                        }
                    }
                }
            }
        }
    }

    // 翻开格子
    revealCell(row, col) {
        const cell = this.gameBoard[row][col];

        // 格子已翻开或已标记，直接返回
        if (cell.isRevealed || cell.isFlagged) return;

        // 翻开格子
        cell.isRevealed = true;
        const cellElement = this.getCellElement(row, col);
        cellElement.classList.add('revealed');

        // 如果是地雷，游戏结束
        if (cell.isMine) {
            cellElement.classList.add('mine', 'exploded');
            this.gameOver('lose');
            return;
        }

        // 如果有相邻地雷，显示数量
        if (cell.adjacentMines > 0) {
            cellElement.textContent = cell.adjacentMines;
            cellElement.classList.add(`number-${cell.adjacentMines}`);
        } else {
            // 没有相邻地雷，递归翻开周围8个格子
            for (let r = -1; r <= 1; r++) {
                for (let c = -1; c <= 1; c++) {
                    const newRow = row + r;
                    const newCol = col + c;
                    if (this.isValidPosition(newRow, newCol)) {
                        this.revealCell(newRow, newCol);
                    }
                }
            }
        }
    }

    // 处理右键点击
    handleCellRightClick(event) {
        event.preventDefault(); // 阻止默认菜单

        const cellElement = event.target;
        const row = parseInt(cellElement.dataset.row);
        const col = parseInt(cellElement.dataset.col);

        this.toggleFlag(row, col);
    }

    // 切换标记
    toggleFlag(row, col) {
        const cell = this.gameBoard[row][col];

        // 游戏已结束或格子已翻开，直接返回
        if (this.gameState !== 'ready' && this.gameState !== 'playing') return;
        if (cell.isRevealed) return;

        // 切换标记状态
        cell.isFlagged = !cell.isFlagged;
        const cellElement = this.getCellElement(row, col);

        if (cell.isFlagged) {
            cellElement.classList.add('flagged');
            this.flagsPlaced++;
        } else {
            cellElement.classList.remove('flagged');
            this.flagsPlaced--;
        }

        // 更新地雷计数
        this.updateMineCount();

        // 检查游戏状态
        this.checkGameState();
    }

    // 获取格子DOM元素
    getCellElement(row, col) {
        return this.gameBoardElement.querySelector(`[data-row="${row}"][data-col="${col}"]`);
    }

    // 开始计时器
    startTimer() {
        this.timerInterval = setInterval(() => {
            this.timer++;
            this.updateTimer();
        }, 1000);
    }

    // 更新地雷计数
    updateMineCount() {
        const remainingMines = this.config.mines - this.flagsPlaced;
        this.mineCountElement.textContent = Math.max(0, remainingMines);
    }

    // 更新计时器
    updateTimer() {
        this.timerElement.textContent = this.timer;
    }

    // 检查游戏状态
    checkGameState() {
        // 检查是否获胜
        let revealedCount = 0;
        let allMinesFlagged = true;

        for (let row = 0; row < this.config.rows; row++) {
            for (let col = 0; col < this.config.cols; col++) {
                const cell = this.gameBoard[row][col];

                if (cell.isRevealed) {
                    revealedCount++;
                }

                // 检查是否所有地雷都被正确标记
                if (cell.isMine && !cell.isFlagged) {
                    allMinesFlagged = false;
                }

                // 检查是否有非地雷被错误标记
                if (!cell.isMine && cell.isFlagged) {
                    allMinesFlagged = false;
                }
            }
        }

        // 获胜条件：所有非地雷格子都被翻开，或者所有地雷都被正确标记
        const totalCells = this.config.rows * this.config.cols;
        const nonMineCells = totalCells - this.config.mines;

        if (revealedCount === nonMineCells || allMinesFlagged) {
            this.gameOver('win');
        }
    }

    // 游戏结束
    gameOver(result) {
        this.gameState = result;

        // 停止计时器
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
            this.timerInterval = null;
        }

        // 更新重置按钮表情
        if (result === 'win') {
            this.resetBtn.textContent = '😎';
            this.resetBtn.classList.add('win');
            this.showAllMines();
            this.showModal('🎉 恭喜获胜！', `你在 ${this.timer} 秒内完成了游戏！`);
        } else {
            this.resetBtn.textContent = '💀';
            this.resetBtn.classList.add('dead');
            this.showAllMines();
            this.showModal('💣 游戏结束', `你踩到了地雷！用时 ${this.timer} 秒。`);
        }
    }

    // 显示所有地雷
    showAllMines() {
        for (let row = 0; row < this.config.rows; row++) {
            for (let col = 0; col < this.config.cols; col++) {
                const cell = this.gameBoard[row][col];
                const cellElement = this.getCellElement(row, col);

                // 显示所有地雷
                if (cell.isMine && !cell.isFlagged) {
                    cellElement.classList.add('mine');
                }

                // 显示错误标记
                if (!cell.isMine && cell.isFlagged) {
                    cellElement.classList.add('wrong-flag');
                    cellElement.textContent = '❌';
                }
            }
        }
    }

    // 显示模态框
    showModal(title, message) {
        this.modalTitle.textContent = title;
        this.modalMessage.textContent = message;
        this.modal.classList.remove('hidden');
    }

    // 隐藏模态框
    hideModal() {
        this.modal.classList.add('hidden');
    }
}

// 页面加载完成后初始化游戏
document.addEventListener('DOMContentLoaded', () => {
    new Minesweeper();
});
