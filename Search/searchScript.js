const searchUrl= 'https://striveschool-api.herokuapp.com/api/deezer/search?q='


const inputSearch = document.querySelector('form')
inputSearch.addEventListener('submit', function(e){
    e.preventDefault()
    let newCont = document.getElementById('new-cont')
    newCont.innerHTML = ``
    const value = document.querySelector('input').value
    document.querySelector('input').value = ''
    console.log(searchUrl + value)
    fetch(searchUrl + value)
    .then(res => res.json())
    .then(detail =>{
        console.log(detail);
        let idArtist = detail.data[0].artist.id
        console.log(idArtist);
        document.getElementById('cards-cont').classList.add('d-none')
        
        
       
        detail.data.forEach(el => {
            let newDiv = document.createElement('div')
            
            newDiv.innerHTML=`


            <div class="container d-flex justify-content-center">
      
            <div class="col-11 col-sm-11 col-md-4 d-flex align-items-center mt-3">
              <div class="d-flex align-items-center ">
              <img style=" width: 40%; max-width: 280px; border-style: none; margin-right: 10px;
            "src="${el.album.cover_medium}" class="card-img img-thumbnail" alt="immagine-Album">
              <div class="d-flex flex-column ">
              <a onclick="window.location.href='http://127.0.0.1:5500/AlbumPage/album.html?id=${el.album.id}'" >
              <h5 class="card-title">${el.album.title}</h5></a>
              
              <a onclick="window.location.href='http://127.0.0.1:5500/ArtistPage/artist.html?id=${idArtist}'" >
              
              <p class="card-text link-secondary">${el.artist.name}</p></a>
            
                </div>
              </div>
            </div>
            <div class="col-1 col-sm-1 col-md-8 d-flex align-items-center justify-content-end">
              <div class="d-flex align-items-center d-none d-lg-flex">
                
               
              </div>
              <div class="d-flex  align-items-center">
                <i class="bi bi-three-dots-vertical text-secondary"></i>
              </div>
            </div>
          </div>
         


            `
            newCont.appendChild(newDiv)
        });
       
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
  
  const arrow = document.getElementById('arrow')
    arrow.addEventListener('click', function () {
      history.back();
    })

// RIMUOVI ICONA DA SEARCBOX

const searchInput = document.querySelector('.sbx-custom__input');
const searchIcon = document.querySelector('.sbx-custom__submit svg');

searchInput.addEventListener('input', function() {
  if (this.value.trim() !== '') {
    searchIcon.style.display = 'none';
  } else {
    searchIcon.style.display = '';
  }
});

searchInput.addEventListener('keyup', function(event) {
  if (event.code === 'Backspace' && this.value.trim() === '') {
    searchIcon.style.display = '';
  }
});