import { useState, useEffect } from 'react';
import ApiClient from '../api_client';

type FormPostBottleProps = {
  ids: Array<string>;
  useIdHandler: (id: string) => void;
}

export default function FormPostBottle(props: FormPostBottleProps): JSX.Element {
  const [ message, setMessage ] = useState<string>("");
  const [ idx, setIdx ] = useState<number | null>(null);
  const [ disabled, setDisabled ] = useState<boolean>(true);
  const client = new ApiClient();

  const options = props.ids.length == 0
        ? (<option>"select for using a id"</option>)
        : props.ids.map((id: string, idx_: number) => {
          const selected = idx_ === idx;
          return (
            <option value={ idx_ } selected={ selected }>{ id }</option>
          );
        });

  useEffect(() => {
    if (props.ids.length === 0) {
      setIdx(null);
    } else if (props.ids.length === 1) {
      setIdx(0);
      setDisabled(false);
    }
  }, [props.ids])

  const onSubmitHandler = (event: any) => {
    if (disabled || idx === null) {
      event.preventDefault();
      return;
    }

    setDisabled(true);
    const id = props.ids[idx];
    client.post(message, id).then(() => {
      props.useIdHandler(id);
      setMessage("");
      if (props.ids.length !== 0) {
        setIdx(0);
      }
      setDisabled(false);
    }).catch((err: Error) => {
      console.error(err);
      setDisabled(false);
    })
    event.preventDefault()
  }

  const onChangeMessageHandler = (event: any) => {
    setMessage(event.target.value);
  }

  const onChangeIdHandler = (event: any) => {
    setIdx(event.target.value)
  }

  return (
    <form onSubmit={ onSubmitHandler }>
      <label>
        Message
        <input type="text" value={ message } onChange={ onChangeMessageHandler }/>
      </label>
      <label>
        <select onChange={ onChangeIdHandler }>
          { options }
        </select>
      </label>
      <input type="submit" value="Send" disabled={ disabled }/>
    </form>
  );
}
