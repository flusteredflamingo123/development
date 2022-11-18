import './App.css';
import Button from '@mui/material/Button';
import { useState } from 'react'

function Card(props) {

  const [aggText, setAggText] = useState("Add to List")

  return (
    <div className="card">
      <img src={props.image}></img>
      <h2>{props.word}</h2>
      <p className="description">
        Score: {props.score} <br></br>
        Length: {props.word.length} <br></br>
        Letters used: {props.word.split("").sort().join(", ")}
      </p>
      <Button style={{backgroundColor: "darkblue"}}
      variant="contained" onClick={() => {props.aggregate()}}>{props.aggregated ? "Remove from List" : "Add to List"}</Button>
    </div>
  );
}

export default Card;
