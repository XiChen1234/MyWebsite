/**
 * 2048游戏核心逻辑
 */

// 游戏配置
const GAME_CONFIG = {
    GRID_SIZE: 4,           // 棋盘大小
    INITIAL_TILES: 2,       // 初始生成方块数量
    UNDO_STEPS: 5,          // 最大回溯步数
    WINNING_TILE: 2048      // 胜利条件
};

// 游戏状态
let gameState = {
    grid: [],               // 棋盘数据
    score: 0,               // 当前分数
    bestScore: 0,           // 最高分
    isGameOver: false,      // 游戏是否结束
    isGameWon: false,       // 游戏是否胜利
    undoHistory: [],        // 回溯历史记录
    devMode: false,         // 开发者模式
    selectedTile: null      // 选中的第一个方格坐标 [row, col]
};

// DOM元素
const DOM_ELEMENTS = {
    gameBoard: document.getElementById('game-board'),
    scoreElement: document.getElementById('score'),
    bestScoreElement: document.getElementById('best-score'),
    restartBtn: document.getElementById('restart-btn'),
    undoBtn: document.getElementById('undo-btn'),
    gameStatus: document.getElementById('game-status'),
    undoCount: document.getElementById('undo-count')
};

/**
 * 初始化游戏
 */
function initGame() {
    // 加载最高分
    loadBestScore();

    // 初始化棋盘
    resetGame();

    // 绑定事件
    bindEvents();
}

/**
 * 重置游戏
 */
function resetGame() {
    // 初始化棋盘
    gameState.grid = createEmptyGrid();
    gameState.score = 0;
    gameState.isGameOver = false;
    gameState.isGameWon = false;
    gameState.undoHistory = [];

    // 生成初始方块
    for (let i = 0; i < GAME_CONFIG.INITIAL_TILES; i++) {
        addRandomTile();
    }

    // 更新UI
    updateUI();
    updateUndoButton();
    updateGameStatus();
}

/**
 * 创建空棋盘
 * @returns {Array} 空棋盘
 */
function createEmptyGrid() {
    const grid = [];
    for (let row = 0; row < GAME_CONFIG.GRID_SIZE; row++) {
        grid[row] = [];
        for (let col = 0; col < GAME_CONFIG.GRID_SIZE; col++) {
            grid[row][col] = null;
        }
    }
    return grid;
}

/**
 * 在随机位置添加新方块（2或4）
 */
function addRandomTile() {
    const emptyCells = [];

    // 查找所有空单元格
    for (let row = 0; row < GAME_CONFIG.GRID_SIZE; row++) {
        for (let col = 0; col < GAME_CONFIG.GRID_SIZE; col++) {
            if (gameState.grid[row][col] === null) {
                emptyCells.push({ row, col });
            }
        }
    }

    // 如果没有空单元格，返回
    if (emptyCells.length === 0) return;

    // 随机选择一个空单元格
    const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];

    // 90%概率生成2，10%概率生成4
    gameState.grid[randomCell.row][randomCell.col] = Math.random() < 0.9 ? 2 : 4;
}

/**
 * 保存当前游戏状态到回溯历史
 */
function saveGameState() {
    // 保存当前状态的深拷贝
    const stateCopy = {
        grid: JSON.parse(JSON.stringify(gameState.grid)),
        score: gameState.score
    };

    // 添加到历史记录
    gameState.undoHistory.push(stateCopy);

    // 如果超过最大回溯步数，删除最旧的记录
    if (gameState.undoHistory.length > GAME_CONFIG.UNDO_STEPS) {
        gameState.undoHistory.shift();
    }

    // 更新撤回按钮状态
    updateUndoButton();
}

/**
 * 撤回上一步操作
 */
function undoMove() {
    if (gameState.undoHistory.length === 0) return;

    // 恢复上一步状态
    const previousState = gameState.undoHistory.pop();
    gameState.grid = previousState.grid;
    gameState.score = previousState.score;

    // 重置游戏状态
    gameState.isGameOver = false;
    gameState.isGameWon = false;

    // 更新UI
    updateUI();
    updateUndoButton();
    updateGameStatus();
}

/**
 * 移动方块
 * @param {string} direction - 移动方向 ('up', 'down', 'left', 'right')
 * @returns {boolean} 是否成功移动
 */
function move(direction) {
    if (gameState.isGameOver) return false;

    // 保存当前状态
    saveGameState();

    let moved = false;

    // 根据方向处理移动
    switch (direction) {
        case 'left':
            moved = moveLeft();
            break;
        case 'right':
            moved = moveRight();
            break;
        case 'up':
            moved = moveUp();
            break;
        case 'down':
            moved = moveDown();
            break;
    }

    // 如果有移动，生成新方块并检查游戏状态
    if (moved) {
        addRandomTile();
        checkGameState();
        updateUI();
        updateGameStatus();
    } else {
        // 如果没有移动，删除刚才保存的状态
        gameState.undoHistory.pop();
    }

    return moved;
}

