const albumsArray = [13612387,12047952,8887733,1345688,9536122,1121181,303415,68346981,92071,70200002]
const albumUrl = 'https://striveschool-api.herokuapp.com/api/deezer/album/'
const albumCont = document.getElementById('album-container')
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
            newDiv.innerHTML=`
            
             <div class="Hcard card">
              <img src="${detail.cover_medium}" class="card-img-top" alt="Immagine" />
               <div class="card-body">
                <a href="http://127.0.0.1:5500/AlbumPage/album.html?id=${detail.id}" class="btn btn-primary">${detail.title}</a>
                <a href="http://127.0.0.1:5500/ArtistPage/artist.html?id=${detail.artist.id}" class="btn btn-primary">${detail.artist.name}</a>
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