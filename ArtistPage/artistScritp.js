const artistUrl = 'https://striveschool-api.herokuapp.com/api/deezer/artist/412';
const addressCont = new URLSearchParams(location.search);
const artistId = addressCont.get('id');

console.log(artistId)
fetch(artistUrl //+ artistId//
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
    
    <div>
      <img src="${detail.picture_big}" alt="" />
      <h3>${detail.name}</h3>
    </div>
    <div>
      <p>${detail.nb_fan} Ascoltatorei Mensili</p>
      <div class="d-flex justify-content-between align-items-center">
        <div>
          <button>Seguiti</button
          ><i class="bi bi-three-dots-vertical text-white"></i>
        </div>
        <div
          class="d-flex justify-content-evenly align-items-center w-25 fs-1 mx-3"
        >
          <i id="shuffle" class="bi bi-shuffle text-secondary"></i>
          <i
            id="play-button"
            class="bi bi-play-circle-fill text-success mx-3"
          ></i>
        </div>
      </div>
    </div>
    <div class="d-flex justify-content-start">
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
              <div class="mx-2">${i + 1}</div>
              <div><img id="artist-img" src="${el.album.cover}" alt="" /></div>
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
