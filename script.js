const closeButton = document.querySelector(".close");
const modalContainer = document.querySelector(".modalcontainer");
const resetButton = document.querySelector("#retry");

closeButton.addEventListener("click", () => {
  closeModal();
});

resetButton.addEventListener("click", () => {
  Game.resetGame();
  DisplayController.renderBoard();
  closeModal();
});

const closeModal = () => {
  modalContainer.style.display = "none";
};

const Gameboard = (() => {
    let board = ['', '', '', '', '', '', '', '', ''];
  
    const setCell = (index, symbol) => {
        if (index > board.length || board[index] !== '') return false;
        board[index] = symbol;
        return true;
    };
  
  
    const reset = () => {
        board = ['', '', '', '', '', '', '', '', ''];
    };
  
    const getBoard = () => [...board];
  
    return { setCell, reset, getBoard };
  })();
  
const Player = (name, symbol) => {
    return { name, symbol };
};
  
const Game = (() => {
    const playerX = Player('Player 1', 'X');
    const playerO = Player('Player 2', 'O');

    const winConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
      ];

    let currentPlayer = playerX;
  
    const switchPlayer = () => {
        currentPlayer = currentPlayer === playerX ? playerO : playerX;
    };
  
    const playTurn = (cellIndex) => {
        if (Gameboard.setCell(cellIndex, currentPlayer.symbol)) {
            DisplayController.renderBoard();

            if (checkWin()) {
                setTimeout(() => {
                  modalContainer.style.display = "block";
                }, 10);
            } 
            else if (checkTie()) {
                setTimeout(() => {
                    alert("It's a tie!");
                }, 10);
            } 
            else {
                switchPlayer();
            }

            return true;
        }

        return false;
    };
    
    const checkWin = () => {
        const board = Gameboard.getBoard();

        return winConditions.some((condition) => {
            return condition.every((index) => {
                return board[index] === currentPlayer.symbol;
            });
        });
    };
  
    const checkTie = () => {
        return Gameboard.getBoard().every((cell) => cell !== '');
    };
  
    const resetGame = () => {
      Gameboard.reset();
      currentPlayer = playerX;
    };
  
    return { playTurn, checkWin, checkTie, resetGame };
  })();
  
const DisplayController = (() => {
    const cells = document.querySelectorAll('.cell');
  
    const renderBoard = () => {
      const board = Gameboard.getBoard();

      cells.forEach((cell, index) => {
        cell.textContent = board[index];
      });
    };
  
    cells.forEach((cell, index) => {
      cell.addEventListener('click', () => {
        Game.playTurn(index);
      });
    });
  
    return { renderBoard };
  })();