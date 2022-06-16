import { useState } from "react";
import "./styles.css";

const quotes = [
  "When you have eliminated the impossible, whatever remains, however improbable, must be the truth.",
  "There is nothing more deceptive than an obvious fact.",
  "I ought to know by this time that when a fact appears to be opposed to a long train of deductions it invariably proves to be capable of bearing some other interpretation.",
  "I never make exceptions. An exception disproves the rule.",
  "What one man can invent another can discover.",
  "Nothing clears up a case so much as stating it to another person.",
  "Education never ends, Watson. It is a series of lessons, with the greatest for the last."
];

export default function App() {
  const todayTime = new Date().getTime();
  const [text, setText] = useState("");
  const [quotevalue, setQuoteValue] = useState("");
  const [matchTextIndex, setMatchTextIndex] = useState(null);
  const [isShowMsg, setShowMsg] = useState(false);
  const [isTypingError, showTextBoxError] = useState(true);
  const [startTime, setStartTime] = useState(null);
  const words = quotevalue.split(" ");

  const handleChange = (e) => {
    setText(e.target.value.trim());
  };

  const handleKeypress = (e) => {
    const { keyCode } = e;
    if (words[matchTextIndex].startsWith(text)) {
      showTextBoxError(false);
    } else {
      showTextBoxError(true);
    }
    if (keyCode === 32) {
      if (text === words[matchTextIndex]) {
        setMatchTextIndex(matchTextIndex + 1);
        setText("");
      }
      if (matchTextIndex === words.length - 1) {
        setShowMsg(true);
        setText("");
      }
    }
  };

  const handleClick = () => {
    setShowMsg(false);
    setMatchTextIndex(0);
    const quoteIndex = Math.floor(Math.random() * quotes.length);
    setQuoteValue(quotes[quoteIndex]);
    setStartTime(todayTime);
  };

  return (
    <div className="App">
      <h1>Typing Game!</h1>
      <h2>Click on start button to get the text</h2>
      <button onClick={handleClick}>Start</button>
      {isShowMsg ? (
        <p>{`Congratulations!, you have completed typing for today in ${
          (todayTime - startTime) / 1000
        } sec.`}</p>
      ) : (
        words.length > 0 &&
        words.map((word, index) => (
          <span
            key={`span ${index}`}
            className={matchTextIndex === index ? "highlight" : ""}
          >
            {word} &nbsp;
          </span>
        ))
      )}
      <input
        type="text"
        value={text}
        onChange={handleChange}
        onKeyDown={handleKeypress}
        className={isTypingError && text ? "input-error" : ""}
      />
    </div>
  );
}
