import sortBy from 'sort-by';
const objArr = [
    {
        name: "Vasya",
        age: 21
    },
    {
        name: "Vasya",
        age: 114
    },
    {
        name: "Serega",
        age: 24
    },
];

console.log(objArr.sort(sortBy('name','age')));
