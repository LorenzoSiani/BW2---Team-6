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

