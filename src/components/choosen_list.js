import { useState } from 'react'
import style from '../styles/choosen_list.module.css'
import ListItem from './list_item'

export default function ChoosenList(props){
    // console.log(props)
    const [styled,setstyled] = useState([{},{},{},{},{},{},{}])
    function changebg(e,i){
        setstyled(styled=>{
            styled[i]={backgroundColor:"#f5f5f5"}
        })
    }
    return(
        <div  className={style.choosen_list}>
            <div>
                <button className={style.but} onClick={props.func}> - </button>
                {props.name}
            </div>
            <div>
                <button styles = {styled[0]} className={style.grade} onClick={props.setgrade} >EX</button>
                <button styles = {styled[1]} className={style.grade} onClick={props.setgrade} >A</button>
                <button styles = {styled[2]} className={style.grade} onClick={props.setgrade} >B</button>
                <button styles = {styled[3]} className={style.grade} onClick={props.setgrade} >C</button>
                <button styles = {styled[4]} className={style.grade} onClick={props.setgrade} >D</button>
                <button styles = {styled[5]} className={style.grade} onClick={props.setgrade} >P</button>
                <button styles = {styled[6]} className={style.grade} onClick={props.setgrade} >F</button>
            </div>
        </div>
    )
}