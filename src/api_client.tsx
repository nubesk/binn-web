const BASE_URL = 'https://infinite-coast-03048.herokuapp.com';
const ENDPOINT_PATH = '/api/bottle';

export type Bottle = {
    id: string,
    message: Message,
    expiredAt: Date
}

export type Message = {
    text: string
}

class ApiClient {
    evtSource: EventSource
    
    constructor() {
        this.evtSource = new EventSource([BASE_URL, ENDPOINT_PATH].join(''));
    }
    
    get(callback: (bottle: Bottle) => void) {
        this.evtSource.addEventListener("bottle", (event: any) => {
            const json = JSON.parse(event.data);
            callback({
                id: json.id,
                message: json.message,
                expiredAt: json.expired_at,
            })
        });
    }

    post(message: string, id: string): Promise<Boolean>{
        return fetch(
            [BASE_URL, ENDPOINT_PATH].join(''),
            {
                method: 'POST',
                body: JSON.stringify({
                    'id': id,
                    'message': {
                        'text': message
                    }
                })
            }
        ).then((res) => {
            if (res.status !== 204) {
                return new Promise((_, reject) => {
                    reject(new Error("the status code is not 204"))
                })
            }
            return true;
        })
    }
}

export default new ApiClient;
