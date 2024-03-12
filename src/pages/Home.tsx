import React, { useState } from 'react'
import Quiz from '../components/Quiz';

const Home = () => {
  let [counter, setCounter] = useState(0);
  let [correct, setCorrect] = useState(0);

  const onClickVariant = (index: number) => {
    setCounter(++counter)
  };

  return (
    <>
      <section id="home">
        <div className="container">
          <div className="home_content">
            <div className="quiz">
              <Quiz
                correct={correct}
                setCorrect={setCorrect}
                onClickVariant={onClickVariant}
                counter={counter}
                setCounter={setCounter}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Home