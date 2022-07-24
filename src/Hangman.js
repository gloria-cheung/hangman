import { useState } from "react";
import { randomWord } from "./words";
import "./Hangman.css";
import img0 from "./0.jpg";
import img1 from "./1.jpg";
import img2 from "./2.jpg";
import img3 from "./3.jpg";
import img4 from "./4.jpg";
import img5 from "./5.jpg";
import img6 from "./6.jpg";

function Hangman(props) {
  const answer = randomWord();
  const [state, setState] = useState({ 
    nWrong: 0, 
    guessed: new Set(), 
    answer 
  });

  const defaultProps = {
    maxWrong: 6,
    images: [img0, img1, img2, img3, img4, img5, img6]
  };

  /** guessedWord: show current-state of word:
    if guessed letters are {a,p,e}, show "app_e" for "apple"
  */
  const guessedWord = function() {
    return (state.answer
      .split("")
      .map(ltr => (state.guessed.has(ltr) ? ltr : "_")));
  };

  /** handleGuest: handle a guessed letter:
    - add to guessed letters
    - if not in answer, increase number-wrong guesses
  */
  const handleGuess = function(evt) {
    let ltr = evt.target.value;
    setState(st => ({
      ...st,
      guessed: st.guessed.add(ltr),
      nWrong: st.nWrong + (st.answer.includes(ltr) ? 0 : 1)
    }));
  };

  /** generateButtons: return array of letter buttons to render */
  const generateButtons = function() {
    return "abcdefghijklmnopqrstuvwxyz".split("").map(ltr => (
      <button
        key={ltr}
        value={ltr}
        onClick={handleGuess}
        disabled={state.guessed.has(ltr)}
      >
        {ltr}
      </button>
    ));
  };

  const altText = `${state.nWrong} / ${defaultProps.maxWrong} guesses`

  const reset = function() {
    setState(st => ({
      guessed: new Set(),
      nWrong: 0,
      answer: randomWord()
    }));
  }

  const winningPhrase = "You win!";
  const losingPhrase = "You lose!";
  return (
    <div className='Hangman'>
        <h1>Hangman</h1>
        <img src={defaultProps.images[state.nWrong]} alt={altText} />
        <p>Guessed Wrong: {state.nWrong}</p>
        <p className='Hangman-word'>
          {guessedWord().join("") === state.answer && winningPhrase}
          {defaultProps.maxWrong > state.nWrong && guessedWord().join("") !== state.answer &&guessedWord()}
          {defaultProps.maxWrong <= state.nWrong && state.answer}
          </p>
        <p className='Hangman-btns'>
          {defaultProps.maxWrong > state.nWrong? generateButtons(): losingPhrase}
        </p>
        <button id="reset" onClick={reset}>Reset</button>
      </div>
  );
}

export default Hangman;