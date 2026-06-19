// ========== 记忆翻牌游戏 ==========

// 游戏状态
let cards = [];
let flippedCards = [];
let matchedPairs = 0;
let moves = 0;
let timer = null;
let seconds = 0;
let isPlaying = false;
let canFlip = true;

// 8个不同的emoji（不重复）
const emojis = ['🎮', '🎯', '🎲', '🎪', '🎨', '🎭', '🎸', '🎺'];

// DOM元素
const cardGrid = document.getElementById('cardGrid');
const movesDisplay = document.getElementById('moves');
const timerDisplay = document.getElementById('timer');
const restartBtn = document.getElementById('restartBtn');

// 初始化游戏
function initGame() {
    // 重置状态
    cards = [];
    flippedCards = [];
    matchedPairs = 0;
    moves = 0;
    seconds = 0;
    isPlaying = false;
    canFlip = true;

    if (timer) {
        clearInterval(timer);
        timer = null;
    }

    // 更新显示
    movesDisplay.textContent = '0';
    timerDisplay.textContent = '0';

    // 创建卡牌数组（成对，共16张）
    const cardValues = [...emojis, ...emojis];

    // 洗牌算法 (Fisher-Yates)
    for (let i = cardValues.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [cardValues[i], cardValues[j]] = [cardValues[j], cardValues[i]];
    }

    // 清空网格
    cardGrid.innerHTML = '';

    // 创建卡牌元素
    cardValues.forEach((emoji, index) => {
        const card = document.createElement('div');
        card.className = 'card';
        card.dataset.value = emoji;
        card.dataset.index = index;

        card.innerHTML = `
            <div class="card-inner">
                <div class="card-front"></div>
                <div class="card-back">${emoji}</div>
            </div>
        `;

        card.addEventListener('click', () => flipCard(card));
        cardGrid.appendChild(card);
        cards.push(card);
    });
}

// 翻牌
function flipCard(card) {
    // 检查是否可以翻牌
    if (!canFlip || card.classList.contains('flipped') || card.classList.contains('matched')) {
        return;
    }

    // 开始计时
    if (!isPlaying) {
        startTimer();
        isPlaying = true;
    }

    // 翻转卡牌
    card.classList.add('flipped');
    flippedCards.push(card);

    // 检查是否翻了两张
    if (flippedCards.length === 2) {
        canFlip = false;
        moves++;
        movesDisplay.textContent = moves;

        checkMatch();
    }
}

// 检查匹配
function checkMatch() {
    const [card1, card2] = flippedCards;

    if (card1.dataset.value === card2.dataset.value) {
        // 匹配成功
        setTimeout(() => {
            card1.classList.add('matched');
            card2.classList.add('matched');
            matchedPairs++;

            // 检查是否获胜
            if (matchedPairs === emojis.length) {
                setTimeout(showWinMessage, 500);
            }

            resetFlipped();
        }, 300);
    } else {
        // 匹配失败
        setTimeout(() => {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
            resetFlipped();
        }, 800);
    }
}

// 重置翻牌状态
function resetFlipped() {
    flippedCards = [];
    canFlip = true;
}

// 开始计时
function startTimer() {
    timer = setInterval(() => {
        seconds++;
        timerDisplay.textContent = seconds;
    }, 1000);
}

// 显示胜利消息
function showWinMessage() {
    clearInterval(timer);

    // 创建遮罩层
    const overlay = document.createElement('div');
    overlay.className = 'overlay';
    document.body.appendChild(overlay);

    // 创建胜利消息
    const winMessage = document.createElement('div');
    winMessage.className = 'win-message';
    winMessage.innerHTML = `
        <h2>🎉 恭喜获胜！</h2>
        <p>你用了 ${moves} 步，花了 ${seconds} 秒完成游戏</p>
        <button onclick="this.parentElement.previousElementSibling.remove(); this.parentElement.remove(); initGame();">再来一局</button>
    `;
    document.body.appendChild(winMessage);

    // 显示动画
    setTimeout(() => {
        overlay.classList.add('show');
        winMessage.classList.add('show');
    }, 10);
}

// 重新开始按钮
restartBtn.addEventListener('click', initGame);

// 页面加载时初始化
document.addEventListener('DOMContentLoaded', initGame);
