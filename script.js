const boardElement = document.getElementById('board');
let currentPlayer = 'X';
let boardState = ['', '', '', '', '', '', '', '', ''];

function renderBoard() {
    boardElement.innerHTML = '';
    boardState.forEach((cell, index) => {
        const cellElement = document.createElement('div');
        cellElement.className = 'cell';
        cellElement.textContent = cell;
        cellElement.addEventListener('click', () => makeMove(index));
        boardElement.appendChild(cellElement);
    });
}

function makeMove(index) {
    if (boardState[index] === '') {
        boardState[index] = currentPlayer;
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        saveGame();
        renderBoard();
        checkWinner();
    }
}

function checkWinner() {
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];
    
    for (const combination of winningCombinations) {
        const [a, b, c] = combination;
        if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
            alert(`Победитель: ${boardState[a]}`);
            resetGame();
            return;
        }
    }
    
    if (!boardState.includes('')) {
        alert('Ничья!');
        resetGame();
    }
}

function saveGame() {
    localStorage.setItem('ticTacToeGame', JSON.stringify({
        currentPlayer,
        boardState
    }));
}

function loadGame() {
    const savedGame = localStorage.getItem('ticTacToeGame');
    if (savedGame) {
        const game = JSON.parse(savedGame);
        currentPlayer = game.currentPlayer;
        boardState = game.boardState;
    }
}

function resetGame() {
    currentPlayer = 'X';
    boardState = ['', '', '', '', '', '', '', '', ''];
    saveGame();
    renderBoard();
}

window.onload = () => {
    loadGame();
    renderBoard();
};