/**
 * 向左移动
 * @returns {boolean} 是否成功移动
 */
function moveLeft() {
    let moved = false;

    for (let row = 0; row < GAME_CONFIG.GRID_SIZE; row++) {
        const oldRow = [...gameState.grid[row]];
        const newRow = processRowLeft(gameState.grid[row]);

        if (!arraysEqual(oldRow, newRow)) {
            gameState.grid[row] = newRow;
            moved = true;
        }
    }

    return moved;
}

/**
 * 向右移动
 * @returns {boolean} 是否成功移动
 */
function moveRight() {
    let moved = false;

    for (let row = 0; row < GAME_CONFIG.GRID_SIZE; row++) {
        const oldRow = [...gameState.grid[row]];
        const reversedRow = [...gameState.grid[row]].reverse();
        const processedRow = processRowLeft(reversedRow).reverse();

        if (!arraysEqual(oldRow, processedRow)) {
            gameState.grid[row] = processedRow;
            moved = true;
        }
    }

    return moved;
}

/**
 * 向上移动
 * @returns {boolean} 是否成功移动
 */
function moveUp() {
    let moved = false;

    for (let col = 0; col < GAME_CONFIG.GRID_SIZE; col++) {
        // 提取列数据
        const column = [];
        for (let row = 0; row < GAME_CONFIG.GRID_SIZE; row++) {
            column.push(gameState.grid[row][col]);
        }

        const oldColumn = [...column];
        const processedColumn = processRowLeft(column);

        if (!arraysEqual(oldColumn, processedColumn)) {
            // 更新列数据
            for (let row = 0; row < GAME_CONFIG.GRID_SIZE; row++) {
                gameState.grid[row][col] = processedColumn[row];
            }
            moved = true;
        }
    }

    return moved;
}

/**
 * 向下移动
 * @returns {boolean} 是否成功移动
 */
function moveDown() {
    let moved = false;

    for (let col = 0; col < GAME_CONFIG.GRID_SIZE; col++) {
        // 提取列数据
        const column = [];
        for (let row = 0; row < GAME_CONFIG.GRID_SIZE; row++) {
            column.push(gameState.grid[row][col]);
        }

        const oldColumn = [...column];
        const reversedColumn = [...column].reverse();
        const processedColumn = processRowLeft(reversedColumn).reverse();

        if (!arraysEqual(oldColumn, processedColumn)) {
            // 更新列数据
            for (let row = 0; row < GAME_CONFIG.GRID_SIZE; row++) {
                gameState.grid[row][col] = processedColumn[row];
            }
            moved = true;
        }
    }

    return moved;
}

/**
 * 处理行向左移动和合并
 * @param {Array} row - 行数据
 * @returns {Array} 处理后的行数据
 */
function processRowLeft(row) {
    // 移除空值
    const filteredRow = row.filter(tile => tile !== null);

    // 合并相同数字
    for (let i = 0; i < filteredRow.length - 1; i++) {
        if (filteredRow[i] === filteredRow[i + 1]) {
            filteredRow[i] *= 2;
            filteredRow[i + 1] = null;
            gameState.score += filteredRow[i];
        }
    }

    // 再次移除空值
    const mergedRow = filteredRow.filter(tile => tile !== null);

    // 填充空值
    while (mergedRow.length < GAME_CONFIG.GRID_SIZE) {
        mergedRow.push(null);
    }

    return mergedRow;
}

/**
 * 检查游戏状态（胜利/失败）
 */
function checkGameState() {
    // 检查是否胜利（即使已经胜利也继续检查，因为可以继续游玩）
    for (let row = 0; row < GAME_CONFIG.GRID_SIZE; row++) {
        for (let col = 0; col < GAME_CONFIG.GRID_SIZE; col++) {
            if (gameState.grid[row][col] === GAME_CONFIG.WINNING_TILE) {
                gameState.isGameWon = true;
            }
        }
    }

    // 检查是否有可用移动
    if (!hasAvailableMoves()) {
        gameState.isGameOver = true;
    }

    // 更新最高分
    if (gameState.score > gameState.bestScore) {
        gameState.bestScore = gameState.score;
        saveBestScore();
    }
}

/**
 * 检查是否有可用移动
 * @returns {boolean} 是否有可用移动
 */
