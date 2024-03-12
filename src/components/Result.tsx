import React from 'react'
import { IQuestion } from '../data'

interface IResult {
  correct: number
  questions: IQuestion[]
}

const Result = ({ correct, questions }: IResult) => {
  return (
    <div className="result">
      <img src="https://cdn-icons-png.flaticon.com/512/2278/2278992.png" />
      <h2>
        You have guessed {correct} answers out of {questions.length}
      </h2>
      <a href="/">
        <button>Try again</button>
      </a>
    </div>
  );
};

export default Result
