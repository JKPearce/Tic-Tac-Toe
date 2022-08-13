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

    const playRound = (index) => {
        gameBoard.setField(index, getCurrentPlayerSign());
    }

    const getCurrentPlayerSign = () => {
        //TODO Add logic to swap current player
        return player1.getSign();
    }

    return {playRound}
})();

const displayController = (() =>{
    const boardElements = document.querySelectorAll('.board-section');
    const clearBtn = document.querySelector('.clear-btn');

    boardElements.forEach(section => {
        section.addEventListener('click', () => {
            //TODO add logic to check if there is text already
            gameController.playRound(parseInt(section.dataset.index));
            updateBoard();
        });
    });
    
    const updateBoard = () => {
        for (let index = 0; index < boardElements.length; index++) {
            boardElements[index].textContent = gameBoard.getField(index);
        }
    };

    clearBtn.addEventListener('click', () => {
        gameBoard.clear();
        updateBoard();
    });

    return {};
})();

