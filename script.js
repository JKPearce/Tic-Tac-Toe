"use strict";

const Player = (sign) => {
    this.sign = sign;

    const getSign = () => {
        return sign;
    };

    return { getSign }
};

//create gameBoard MODULE
const gameBoard = (() => {
    const board = ["", "", "", "", "", "", "", "", ""];

    const setField = (index, sign) => {
        board[index] = sign;
    };

    const getField = (index) => {
        return board[index];
    };

    const clear = () => {
        for (let i = 0; i < board.length; i++) {
            board[i] = "";
        }
    };

    return { setField, getField, clear };
})();

const gameController = (() => {
    const player1 = Player("X");
    const player2 = Player("O");
    let round = 1;
    let gameOver = false;

    const playRound = (index) => {
        gameBoard.setField(index, getCurrentPlayerSign());

        if (checkWinner(index)) {
            displayController.setMessage(`${getCurrentPlayerSign()} WINS!`);
            gameOver = true;
            return;
        }
        if (round === 9) {
            displayController.setMessage("DRAW!");
            gameOver = true;
            return;
        }

        round++;
        //msg has to be AFTER round increment to get next player
        displayController.setMessage(`Player ${getCurrentPlayerSign()}'s Turn`);
        console.log(round);
    }

    const checkWinner = (i) => {
        //TODO Add logic to check if there is a winner
        const winningLines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];

        return winningLines.filter((combination) => combination.includes(i)).some((possibleCombination) => possibleCombination.every((index) => gameBoard.getField(index) === getCurrentPlayerSign()));
    };

    const getGameOverStatus = () => {
        return gameOver;
    };

    const getCurrentPlayerSign = () => {
        return round % 2 === 1 ? player1.getSign() : player2.getSign();
    };

    const reset = () => {
        round = 1;
        gameOver = false;
    };

    return { playRound, getGameOverStatus, reset }
})();

const displayController = (() => {
    const boardElements = document.querySelectorAll('.board-section');
    const clearBtn = document.querySelector('.clear-btn');
    const gameMsg = document.querySelector('.game-message');

    boardElements.forEach(section => {
        section.addEventListener('click', () => {
            if (section.textContent != '' || gameController.getGameOverStatus()) return;
            gameController.playRound(parseInt(section.dataset.index));
            updateBoard();
        });
    });

    const updateBoard = () => {
        for (let index = 0; index < boardElements.length; index++) {
            boardElements[index].textContent = gameBoard.getField(index);
        }
    };

    const setMessage = (message) => {
        gameMsg.textContent = message;
    };

    clearBtn.addEventListener('click', () => {
        gameBoard.clear();
        gameController.reset();
        updateBoard();
        setMessage("Player X's turn");
    });

    return { setMessage };
})();

