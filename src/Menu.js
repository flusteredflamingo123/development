import './App.css';
import { useState, useEffect } from 'react'
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';

function Menu(props) {
  const [checkedLetters, setCheckedLetters] = useState([...props.letters]);
  const [displayedSort, setDisplayedSort] = useState("score");
  const getBoxes = (letter, index) => (
    <FormControlLabel key={index} control={checkedLetters.includes(letter) ? <Checkbox checked/> : <Checkbox />} label={letter} onClick={
      () => {
        let index = checkedLetters.findIndex((e) => e === letter);
        if (index === -1) {
          props.filter([...checkedLetters, letter]);
          setCheckedLetters([...checkedLetters, letter]);
        } else {
          props.filter(checkedLetters.slice(0, index).concat(checkedLetters.slice(index + 1)));
          setCheckedLetters(checkedLetters.slice(0, index).concat(checkedLetters.slice(index + 1)));
        }
      }}/>
  );

  useEffect(() => setCheckedLetters([]), [])

  return (
    <div id="menu">
      <div id="top-menu">
        <div>
          <h3>Sort words:</h3>
            <RadioGroup value = {displayedSort}>
                <FormControlLabel value="score" 
                    control={<Radio />} label="Score" onClick={(event) => {setDisplayedSort(event.target.value); props.sort(event.target.value)}}/>
                <FormControlLabel value="length" 
                    control={<Radio />} label="Length" onClick={(event) => {setDisplayedSort(event.target.value); props.sort(event.target.value)}}/>
            </RadioGroup>
        </div>
        <div id="reset-container">
          <Button style={{backgroundColor: "darkblue", maxHeight:'40px', margin: "0.5rem"}}
          variant="contained" onClick={() => {props.reset(); setDisplayedSort("score"); setCheckedLetters([]); }}>Reset</Button>
        </div>
      </div>
      <h3>Filter words by letters used:</h3>
      <div id="boxes">
        <FormGroup>
          {props.letters.slice(0, Math.ceil(props.letters.length / 2)).map((letter, index) => (
            getBoxes(letter, index)
          ))}
        </FormGroup>
        <FormGroup>
          {props.letters.slice(Math.ceil(props.letters.length / 2)).map((letter, index) => (
            getBoxes(letter, index)
          ))}
        </FormGroup>
      </div>
      {props.aggregated.length === 0 ? <></> : <div>
        <h3>Word List:</h3>
        <div id="agg-lists">
          <ul>
            {props.aggregated.slice(0,Math.min(props.aggregated.length, 8)).map((word) => (
                <li>{word}</li>
            ))}
          </ul>
          {props.aggregated.length <= 8 ? <></> :
          <ul>
            {props.aggregated.slice(8).map((word) => (
                <li>{word}</li>
            ))}
          </ul>}
        </div>
        Total score of list: {props.aggregatedScore}
      </div>}
    </div>
  );
}

export default Menu;
