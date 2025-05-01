type typePick<T> = keyof T
type returnPick<T, A extends typePick<T> = never> = {
    [K in keyof T as K extends A ? never : K] : T[K]
}


function pickObjectKeys<T extends {}>(obj : T, arr : typePick<T>[]) :  returnPick<T, typePick<T>> {
    let res: Record<string, any> = {};
    for (const key in obj) {
        if(!arr.includes(key)) {
            res[key] = obj[key];
        }
    }
    return res;
}

const user = {
    name : 'vaas',
    age : 21,
    level : 3,
    skills : ['typescript', 'baseball']
}



console.log(pickObjectKeys(user, ['level', 'name']));
