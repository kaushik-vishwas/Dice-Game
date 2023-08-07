import './App.css';
import React from "react";
import {nanoid} from 'nanoid';
import Confetti from "react-confetti";

import Die from './Components/Die';

function App() {
  
  const [dice, setDice] = React.useState(allNewDice());
  const [diceGame, setDiceGame] = React.useState(false)

  React.useEffect(()=>{
    const allHeld = dice.every(die=>die.isHeld)
    const firstValue = dice[0].value
    const AllSameValue = dice.every(die=>die.value===firstValue)
    if(allHeld&&AllSameValue){
      setDiceGame(true)
    }
  }, [dice])

  function generateNewDie(){
    return{
       value: Math.ceil(Math.random() * 6),
        isHeld: false,
        id: nanoid(),
    }
  }

  function allNewDice(){
    const newDice = []
    for(let i = 0; i<10; i++ ){
      newDice.push(generateNewDie());
    }
    return newDice
  }

  function rollDice(){
    if (!diceGame) {
      setDice(oldDice =>
        oldDice.map(die => {
          return die.isHeld ? die : generateNewDie();
        })
      );
    } else{
         setDiceGame(false);
         setDice(allNewDice());
    }
  }
  function holdDice(id){
    setDice(oldDice=>oldDice.map(die=>{
      return die.id===id? {...die, isHeld: !die.isHeld}:die
    }))
  }

  const diceElements = dice.map(die=> (<Die key={die.id} value={die.value} isHeld={die.isHeld} holdDice={()=>holdDice(die.id)}/>))
// console.log(allNewDice())

  return (




    <main className="App">
      {diceGame && <Confetti />}
      <h1 className='title'>Dice Game</h1>
      <p className='instructions'>Roll The Dice To Generate New Numbers and Hold the Same Number you Want</p>
      <div className='dice-container'>
        {diceElements}
      </div>
      <button className='roll-dice' onClick={rollDice}>
        {diceGame? "New Game" : "Roll"}
      </button>
    </main>
  );
}

export default App;
