// import React, { useState, useEffect, useRef } from "react";
// import { FaUndo } from "react-icons/fa";

// function TypingApp() {
//   const [currentWord, setCurrentWord] = useState("Start typing...");
//   const [keysPressed, setKeysPressed] = useState(0);
//   const [incorrectKeysPressed, setIncorrectKeysPressed] = useState(0);
//   const [accuracy, setAccuracy] = useState(100);
//   const [timeLeft, setTimeLeft] = useState(300);
//   const inputRef = useRef(null);

//   useEffect(() => {
//     setCurrentWord(generateRandomWord());
//   }, []);

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setTimeLeft((prevTime) => prevTime - 1);
//     }, 1000);

//     if (timeLeft === 0) {
//       clearInterval(timer);
//       const calculateAccuracy = () => {
//         const totalKeyPresses = keysPressed + incorrectKeysPressed;
//         const accuracyPercentage =
//           (1 - incorrectKeysPressed / totalKeyPresses) * 100;
//         setAccuracy(Math.round(accuracyPercentage));
//       };
//       calculateAccuracy();
//     }

//     return () => {
//       clearInterval(timer);
//     };
//   }, [timeLeft, keysPressed, incorrectKeysPressed]);

//   const handleKeyPress = (event) => {
//     const { key } = event;
//     setKeysPressed(keysPressed + 1);

//     if (key === currentWord[0]) {
//       setCurrentWord(currentWord.slice(1));
//       if (currentWord.length === 1) {
//         setCurrentWord(generateRandomWord());
//       }
//     } else {
//       setIncorrectKeysPressed(incorrectKeysPressed + 1);
//     }
//   };

//   const generateRandomWord = () => {
//     const words = ["a", "s", "d", "f", "j", "k", "l", ";"];
//     const randomIndex = Math.floor(Math.random() * words.length);
//     return words[randomIndex];
//   };

//   const resetTypingApp = () => {
//     setCurrentWord(generateRandomWord());
//     setKeysPressed(0);
//     setIncorrectKeysPressed(0);
//     setAccuracy(100);
//     setTimeLeft(300);
//     inputRef.current.value = "";
//     inputRef.current.focus();
//   };

//   const renderKeys = () => {
//     return currentWord.split("").map((character, index) => {
//       let keyClass = "key";
//       if (index === 0) {
//         keyClass += " currentKey";
//       }
//       return (
//         <span key={index} className={keyClass}>
//           {character}
//         </span>
//       );
//     });
//   };

//   return (
//     <div className="main">
//       <h1 className="header">Touch Typing Application</h1>
//       <div className="wordBox">{renderKeys()}</div>
//       <div className="features">
//         <p>Keys Pressed: {keysPressed}</p>
//         <p>Accuracy: {accuracy}%</p>
//         <p>Time Left: {timeLeft} seconds</p>
//       </div>
//       <div className="inputContainer">
//         <input
//           ref={inputRef}
//           type="text"
//           onKeyPress={handleKeyPress}
//           className="inputBox"
//         />
//         <button onClick={resetTypingApp} className="resetButton">
//           <FaUndo />
//         </button>
//       </div>
//     </div>
//   );
// }

// export default TypingApp;
import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaUndo } from 'react-icons/fa';
import {
  setCurrentWord,
  incrementKeysPressed,
  incrementIncorrectKeysPressed,
  setAccuracy,
  setTimeLeft,
  resetTypingApp,
} from './actions/typingActions';

function TypingApp() {
  const dispatch = useDispatch();
  const currentWord = useSelector((state) => state.currentWord);
  const keysPressed = useSelector((state) => state.keysPressed);
  const incorrectKeysPressed = useSelector((state) => state.incorrectKeysPressed);
  const accuracy = useSelector((state) => state.accuracy);
  const timeLeft = useSelector((state) => state.timeLeft);
  const inputRef = useRef(null);

  useEffect(() => {
    dispatch(setCurrentWord(generateRandomWord()));
  }, [dispatch]);

  useEffect(() => {
    const timer = setInterval(() => {
      dispatch(setTimeLeft());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [dispatch]);

  useEffect(() => {
    if (timeLeft === 0) {
      calculateAccuracy();
    }
  }, [timeLeft]);

  const generateRandomWord = () => {
    const words = ['a', 's', 'd', 'f', 'j', 'k', 'l', ';'];
    const randomIndex = Math.floor(Math.random() * words.length);
    return words[randomIndex];
  };

  const calculateAccuracy = () => {
    const totalKeyPresses = keysPressed + incorrectKeysPressed;
    const accuracyPercentage = (1 - incorrectKeysPressed / totalKeyPresses) * 100;
    dispatch(setAccuracy(Math.round(accuracyPercentage)));
  };

  const handleKeyPress = (event) => {
    const { key } = event;
    dispatch(incrementKeysPressed());

    if (key === currentWord[0]) {
      dispatch(setCurrentWord(currentWord.slice(1)));
      if (currentWord.length === 1) {
        dispatch(setCurrentWord(generateRandomWord()));
      }
    } else {
      dispatch(incrementIncorrectKeysPressed());
    }
  };

  const handleReset = () => {
    dispatch(resetTypingApp(generateRandomWord()));
    inputRef.current.value = '';
    inputRef.current.focus();
  };

  const renderKeys = () => {
    return currentWord.split('').map((character, index) => {
      let keyClass = 'key';
      if (index === 0) {
        keyClass += ' currentKey';
      }
      return (
        <span key={index} className={keyClass}>
          {character}
        </span>
      );
    });
  };

  const formatTime = (time) => {
    return time >= 0 ? time.toString() : '0';
  };

  return (
    <div className='main'>
      <h1 className='header'>Touch Typing Application</h1>
      <div className='wordBox'>{renderKeys()}</div>
      <div className='features'>
        <p>Keys Pressed: {keysPressed}</p>
        <p>Accuracy: {accuracy}%</p>
        <p>Time Left: {formatTime(timeLeft)} seconds</p>
      </div>
      <div className='inputContainer'>
        <input ref={inputRef} type='text' onKeyPress={handleKeyPress} className='inputBox' />
        <button onClick={handleReset} className='resetButton'>
          <FaUndo className='undo' />
        </button>
      </div>
    </div>
  );
}

export default TypingApp;


