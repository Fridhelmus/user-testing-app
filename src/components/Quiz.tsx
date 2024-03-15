import React, { Dispatch, SetStateAction, useContext, useEffect, useState } from 'react'
import Result from './Result'
import { IQuestion } from './types/types'
import { AuthContext, IAuthContext } from '../context/AuthContext'

interface IQuiz {
  currentTest: number
  counter: number
  correct: number
  completed: boolean
  loading: boolean
  setCorrect: Dispatch<SetStateAction<number>>
  setСompleted: Dispatch<SetStateAction<boolean>>
  onClickVariant: () => void
}

const Quiz = ({
  currentTest,
  counter,
  onClickVariant,
  setCorrect,
  correct,
  completed,
  setСompleted,
  loading,
}: IQuiz) => {
  const { user } = useContext<IAuthContext>(AuthContext)
  const [questions, setQuestions] = useState<IQuestion[]>([])

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        setQuestions([])
        const response = await fetch(`api/test/${currentTest}`)
        const result = await response.json()
        setQuestions(result)
      }
    }

    fetchData()
  }, [currentTest, user])

  if (!user) {
    return <div>Ready for testing ?</div>
  }

  if (!questions.length || loading) {
    return <div>Loading...</div>
  }

  const question = questions[counter]
  const percentage = Math.round((counter / questions.length) * 100)

  function onClickHandler(index: number) {
    if (index === question.correct) {
      setCorrect(++correct)
    }
    onClickVariant()
  }

  return (
    <>
      {counter !== questions.length && !completed ? (
        <>
          <div className='progress'>
            <div
              style={{ width: `${percentage}%` }}
              className='progress__inner'></div>
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
        <Result
          correct={correct}
          counter={counter}
          completed={completed}
          setСompleted={setСompleted}
          questions={questions}
          currentTest={currentTest}
        />
      )}
    </>
  )
}

export default Quiz
