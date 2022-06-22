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

export default class ApiClient {
    get(): Promise<Bottle> {
        return fetch(
            [BASE_URL, ENDPOINT_PATH].join(''),
            {
                method: 'GET',
            }
        ).then((res) => {
            if (res.status !== 200) {
                return new Promise((_, reject) => {
                    reject(new Error("the status code is not 200"))
                })
            }
            return res.json();
        })
            .then((json) => {
                return {
                    id: json.id,
                    message: json.message,
                    expiredAt: json.expired_at,
                };
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
