export function getEnum(arr) {
    return arr.reduce((acc, elem) => {
        acc[elem] = elem;
        return acc;
    }, {});
}
