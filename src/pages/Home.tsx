import React, { useState } from 'react'
import Quiz from '../components/Quiz'
import TestList from '../components/TestList'

const Home = () => {
  const [currentTest, setCurrentTest] = useState(0)
  const [completed, setCompleted] = useState(false)
  const [loading, setLoading] = useState(false)
  let [counter, setCounter] = useState(0)
  let [correct, setCorrect] = useState(0)
  
  const onClickVariant = () => {
    setCounter(++counter)
  }

  return (
    <>
      <section id='home'>
        <div className='container'>
          <div className='home_content'>
            <TestList
              setСurrentTest={setCurrentTest}
              setСompleted={setCompleted}
              setCounter={setCounter}
              setCorrect={setCorrect}
              setLoading={setLoading}
            />
            <div className='quiz'>
              <Quiz
                currentTest={currentTest}
                correct={correct}
                setCorrect={setCorrect}
                onClickVariant={onClickVariant}
                counter={counter}
                completed={completed}
                setСompleted={setCompleted}
                loading={loading}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Home
