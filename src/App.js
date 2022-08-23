
import style from './styles/app.module.css'
import {courses_data} from './courses_data_for_react.js'
import React, {useState,useRef} from 'react';
import ListItem from './components/list_item';
import Fuse from 'fuse.js'
import ChoosenList from './components/choosen_list';

function App() {
  const inputBox= useRef(null)
  const resultbox = useRef(null)
  const options= {
    shouldSort: true,
    keys:['name','course_code'],
    useExtendedSearch: true,
    includeScore: true,
  }
  const [styles,setstyles]=useState({display:"none"})
  const [added,setadded]=useState([])

  // 0 is credits, 1 is grade points
  const [marks,setmarks]=useState({"tcredits":0,"tgradepoints":0})
  const [gp,setgp]=useState(0)
  const [sgpa,setsgpa]=useState(0)

  const fuse= new Fuse(courses_data,options)
  const [result,setresult]=useState(fuse.search([]))
  function handlekeyup(){
    const results=fuse.search(inputBox.current.value)
    setresult(results)
    if(inputBox.current.value.length===0)setstyles({display:"none"})
    if(inputBox.current.value!=0)setstyles({display:"block"})
  }
  function handleClickLink(e,props){
    console.log("clicked")
    props.grade=0
    marks.tcredits+=parseInt(props.credits)
    console.log(props)
    if(!added.includes(props)){
      setadded(added=>[...added,props])
    }
  }
  function removecourse(e,props){
    setadded(added=>added.filter(item=>item!==props))
    marks.tcredits-=parseInt(props.credits)
    marks.tgradepoints-=parseInt(props.credits)*props.grade
    setgp(marks.tgradepoints)
    console.log("removed")
  }
  function changegrade(e,course){
    console.log(course)
    marks.tgradepoints-=parseInt(course.credits)*course.grade
    var gs= e.target.innerHTML
    if(gs=="EX")course.grade=10
    if(gs=="A")course.grade=9
    if(gs=="B")course.grade=8
    if(gs=="C")course.grade=7
    if(gs=="D")course.grade=6
    if(gs=="P")course.grade=5
    if(gs=="F")course.grade=0
    marks.tgradepoints+=parseInt(course.credits)*course.grade
    setgp(marks.tgradepoints)
    console.log(marks)
  }
  return (
    <div className="App">
      <div >Grade Estimator</div>
      <div>ENTER COURSE</div>
      <div className={style.inputbox} >
          <input placeholder="Add Course Here" onKeyUp={handlekeyup}className={style.input} ref={inputBox}  />
          <div >
              <ul ref ={resultbox} style = {styles}className={style.result}>
                  {result.length===0?(<ListItem name = "No Results Found!"/>):result.map((course) => {
                      return <ListItem func = {event=>handleClickLink(event,course.item)} there = '1' key = {course.item.id} code ={course.item.course_code} name={course.item.name} credits={course.item.credits} />
                  })}
              </ul>
          </div>
      </div>
      
      <div className={style.choosen_list}>
            {added.map((course) => {
                return <ChoosenList  setgrade = {e=>changegrade(e,course)} func = {event=>removecourse(event,course)} key = {course.id} code ={course.course_code} name={course.name} credits={course.credits} />
            })}
      </div>
      <div>
        estimated SGPA : {Math.round(gp/marks.tcredits * 100) / 100}
      </div>
    </div>
  );
}

export default App;
