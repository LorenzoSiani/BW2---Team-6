const artistUrl = 'https://striveschool-api.herokuapp.com/api/deezer/artist/';
const addressCont = new URLSearchParams(location.search);
const artistId = addressCont.get('id');

console.log(artistId)
fetch(artistUrl + artistId
)
  .then((res) => {
    if (res.ok) {
      return res.json()
    } else {
        if(res.status === 404){
            throw new Error('Not found')
        }else if(res.status === 500){
            throw new Error('Internal Server Error')
        }else{
            throw new Error('Errore della chiamata API')
        }
    }
  })
  .then((detail) => {
    console.log('DETAIL', detail)
    console.log(detail.tracklist)
    const divArtist = document.getElementById('conteiner-artist')
    divArtist.innerHTML = `
    <div class="position-relative">  
    <div id="background-img" style="background-image: url('${detail.picture_big}'); ">
      <h3 class="position-absolute bottom-0">${detail.name}</h3>
      <i id="arrow" class="bi bi-arrow-left-short position-absolute" style="top: 0; transform: translateY(2%); left: 20px;"></i>
    </div>
  </div>
<div>
  <p class="p-1 mx-0 text-left text-secondary" >${detail.nb_fan} Ascoltatori Mensili</p>
</div>
<div class="container">
  <div class="row align-items-center justify-content-around">
    <div class="col col-sm-6 d-flex align-items-center justify-content-center">
      <button class"text-center"> Seguiti</button>
      <i class="bi bi-three-dots-vertical text-secondary" style="font-size: 2em;"></i>
      <div class="comands d-flex justify-content-between align-items-center">
        <div class="d-flex justify-content-between w-25 fs-3 mx-4">
          
        </div>
      </div>
    </div>
   
    <div class="col col-sm-3">
      <div class="d-flex justify-content-center align-items-center w-100 h-100">
        <i id="shuffle" class="bi bi-shuffle text-secondary" style="font-size: 2em;"></i>
      </div>
    </div>
    <div class="col col-sm-3">
      <div class="d-flex justify-content-between align-items-center w-100 h-100">
        <i id="play-button" class="bi bi-play-circle-fill text-success mx-3" style="font-size: 4em;"></i>
      </div>
    </div>
  </div>
</div>

<div class="d-flex justify-content-start p-2">
  <div>
    <img id="artist-img" src="${detail.picture}" alt="" />
  </div>
  <div>
    <h5>Brani che ti piacciono</h5>
    <p>12 Brani dei ${detail.name}</p>
  </div>
</div>
<h3 class="my-4">Popolari</h3>
<div id="tracklist-conteiner" class="d-flex flex-column">
</div>
    `
// COLLEGAMENTO ARROW
const arrow = document.getElementById('arrow');
arrow.addEventListener('click', function(){
  window.location.href = '../HomePage/homepage.html';
});

    const play = document.getElementById('play-button');
    play.addEventListener('click', function () {
      if (play.classList.contains('bi-play-circle-fill')) {
        play.classList.remove('bi-play-circle-fill');
        play.classList.add('bi-pause-circle-fill');
      } else {
        play.classList.remove('bi-pause-circle-fill');
        play.classList.add('bi-play-circle-fill');
      }
    });

    const shuffle = document.getElementById('shuffle');
    shuffle.addEventListener('click', function () {
      if (shuffle.classList.contains('bi-shuffle') && shuffle.classList.contains('text-secondary')) {
        shuffle.classList.remove('text-secondary');
        shuffle.classList.add('text-light');
      } else {
        shuffle.classList.remove('text-light');
        shuffle.classList.add('text-secondary');
      }
    });
    fetch(detail.tracklist)
    .then((res)=>{
        if(res.ok){
            return res.json();
        }else{
            throw new Error('Brani popolari non trovati')
        }
    })
    .then((brani)=>{
        console.log(brani.data)
        const divTracks = document.getElementById('tracklist-conteiner')
        
        
        brani.data.forEach((el,i) => {
            const divBrano = document.createElement('div')
            divBrano.innerHTML=`
            
            <div class="d-flex my-3 align-items-center">
              <div class="p-2 me-3">${i + 1}</div>
              <div class="me-2"><img id="song-img" src="${el.album.cover}" alt="" /></div>
              <div>
                <h5>${el.title}</h5>
                <p>${el.rank}</p>
              </div>
              <div>
               <i class="bi bi-three-dots-vertical text-white"></i>
              </div>
            </div>

          
            `
            divTracks.appendChild(divBrano)
        });
    })
  })
  .catch((err) => {
    console.log(err)
  })
