const field = document.querySelectorAll("#field")
const currentTurn = document.querySelector("#playerTurn")
const winMessage = document.getElementById("winMessage")
const show = document.getElementById("winnAnnounce")
const hideBoard = document.getElementById("table")
const friend = document.getElementById("friend")


let player = "X"
let playFriend = false
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
  if(victory == false) {
    yourTurn = player
    player == "X"? player = "O" : player = "X"
    currentTurn.innerText === "X turn"? currentTurn.innerText = "O turn" : currentTurn.innerText = "X turn"
  }
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
      console.log(`victory ${player}`)
      break
    }
  }
  if(!currentBoard.includes('')) {announce('TIE')}
  if(victory) {
    announce(player == "X"? 'Player X Won' : 'Player O Won')
  }
}


function announce(vitorioso) {
  // esconder o tabuleiro.
  hideBoard.classList.add("hide")
  currentTurn.classList.add("hide")
  
  // mostre o anuncio de vitoria.
  show.classList.remove("hide")
  winMessage.innerText =  vitorioso
}

function aiTurn() {
  if(currentBoard.includes('') & victory == false & playFriend == false) {
    do {
      aiPlay = Math.floor(Math.random()*currentBoard.length)
    } while(currentBoard[aiPlay] != "")
    
    field[aiPlay].innerText = player
    updateBoard(aiPlay)
    verifyWinn()
    updatePlayer()
    console.log(`aiTurn ${player}`)
  } 
}

field.forEach((replace, index) => {
  replace.addEventListener('click', () => {
    replace.innerText = player
    updateBoard(index)
    verifyWinn()
    updatePlayer()
    aiTurn()
  })
})

// ========================================================================== //

function reset() {
  currentBoard = ['', '', '', '', '', '', '', '', '']
  victory = false
  if(player == "O") {updatePlayer()}
  field.forEach((tile => {
    tile.innerText = "";
  }))
}

function friendOn() {
  playFriend = !playFriend
  playFriend? friend.innerText = "Play with AI" : friend.innerText = "Play with Friend"
  reset()
}

function playAgain() {
  // Hide the winn message and show again the board
  hideBoard.classList.remove("hide")
  currentTurn.classList.remove("hide")
  show.classList.add("hide")

  // Reset board
  reset()
}