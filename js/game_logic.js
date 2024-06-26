let playerText = document.getElementById('playerText');
let restartBtn = document.getElementById('restartBtn');
let boxes = Array.from(document.getElementsByClassName('box'));
let winnerIndicator = getComputedStyle(document.body).getPropertyValue('--winning_background');

const o_TEXT = "O";
const x_TEXT = "X";
let currentPlayer = x_TEXT;
let spaces = Array(9).fill(null);

const startGame = () => {
    boxes.forEach(box => box.addEventListener('click', boxClicked))
}

function boxClicked(e) {
    const id = e.target.id;

    if (!spaces[id]) {
        spaces[id] = currentPlayer;
        e.target.innerText = currentPlayer;
        if (playerHasWon() !== false) {
            playerText.textContent = `${currentPlayer} Te vencio`;
            let winning_blocks = playerHasWon();
            winning_blocks.map(block => boxes[block].style.backgroundColor = winnerIndicator)
            boxes.forEach(box => box.removeEventListener('click', boxClicked))
            return;
        }
        currentPlayer = currentPlayer == x_TEXT ? o_TEXT : x_TEXT;
    }
}

const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

function playerHasWon() {
    for (const condition of winningCombos) {
        let [a, b, c] = condition
        if (spaces[a] && (spaces[a] == spaces[b] && spaces[a] == spaces[c])) {
            return [a, b, c]
        }
    }
    return false
}

restartBtn.addEventListener('click', restart);

function restart() {
    spaces.fill(null);

    boxes.forEach(box => {
        box.innerText = '';
        box.style.backgroundColor = '';
        box.addEventListener(`click`, boxClicked)
    })

    playerText.textContent = 'X_0';

    currentPlayer = x_TEXT;
}

startGame();