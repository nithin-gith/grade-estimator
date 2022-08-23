import style from '../styles/list_item.module.css'

export default function ListItem(props){
    if(props.there ==='1'){
        return(
            <div className={style.list_item}>
            <a href='#'  className={style.list_link}>
                <div onClick={props.func} className={style.link_div}>{props.code} - {props.name} ({props.credits})</div>
            </a>
            </div>
        )
    }else{
        return(
            <a href='#'  className={style.list_link}>
                <div  className={style.link_div}> {props.name} </div>
            </a>
        )
    }
    
}