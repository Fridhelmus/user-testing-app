import React, { Dispatch, ReactNode, SetStateAction } from 'react'
import { questions } from '../data'
import Result from './Result'

interface IProps {
  counter: number
  correct: number
  setCounter: Dispatch<SetStateAction<number>>
  setCorrect: Dispatch<SetStateAction<number>>
  onClickVariant: (index: number) => void
}

const Quiz = ({
  counter,
  setCounter,
  onClickVariant,
  setCorrect,
  correct,
}: IProps) => {
  const question = questions[counter]
  const percentage = Math.round((counter / questions.length) * 100)

  function onClickHandler(index: number) {
    if (index === question.correct) {
      setCorrect(++correct)
    }
    onClickVariant(index)
  }

  return (
    <>
      {counter !== questions.length ? (
        <>
          <div className="progress">
            <div
              style={{ width: `${percentage}%` }}
              className="progress__inner"
            ></div>
          </div>
          <h1>{question.title}</h1>
          <ul>
            {question.variants.map((e, i) => {
              return (
                <li onClick={() => onClickHandler(i)} key={i}>
                  {e}
                </li>
              )
            })}
          </ul>
        </>
      ) : (
        <Result correct={correct} questions={questions} />
      )}
    </>
  )
}

export default Quiz
