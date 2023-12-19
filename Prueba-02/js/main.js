document.addEventListener('DOMContentLoaded', function () {
  const gridContainer = document.getElementById('dogGrid')
  const preloader = document.querySelector('.preloader')
  const counter = 0

  if (gridContainer) {
    fetch('https://dog.ceo/api/breeds/list/all')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        return response.json()
      })
      .then(data => {
        const breeds = data.message
        const breedKeys = Object.keys(breeds).slice(0, 5)

        breedKeys.forEach(breed => {
          fetch(`https://dog.ceo/api/breed/${breed}/images/random`)
            .then(response => {
              if (!response.ok) {
                throw new Error('Network response was not ok')
              }
              return response.json()
            })
            .then(imageData => {
              const dogItem = document.createElement('div')
              dogItem.classList.add('dog-item')

              const dogImage = document.createElement('img')
              dogImage.classList.add('dog-image')
              dogImage.alt = breed
              dogImage.src = imageData.message

              const dogInfo = document.createElement('div')
              dogInfo.classList.add('dog-info')
              dogInfo.innerHTML = `<h3>${breed}</h3><p>${breeds[breed].length ? `Sub-breeds: ${breeds[breed].join(', ')}` : 'No sub-breeds'}</p>`

              dogItem.appendChild(dogImage)
              dogItem.appendChild(dogInfo)

              gridContainer.appendChild(dogItem)

              if (preloader) {
                preloader.style.display = 'none'
              }
            })
            .catch(error => console.log(error))
        })
      })
  }
})
