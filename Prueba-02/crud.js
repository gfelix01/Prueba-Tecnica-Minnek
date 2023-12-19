document.addEventListener('DOMContentLoaded', function () {
    const searchInput = document.getElementById('searchInput');
    const dogTable = document.getElementById('dogTable');
    let dogsData = [];

    function loadDogData() {
        fetch('https://dog.ceo/api/breeds/list/all')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                const breeds = data.message;

                dogsData = Object.keys(breeds).map(breed => ({ breed, subBreeds: breeds[breed] }));

                displayTable(dogsData);
            })
            .catch(error => console.log(error));
    }

    function displayTable(data) {
        let tableContent = '<tr><th>Raza</th><th>Subrazas</th></tr>';
        data.forEach(dog => {
            tableContent += `<tr><td>${dog.breed}</td><td>${dog.subBreeds.length ? dog.subBreeds.join(', ') : '-'}</td></tr>`;
        });
        dogTable.innerHTML = tableContent;
    }

    loadDogData();

    searchInput.addEventListener('input', function () {
        const searchText = searchInput.value.toLowerCase();
        const filteredDogs = dogsData.filter(dog => dog.breed.toLowerCase().includes(searchText));
        displayTable(filteredDogs);
    });
});
