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
        console.log(board[index])
    };

    const getField = (index) => {
        return board[index];
    };
    
    const clear = () => {
        for (let i = 0; i < board.length; i++) {
            board[i] = "";
        }
    };

    return {getField,setField,clear, board}
})();// it has brackets at the end making it an IIFE (Immediately Invoked Function Expression).

const gameController = (() => {
    const player1 = Player("X");
    // const player2 = Player("O");

    const playRound = (elementIndex) = () => {
        gameBoard.setField(elementIndex, player1.getSign());
    }

    return {playRound}
})();

const displayController = (() =>{
    const boardElements = document.querySelectorAll('.board-section');
    const clearBtn = document.querySelector('.clear-btn');

    boardElements.forEach(section => {
        section.addEventListener('click', () => {
            gameController.playRound(parseInt(section.dataset.index));
            updateBoard();
        });
    });
    
    const updateBoard = () => {
        for (let index = 0; index < boardElements.length; index++) {
            boardElements[index].textContent = gameBoard.getField(index);
        }
    };

    clearBtn.addEventListener('click', gameBoard.clear);


})();

