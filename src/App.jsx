import React from 'react';
import { Routes,Route } from 'react-router-dom';
import Home from './components/Home';
import CreateNewQuiz from './components/CreateNewQuiz';
import Mcq_single from './components/quizTypes/Mcq_single';
import Mcq_multiple from './components/quizTypes/Mcq_multiple';
import Short_answer from './components/quizTypes/Short_answer';
import MyQuizes from './components/MyQuizes';
import PlayQuiz from './components/PlayQuiz'
import QuizGame from './components/QuizGame';
import QuizResult from './components/QuizResult';

function App(){
  
  return(
    <>
    
   <Routes>
    <Route path="/" element={<Home/>}/>
    <Route path='/create-quiz' element={<CreateNewQuiz/>}/>
    <Route path='/create-quiz/Mcq_single' element={<Mcq_single/>}/>
    <Route path='/create-quiz/Mcq_multiple' element={<Mcq_multiple/>}></Route>
    <Route path='/create-quiz/Short_answer' element={<Short_answer/>}></Route>
    <Route path='/MyQuizes' element={<MyQuizes/>}></Route>
    <Route path='/PlayQuiz' element={<PlayQuiz/>}></Route>
    <Route path="/QuizGame/:id" element={<QuizGame/>} />
    <Route path='/QuizResult' element={<QuizResult/>}> </Route>
    <Route path='*' element={<h1 className='text-3xl text-red-600 font-bold'>404 Not Found</h1>}/>
   </Routes>
    </>
  )
}

export default App;