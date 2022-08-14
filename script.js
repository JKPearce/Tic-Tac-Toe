"use strict";

const Player = (sign, name) => {
    this.sign = sign;
    this.name = name;

    const getSign = () => {
        return sign;
    };

    const setName = (playerName) => {
        name = playerName;
    }

    const getPlayerName = () => {
        return name;
    }

    return { getSign, getPlayerName, setName }
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
    const setNameForm = document.getElementById('setPlayerNames');
    const player1 = Player("X", "Player 1");
    const player2 = Player("O", "Player 2");
    let round = 1;
    let gameOver = false;

    const playRound = (index) => {
        gameBoard.setField(index, getCurrentPlayer().getSign());

        console.log(getCurrentPlayer().getSign());

        if (checkWinner()) {
            displayController.displayWinner(`${getCurrentPlayer().getPlayerName()} WINS!`);
            gameOver = true;
            return;
        }
        if (round === 9) {
            displayController.displayWinner("DRAW!");
            gameOver = true;
            return;
        }
        round++;
        //msg has to be AFTER round increment to get next player
        displayController.setMessage(`Player ${getCurrentPlayer().getPlayerName()} Turn`);
    }

    const checkWinner = () => {
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

        return winningLines.some(combination => {
            return combination.every(index => {
                return gameBoard.getField(index) === getCurrentPlayer().getSign();
            });
        });
    };

    const getGameOverStatus = () => {
        return gameOver;
    };

    setNameForm.addEventListener('submit', event =>{
        event.preventDefault();
        player1.setName(document.getElementById('player1Name').value);
        player2.setName(document.getElementById('player2Name').value);
        const modals = document.querySelectorAll('.modal.active');
        modals.forEach(modal => {
            displayController.closeModal(modal);
        })
    });
    

    const getCurrentPlayer = () => {
        return round % 2 === 1 ? player1 : player2;
    }

    const reset = () => {
        round = 1;
        gameOver = false;
    };

    return { playRound, getGameOverStatus, reset}
})();

const displayController = (() => {
    const boardElements = document.querySelectorAll('.board-section');
    const clearBtn = document.querySelector('.clear-btn');
    const gameMsg = document.querySelector('.game-message');
    const winningMsgOverlay = document.getElementById('winnerOverlay');
    const restartBtn = document.getElementById('restartButton');
    const openModalButtons = document.querySelectorAll('[data-modal-target]');
    const closeModalButtons = document.querySelectorAll('[data-close-button]');
    const overlay = document.getElementById('overlay');

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

    const displayWinner = (winner) => {
        winningMsgOverlay.classList.add('show');
        winningMsgOverlay.firstChild.textContent = winner;
    }

    clearBtn.addEventListener('click', () => {
        gameBoard.clear();
        gameController.reset();
        updateBoard();
        setMessage("Player X's turn");
    });

    restartBtn.addEventListener('click', () => {
        gameController.reset();
        gameBoard.clear();
        updateBoard();
        winningMsgOverlay.classList.remove('show');
    });

    openModalButtons.forEach(button => {
        button.addEventListener('click', () => {
            const modal = document.querySelector(button.dataset.modalTarget);
            openModal(modal);
        })
    });
    
    closeModalButtons.forEach(button => {
        button.addEventListener('click', () => {
            const modal = button.closest('.modal');
            closeModal(modal);
        })
    });
    
    overlay.addEventListener('click', () => {
        const modals = document.querySelectorAll('.modal.active');
        modals.forEach(modal => {
            closeModal(modal);
        })
    });
    
    function openModal(modal){
        if(modal == null) return;
        modal.classList.add('active');
        overlay.classList.add('active');
    }
    
    function closeModal(modal){
        if(modal == null) return;
        modal.classList.remove('active');
        overlay.classList.remove('active');
    }

    return { setMessage, displayWinner, closeModal};
})();

