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
        document.getElementById('cards-cont').classList.add('d-none')
        
        let newCont = document.getElementById('new-cont')
       
        detail.data.forEach(el => {
            let newDiv = document.createElement('div')
            
            newDiv.innerHTML=`
            <div class="card">
               <img src="${el.album.cover_medium}" class="card-img-top" alt="...">
               <div class="card-body">
                 <a href="http://127.0.0.1:5500/AlbumPage/album.html?id=${el.album.id}" class="btn btn-primary">${el.album.title}</a>
                 <a href="http://127.0.0.1:5500/ArtistPage/artist.html?id=${idArtist}" class="btn btn-primary">${el.artist.name}</a>
               </div>
            </div>
            `
            newCont.appendChild(newDiv)
        });
       
    })

})

