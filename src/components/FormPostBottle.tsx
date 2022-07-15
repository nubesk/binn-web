import { useState, useEffect } from 'react';
import SelectID from './SelectID';
import InputMessage from './InputMessage';
import ApiClient from '../api_client';

type FormPostBottleProps = {
  ids: Array<string>;
  useIdHandler: (id: string) => void;
}

const defaultSelectedID = "select for using a id";

export default function FormPostBottle(props: FormPostBottleProps): JSX.Element {
  const [ message, setMessage ] = useState<string>("");
  const [ selectedID, setSelectedID ] = useState<string>(defaultSelectedID);
  const [ disabled, setDisabled ] = useState<boolean>(true);
  const client = ApiClient;

  useEffect(() => {
    if (props.ids.length === 0) {
      setSelectedID(defaultSelectedID)
      setDisabled(true);
    } else if (props.ids.length === 1) {
      setSelectedID(props.ids[0]);
      setDisabled(false);
    }
  }, [props.ids])

  const onSubmitHandler = (event: any) => {
    if (disabled || selectedID === defaultSelectedID) {
      event.preventDefault();
      return;
    }

    setDisabled(true);
    client.post(message, selectedID).then(() => {
      console.log(selectedID);
      props.useIdHandler(selectedID);
      setMessage("");
      setDisabled(false);
    }).catch((err: Error) => {
      console.error(err);
      setDisabled(false);
    })
    event.preventDefault()
  }

  return (
    <form onSubmit={ onSubmitHandler }>
      <label>
        Message
        <InputMessage message={ message } setMessage={ setMessage }/>
      </label>
      <label>
      <SelectID ids={ props.ids } selectedID={ selectedID } setSelectedID={ setSelectedID }/>
      </label>
      <input type="submit" value="Send" disabled={ disabled }/>
    </form>
  );
}
