"use strict";

const Player = (sign) =>{
    this.sign = sign;

    const getSign = () => {
        return sign;
    };

    return {getSign}
};

//create gameBoard MODULE
const gameBoard = (() => {
    const board = ["","","","","","","","",""];

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

    return {setField, getField, clear};
})();// it has brackets at the end making it an IIFE (Immediately Invoked Function Expression).

const gameController = (() => {
    const player1 = Player("X");
    const player2 = Player("O");
    let round = 1;

    const playRound = (index) => {
        gameBoard.setField(index, getCurrentPlayerSign());
        round++;
        //msg has to be AFTER round increment to get next player
        displayController.setMessage(`Player ${getCurrentPlayerSign()}'s Turn`);
        console.log(round);
    }

    const getCurrentPlayerSign = () => {
        return round % 2 === 1 ? player1.getSign() : player2.getSign();
    }

    const reset = () =>{
        round = 1;
    }
    return {playRound, reset}
})();

const displayController = (() =>{
    const boardElements = document.querySelectorAll('.board-section');
    const clearBtn = document.querySelector('.clear-btn');
    const gameMsg = document.querySelector('.game-message');

    boardElements.forEach(section => {
        section.addEventListener('click', () => {
            if(section.textContent != '') return;
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

    return {setMessage};
})();

