import React, { useRef, useState } from 'react'
import './Quiz.css'
import {data} from '../../assets/data'

function Quiz() {
  let [index ,setIndex] = useState(0)
  let [question,setQuestion] = useState(data[index])
  let[lock,setLock] = useState(false)
  let [score,setScore] = useState(0)
  let [result,setResult] = useState(false)

  let option1 = useRef(null)
  let option2 = useRef(null)
  let option3 = useRef(null)
  let option4 = useRef(null)

  let option_array = [option1,option2,option3,option4]

  const checkans = (e,ans)=>{
    if (lock===false) {
      if (question.ans===ans) {
        e.target.classList.add("correct")
        setLock(true)
        setScore(prev=>prev+1)
      } else {
        e.target.classList.add("wrong")
        setLock(true)
        option_array[question.ans-1].current.classList.add("correct")
      }
    }

  }
  const next_que = () =>{
    if (lock===true) {
      if (index===data.length-1) {
        setResult(true)
        return 0
      }
      setIndex(++index)
      setQuestion(data[index])
      setLock(false)
      option_array.map((option)=>{
        option.current.classList.remove("wrong")
        option.current.classList.remove("correct")
        return null
      })  
    }
  }

  const reset =()=>{
    setIndex(0)
    setQuestion(data[0])
    setScore(0)
    setLock(false)
    setResult(false)

  }
  return (
    <div className='container'>
        <h1>Quiz App</h1>
        <hr/>
        {result?<></>:<>
          <p>{index + 1}. {question.question}</p>
        <ul>
          <li ref={option1} onClick={(e)=>{checkans(e,1)}}>{question.option1}</li>
          <li ref={option2} onClick={(e)=>{checkans(e,2)}}>{question.option2}</li>
          <li ref={option3}onClick={(e)=>{checkans(e,3)}}>{question.option3}</li>
          <li ref={option4}onClick={(e)=>{checkans(e,4)}}>{question.option4}</li>
        </ul>
        <button onClick={next_que}>Next</button>
        <p className='index'>{index+1} of {data.length} question</p>
        </>}
        {result?<>
        <h2>you scored {score} out of {data.length}</h2>
        <button onClick={reset}>Reset</button>
        </>:<></>}
    </div>
  )
}

export default Quiz

