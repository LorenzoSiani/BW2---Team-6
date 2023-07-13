const albumsArray = [12047952,8887733,1345688,9536122,1121181,303415,68346981,92071,70200002,212377]
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
            

      <div class="card mainCards">
        <div class="card-body">
          <div>
            <div>
            <img src="${detail.cover_medium}"  alt="Immagine" width="150px"/>
              <div class="right-div">
              <a href="http://127.0.0.1:5500/AlbumPage/album.html?id=${detail.id}" class="text-light">${detail.title}</a>
              <a href="http://127.0.0.1:5500/ArtistPage/artist.html?id=${detail.artist.id}" class="text-light">${detail.artist.name}</a>
              </div>
            </div>
          </div>
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
            <div class="right-div">
            <a href="http://127.0.0.1:5500/AlbumPage/album.html?id=${detail.id}" class="text-light">${detail.title}</a>
            <a href="http://127.0.0.1:5500/ArtistPage/artist.html?id=${detail.artist.id}" class="text-light">${detail.artist.name}</a>
            </div>
          </div>
          <div class="text-light d-flex mt-2">
            <div><i class="bi bi-heart"></i><i class="bi bi-three-dots-vertical"></i><div/><div><p>${detail.tracks.data.length}brani</p><i class="bi bi-play-circle"></i></div>
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