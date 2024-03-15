import React, {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react'
import { ITest } from './types/types'
import { AuthContext, IAuthContext } from '../context/AuthContext'

interface ITestList {
  setСurrentTest: Dispatch<SetStateAction<number>>
  setСompleted: Dispatch<SetStateAction<boolean>>
  setCounter: Dispatch<SetStateAction<number>>
  setCorrect: Dispatch<SetStateAction<number>>
  setLoading: Dispatch<SetStateAction<boolean>>
}

const TestList = ({
  setСurrentTest,
  setСompleted,
  setCounter,
  setCorrect,
  setLoading,
}: ITestList) => {
  const { user } = useContext<IAuthContext>(AuthContext)
  const [tests, setTests] = useState<ITest[]>([])

  const clickHandler = (testId: number) => {
      setСurrentTest(testId)
      setСompleted(false)
      setCounter(0)
      setCorrect(0)

      const fetchMark = async () => {
        setLoading(true)
        try {
          const response = await fetch(`/api/usertest/${user}/${testId}`)
          if (response.ok) {
            const data = await response.json()
            if (data.mark !== undefined) {
              setСompleted(true)
              setCorrect(data.mark)
            }
          }
        } catch (error) {
          console.error('Error test loading from API:', error)
        } finally {
          setLoading(false)
        }
      }

      fetchMark()
  }

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        try {
          const response = await fetch('api/test')
          const result = await response.json()
          setTests(result)
        } catch (error) {
          console.error('Error test loading from API:', error)
        }
      }
    }

    fetchData()
  }, [user])

  if (!user) {
    return <div>Please, sing up to load tests...</div>
  }

  if (!tests.length) {
    return <div>Loading...</div>
  }

  return (
    <>
      <ul>
        {tests.length ? (
          tests.map((test) => (
            <li
              key={test.id}
              className='listdetail-item'
              onClick={()=>(clickHandler(test.id))}>
              {test.description}
            </li>
          ))
        ) : (
          <div>Tests not found</div>
        )}
      </ul>
    </>
  )
}

export default TestList
