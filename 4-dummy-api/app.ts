import axios from 'axios';

type Role = 'user' | 'moderator' | 'admin';
type Gender = 'male' | 'female';

interface Address {
    address: string;
    city: string;
    state: string;
    stateCode: string;
    postalCode: string;
    coordinates: {
      lat: number;
      lng: number;
    };
    country: string;
}

interface RespondObj {
    id: number;
    firstName: string;
    lastName: string;
    maiderName: string;
    age: number;
    gender: Gender;
    email: string;
    phone: string;
    username: string;
    password: string | number;
    birthDate: string;
    image: string;
    bloodGroup: string;
    height: number;
    weight: number;
    eyeColor: string;
    hair: {
        color: string;
        type: string;
    };
    ip: string;
    address: Address;
    macAddress: string;
    university: string;
    bank: {
        cardExpire: string;
        cardNumber: string;
        cardType: string;
        currency: string;
        iban: string;
    };
    company: {
        department: string;
        name: string;
        title: string;
        address: Address;
      };
    ein: string;
    ssn: string;
    userAgent: string;
    crypto: {
        coin: string;
        wallet: string;
        network: string;
    };
    role: Role;
}

interface Respond {
    users: RespondObj[];
    total: number;
    skip: number;
    limit: number;
}


async function getResult() : Promise<Respond> {
    try {
        const request = await axios.get<Respond>('https://dummyjson.com/users')
        return request.data;
    } catch(e){
        console.log((e as Error).message);
        throw new Error((e as Error).message);
    }
}

async function main() {
    try {
        const result = await getResult();
        console.log(result.users[0])
    } catch(e) {
        console.error((e as Error).message);
    }
}

main();