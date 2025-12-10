/**
 * 贪吃蛇游戏核心逻辑
 */

// 游戏配置
const GAME_CONFIG = {
    GRID_SIZE: 20,           // 网格大小
    CELL_SIZE: 20,           // 单元格大小
    INITIAL_SPEED: 150,      // 初始速度 (ms)
    SPEED_INCREMENT: 5,       // 每吃一个食物速度增加 (ms)
    FOOD_COLOR: '#f55',       // 食物颜色
    SNAKE_HEAD_COLOR: '#8f7a66', // 蛇头颜色
    SNAKE_BODY_COLOR: '#edc22e',  // 蛇身颜色
    BACKGROUND_COLOR: '#cdc1b4', // 背景颜色
    WALL_COLOR: '#bbada0'     // 墙壁颜色
};

// 游戏状态
let gameState = {
    canvas: null,            // 画布元素
    ctx: null,               // 画布上下文
    snake: [],               // 蛇的身体
    food: { x: 0, y: 0 },     // 食物位置
    direction: 'right',       // 移动方向
    nextDirection: 'right',   // 下一个移动方向
    speed: GAME_CONFIG.INITIAL_SPEED, // 当前速度
    score: 0,                // 当前分数
    bestScore: 0,            // 最高分
    isPlaying: false,        // 游戏是否正在进行
    isGameOver: false,       // 游戏是否结束
    difficulty: 'medium',    // 游戏难度
    gameLoopId: null         // 游戏循环ID
};

// DOM元素
const DOM_ELEMENTS = {
    gameBoard: document.getElementById('game-board'),
    scoreElement: document.getElementById('score'),
    bestScoreElement: document.getElementById('best-score'),
    startBtn: document.getElementById('start-btn'),
    restartBtn: document.getElementById('restart-btn'),
    difficultySelect: document.getElementById('difficulty'),
    gameStatus: document.getElementById('game-status')
};

// 初始化游戏
function initGame() {
    // 设置画布
    gameState.canvas = DOM_ELEMENTS.gameBoard;
    gameState.ctx = gameState.canvas.getContext('2d');
    
    // 加载最高分
    loadBestScore();
    
    // 绑定事件
    bindEvents();
    
    // 初始化游戏界面
    drawInitialScreen();
    
    // 绑定按钮事件
    DOM_ELEMENTS.startBtn.addEventListener('click', startGame);
    DOM_ELEMENTS.restartBtn.addEventListener('click', restartGame);
    DOM_ELEMENTS.difficultySelect.addEventListener('change', (e) => {
        gameState.difficulty = e.target.value;
        updateDifficulty();
    });
}

// 绑定事件
function bindEvents() {
    // 键盘事件
    document.addEventListener('keydown', handleKeyPress);
    
    // 触摸事件
    let touchStartX = 0;
    let touchStartY = 0;
    
    gameState.canvas.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
    });
    
    gameState.canvas.addEventListener('touchend', (e) => {
        if (!gameState.isPlaying || gameState.isGameOver) return;
        
        const touchEndX = e.changedTouches[0].clientX;
        const touchEndY = e.changedTouches[0].clientY;
        
        const deltaX = touchEndX - touchStartX;
        const deltaY = touchEndY - touchStartY;
        
        // 确定滑动方向
        if (Math.abs(deltaX) > Math.abs(deltaY)) {
            // 水平滑动
            if (deltaX > 30 && gameState.direction !== 'left') {
                gameState.nextDirection = 'right';
            } else if (deltaX < -30 && gameState.direction !== 'right') {
                gameState.nextDirection = 'left';
            }
        } else {
            // 垂直滑动
            if (deltaY > 30 && gameState.direction !== 'up') {
                gameState.nextDirection = 'down';
            } else if (deltaY < -30 && gameState.direction !== 'down') {
                gameState.nextDirection = 'up';
            }
        }
    });
}

// 处理键盘事件
function handleKeyPress(e) {
    if (!gameState.isPlaying || gameState.isGameOver) return;
    
    switch (e.key) {
        case 'ArrowUp':
        case 'w':
        case 'W':
            if (gameState.direction !== 'down') {
                gameState.nextDirection = 'up';
            }
            break;
        case 'ArrowDown':
        case 's':
        case 'S':
            if (gameState.direction !== 'up') {
                gameState.nextDirection = 'down';
            }
            break;
        case 'ArrowLeft':
        case 'a':
        case 'A':
            if (gameState.direction !== 'right') {
                gameState.nextDirection = 'left';
            }
            break;
        case 'ArrowRight':
        case 'd':
        case 'D':
            if (gameState.direction !== 'left') {
                gameState.nextDirection = 'right';
            }
            break;
    }
}

// 更新难度
function updateDifficulty() {
    switch (gameState.difficulty) {
        case 'easy':
            gameState.speed = GAME_CONFIG.INITIAL_SPEED + 50;
            break;
        case 'medium':
            gameState.speed = GAME_CONFIG.INITIAL_SPEED;
            break;
        case 'hard':
            gameState.speed = GAME_CONFIG.INITIAL_SPEED - 50;
            break;
    }
}