function hasAvailableMoves() {
    // 检查是否有空单元格
    for (let row = 0; row < GAME_CONFIG.GRID_SIZE; row++) {
        for (let col = 0; col < GAME_CONFIG.GRID_SIZE; col++) {
            if (gameState.grid[row][col] === null) {
                return true;
            }
        }
    }

    // 检查是否有相邻相同数字
    for (let row = 0; row < GAME_CONFIG.GRID_SIZE; row++) {
        for (let col = 0; col < GAME_CONFIG.GRID_SIZE; col++) {
            const current = gameState.grid[row][col];

            // 检查右侧
            if (col < GAME_CONFIG.GRID_SIZE - 1 && current === gameState.grid[row][col + 1]) {
                return true;
            }

            // 检查下方
            if (row < GAME_CONFIG.GRID_SIZE - 1 && current === gameState.grid[row + 1][col]) {
                return true;
            }
        }
    }

    return false;
}

/**
 * 更新游戏UI
 */
function updateUI() {
    // 更新分数
    DOM_ELEMENTS.scoreElement.textContent = gameState.score;
    DOM_ELEMENTS.bestScoreElement.textContent = gameState.bestScore;

    // 更新棋盘
    renderGrid();
}

/**
 * 渲染棋盘
 */
function renderGrid() {
    // 清空棋盘
    DOM_ELEMENTS.gameBoard.innerHTML = '';

    // 设置棋盘网格
    DOM_ELEMENTS.gameBoard.style.gridTemplateColumns = `repeat(${GAME_CONFIG.GRID_SIZE}, 1fr)`;
    DOM_ELEMENTS.gameBoard.style.gridTemplateRows = `repeat(${GAME_CONFIG.GRID_SIZE}, 1fr)`;

    // 创建单元格和方块
    for (let row = 0; row < GAME_CONFIG.GRID_SIZE; row++) {
        for (let col = 0; col < GAME_CONFIG.GRID_SIZE; col++) {
            const cell = document.createElement('div');
            cell.className = 'cell';

            const tileValue = gameState.grid[row][col];
            if (tileValue !== null) {
                const tile = document.createElement('div');
                // 为4096及以上的方块添加tile-super类
                let tileClass = `tile tile-${tileValue}`;
                if (tileValue >= 4096) {
                    tileClass += ' tile-super';
                }
                // 如果是选中状态，添加选中样式
                if (gameState.selectedTile && gameState.selectedTile[0] === row && gameState.selectedTile[1] === col) {
                    tileClass += ' tile-selected';
                }
                tile.className = tileClass;
                tile.textContent = tileValue;
                cell.appendChild(tile);
            }

            // 为开发者模式添加点击事件
            if (gameState.devMode) {
                cell.addEventListener('click', () => {
                    if (gameState.grid[row][col] !== null) {
                        handleDevModeClick(row, col);
                    }
                });
            }

            DOM_ELEMENTS.gameBoard.appendChild(cell);
        }
    }
}

/**
 * 切换开发者模式
 */
function toggleDevMode() {
    gameState.devMode = !gameState.devMode;
    gameState.selectedTile = null;
    updateGameStatus();
    updateUI();

    // 显示开发者模式状态
    console.log(`开发者模式已${gameState.devMode ? '开启' : '关闭'}`);
    if (gameState.devMode) {
        alert('开发者模式已开启！点击两个方格可以将它们合并，合并后的值为较大的那个值。');
    }
}

/**
 * 处理开发者模式下的方格点击事件
 * @param {number} row - 点击的行号
 * @param {number} col - 点击的列号
 */
function handleDevModeClick(row, col) {
    if (!gameState.devMode) return;

    // 保存当前状态以便撤销
    saveGameState();

    if (!gameState.selectedTile) {
        // 第一次点击，选择方格
        gameState.selectedTile = [row, col];
        updateUI();
    } else {
        // 第二次点击，合并方格
        const [selectedRow, selectedCol] = gameState.selectedTile;

        // 确保不是同一个方格
        if (selectedRow === row && selectedCol === col) {
            gameState.selectedTile = null;
            updateUI();
            return;
        }

        // 获取两个方格的值
        const selectedValue = gameState.grid[selectedRow][selectedCol];
        const clickedValue = gameState.grid[row][col];

        // 合并值为较大的那个
        const mergedValue = Math.max(selectedValue, clickedValue);

        // 更新第一个方格的值
        gameState.grid[selectedRow][selectedCol] = mergedValue;
        // 清空第二个方格
        gameState.grid[row][col] = null;

        // 更新分数（不增加分数，因为是开发者模式）
        // gameState.score += mergedValue;

        // 重置选中状态
        gameState.selectedTile = null;

        // 更新UI
        updateUI();
        updateGameStatus();

        // 检查游戏状态
        checkGameState();

        console.log(`合并方格: (${selectedRow},${selectedCol})=${selectedValue} 和 (${row},${col})=${clickedValue} → ${mergedValue}`);
    }
}

