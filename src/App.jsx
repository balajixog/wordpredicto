import  {useState} from 'react'
import {clsx} from "clsx"
import { languages } from './language'
import { getFarewellText } from './utils';  
import confetti from "canvas-confetti";

// import Confetti from 'react-confetti'
import { useEffect } from "react";
export default function AssemblyEndgame(){
  // State values
  const[currentWord , setCurrentWord]= useState("react");
  const[guessedLetters,setGuessedLetters] = useState([]);
  

  const wrongGuessCount = guessedLetters.filter(letter => !currentWord.includes(letter)).length

      // Derived values
    //     const wrongGuessCount = 
    //     guessedLetters.filter(letter => !currentWord.includes(letter)).length   //it stores number of wrong guesses put it  in the array 
    // console.log(wrongGuessCount)
    const numGuessesLeft = languages.length - 1
    const lastGuessedLetter = guessedLetters[guessedLetters.length - 1]
    const isLastGuessIncorrect = lastGuessedLetter && !currentWord.includes(lastGuessedLetter)
    
    // Static values
  const alphabet ="abcdefghijklmnopqrstuvwxyz"
  const languageElements=languages.map(
    (lang,index)=>{
      const styles = {
            backgroundColor: lang.backgroundColor,
            color: lang.color
        }
        // const className = clsx("chip", wrongGuessCount > index && "lost")     another way to write
      return(
         <span style={styles} id={lang.name} className={`chip ${wrongGuessCount > index ? 'lost' : ''}`}>{lang.name}</span>   //write the classname={className}
      )
    }
  )
  function addGuessedLetters(letter){
      setGuessedLetters(prevLetters =>
        prevLetters.includes(letter) ? prevLetters : [...prevLetters,letter])

        
  }
     const isGameWon = currentWord.split("").every(letter => guessedLetters.includes(letter))
     const isGameLost = wrongGuessCount >= languages.length-1
     const isGameOver = isGameWon || isGameLost
     const letterElements = currentWord.split("").map((letter,index)=>(
    <span key={index}>{guessedLetters.includes(letter)?letter.toUpperCase():""}</span>
  ))
 
  const keyboardElements=alphabet.split("").map(letter=>{
    const isGuessed=guessedLetters.includes(letter)
    const isCorrect= isGuessed && currentWord.includes(letter)
    const isWrong=  isGuessed && !currentWord.includes(letter)

    const className=clsx(
      {
        correct: isCorrect,
        wrong: isWrong
      }
    )
    
  
    return(
    <button disabled={isGameOver} 
    aria-disabled={guessedLetters.includes(letter)}
    aria-label={`Letter ${letter}`}
    key={letter} 
    className={className} 
    onClick={()=>addGuessedLetters(letter)}>{letter.toUpperCase()
      }
      </button>
    )
  }  
  )

  

  const gameStatusClass=clsx("game-status",{
    won: isGameWon,
    lost: isGameLost,
    farewell: !isGameOver && isLastGuessIncorrect
  })
     
  // function renderGameStatus() {
  //       if (!isGameOver) {
  //           return null
  //       }

  //       if (isGameWon) {
  //           return (
  //               <>
  //                   <h2>You win!</h2>
  //                   <p>Well done! 🎉</p>
  //               </>
  //           )
  //       } else {
  //           return (
  //               <>
  //                   <h2>Game over!</h2>
  //                   <p>You lose! Better start learning Assembly 😭</p>
  //               </>
  //           )
  //       }
  // }

      function renderGameStatus() {
        if (!isGameOver && isLastGuessIncorrect) {
            return (
                <p 
                    className="farewell-message"
                >
                    {getFarewellText(languages[wrongGuessCount - 1].name)}
                </p>
            )
        }

        if (isGameWon) {
            return (
                <>
                    <h2>You win!</h2>
                    <p>Well done! 🎉</p>
                </>
            )
        } 
        if (isGameLost) {
            return (
                <>
                    <h2>Game over!</h2>
                    <p>You lose! Better try again😭</p>
                </>
            )
        }
        
        return null
    }

//firework confetti
  useEffect(() => {
  if (!isGameWon) return;

  const duration = 2 * 1000;
  const end = Date.now() + duration;

  (function frame() {
    confetti({
      particleCount: 5,
      angle: 60,
      spread: 55,
      origin: { x: 0 }
    });
    confetti({
      particleCount: 5,
      angle: 120,
      spread: 55,
      origin: { x: 1 }
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  })();
}, [isGameWon]);


  return(
      <main>
      {/* {isGameWon && <Confetti />} */}
        <header>
          <h1>Assembly: Endgame</h1>
                <p>Guess the word within 8 attempts to keep the 
                programming world safe from Assembly!</p>
        </header>
        <section className={gameStatusClass} 
        aria-live="polite" 
        role="status" >
                {renderGameStatus()}
            </section>
            {/* Combined visually-hidden aria-live region for status updates */}
         <section 
                className="sr-only" 
                aria-live="polite" 
                role="status"
            >
              <p>
                    {currentWord.includes(lastGuessedLetter) ? 
                        `Correct! The letter ${lastGuessedLetter} is in the word.` : 
                        `Sorry, the letter ${lastGuessedLetter} is not in the word.`
                    }
                    You have {numGuessesLeft} attempts left.
                </p>
                <p>Current word: {currentWord.split("").map(letter => 
                guessedLetters.includes(letter) ? letter + "." : "blank.")
                .join(" ")}</p>
            
            </section>    
        <section className='language-chips'>
          {languageElements}
        </section>
        <section className='word'>
         {letterElements}
        </section>
        <section className='keyboard'>
        {keyboardElements}
        </section>
        {isGameOver && <button className="new-game">New Game</button>}
      </main>
  )
}