// 初始化蛇
function initSnake() {
    // 蛇的初始位置（中间位置）
    const centerX = Math.floor(GAME_CONFIG.GRID_SIZE / 2) * GAME_CONFIG.CELL_SIZE;
    const centerY = Math.floor(GAME_CONFIG.GRID_SIZE / 2) * GAME_CONFIG.CELL_SIZE;
    
    // 初始化蛇（3个身体段）
    gameState.snake = [
        { x: centerX, y: centerY },
        { x: centerX - GAME_CONFIG.CELL_SIZE, y: centerY },
        { x: centerX - GAME_CONFIG.CELL_SIZE * 2, y: centerY }
    ];
}

// 生成食物
function generateFood() {
    let newFood;
    
    // 确保食物不会生成在蛇身上
    do {
        newFood = {
            x: Math.floor(Math.random() * GAME_CONFIG.GRID_SIZE) * GAME_CONFIG.CELL_SIZE,
            y: Math.floor(Math.random() * GAME_CONFIG.GRID_SIZE) * GAME_CONFIG.CELL_SIZE
        };
    } while (gameState.snake.some(segment => segment.x === newFood.x && segment.y === newFood.y));
    
    gameState.food = newFood;
}

// 绘制初始屏幕
function drawInitialScreen() {
    // 清空画布
    gameState.ctx.fillStyle = GAME_CONFIG.BACKGROUND_COLOR;
    gameState.ctx.fillRect(0, 0, gameState.canvas.width, gameState.canvas.height);
    
    // 绘制网格
    drawGrid();
    
    // 初始化蛇
    initSnake();
    
    // 生成食物
    generateFood();
    
    // 绘制蛇和食物
    drawSnake();
    drawFood();
    
    // 显示开始信息
    DOM_ELEMENTS.gameStatus.textContent = '点击开始游戏';
    DOM_ELEMENTS.gameStatus.className = 'game-status';
}

// 绘制网格
function drawGrid() {
    gameState.ctx.strokeStyle = 'rgba(0, 0, 0, 0.1)';
    gameState.ctx.lineWidth = 1;
    
    for (let i = 0; i <= GAME_CONFIG.GRID_SIZE; i++) {
        // 垂直线
        gameState.ctx.beginPath();
        gameState.ctx.moveTo(i * GAME_CONFIG.CELL_SIZE, 0);
        gameState.ctx.lineTo(i * GAME_CONFIG.CELL_SIZE, gameState.canvas.height);
        gameState.ctx.stroke();
        
        // 水平线
        gameState.ctx.beginPath();
        gameState.ctx.moveTo(0, i * GAME_CONFIG.CELL_SIZE);
        gameState.ctx.lineTo(gameState.canvas.width, i * GAME_CONFIG.CELL_SIZE);
        gameState.ctx.stroke();
    }
}

// 绘制蛇
function drawSnake() {
    // 绘制蛇头
    gameState.ctx.fillStyle = GAME_CONFIG.SNAKE_HEAD_COLOR;
    gameState.ctx.fillRect(
        gameState.snake[0].x,
        gameState.snake[0].y,
        GAME_CONFIG.CELL_SIZE - 1,
        GAME_CONFIG.CELL_SIZE - 1
    );
    
    // 绘制蛇身
    gameState.ctx.fillStyle = GAME_CONFIG.SNAKE_BODY_COLOR;
    for (let i = 1; i < gameState.snake.length; i++) {
        gameState.ctx.fillRect(
            gameState.snake[i].x,
            gameState.snake[i].y,
            GAME_CONFIG.CELL_SIZE - 1,
            GAME_CONFIG.CELL_SIZE - 1
        );
    }
}

// 绘制食物
function drawFood() {
    gameState.ctx.fillStyle = GAME_CONFIG.FOOD_COLOR;
    gameState.ctx.beginPath();
    gameState.ctx.arc(
        gameState.food.x + GAME_CONFIG.CELL_SIZE / 2,
        gameState.food.y + GAME_CONFIG.CELL_SIZE / 2,
        GAME_CONFIG.CELL_SIZE / 2,
        0,
        Math.PI * 2
    );
    gameState.ctx.fill();
}

