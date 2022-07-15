import React, { useState, useEffect } from 'react';

type SelectIDProps = {
    ids: Array<string>;
    selectedID: string;
    setSelectedID: React.Dispatch<React.SetStateAction<string>>;
}

export default function SelectID(props: SelectIDProps): JSX.Element {
    const onChangeIDHandler = (event: any) => {
        props.setSelectedID(event.target.value);
    };

    const options = props.ids.length == 0
        ? (<option>{ props.selectedID }</option>)
        : props.ids.map((id: string) => {
            return (
                <option value={ id }>{ id }</option>
            );
        });
    
    return (
        <select onChange={ onChangeIDHandler } value={ props.selectedID }>
            { options }
        </select>
    )
}
