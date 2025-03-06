function switchKeysAndValues<T extends number | string | symbol, V extends number | string | boolean> (obj : Record<T, V>) : Record<string, T> {
    const reversed : Record<string, T> = {} as Record<string, T>;

    for(const key in obj) {
        const value = obj[key];
        if(typeof value == 'string') {
            reversed[value] = key;
        } else {
            reversed[value.toString()] = key;
        }
    }

    return reversed;
}



const obj = {
    'a' : 'b',
    'c' : 'd',
    'g' : 1,
    "Ad" : 324
}

console.log(switchKeysAndValues(obj))