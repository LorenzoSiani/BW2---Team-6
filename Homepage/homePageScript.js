const albumsArray = [85363,62646342,1434890,1434890,92071,397544257,51001312,8887733,1345688,9536122,1121181,303415,68346981,70200002,212377]
const albumUrl = 'https://striveschool-api.herokuapp.com/api/deezer/album/'
const albumCont = document.getElementById('album-container')
const albumCont2 = document.getElementById('album-container-2')
console.log(albumUrl + albumsArray[1]);
const homePageRend = function(){
    albumsArray.forEach(el => {
        fetch(albumUrl + el)
        .then(res=>{
            if(res.ok){
                return res.json()
            }else{
                throw new Error('Errore nella fetch')
            }
        })
        .then((detail)=>{
            console.log(detail)
            let newDiv = document.createElement('div')
            newDiv.classList.add('col')
            newDiv.innerHTML=`
            <div class="card img-card p-2">
              <img src="${detail.cover_medium}" class="card-img-top" alt="...">
               <div class="card-body">
               <a href="http://127.0.0.1:5500/AlbumPage/album.html?id=${detail.id}" class="text-light f-4 fw-medium">${detail.title}</a>
               <a href="http://127.0.0.1:5500/ArtistPage/artist.html?id=${detail.artist.id}" class="text-light f-6 fw-lighter">${detail.artist.name}</a>
               </div>
            </div>            
            `
            albumCont.appendChild(newDiv)
        })
        .catch(err=>{
            console.log(err);
        })
    });
}
homePageRend()
const homePageRend2 = function(){
  albumsArray.forEach(el => {
      fetch(albumUrl + el)
      .then(res=>{
          if(res.ok){
              return res.json()
          }else{
              throw new Error('Errore nella fetch')
          }
      })
      .then((detail)=>{
          console.log(detail.tracks.data.length)
          let newDiv = document.createElement('div')
          newDiv.classList.add('col')
          newDiv.innerHTML=`
          

    <div class="card mainCards">
      <div class="card-body">
        <div>
          <div class="d-flex">
          <img src="${detail.cover_medium}" alt="Immagine" width="150px" />
            <div class="right-div ms-3">
            <a href="http://127.0.0.1:5500/AlbumPage/album.html?id=${detail.id}" class="text-light">${detail.title}</a>
            <a href="http://127.0.0.1:5500/ArtistPage/artist.html?id=${detail.artist.id}" class="text-light">${detail.artist.name}</a>
            </div>
          </div>
          <div class="text-light d-flex mt-2 align-items-center justify-content-between">
            <div><i class="bi bi-heart fs-3 p-2"></i><i class="bi bi-three-dots-vertical fs-3 p-2"></i></div><div class="d-flex align-items-center"><p>${detail.tracks.data.length}brani</p><i class="bi bi-play-circle fs-3 p-2"></i></div>
          </div>
        </div>
      </div>
    </div>
          
          `
          //console.log(detail.tracks.data);
          albumCont2.appendChild(newDiv)
      })
      .catch(err=>{
          console.log(err);
      })
  });
}
homePageRend2()