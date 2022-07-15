import { useState, useEffect, useRef } from 'react';

import ApiClient, { Bottle } from '../api_client'


export default function Bottles(): Array<Bottle> {
    const isFirstRender = useRef(true);
    const [bottles, setBottles] = useState<Array<Bottle>>([]);
    const [n, setN] = useState<number>(0);
    const client = ApiClient;

    useEffect(() => {
        if (isFirstRender.current) {
            client.get((bottle: Bottle) => {
                setBottles((bottles: Array<Bottle>) => [...bottles, bottle]);
            });
            isFirstRender.current = false;
        } else {
            return;
        }
    }, []);

    return bottles;
}
