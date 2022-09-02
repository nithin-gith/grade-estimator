import { useState } from 'react'
import style from '../styles/choosen_list.module.css'


export default function ChoosenList(props){
    // console.log(props)
    const [styled,setstyled] = useState([{},{},{},{},{},{},{}])
    function handleClickLink(e,props,i){
        props.setgrade(e,props)
        let newstyled = [{},{},{},{},{},{},{}]
        newstyled[i]={
            "backgroundColor":"gray",
            "border":"none",
            "borderRadius":"5px"
        }
        setstyled(newstyled)
        console.log(styled[i])
    }

    return(
        <div  className={style.choosen_list}>
            <div>
                <button className={style.but} onClick={props.func}> - </button>
                {props.name} | {props.credits} 
            </div>
            <div>
                <button style = {styled[0]} className={style.grade} onClick={(e)=>handleClickLink(e,props,0)} >EX</button>
                <button style = {styled[1]} className={style.grade} onClick={(e)=>handleClickLink(e,props,1)} >A</button>
                <button style = {styled[2]} className={style.grade} onClick={(e)=>handleClickLink(e,props,2)} >B</button>
                <button style = {styled[3]} className={style.grade} onClick={(e)=>handleClickLink(e,props,3)} >C</button>
                <button style = {styled[4]} className={style.grade} onClick={(e)=>handleClickLink(e,props,4)} >D</button>
                <button style = {styled[5]} className={style.grade} onClick={(e)=>handleClickLink(e,props,5)} >P</button>
                <button style = {styled[6]} className={style.grade} onClick={(e)=>handleClickLink(e,props,6)} >F</button>
            </div>
        </div>
    )
}