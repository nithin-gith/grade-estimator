import style from './styles/app.module.css'
import {courses_data} from './courses_data_for_react.js'
import React, {useState} from 'react';

function App() {

  return (
    <div className="App">
      <div >Grade Estimator</div>
      <div>ENTER COURSE</div>
      <div className={style.inputbox} >
          <input className={style.input}  />
          <div >
              <ul>
              {courses_data.map((course)=>{
                  return (<li key ={course.id}>{course.name} - {course.credits}</li>)
              })}
              </ul>
          </div>
      </div>
    </div>
  );
}

export default App;
