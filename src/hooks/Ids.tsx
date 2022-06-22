import React, { SetStateAction, useState, useEffect } from 'react';
import { Bottle } from '../api_client';

type IdsType = Array<string>;
type useIdHandlerType = (id: string) => void;

export default function Ids(bottles: Array<Bottle>): [IdsType, useIdHandlerType] {
    const [ids, setIds] = useState<Array<string>>([]);

    useEffect(() => {
        if (bottles.length == 0) return;
        const ids_ = ids.slice();
        ids_.push(bottles[bottles.length - 1].id);
        setIds(ids_);
    }, [bottles])
    
    const useIdHandler = (id: string) => {
        setIds(ids.filter((id_: string) => id_ !== id));
    }
    
    return [ids, useIdHandler]
}
