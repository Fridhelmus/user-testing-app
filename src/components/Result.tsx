import React, { Dispatch, SetStateAction, useContext, useEffect } from 'react'
import { IQuestion } from './types/types'
import { AuthContext, IAuthContext } from '../context/AuthContext'

interface IResult {
  correct: number
  counter: number
  completed: boolean
  setСompleted: Dispatch<SetStateAction<boolean>>
  questions: IQuestion[]
  currentTest: number
}

const Result = ({
  correct,
  counter,
  completed,
  setСompleted,
  questions,
  currentTest,
}: IResult) => {
  const { user } = useContext<IAuthContext>(AuthContext)

  useEffect(() => {
    async function sendResultsToServer(
      email: string,
      testId: number,
      mark: number,
    ) {
      try {
        const response = await fetch('/api/result', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email,
            testId,
            mark,
          }),
        })

        if (response.status === 201) {
          setСompleted(true)
        } else {
          console.error('error on sending result:', response.statusText)
        }
      } catch (error) {
        if (error instanceof Error) {
          console.error('error on sending result:', error.message)
        }
      }
    }

    if (user && !completed && counter === questions.length) {
      sendResultsToServer(user, currentTest, correct)
    }
  }, [user, completed, counter, questions, currentTest])

  return (
    <div className='result'>
      <img src='https://cdn-icons-png.flaticon.com/512/2278/2278992.png' />
      <h2>
        You have guessed {correct} answers out of {questions.length}
      </h2>
      <a href='/'>
        Try again
      </a>
    </div>
  )
}

export default Result
