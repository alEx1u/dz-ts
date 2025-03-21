declare module 'sort-by' {
    type typeSort<T> = (obj1: T, obj2: T) => number;
    function type<T>(type : string) : (arg : any) => boolean;
    function sort<T>(property: string, map?: (property: string, value: any) => any) : typeSort<T>;
    function sortBy<T>(...properties : string[]) : typeSort<T>
    export default sortBy;
}