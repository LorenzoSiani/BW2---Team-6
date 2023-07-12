const searchUrl= 'https://striveschool-api.herokuapp.com/api/deezer/search?q='


const inputSearch = document.querySelector('form')
inputSearch.addEventListener('submit', function(e){
    e.preventDefault()
    const value = document.querySelector('input').value
    console.log(searchUrl + value)
    fetch(searchUrl + value)
    .then(res => res.json())
    .then(detail =>{
        console.log(detail);
        let idArtist = detail.data[0].artist.id
        console.log(idArtist);
    })

})



// COLORI RANDOM ALLE CARD
function getRandomColor() {
    let letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
  
  let cards = document.querySelectorAll(".card");
  cards.forEach(function(card) {
    card.style.backgroundColor = getRandomColor();
  });


//   PROVO A RANDOMIZZARE LE INSIDE IMG

//   const images = [
//     "image-6.jpg",
//     "image-2.jpg",
//     "image-3.jpg",
//     "image-4.jpg",
//     "image-5.jpg",
//     "image-7.jpg",
//     "image-8.jpg",
//     "image-9.jpg",
//     "image-10.jpg",
//     "image-12.jpg"
//   ];
  
//   const randomIndex = Math.floor(Math.random() * images.length);
//   const randomImage = "assets/imgs/main" + images[randomIndex];
  
//   const imgElement = document.createElement("img");
//   imgElement.src = randomImage;
  
//   const imageContainer = document.querySelectorAll(".image-container");
//   imageContainer.appendChild(imgElement);