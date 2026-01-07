import  {useState} from 'react'
import {clsx} from "clsx"
import { languages } from './language'
import { getFarewellText } from './utils';  
import { getRandomWord } from './utils';
import Confetti from 'react-confetti';
import confetti from "canvas-confetti";
import { useEffect } from 'react';
export default function AssemblyEndgame(){
  // State values
  const[currentWord , setCurrentWord]= useState(() =>getRandomWord());
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


     const letterElements = currentWord.split("").map((letter,index)=>{
     const shouldRevealLetter = isGameLost || guessedLetters.includes(letter)
     const letterClassName = clsx(
            isGameLost && !guessedLetters.includes(letter) && "missed-letter"
        )
      return(
     <span key={index} className={letterClassName}>
                {shouldRevealLetter ? letter.toUpperCase() : ""}
     </span>
      )}
)
 
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

  function startNewGame() {
        setCurrentWord(getRandomWord())
        setGuessedLetters([])
    }

  const gameStatusClass=clsx("game-status",{
    won: isGameWon,
    lost: isGameLost,
    farewell: !isGameOver && isLastGuessIncorrect
  })
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
//for lost
  function antiConfetti() {
  confetti({
    particleCount: 500,
    spread: 60,
    angle: 90,
    gravity: 1.5,
    colors: ["#BA2A2A", "#000000"],
    shapes: ["circle"],
    origin: { y: 0.4 }  //gin: { x: 0.5, y: 0 }
  });
}

//emoji confetti
// function antiConfetti() {
//   const skull = confetti.shapeFromText({
//     text: "💀",
//     scalar: 2.2
//   });

//   confetti({
//     particleCount: 40,
//     angle: 90,
//     spread: 120,
//     gravity: 1.6,
//     origin: { y: 0 },
//     shapes: [skull]
//   });
// }


useEffect(() => {
  if (isGameLost) {
    antiConfetti();
  }
}, [isGameLost]);



  return(
      <main>
      {
                isGameWon && 
                    <Confetti
                        recycle={false}
                        numberOfPieces={2500}
                    />
            }
        <header>
          <h1>WORD PREDICTO !</h1>
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
        {isGameOver && <button className="new-game" onClick={startNewGame} >New Game</button>}
      </main>
  )
}
