

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
 
  // function to format the seconds in minutes
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
  
    // cover and album details
    const main = `
      <main class=" w-100  mt-4">
        
        <i id="arrow" class="bi bi-arrow-left-short"></i>
          <img id="cover" src="${album.cover_medium}" alt="" />
          <div class="title">
        <h2>${album.title}</h2>
        <div class ="details" >
          <div class="artist">
          <img id="artist-img" src="${album.artist.picture_small}" alt="" />
          <h5 id="artist">${album.artist.name}</h5>
          </div>
          <div class = "d-flex mt-3">
          <p class="text-secondary">
          Album <i class="bi bi-dot"></i> 
          <span>${album.release_date.split('-')[0]}</span>
          <i class="bi bi-dot d-none d-lg-inline-block"></i>
          </p>
          <p class= "d-none d-lg-flex mx-2 "> ${album.nb_tracks} brani <span class="text-secondary mx-2">${getFormattedDuration(album.duration)} </span> </p>
          </div>
        </div>
        
      </div>
      </main>
    `;

  
    // command section with the icons
    const commands = `
      <div class="comands mt-3">
        <div id="first-comands" >
          <i id="heart" class="bi bi-heart"></i>
          <i class="bi bi-arrow-down-circle text-secondary"></i>
          <i class="bi bi-three-dots-vertical text-secondary d-inline-block d-lg-none"></i>
          <i class="bi bi-three-dots text-secondary d-none d-lg-inline-block"></i>
        </div>
        <div id ="second-comands">
          <i id="shuffle" class="bi bi-shuffle text-secondary"></i>
          <i id="play-button" class="bi bi-play-circle-fill text-success mx-3"></i>
        </div>
      </div>
    `;
  

  // track details # TITOLO RIPRODUZIONI Durata

  const trackDetails =
  `
      <div id="trackDetails" class="row mt-3 border-bottom border-secondary py-4">
         <div class="col-1  align-items-center mt-3 d-none d-lg-flex ">
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
   
  // tracklist 
  let trackList = '';
  
  // adding a number of tracks
  for (let i = 0; i < album.tracks.data.length; i++) {
    const track = album.tracks.data[i];
    let trackItem = `
      <div class="row mt-5">
         <div class="col-1  align-items-center mt-3 d-none d-lg-flex ">
          <p class="text-secondary fs-6 mb-0">${i + 1}</p>
        </div> 
        <div class="col-8 col-lg-4 d-flex align-items-center mt-3">
          <div class="d-flex flex-column">
            <h5 class="mb-0">${track.title}</h5>
            <p class="text-secondary fs-6 mb-0">${track.artist.name}</p>
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
  
  
// Create navbar
const navbar = `
<!-- nav bar -->
<nav class="navbar navbar-light  fixed-bottom">
  <div class="container-fluid d-flex justify-content-around">
    <a class="nav-link" href="../Homepage/homepage.html">
      <i class="bi bi-house"></i>
      Home
    </a>
    <a class="nav-link" href="../Search/search.html">
      <i class="bi bi-search"></i>
      Cerca
    </a>
    <a class="nav-link" href="../ArtistPage/artist.html">
      <i class="bi bi-bookshelf"></i>
      La tua libreria
    </a>
  </div>
</nav>
`;
    // Construct the updated HTML
    const updatedHTML = `
      ${main}
      ${commands}
      <div class="container">
        ${trackDetails}
        ${trackList}
        </div>
        ${navbar}
       
    `;

    // Update the HTML content of the body
    body.innerHTML = updatedHTML;

    //clcik function to fill the heart  
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

    // function to change the play button when clicked
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

    // click function for changing color to shuflle
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
    

   
  })
  .catch(error => {
    console.error(error);
  });
