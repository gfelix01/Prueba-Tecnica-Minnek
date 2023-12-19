document.addEventListener('DOMContentLoaded', function () {
  const searchInput = document.getElementById('searchInput')
  const dogTable = document.getElementById('dogTable')
  const sortSelect = document.getElementById('sortSelect')
  const returnButton = document.getElementById('returnButton')
  let dogsData = []

  function loadDogData () {
    fetch('https://dog.ceo/api/breeds/list/all')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        return response.json()
      })
      .then(data => {
        const breeds = data.message

        dogsData = Object.keys(breeds).map(breed => ({ breed, subBreeds: breeds[breed] }))

        displayTable(dogsData)
      })
      .catch(error => console.log(error))
  }

  function displayTable (data) {
    let tableContent = '<tr><th>Raza</th><th>Subrazas</th></tr>'
    data.forEach(dog => {
      tableContent += `<tr><td>${dog.breed}</td><td>${dog.subBreeds.length ? dog.subBreeds.join(', ') : '-'}</td></tr>`
    })
    dogTable.innerHTML = tableContent
  }

  loadDogData()

  searchInput.addEventListener('input', function () {
    const searchText = searchInput.value.toLowerCase()
    const filteredDogs = dogsData.filter(dog => {
      return (
        dog.breed.toLowerCase().includes(searchText) ||
                dog.subBreeds.some(subBreed => subBreed.toLowerCase().includes(searchText))

      )
    })
    displayTable(filteredDogs)
  })

  function sortDataBy (type, order = 'asc') {
    const sortOrder = order === 'desc' ? -1 : 1

    if (type === 'name') {
      dogsData.sort((a, b) => {
        return sortOrder * a.breed.localeCompare(b.breed)
      })
    } else if (type === 'subBreed') {
      dogsData.sort((a, b) => {
        if (a.subBreeds.length === b.subBreeds.length) {
          return sortOrder * a.breed.localeCompare(b.breed) // Ordena por nombre si la cantidad de subrazas es la misma
        }
        return sortOrder * (a.subBreeds.length - b.subBreeds.length) // Ordena por cantidad de subrazas
      })
    }
    displayTable(dogsData)
  }

  function returnToMainPage () {
    window.location.href = 'index.html' // retorno a pagina principal
  }

  returnButton.addEventListener('click', returnToMainPage)

  sortSelect.addEventListener('change', function () {
    const selectedSort = sortSelect.value
    sortDataBy(selectedSort)
  })
})
