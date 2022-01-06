const field = document.querySelectorAll("#field")
const currentTurn = document.querySelector("#playerTurn")

let player = "X"
let victory = false
let currentBoard = ['', '', '', '', '', '', '', '', '']
const allWinnsConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
]


// Updates the player turn and the message above the board
function updatePlayer() {
  yourTurn = player
  player == "X"? player = "O" : player = "X"
  currentTurn.innerText === "X turn"? currentTurn.innerText = "O turn" : currentTurn.innerText = "X turn"
}

// Saves the values of each player play
function updateBoard(index) {
  currentBoard[index] = player
}

// Compare all the possiblities of winning with the current stage of the board. At the end, calls announce sending the value that decide each one won the game, or tie.
function verifyWinn() {
  for(i = 0; i < 8; i++) {
    const oneWinnCondition = allWinnsConditions[i]
    const x = currentBoard[oneWinnCondition[0]]
    const y = currentBoard[oneWinnCondition[1]]
    const z = currentBoard[oneWinnCondition[2]]
    
    if(x === '' || y === '' || z === '') { continue }
    if(x === y & y === z) {
      victory = true
      break
    }
  }
  if(!currentBoard.includes('')) {announce('TIE')}
  if(victory) {
    announce(player == "X"? 'playerXWon' : 'playerOWon')
  }
}


function announce() {
  
}

field.forEach((replace, index) => {
  replace.addEventListener('click', () => {
    replace.innerText = player
    updateBoard(index)
    verifyWinn()
    updatePlayer()
  })
})