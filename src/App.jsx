import  {useState} from 'react'
import {clsx} from "clsx"
import { languages } from './language'
export default function AssemblyEndgame(){
  const[currentWord , setCurrentWord]= useState("react");
  const[guessedLetters,setGuessedLetters] = useState([]);
  const alphabet ="abcdefghijklmnopqrstuvwxyz"
  const languageElements=languages.map(
    lang=>{
      const styles = {
            backgroundColor: lang.backgroundColor,
            color: lang.color
        }
      return(
         <span style={styles} id={lang.name} className='chips'>{lang.name}</span>
      )
    }
  )
  function addGuessedLetters(letter){
      setGuessedLetters(prevLetters =>
        prevLetters.includes(letter) ? prevLetters : [...prevLetters,letter])
  }

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
    <button key={letter} className={className}
      onClick={()=>addGuessedLetters(letter)}>{letter.toUpperCase()
      }
      </button>
    )
  }  
  )


  return(
      <main>
        <header>
          <h1>Assembly: Endgame</h1>
                <p>Guess the word within 8 attempts to keep the 
                programming world safe from Assembly!</p>
        </header>
        <section className='game-status'>
          <h2>you win!</h2>
          <p>Well done! 🎉</p>
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
        <button className="new-game">New Game</button>
      </main>
  )
}
