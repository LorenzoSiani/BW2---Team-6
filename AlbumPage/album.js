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

    // Funzione per generare il colore medio di un'immagine
    function generateAverageColor(imageUrl) {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = 'Anonymous';
        img.src = imageUrl;
        img.addEventListener('load', () => {
          const canvas = document.createElement('canvas');
          canvas.width = img.width;
          canvas.height = img.height;
          const context = canvas.getContext('2d');
          context.drawImage(img, 0, 0);
          const imageData = context.getImageData(0, 0, img.width, img.height).data;
          let totalRed = 0;
          let totalGreen = 0;
          let totalBlue = 0;

          for (let i = 0; i < imageData.length; i += 4) {
            totalRed += imageData[i];
            totalGreen += imageData[i + 1];
            totalBlue += imageData[i + 2];
          }

          const pixelCount = imageData.length / 4;
          const averageRed = Math.floor(totalRed / pixelCount);
          const averageGreen = Math.floor(totalGreen / pixelCount);
          const averageBlue = Math.floor(totalBlue / pixelCount);
          const averageColor = `rgb(${averageRed},${averageGreen},${averageBlue})`;
          resolve(averageColor);
        });
        img.addEventListener('error', reject);
      });
    }

    // Utilizzo della funzione per generare il colore medio dell'immagine e applicarlo come background
    

    // Funzione per formattare la durata dei brani
    function getFormattedDuration(duration) {
      const hours = Math.floor(duration / 3600);
      const minutes = Math.floor((duration % 3600) / 60);
      const seconds = duration % 60;

      if (hours > 0) {
        return `${hours} ora ${minutes.toString().padStart(2, '0')} minuti`;
      } else {
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
      }
    }

    // Generazione del contenuto della pagina
    const main = `
    <div class="dropdown">
    <a class="btn  dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
     User
    </a>
    <ul class="dropdown-menu">
        <li><a class="dropdown-item" href="#">Action</a></li>
        <li><a class="dropdown-item" href="#">Another action</a></li>
        <li><a class="dropdown-item" href="#">Something else here</a></li>
         </ul>
    </div>
      <main class="w-100 mt-4">
        <i id="arrow" class="bi bi-arrow-left-short"></i>
        <img id="cover" src="${album.cover_xl}" alt="" />
        <div class="title">
          <h2>${album.title}</h2>
          <div class="details">
            <div class="artist">
              <img id="artist-img" src="${album.artist.picture_small}" alt="" />
              <h5 id="artist-name">${album.artist.name}</h5>
            </div>
            <div id="albumDetails" class="d-flex">
              <p >
                Album <i class="bi bi-dot"></i> 
                <span>${album.release_date.split('-')[0]}</span>
                <i class="bi bi-dot d-none d-lg-inline-block"></i>
              </p>
              <p class="d-none d-lg-flex mx-2">
                ${album.nb_tracks} brani 
                <span class="text-secondary mx-2">${getFormattedDuration(album.duration)}</span>
              </p>
            </div>
          </div>
        </div>
      </main>
    `;

  
    // command section with the icons
    const commands = `
      <div class="comands mt-3">
        <div id="first-comands">
          <i id="heart" class="bi bi-heart"></i>
          <i class="bi bi-arrow-down-circle text-secondary"></i>
          <i class="bi bi-three-dots-vertical text-secondary d-inline-block d-lg-none"></i>
          <i class="bi bi-three-dots text-secondary d-none d-lg-inline-block"></i>
        </div>
        <div id="second-comands">
          <i id="shuffle" class="bi bi-shuffle text-secondary"></i>
          <i id="play-button" class="bi bi-play-circle-fill text-success mx-3"></i>
        </div>
      </div>
    `;

    const trackDetails = `
      <div id="trackDetails" class="row mt-3 border-bottom border-secondary py-4">
        <div class="col-1 align-items-center mt-3 d-none d-lg-flex">
          <p class="text-secondary fs-4 mb-0">#</p>
        </div>
        <div class="col-8 col-lg-4 d-flex align-items-center mt-3">
          <div class="d-flex flex-column">
            <h5 class="mb-0 text-secondary">TITOLO</h5>
          </div>
        </div>
        <div class="col-3 col-lg-7 d-flex align-items-center justify-content-end">
          <div class="d-flex align-items-center d-none d-lg-flex">
            <p class="text-secondary fs-6 mb-0 mx-5">
              RIPRODUZIONI
            </p>
            <p class="text-secondary fs-6 mb-0 mx-5">
              <i class="bi bi-clock fs-4"></i>
            </p>
          </div>
        </div>
      </div>
    `;

    let trackList = '';

    for (let i = 0; i < album.tracks.data.length; i++) {
      const track = album.tracks.data[i];
      let trackItem = `
        <div  class="row mt-5">
          <div class="col-1 align-items-center mt-3 d-none d-lg-flex">
            <p class="text-secondary fs-6 mb-0">${i + 1}</p>
          </div>
          <div class="col-8 col-lg-4 d-flex align-items-center mt-3">
            <div class="d-flex flex-column">
              <h5 class="mb-0">${track.title}</h5>
              <p id="artists" class="text-secondary fs-6 mb-0">${track.artist.name}</p>
            </div>
          </div>
          <div class="col-3 col-lg-7 d-flex align-items-center justify-content-end">
            <div class="d-flex align-items-center d-none d-lg-flex">
              <p class="text-secondary fs-6 mb-0 mx-5">
                ${track.rank}
              </p>
              <p class="text-secondary fs-6 mb-0 mx-5">
                ${getFormattedDuration(track.duration)}
              </p>
            </div>
            <div class="d-flex d-lg-none align-items-center">
              <i class="bi bi-three-dots-vertical text-secondary"></i>
            </div>
          </div>
        </div>
      `;
      trackList += trackItem;
    }

    const navbar = `
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

    const updatedHTML = `
      ${main}
      ${commands}
      <div class="container">
        ${trackDetails}
        ${trackList}
      </div>
      ${navbar}
    `;

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
        shuffle.classList.add('text-success');
      } else {
        shuffle.classList.remove('text-success');
        shuffle.classList.add('text-secondary');
      }
    });

    const artist = document.getElementById('artist-name');
    artist.addEventListener('click', function(){
      window.location.href = '../ArtistPage/artist.html';
    });

   
    
    const arrow = document.getElementById('arrow');
    arrow.addEventListener('click', function(){
      window.location.href = '../HomePage/homepage.html';
    });
    
  const coverImage = album.cover_medium;
    generateAverageColor(coverImage)
  .then(color => {
    body.style.background = `linear-gradient(to bottom, ${color} 0%, #000000 30%)`;
  })
  .catch(error => {
    console.error(error);
  });

  })
  .catch(error => {
    console.error(error);
  });