/**
 * 更新游戏状态提示
 */
function updateGameStatus() {
    let statusText = '';
    let statusClass = 'game-status';

    if (gameState.devMode) {
        statusText += '开发者模式  ';
        statusClass += ' dev-mode';
    }

    if (gameState.isGameWon && gameState.isGameOver) {
        statusText += '游戏结束！恭喜你获得了2048！';
        statusClass += ' won lost';
    } else if (gameState.isGameWon) {
        statusText += '恭喜！你获得了2048！可以继续挑战更高分数！';
        statusClass += ' won';
    } else if (gameState.isGameOver) {
        statusText += '游戏结束！';
        statusClass += ' lost';
    }

    DOM_ELEMENTS.gameStatus.textContent = statusText;
    DOM_ELEMENTS.gameStatus.className = statusClass;
}

/**
 * 更新撤回按钮状态和剩余撤回次数
 */
function updateUndoButton() {
    const usedUndoSteps = gameState.undoHistory.length;
    const remainingUndoSteps = GAME_CONFIG.UNDO_STEPS - usedUndoSteps;

    DOM_ELEMENTS.undoBtn.disabled = usedUndoSteps === 0;
    DOM_ELEMENTS.undoCount.textContent = remainingUndoSteps;
}

/**
 * 保存最高分到本地存储
 */
function saveBestScore() {
    localStorage.setItem('2048-best-score', gameState.bestScore);
}

/**
 * 从本地存储加载最高分
 */
function loadBestScore() {
    const savedBestScore = localStorage.getItem('2048-best-score');
    if (savedBestScore) {
        gameState.bestScore = parseInt(savedBestScore);
    }
}

/**
 * 绑定事件
 */
function bindEvents() {
    // 重新开始按钮
    DOM_ELEMENTS.restartBtn.addEventListener('click', resetGame);

    // 撤回按钮
    DOM_ELEMENTS.undoBtn.addEventListener('click', undoMove);

    // 键盘控制
    document.addEventListener('keydown', handleKeyDown);

    // 触摸控制
    bindTouchEvents();
}

/**
 * 处理键盘事件
 * @param {KeyboardEvent} event - 键盘事件
 */
function handleKeyDown(event) {
    // 开发者模式切换快捷键: Ctrl+Shift+D
    if (event.ctrlKey && event.shiftKey && event.key === 'D') {
        event.preventDefault();
        toggleDevMode();
        return;
    }

    const key = event.key;

    switch (key) {
        case 'ArrowLeft':
        case 'a':
        case 'A':
            event.preventDefault();
            move('left');
            break;
        case 'ArrowRight':
        case 'd':
        case 'D':
            event.preventDefault();
            move('right');
            break;
        case 'ArrowUp':
        case 'w':
        case 'W':
            event.preventDefault();
            move('up');
            break;
        case 'ArrowDown':
        case 's':
        case 'S':
            event.preventDefault();
            move('down');
            break;
    }
}

/**
 * 绑定触摸事件（移动设备支持）
 */
function bindTouchEvents() {
    let startX = 0;
    let startY = 0;

    DOM_ELEMENTS.gameBoard.addEventListener('touchstart', (event) => {
        startX = event.touches[0].clientX;
        startY = event.touches[0].clientY;
    });

    DOM_ELEMENTS.gameBoard.addEventListener('touchend', (event) => {
        if (gameState.isGameOver || gameState.isGameWon) return;

        const endX = event.changedTouches[0].clientX;
        const endY = event.changedTouches[0].clientY;

        const deltaX = endX - startX;
        const deltaY = endY - startY;

        // 确定移动方向
        if (Math.abs(deltaX) > Math.abs(deltaY)) {
            // 水平移动
            if (deltaX > 30) {
                move('right');
            } else if (deltaX < -30) {
                move('left');
            }
        } else {
            // 垂直移动
            if (deltaY > 30) {
                move('down');
            } else if (deltaY < -30) {
                move('up');
            }
        }
    });
}

/**
 * 辅助函数：比较两个数组是否相等
 * @param {Array} arr1 - 第一个数组
 * @param {Array} arr2 - 第二个数组
 * @returns {boolean} 是否相等
 */
function arraysEqual(arr1, arr2) {
    if (arr1.length !== arr2.length) return false;

    for (let i = 0; i < arr1.length; i++) {
        if (arr1[i] !== arr2[i]) return false;
    }

    return true;
}

// 游戏初始化
document.addEventListener('DOMContentLoaded', initGame);
