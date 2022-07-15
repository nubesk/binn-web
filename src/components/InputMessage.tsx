type InputMessageProps = {
    message: string;
    setMessage: React.Dispatch<React.SetStateAction<string>>;
}

export default function InputMessage(props: InputMessageProps) {
    const onChangeHandler = (event: any) => {
        props.setMessage(event.target.value);
    }
    return (
        <input type="text" value={ props.message } onChange={ onChangeHandler }/>
    );
}