// 更新蛇的位置
function updateSnake() {
    // 更新方向
    gameState.direction = gameState.nextDirection;
    
    // 获取蛇头位置
    const head = { ...gameState.snake[0] };
    
    // 根据方向移动蛇头
    switch (gameState.direction) {
        case 'up':
            head.y -= GAME_CONFIG.CELL_SIZE;
            break;
        case 'down':
            head.y += GAME_CONFIG.CELL_SIZE;
            break;
        case 'left':
            head.x -= GAME_CONFIG.CELL_SIZE;
            break;
        case 'right':
            head.x += GAME_CONFIG.CELL_SIZE;
            break;
    }
    
    // 将新的蛇头添加到蛇的头部
    gameState.snake.unshift(head);
    
    // 检查是否吃到食物
    if (head.x === gameState.food.x && head.y === gameState.food.y) {
        // 增加分数
        gameState.score += 10;
        
        // 更新最高分
        if (gameState.score > gameState.bestScore) {
            gameState.bestScore = gameState.score;
            saveBestScore();
        }
        
        // 更新显示分数
        updateScoreDisplay();
        
        // 生成新的食物
        generateFood();
        
        // 增加速度
        gameState.speed = Math.max(50, gameState.speed - GAME_CONFIG.SPEED_INCREMENT);
        
        // 更新游戏循环速度
        if (gameState.gameLoopId) {
            clearInterval(gameState.gameLoopId);
            startGameLoop();
        }
    } else {
        // 移除蛇尾，保持长度不变
        gameState.snake.pop();
    }
    
    // 检查碰撞
    checkCollision();
}

// 检查碰撞
function checkCollision() {
    const head = gameState.snake[0];
    
    // 检查墙壁碰撞
    if (
        head.x < 0 ||
        head.x >= gameState.canvas.width ||
        head.y < 0 ||
        head.y >= gameState.canvas.height
    ) {
        gameOver();
        return;
    }
    
    // 检查自身碰撞
    for (let i = 1; i < gameState.snake.length; i++) {
        if (head.x === gameState.snake[i].x && head.y === gameState.snake[i].y) {
            gameOver();
            return;
        }
    }
}

// 游戏结束
function gameOver() {
    gameState.isGameOver = true;
    gameState.isPlaying = false;
    
    // 清除游戏循环
    if (gameState.gameLoopId) {
        clearInterval(gameState.gameLoopId);
        gameState.gameLoopId = null;
    }
    
    // 更新按钮状态
    DOM_ELEMENTS.startBtn.disabled = false;
    DOM_ELEMENTS.restartBtn.disabled = false;
    
    // 显示游戏结束信息
    DOM_ELEMENTS.gameStatus.textContent = `游戏结束！最终分数：${gameState.score}`;
    DOM_ELEMENTS.gameStatus.className = 'game-status lost';
}

// 游戏主循环
function gameLoop() {
    // 清空画布
    gameState.ctx.fillStyle = GAME_CONFIG.BACKGROUND_COLOR;
    gameState.ctx.fillRect(0, 0, gameState.canvas.width, gameState.canvas.height);
    
    // 绘制网格
    drawGrid();
    
    // 更新蛇的位置
    updateSnake();
    
    // 绘制蛇和食物
    drawSnake();
    drawFood();
}

// 开始游戏循环
function startGameLoop() {
    gameState.gameLoopId = setInterval(gameLoop, gameState.speed);
}

// 更新分数显示
function updateScoreDisplay() {
    DOM_ELEMENTS.scoreElement.textContent = gameState.score;
    DOM_ELEMENTS.bestScoreElement.textContent = gameState.bestScore;
}

// 开始游戏
function startGame() {
    // 重置游戏状态
    gameState.isPlaying = true;
    gameState.isGameOver = false;
    gameState.score = 0;
    gameState.direction = 'right';
    gameState.nextDirection = 'right';
    
    // 更新难度
    updateDifficulty();
    
    // 初始化蛇
    initSnake();
    
    // 生成食物
    generateFood();
    
    // 更新分数显示
    updateScoreDisplay();
    
    // 更新按钮状态
    DOM_ELEMENTS.startBtn.disabled = true;
    DOM_ELEMENTS.restartBtn.disabled = false;
    
    // 显示游戏中信息
    DOM_ELEMENTS.gameStatus.textContent = '游戏进行中...';
    DOM_ELEMENTS.gameStatus.className = 'game-status';
    
    // 开始游戏循环
    startGameLoop();
}

// 重新开始游戏
function restartGame() {
    // 清除当前游戏循环
    if (gameState.gameLoopId) {
        clearInterval(gameState.gameLoopId);
        gameState.gameLoopId = null;
    }
    
    // 重置游戏状态
    gameState.isPlaying = false;
    gameState.isGameOver = false;
    
    // 重新初始化游戏
    drawInitialScreen();
    
    // 更新分数显示
    gameState.score = 0;
    updateScoreDisplay();
    
    // 更新按钮状态
    DOM_ELEMENTS.startBtn.disabled = false;
    DOM_ELEMENTS.restartBtn.disabled = true;
}

// 保存最高分到本地存储
function saveBestScore() {
    localStorage.setItem('snake-best-score', gameState.bestScore);
}

// 从本地存储加载最高分
function loadBestScore() {
    const savedBestScore = localStorage.getItem('snake-best-score');
    if (savedBestScore) {
        gameState.bestScore = parseInt(savedBestScore);
        DOM_ELEMENTS.bestScoreElement.textContent = gameState.bestScore;
    }
}

// 页面加载完成后初始化游戏
document.addEventListener('DOMContentLoaded', initGame);