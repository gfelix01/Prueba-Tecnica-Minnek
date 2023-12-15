
function invertirArray (arr) {
 
    const especiales = arr.reduce((acc, el, index) => {
       if (typeof el === 'string' && !el.match(/[a-zA-Z0-9]/)) {
         acc.push({ indice: index, caracter: el })
       }
       return acc
    }, [])
   
 
    const arrFiltrado = arr.filter(el => typeof el === 'number' || el.match(/[a-zA-Z0-9]/))
   
   
    arrFiltrado.reverse()
   

    especiales.forEach(({ indice, caracter }) => {
       arrFiltrado.splice(indice, 0, caracter)
    })
   
    return arrFiltrado
   }
   
   const arr = ['n', 2, '&', 'a', 'l', 9, '$', 'q', 47, 'i', 'a', 'j', 'b', 'z', '%', 8]
   const arrInvertido = invertirArray(arr)
   console.log(arrInvertido)