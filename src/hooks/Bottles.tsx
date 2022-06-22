import { useState, useEffect } from 'react';

import ApiClient, { Bottle } from '../api_client'


export default function Bottles(): Array<Bottle> {
    const [bottles, setBottles] = useState<Array<Bottle>>([]);
    const [tick, setTick] = useState<number>(0);
    const client = new ApiClient();
    let isInitialized = false;
    
    useEffect(() => {
        if (isInitialized) return
        isInitialized = true;

        client.get().then((bottle: Bottle) => {
            setBottles(bottles.concat([bottle]));
        }).catch((err: Error) => {
            console.error(err);
            setTimeout(() => {
                setTick(tick+1);
            }, 5000)
        });
    }, [bottles, tick])

    return bottles;
}
