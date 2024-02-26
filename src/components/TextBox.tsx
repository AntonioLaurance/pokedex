import './TextBox.css'

// Like a struct in C (attributes without methods)
interface TextBoxProps{
    placeholder?: string;
}

function TextBox(props: TextBoxProps){
    return(
        <input type="text" placeholder={props.placeholder}>

        </input>
    )
}

export default TextBox;