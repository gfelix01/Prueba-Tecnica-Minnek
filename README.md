# Invertir Array

Esta función `invertirArray` toma un array y realiza una inversión especial, invirtiendo los elementos numéricos y alfabéticos mientras mantiene los caracteres especiales en su posición original.

## Uso

Puedes usar esta función `invertirArray` pasando un array como argumento y obtendrás un nuevo array con los elementos invertidos según las reglas mencionadas.

```javascript
const arr = ['n', 2, '&', 'a', 'l', 9, '$', 'q', 47, 'i', 'a', 'j', 'b', 'z', '%', 8]
const arrInvertido = invertirArray(arr)
console.log(arrInvertido)


Descripción
invertirArray(arr): Esta función invierte un array manteniendo los números y letras alfabéticas en orden inverso, mientras conserva los caracteres especiales en su posición original.

Ejemplo de Uso: En el ejemplo proporcionado, el array original contiene una mezcla de letras, números y caracteres especiales. Al llamar a invertirArray(arr), se obtiene un nuevo array con los números y letras invertidos, mientras que los caracteres especiales permanecen en su posición original.

Consideraciones
Los caracteres especiales se mantienen en su posición original.
Los elementos numéricos y alfabéticos se invierten en el nuevo array.