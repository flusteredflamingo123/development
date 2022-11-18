import { useState, useEffect } from 'react'

import Card from './Card'
import Menu from './Menu'

import './App.css';

function App() {
  const allWords = ["QUICKEN","QUINCE","QUICK","NECK","NICE","NICK","NUKE","CUE","ICE","INK","KIN","UNI","QI","IN"];

  const [shownWords, setShownWords] = useState(allWords);
  const [sortType, setSortType] = useState("score");
  const [aggregated, setAggregated] = useState([]);
  

  const filterWords = (letters) => {
    let filteredWords = allWords
    letters.forEach(letter => 
      filteredWords = filteredWords.filter(word => word.indexOf(letter) !== -1)
    )
    setShownWords(sortWords(sortType, filteredWords))
  };

  const letterScores = new Map([['A', 1],['B', 3],['C', 3],['D', 2],['E', 1],['F', 4],['G', 2],['H', 4],['I', 1],['J', 8],['K', 5],['L', 1],
  ['M', 3],['N', 1],['O', 1],['P', 3],['Q', 10],['R', 1],['S', 1],['T', 1],['U', 1],['V', 4],['W', 4],['X', 8],['Y', 4],['Z', 10]]);

  const calculatePoints = (word) => {
    let score = 0;
    for (let i = 0; i < word.length; i++) {
      const letter = word.charAt(i);
      score += letterScores.get(letter);
    }
    return score;
  };

  const sortWords = (property, inputWords) => {
    let words = [...inputWords];
    if (property === "score") {
      words.sort((a, b) => (
        calculatePoints(b) - calculatePoints(a)
      ));
    } else if (property === "length") {
      words.sort((a, b) => (
        b.length - a.length
      ));
    }
    return words;
  };

  useEffect(() => setShownWords(sortWords(sortType, shownWords)), [sortType]);

  const aggregate = (word) => {
    let index = aggregated.findIndex((e) => e === word);
    if (index === -1) {
      setAggregated([...aggregated, word]);
    } else {
      setAggregated(aggregated.slice(0, index).concat(aggregated.slice(index + 1)));
    }
  };

  const reset = () => {
    setSortType("score");
    setShownWords(sortWords("score", allWords));
    setAggregated([]);
    
  }

  


  return (
    <div>
      <h1> Scrabble Word Picker</h1>
      <div id="content">
        
        <div id="menu-column">
          <Menu letters={['Q','U','I','C','K','E','N'].sort()} filter={filterWords} sort={setSortType} reset={reset} aggregated={aggregated} aggregatedScore={aggregated.reduce((prev, curr) => (prev + calculatePoints(curr)), 0)}/>
        </div>
        <div id="cards">
          {shownWords.map((word, index) => (
            // <Card word={word} image={require('./images/' + word.toLowerCase() + '.png')} score={calculatePoints} key={index}></Card>
            <Card word={word} image={require('./images/word.png')} score={calculatePoints(word)} aggregate={() => aggregate(word)} aggregated={aggregated.includes(word)} key={index}></Card>
          ))}

        </div>
      </div>
    </div>
  );
}

export default App;
