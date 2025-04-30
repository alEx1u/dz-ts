interface IUser {
    age: number | undefined;
}

class User implements IUser {
    @AllowFunc((a: number) => a > 10)
    age = 10;
}


function AllowFunc(validateFunc : (...args : any[]) => boolean) {
    return (
        target: Object,
        propertyKey: string | symbol
    )  => {
        let value : number | undefined;
        const setter = function (newvalue : any) : void {
            if(validateFunc(newvalue) && typeof newvalue == 'number') {
                value = newvalue;
            } else {
                console.error('Данные не подходят')
            }
        }
        

        const getter = function() : number | undefined{
            return value;
        }

        Object.defineProperty(target, propertyKey, {
            set: setter,
            get : getter
        })
    }
}


const person = new User();
console.log(person.age);
person.age = 52;
console.log(person.age);
person.age = -10;
console.log(person.age)