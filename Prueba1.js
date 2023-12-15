function reverseArrayWithSpecialChars(arr) {
    //  Array de caracteres especiales y sus índices correspondientes
    const specialChars = arr.reduce((acc, el, index) => {
        if (typeof el === 'string' && !el.match(/[a-zA-Z0-9]/)) {
            acc.push({ index, char: el });
        }
        return acc;
    }, []);

    // Para filtrar los caracteres especiales del array:
    const arrFiltered = arr.filter(el => typeof el === 'number' || el.match(/[a-zA-Z0-9]/));

    // Invertir el array filtrado
    arrFiltered.reverse();

    // Colocar los caracteres especiales en sus posiciones originales:
    specialChars.forEach(({ index, char }) => {
        arrFiltered.splice(index, 0, char);
    });

    return arrFiltered;
}


const arr = ['n', 2, '&', 'a', 'l', 9, '$', 'q', 47, 'i', 'a', 'j', 'b', 'z', '%', 8];
const reversedArr = reverseArrayWithSpecialChars(arr);
console.log(reversedArr);
