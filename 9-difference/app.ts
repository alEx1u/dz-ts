type difT<T extends {}, V extends {}> = Omit<T, keyof V>;

function difference<T extends {}, V extends {}>(a : T , b : V) : difT<T, V> {
    let res = [];
    for (const [key, value] of Object.entries(a)) {
        if(!Object.keys(b).includes(key)) {
            res.push([key, value])
        }
    } 
    return Object.fromEntries(res);
}

interface IA {
    a : number,
    b : string
}

interface IB {
    a : number,
    c : boolean
}


let a : IA = {
    a : 8,
    b: 'go'
}
let b : IB = {
    a : 3,
    c : true
}


console.log(difference(a, b))
