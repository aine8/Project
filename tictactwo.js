window.addEventListener('DOMContentLoaded', () => {
    const box = Array.from(document.querySelectorAll('.box'));
    const displayofPlayer = document.querySelector('.display-player');
    const winnerDisplay = document.querySelector('.winner');
    const restartButton = document.getElementById('Restart');
    const confirmNamesButton = document.getElementById('confirmNames');
    
    let board = ['', '', '', '', '', '', '', '', ''];
    let currentPlayer = 'X';
    let isGameActive = true;
    
    const PLAYERUNO_WON = 'PLAYERUNO_WON';
    const PLAYERDOS_WON = 'PLAYERDOS_WON';
    const TIE = 'Owemjiee! It is a TIE';
    
    const winning = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    
    let playerXName = "Player X";
    let playerOName = "Player O";
    
    function ValidationofResult() {
        let roundWon = false;
        for (let z = 0; z <= 7; z++) {
            const winCondi = winning[z];
            const ha = board[winCondi[0]];
            const he = board[winCondi[1]];
            const ho = board[winCondi[2]];
            if (ha === '' || he === '' || ho === '') {
                continue;
            }
            if (ha === he && he === ho) {
                roundWon = true;
                break;
            }
        }
    
        if (roundWon) {
            announce(currentPlayer === 'X' ? PLAYERDOS_WON : PLAYERUNO_WON);
            isGameActive = false;
            return;
        }
    
        if (!board.includes(''))
            announce(TIE);
    }
    
    const announce = (type) => {
        switch (type) {
            case PLAYERUNO_WON:
                winnerDisplay.textContent = `${playerOName} Won!`;
                break;
            case PLAYERDOS_WON:
                winnerDisplay.textContent = `${playerXName} Won!`;
                break;
            case TIE:
                winnerDisplay.textContent = "It's a Tie!";
                break;
        }
    
        winnerDisplay.style.display = 'block';
        isGameActive = false;
    };
    
    const isValidAction = (box) => {
        if (box.innerText === 'X' || box.innerText === 'O') {
            return false;
        }
    
        return true;
    };
    
    const updateBoard = (index) => {
        board[index] = currentPlayer;
    };
    
    const changePlayer = () => {
        displayofPlayer.classList.remove(`player${currentPlayer}`);
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        displayofPlayer.innerText = `${currentPlayer === 'X' ? playerXName : playerOName}'s turn`;
        displayofPlayer.classList.add(`player${currentPlayer}`);
    };
    
    const action = (box, index) => {
        if (isValidAction(box) && isGameActive) {
            box.innerText = currentPlayer;
            box.classList.add(`player${currentPlayer}`);
            updateBoard(index);
            ValidationofResult();
            changePlayer();
        }
    };
    
    const RESTARTBoard = () => {
        box.forEach(tile => {
            tile.innerText = '';
            tile.classList.remove('playerUNO');
            tile.classList.remove('playerDOS');
        });
    
        board = ['', '', '', '', '', '', '', '', ''];
        isGameActive = true;
        winnerDisplay.style.display = 'none';
    
        // Remove the class for the current player before changing
        displayofPlayer.classList.remove(`player${currentPlayer}`);
        changePlayer();
    };

    confirmNamesButton.addEventListener('click', () => {
        playerXName = document.getElementById('playerXName').value || "Player X";
        playerOName = document.getElementById('playerOName').value || "Player O";
        displayofPlayer.innerText = `${currentPlayer === 'X' ? playerXName : playerOName}'s turn`;
        document.querySelector('.PlayerNames').classList.add('hide');
    });
    
    box.forEach((box, index) => {
        box.addEventListener('click', () => action(box, index));
    });
    
    restartButton.addEventListener('click', RESTARTBoard);
});
