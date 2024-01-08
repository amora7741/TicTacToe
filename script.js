const Gameboard = (() => {
    let board = ['', '', '', '', '', '', '', '', ''];
  
    const setCell = (index, symbol) => {
      if (index > board.length || board[index] !== '') return false;
      board[index] = symbol;
      return true;
    };
  
    const getCell = (index) => board[index];
  
    const reset = () => {
      board = ['', '', '', '', '', '', '', '', ''];
    };
  
    const getBoard = () => [...board];
  
    return { setCell, getCell, reset, getBoard };
  })();
  
  const Player = (name, symbol) => {
    return { name, symbol };
  };
  
  const Game = (() => {
    const playerX = Player('Player 1', 'X');
    const playerO = Player('Player 2', 'O');
    let currentPlayer = playerX;
  
    const switchPlayer = () => {
      currentPlayer = currentPlayer === playerX ? playerO : playerX;
    };
  
    const playTurn = (cellIndex) => {
      if (Gameboard.setCell(cellIndex, currentPlayer.symbol)) {
        switchPlayer();
        return true;
      }
      return false;
    };
  
    const checkWin = () => {
    };
  
    const checkTie = () => {
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
        if (Game.playTurn(index)) {
          renderBoard();
        }
      });
    });
  
    const resetDisplay = () => {
    };
  
    return { renderBoard, resetDisplay };
  })();
  
  DisplayController.renderBoard();