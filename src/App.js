import style from './styles/app.module.css'
import {courses_data} from './courses_data_for_react.js'
import React, {useState,useRef} from 'react';
import ListItem from './components/list_item';
import Fuse from 'fuse.js'

function App() {
  
  const inputBox= useRef(null)
  const resultbox = useRef(null)
  const options= {
    shouldSort: true,
    keys:['name','course_code'],
    useExtendedSearch: true,
    includeScore: true,
  }
  const fuse= new Fuse(courses_data,options)
  const [result,setresult]=useState(fuse.search([]))
  function handlekeyup(){
    const results=fuse.search(inputBox.current.value)
    setresult(results)
  }

  // console.log(resultbox.current.value)
  return (
    <div className="App">
      <div >Grade Estimator</div>
      <div>ENTER COURSE</div>
      <div className={style.inputbox} >
          <input placeholder="Search Course Here" onKeyUp={handlekeyup}className={style.input} ref={inputBox}  />
          <div >
              <ul ref ={resultbox} className={style.result}>
                  {result.length===0?(<ListItem name = "No Results Found!"/>):result.map((course) => {
                      return <ListItem there = '1' key = {course.item.id} code ={course.item.course_code} name={course.item.name} credits={course.item.credits} />
                  })}
              </ul>
          </div>
      </div>
    </div>
  );
}

export default App;
