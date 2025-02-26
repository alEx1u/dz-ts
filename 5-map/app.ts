type mapTypes = string | number | boolean;

class MyMap {
    private arrSize : number = 5;
    private arr : Array<[mapTypes, mapTypes][] | null> = [];

    constructor() {
        for(let i = 0; i < this.arrSize;i++) {
            this.arr.push(null);
        }
    };


    public logArr(arr : Array<any> = this.arr) : void {
        console.log('!Начало!')
        for(let i in arr) {
            if (Array.isArray(i)) {
                this.logArr(i);
            } 
            console.log(arr[i]);
        }
        console.log('!Конец!')
    } // Чтобы посмотреть насколько правильно



    private hashCalc(x : mapTypes) : number {
        if (typeof x == "number") {
            return x % this.arrSize;
        } else if(typeof x == "boolean") {
            return Number(x) % this.arrSize;
        } else {
            return x.split('').reduce((prev, curr) => prev + curr.charCodeAt(0), 0) % this.arrSize;
        }
    }


    set(key : mapTypes, value : mapTypes) : void {
        const hisHash = this.hashCalc(key);
        
        if(this.arr[hisHash] == null) {
            this.arr[hisHash] = []
            this.arr[hisHash].push([key, value])
        } else {
            let found = false;
            for(let i = 0;i < this.arr[hisHash].length;i++) {
                if(this.arr[hisHash][i][0] == key) {
                    console.log('Есть пробитие!')
                    this.arr[hisHash][i] = [key, value]
                    console.log(this.arr[hisHash][i])
                    found = true;
                    break;
                } 
                if(!found) {
                    this.arr[hisHash].push([key, value]);
                }
            }
        }
    }
    delete(key : mapTypes) : void {
        const hisHash = this.hashCalc(key);
        
        if (this.arr[hisHash] == null) {
            console.error(`Нету пары ключ-значение по ключу: ${key}`);
            throw new Error(`Ошибка удаления пары ключ-значение по ключу ${key}`);
        } else {
            this.arr[hisHash] = this.arr[hisHash].filter(el => el[0] != key);
            if (this.arr[hisHash].length == 0) {
                this.arr[hisHash] = null;
            }
        }
    }
    getByKey(key : mapTypes) : any {
        const hisHash = this.hashCalc(key);

        if (this.arr[hisHash] == null) {
            console.error(`Не существует пары ключ-значения по такому ключу: ${key}`);
            throw new Error(`Ошибка поиска значения по ключу: ${key}`)
        } else {
            const res = this.arr[hisHash].find(el => el[0] == key);
            if(Array.isArray(res)) {
                return res[1];
            } else {
                throw new Error(`Ошибка поиска значения по ключу: ${key}`)
            }
        }
    }
    clear() : void {
        this.arr = this.arr.map(el => el = null);
    }
 }





const myMap = new MyMap();
myMap.set('cat', 4);
myMap.set('dog', 10);
myMap.set(true, 'turtles');
console.log(myMap);
myMap.set('cat', 'cat');
myMap.logArr();
console.log(myMap.getByKey(true));
console.log(myMap.getByKey('cat'));
myMap.delete('cat');
console.log(myMap);
myMap.clear();
console.log(myMap);