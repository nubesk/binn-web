import BottleElement from './BottleElement';
import { Bottle } from '../api_client';


type BottleListProps = {
    bottles: Array<Bottle>
}

export default function BottleList(props: BottleListProps): JSX.Element {
    const elements = props.bottles.map((bottle: Bottle) => {
        return (
            <BottleElement key={ bottle.id.toString() } bottle={ bottle }/>
        );
    });

    return (
        <ul className="BottleList">
            { elements }
        </ul>
    );
}
