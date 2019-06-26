
document.addEventListener("DOMContentLoaded", init)

function init(){
    fetchAllImages()
    fetchAllBreeds()
    grabBreedDropdown()
        
}


function grabBreedDropdown(){
    let dropdown = document.getElementById("breed-dropdown")
    dropdown.addEventListener('change', selectHandler)
}

function fetchAllImages(){
    fetch ('https://dog.ceo/api/breeds/image/random/4')
        .then(response => response.json())
        .then(data => data.message.forEach(puttingToDom))
}

function puttingToDom(data){
    let imgDiv = document.getElementById("dog-image-container")
    let newImg = document.createElement('img')
    newImg.src = data 
    imgDiv.appendChild(newImg)
}

function fetchAllBreeds(){
    fetch ('https://dog.ceo/api/breeds/list/all')
        .then(response => response.json())
        .then(data => listAll(data.message))
}

function listAll(data){
    let breedUl = document.getElementById('dog-breeds')
    breedUl.innerHTML = " "
    for (let key in data) {
    let breedLi = document.createElement('li')
    breedLi.addEventListener('click', breedClickHandler)
    breedLi.innerText = key;
    breedLi.classList.add('dog-breed')
    breedLi.style.color = 'blue'
    breedUl.appendChild(breedLi)
    if (data[key].length > 0){
        let subBreedUl = document.createElement('ul')
        data[key].forEach(subBreed => {
            let subBreedli = document.createElement('li')
            subBreedli.innerText = subBreed
            subBreedUl.appendChild(subBreedli)
            })
            breedLi.appendChild(subBreedUl)
        } 
    }
}

function breedClickHandler(e){
   
    e.target.style.backgroundColor == '' ? e.target.style.backgroundColor = 'red' : e.target.style.backgroundColor = ''
}

function selectHandler(){
    let arr = document.querySelectorAll('li.dog-breed')
    let arr1 = Array.from(arr)
    let toRemove = arr1.filter(letter => letter.innerText.charAt(0) !== getDropdownValue())
    toRemove.forEach(breed=>breed.remove());
}

function getDropdownValue(){
    return document.getElementById('breed-dropdown').value
}
