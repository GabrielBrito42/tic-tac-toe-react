import React, { useEffect, useState } from 'react'
import './App.css';

function App() {

  const [board, setBoard] = useState(['','','','','','','','',''])
  const [winner, setWinner] = useState(false)
  const [tie, setTie] = useState(false)
  const [player1, setPlayer1] = useState({
    turn: true,
    symbol: 'X',
  })
  const [player2, setPlayer2] = useState({
    turn: false,
    symbol: 'O',
  })

  useEffect(() => {
    
  }, [board])

  const handleButtonClick = (index) => {
    const symbol = player1.turn ? player1.symbol : player2.symbol
    board[index] = symbol 
    player1.turn ? setPlayer1({...player1, turn: false}) : setPlayer1({...player1, turn: true})
    player2.turn ? setPlayer2({...player2, turn: false}) : setPlayer2({...player2, turn: true})
    handleWinner()
  }

  const handleWinner = () => {
    const firstLine = board[0] !== '' && board[0] === board[1] && board[0] === board[2]
    const secondLine = board[3] !== '' && board[3] === board[4] && board[3] === board[5]
    const thirdLine = board[6] !== '' && board[6] === board[7] && board[6] === board[8]
    const rightDiagonal = board[0] !== '' && board[0] === board[4] && board[0] === board[8]
    const leftDiagonal = board[2] !== '' && board[2] === board[4] && board[2] === board[6]
    const firstColumn = board[0] !== '' && board[0] === board[3] && board[0] === board[6]
    const secondColumn = board[1] !== '' && board[1] === board[4] && board[1] === board[7]
    const thirdColumn = board[2] !== '' && board[2] === board[5] && board[2] === board[8]

    const noWinner = board[0] !== '' && board[1] !== '' && board[2] !== '' && board[3] !== '' && board[4] !== '' 
      && board[5] !== '' && board[6] !== '' && board[7] !== '' && board[8] !== ''

    if(firstLine || secondLine || thirdLine || rightDiagonal || leftDiagonal || firstColumn || secondColumn || thirdColumn){
      setWinner(true)
    }
    if(noWinner){
      setTie(true)
    }
  }

  const resetGame = () => {
    setBoard(['','','','','','','','',''])
    setWinner(false)
    setPlayer1({turn: true, symbol:'X'})
    setPlayer2({turn: false, symbol: 'O'})
  }

  return(
    <div className="container">
      <br />
      <h1>Jogo da Velha</h1>
      <br /><br />
      <div className="row justify-content-md-center margin">
        {board.map((value, index) => (
          <div className={index === 0 || index === 3 || index === 6 ? 'col-4' : 'col-4 colum-border'} key={index}>
            <button onClick={() => handleButtonClick(index)} className={winner || value ? "ended" : ""}>{value}</button>
            {index < 6 ? <hr /> : ""}
          </div>
        ))}
      </div>
      <br /><br />
      {winner || tie ? 
        <div className="win">
          {winner ? !player1.turn  ? <h2>O jogador 1 ganhou</h2> : <h2>O jogador 2 ganhou</h2> : <h2>Ninguem Ganhou</h2>}
          <button className="winnerButton" onClick={resetGame}>Jogar novamente ?</button>
        </div>
        : ""}
    </div>
  )
}
export default App;
