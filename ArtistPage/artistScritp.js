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
<div class="comands mt-3">
        <div id="first-comands">
        <button class"text-center "> Seguiti</button>
        <i class="bi bi-three-dots text-white text-right"></i>
        </div>
        <div id="second-comands">
          <i id="shuffle" class="bi bi-shuffle text-secondary"></i>
          <i id="play-button" class="bi bi-play-circle-fill text-success mx-3"></i>
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
            divBrano.classList.add('container')
            divBrano.innerHTML=`
            <div class="row mt-5 track-row" data-track-number="${i + 1}">
            <div class="col-1 align-items-center mt-3 d-none d-lg-flex">
              <p class="text-secondary fs-6 mb-0">${i + 1}</p>
            </div>
            <div class="col-8 col-lg-4 d-flex align-items-center mt-3">
              <div class="d-flex align-items-center ">
              <img id="song-img" src="${el.album.cover}" alt="" />
              <div class="d-flex flex-column mx-5" >
                <h5 class="track-title text-light">${el.title}</h5>
                <p class="text-secondary fs-6 ">
                ${el.rank}
              </p>
                </div>
              </div>
            </div>
            <div class="col-3 col-lg-7 d-flex align-items-center justify-content-end">
              <div class="d-flex align-items-center d-none d-lg-flex">
                
               
              </div>
              <div class="d-flex  align-items-center">
                <i class="bi bi-three-dots-vertical text-secondary"></i>
              </div>
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
