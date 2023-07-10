

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

  // function to verify if the device is mobile
    function isMobileDevice() {
      return /Android|webOS|iPhone|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }

  // function to format the seconds in minutes
    function getFormattedDuration(duration) {
      const minutes = Math.floor(duration / 60);
      const seconds = duration % 60;
      return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    }
    
    // cover and album details
    const header = `
      <header class=" w-100  mt-4">
        
        <i id="arrow" class="bi bi-arrow-left-short"></i>
          <img id="cover" src="${album.cover_medium}" alt="" />
          <div class="main">
        <h2>${album.title}</h2>
        <div class ="details" >
          <div class="artist">
          <img id="artist-img" src="${album.artist.picture_small}" alt="" />
          <h5 id="artist">${album.artist.name}</h5>
          </div>
          <p class="mt-3 text-secondary">
          Album <i class="bi bi-dot"></i> 
          <span>${album.release_date.split('-')[0]}</span>
        </p>
        </div>
        
      </div>
      </header>
    `;

  
    // command section with the icons
    const commands = `
      <div class="comands">
        <div id="first-comands" >
          <i id="heart" class="bi bi-heart"></i>
          <i class="bi bi-arrow-down-circle text-secondary"></i>
          <i class="bi bi-three-dots-vertical text-secondary"></i>
        </div>
        <div id ="second-comands">
          <i id="shuffle" class="bi bi-shuffle text-secondary"></i>
          <i id="play-button" class="bi bi-play-circle-fill text-success mx-3"></i>
        </div>
      </div>
    `;

   
  // tracklist 
  let trackList = '';
  
  // adding a number of tracks
  for (let i = 0; i < album.tracks.data.length; i++) {
    const track = album.tracks.data[i];
    let trackItem = `
      <div class="row">
        ${!isMobileDevice() ? `<div class="col-1 d-flex align-items-center mt-3">
          <p class="text-secondary fs-6 mb-0">${i + 1}</p>
        </div>` : ''}
        <div class="col-8 col-lg-4 d-flex align-items-center mt-3">
          <div class="d-flex flex-column">
            <h5 class="mb-0">${track.title}</h5>
            <p class="text-secondary fs-6 mb-0">${track.artist.name}</p>
          </div>
        </div>
        <div class="col-3 col-lg-7 d-flex align-items-center justify-content-end">
          ${
            !isMobileDevice()
              ? `<div class="d-flex align-items-center">
               <p class="text-secondary fs-6 mb-0 mx-5">
               ${track.rank}
                 </p>
                  <p class="text-secondary fs-6 mb-0 mx-5">
                    ${getFormattedDuration(track.duration)}
                  </p>
                </div>`
              : ''
          }
          <div class="d-flex align-items-center">
            <i class="bi bi-three-dots-vertical text-secondary"></i>
          </div>
        </div>
      </div>
    `;
    trackList += trackItem;
  }
  
  


    // Construct the updated HTML
    const updatedHTML = `
      ${header}
    
      ${commands}
      <div class="container">
        ${trackList}
      </div>
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
