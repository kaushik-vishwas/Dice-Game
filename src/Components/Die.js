import React from 'react'

export default function Die(probs) {
  const styles = {
    backgroundColor: probs.isHeld ? "#59E391" : "white"
  }
  return (
    <div className='die-face' style={styles} onClick={probs.holdDice }>
        <h2 className='die-num'>{probs.value}</h2>
    </div>
  )
}
