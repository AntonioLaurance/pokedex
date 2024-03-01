import './Button.css';

interface ButtonProps{
    onClick?:() => void;
    color: string;
}

function Button(props: ButtonProps){
    return(
        <input className="btn" type="button" onClick={props.onClick}></input>
    )
}

export default Button;
