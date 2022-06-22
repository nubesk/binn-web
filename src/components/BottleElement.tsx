import { Bottle } from '../api_client';


type BottleElementProps = {
    bottle: Bottle
}

export default function BottleElement(props: BottleElementProps): JSX.Element {
    return (
        <li className="BottleElement">
            <p>{ props.bottle.id }</p>
            <p>{ props.bottle.message.text ? props.bottle.message.text : "this is a empty bottle" }</p>
            <p>{ props.bottle.expiredAt.toString() }</p>
        </li>
    );
}
