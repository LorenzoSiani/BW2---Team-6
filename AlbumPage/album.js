

const URL = 'https://striveschool-api.herokuapp.com/api/deezer/album/75621062';
const addressBarContent = new URLSearchParams(location.search);
const albumId = addressBarContent.get('id');

fetch(URL + albumId)
  .then(response => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error('Failed to fetch album');
    }
  })
  .then(data => {
    const body = document.querySelector('body');
    const album = data;

    // Update album header
    const header = `
      <header class="d-flex justify-content-around  w-100  mt-4">
        
        <i id="arrow" class="bi bi-arrow-left-short"></i>
          <img id="cover" src="${album.cover_medium}" alt="" />
        
      </header>
    `;

    // Update album details
    const details = `
      <div class="main mx-4 mt-4">
        <h2>${album.title}</h2>
        <div class="d-flex align-items-center">
          <img id="artist-img" src="${album.artist.picture_small}" alt="" />
          <h5 id="artist">${album.artist.name}</h5>
        </div>
        <p class="mt-3 text-secondary">
          Album <i class="bi bi-dot"></i> 
          <span>${album.release_date.split('-')[0]}</span>
        </p>
      </div>
    `;

    // Update commands section
    const commands = `
      <div class="comands d-flex justify-content-between align-items-center">
        <div class="d-flex justify-content-between w-25 fs-3 mx-4">
          <i id="heart" class="bi bi-heart"></i>
          <i class="bi bi-arrow-down-circle text-secondary"></i>
          <i class="bi bi-three-dots-vertical text-secondary"></i>
        </div>
        <div class="d-flex justify-content-evenly align-items-center w-25 fs-1 mx-3">
          <i id="shuffle" class="bi bi-shuffle text-secondary"></i>
          <i id="play-button" class="bi bi-play-circle-fill text-success mx-3"></i>
        </div>
      </div>
    `;

    // Create track list
    let trackList = '';
    for (const track of album.tracks.data) {
      let trackItem = `
        <div class="row">
          <div class="col-9 d-flex align-items-center mt-3">
            <div class="d-flex flex-column">
              <h5 class="mb-0">${track.title}</h5>
              <p class="text-secondary fs-6 mb-0">${track.artist.name}</p>
            </div>
          </div>
          <div class="col-3 d-flex align-items-center justify-content-end">
            <i class="bi bi-three-dots-vertical text-secondary"></i>
          </div>
        </div>
      `;

    
     
     

      trackList += trackItem;
    }

     // Create navbar
     const navbar = `
     <!-- nav bar -->
     <nav class="navbar navbar-light bg-dark fixed-bottom">
       <div class="container-fluid d-flex justify-content-around">
         <a class="nav-link" href="#">
           <ion-icon name="home-outline"></ion-icon>
           Home
         </a>
         <a class="nav-link" href="#">
           <ion-icon name="search-outline"></ion-icon>
           Cerca
         </a>
         <a class="nav-link" href="#">
           <ion-icon name="library-outline"></ion-icon>
           La tua libreria
         </a>
       </div>
     </nav>
   `;

    // Construct the updated HTML
    const updatedHTML = `
    ${header}
    ${details}
    ${commands}
    <div class="container">
      ${trackList}
    </div>
    ${navbar}
  `;

    // Update the HTML content of the body
    body.innerHTML = updatedHTML;

    const heart = document.getElementById('heart');
    heart.addEventListener('click', function () {
      if (heart.classList.contains('bi-heart-fill')) {
        heart.classList.remove('bi-heart-fill', 'text-success');
        heart.classList.add('bi-heart');
      } else {
        heart.classList.remove('bi-heart');
        heart.classList.add('bi-heart-fill', 'text-success');
      }
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

   
  })
  .catch(error => {
    console.error(error);
  });
