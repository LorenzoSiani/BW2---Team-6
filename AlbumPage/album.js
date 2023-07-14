const albumUrl = 'https://striveschool-api.herokuapp.com/api/deezer/album/'
const addressBarContent = new URLSearchParams(location.search)
const albumId = addressBarContent.get('id')

fetch(albumUrl + albumId)
  .then((response) => {
    if (response.ok) {
      return response.json()
    } else {
      throw new Error('Failed to fetch album')
    }
  })
  .then((data) => {
    const body = document.querySelector('body')
    const album = data
     console.log(data.tracks.data[1].preview);
    // Funzione per generare il colore medio di un'immagine
    function generateAverageColor(imageUrl) {
      return new Promise((resolve, reject) => {
        const img = new Image()
        img.crossOrigin = 'Anonymous'
        img.src = imageUrl
        img.addEventListener('load', () => {
          const canvas = document.createElement('canvas')
          canvas.width = img.width
          canvas.height = img.height
          const context = canvas.getContext('2d')
          context.drawImage(img, 0, 0)
          const imageData = context.getImageData(
            0,
            0,
            img.width,
            img.height
          ).data
          let totalRed = 0
          let totalGreen = 0
          let totalBlue = 0

          for (let i = 0; i < imageData.length; i += 4) {
            totalRed += imageData[i]
            totalGreen += imageData[i + 1]
            totalBlue += imageData[i + 2]
          }

          const pixelCount = imageData.length / 4
          const averageRed = Math.floor(totalRed / pixelCount)
          const averageGreen = Math.floor(totalGreen / pixelCount)
          const averageBlue = Math.floor(totalBlue / pixelCount)
          const averageColor = `rgb(${averageRed},${averageGreen},${averageBlue})`
          resolve(averageColor)
        })
        img.addEventListener('error', reject)
      })
    }

    // Utilizzo della funzione per generare il colore medio dell'immagine e applicarlo come background

    // Funzione per formattare la durata dei brani
    function getFormattedDuration(duration) {
      const hours = Math.floor(duration / 3600)
      const minutes = Math.floor((duration % 3600) / 60)
      const seconds = duration % 60

      if (hours > 0) {
        return `${hours} ora ${minutes.toString().padStart(2, '0')} minuti`
      } else {
        return `${minutes}:${seconds.toString().padStart(2, '0')}`
      }
    }

    // Generazione del contenuto della pagina
    const main = `
    <div class="dropdown d-none d-xl-flex  ">
    <a class="btn  dropdown-toggle text-light" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
    
    Epicode
    </a>
    <ul class="dropdown-menu bg-dark ">
        <li><a class="dropdown-item  text-light" href="#">Action</a></li>
        <li><a class="dropdown-item text-light" href="#">Another action</a></li>
        <li><a class="dropdown-item text-light" href="#">Something else here</a></li>
         </ul>
    </div>
      <main class="w-100 mt-4">
        <i id="arrow" class="bi bi-arrow-left-short"></i>
        <img id="cover" class= "d-none d-xl-block" src="${
          album.cover_xl
        }" alt="" />
        <img id="cover" class= "d-flex d-lg-none" src="${
          album.cover_medium
        }" alt="" />
        <div class="title">
          <h2>${album.title}</h2>
          <div class="details">
            <div class="artist">
              <img id="artist-img" src="${album.artist.picture_small}" alt="" />
              <a class=" text-light w-100" href="http://127.0.0.1:5500/ArtistPage/artist.html?id=${
                album.artist.id
              }">${album.artist.name}</a>
            </div>
            <div id="albumDetails" class="d-flex">
              <p >
                Album <i class="bi bi-dot"></i> 
                <span>${album.release_date.split('-')[0]}</span>
                <i class="bi bi-dot d-none d-lg-inline-block"></i>
              </p>
              <p class="d-none d-lg-flex mx-2">
                ${album.nb_tracks} brani 
                <span class="text-secondary mx-2">${getFormattedDuration(
                  album.duration
                )}</span>
              </p>
            </div>
          </div>
        </div>
      </main>
    `

    // command section with the icons
    const commands = `
      <div class="comands mt-3">
        <div id="first-comands">
          <i id="heart" class="bi bi-heart mx-2"></i>
          <i class="bi bi-arrow-down-circle text-secondary mx-2"></i>
          <i class="bi bi-three-dots-vertical text-secondary d-inline-block d-lg-none mx-2"></i>
          <i class="bi bi-three-dots text-secondary d-none d-lg-inline-block mx-2"></i>
        </div>
        <div id="second-comands">
          <i id="shuffle" class="bi bi-shuffle text-secondary"></i>
          <i id="play-button" class="bi bi-play-circle-fill text-success mx-3"></i>
        </div>
      </div>
    `

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
    `

    let trackList = ''

    for (let i = 0; i < album.tracks.data.length; i++) {
      const track = album.tracks.data[i]
      let trackItem = `
        <div class="row mt-5 track-row" data-track-number="${i + 1}">
          <div class="col-1 align-items-center mt-3 d-none d-lg-flex">
            <p class="text-secondary fs-6 mb-0">${i + 1}</p>
          </div>
          <div class="col-8 col-lg-4 d-flex align-items-center mt-3">
            <div class="d-flex flex-column">
              <h5 class="track-title text-light">${track.title}</h5>
              <a class=" text-secondary" href="http://127.0.0.1:5500/ArtistPage/artist.html?id=${
                album.artist.id
              }">${album.artist.name}</a>
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
      `
      trackList += trackItem
    }

    let currentTrack = null;

for (let i = 0; i < album.tracks.data.length; i++) {
  const track = album.tracks.data[i];
  currentTrack = track;
}
  // Create current song bar
  const currentSongBar = `
  <!-- Current song bar -->
  <div class="current-song-bar">
    <div class="song-info">
      <span class="song-title">${currentTrack.title}</span> 
      <span class="separator"> by </span>
      <span class="song-artist">${currentTrack.artist.name}</span>
    </div>
    <div class="playback-controls">
      <button class="control-button" id="computer-button">
        <i class="bi bi-display"></i>
      </button>
      <button class="control-button" id="heart-button">
        <i class="bi bi-heart"></i>
      </button>
      <i class="bi bi-play control-icon" id="play-icon"></i>
    </div>
  </div>
  `;
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
const firstTrack = album.tracks.data[0];

// Create Footer
const footer=`
<!-- footer -->
<footer class="text-light position-fixed bottom-0 w-100">
  <div class="container-fluid">
    <div class="row d-md-flex justify-content-between">
      <div class="col-4 d-none d-md-flex align-items-center">
        <div id="imageContainer" class="mx-2 rounded-circle rounded-sm-0">
          <img src="${album.cover_small}" alt="image" />
        </div>

        <div class="d-flex flex-column align-self-center pt-3">
        <p class="mx-2 fs-5 text mb-0">${firstTrack.title}</p>
          <p class="mx-2 d-none d-md-block fs-6 text mt-0 fw-light">
          ${currentTrack.artist.name}
          </p>
        </div>
        <div><i class="bi bi-heart mx-2" id="heartIconBig"></i></div>
      </div>
      <div
        class="col col-md-4 d-none d-md-block d-flex flex-column align-self-center"
      >
        <div class="d-flex justify-content-center align-items-center pt-2">
          <a href="#" id="colorToggleShuffle">
            <i class="bi bi-shuffle px-2" id="shuffleIcon"></i>
          </a>
          <i class="bi bi-skip-backward px-3"></i>
          <i class="bi bi-play-circle-fill mx-2 fs-2" id="playPause"></i>
          <i class="bi bi-skip-forward px-3"></i>
          <a href="#" id="colorToggleRepeat">
            <i class="bi bi-repeat px-2" id="repeatIcon"></i>
          </a>
        </div>

        <div class="d-flex align-items-center justify-content-between">
          <p class="m-0" id="songStartPoint">0:00</p>
          <input
            type="range"
            name="bi-volume-down"
            id="volumeScrollBar"
            min="0"
            max="100"
            value="30"
            class="px-2"
          />
          <p class="m-0" id="songEndPoint">4:26</p>
        </div>
      </div>
      <div
        class="col col-4 d-none d-md-flex flex-row align-items-center justify-content-end"
      >
        <a href="#" class="text-decoration-none text-light"
          ><i class="bi bi-mic px-2"></i
        ></a>
        <a href="#" class="text-decoration-none text-light"
          ><i class="bi bi-menu-button-wide px-2"></i
        ></a>
        <a href="#" class="text-decoration-none text-light"
          ><i class="bi bi-speaker px-2"></i
        ></a>
        <a href="#" class="text-decoration-none text-light"
          ><i class="bi bi-volume-down px-2"></i
        ></a>
        <input
          type="range"
          name="bi-volume-down"
          id="volumeScrollBar"
          min="0"
          max="100"
          value="60"
        />
        <a href="#" class="text-decoration-none text-light"
          ><i class="bi bi-arrows-angle-expand px-2"></i
        ></a>
      </div>
    </div>
  </div>
</footer>
`;
    // Construct the updated HTML
    const updatedHTML = `
    ${main}
    ${commands}
    <div class="container">
      ${trackDetails}
      ${trackList}
    </div>
    ${currentSongBar}
    ${navbar}
    ${footer}
  `;
const mainContainer = document.getElementById('main-container')
    mainContainer.innerHTML = updatedHTML

    function addClickEventToTrackRows() {
      const trackRows = document.querySelectorAll(".track-row");
      trackRows.forEach((row, i) => {
        row.addEventListener("click", function () {
          const mySong = document.getElementById("song");
          mySong.setAttribute("src", data.tracks.data[i].preview);
          mySong.load();
    
          console.log(data.tracks.data[0].preview);
          const selectedTrackNumber = row.dataset.trackNumber;
          const trackTitle = row.querySelector(".track-title");
    
          const trackIndex = selectedTrackNumber - 1;
          const track = album.tracks.data[trackIndex];
    
          // Update the current song bar
          const currentSongBar = document.querySelector(".current-song-bar");
          const currentSongTitle = currentSongBar.querySelector(".song-title");
          const currentSongArtist = currentSongBar.querySelector(".song-artist");
    
          currentSongTitle.textContent = track.title;
          currentSongArtist.textContent = album.artist.name;
    
          // Update the footer
          const footer = document.querySelector("footer");
          const footerSongTitle = footer.querySelector(".fs-5.text.mb-0");
          const footerSongArtist = footer.querySelector(
            ".d-none.d-md-block.fs-6.text.mt-0.fw-light"
          );
    
          footerSongTitle.textContent = track.title;
          footerSongArtist.textContent = album.artist.name;
    
          // Show or hide the current song bar depending on screen size
          if (window.matchMedia("(max-width: 767px)").matches) {
            // Show the current song bar on smaller screens
            currentSongBar.style.display = "flex";
          } else {
            // Hide the current song bar on larger screens
            currentSongBar.style.display = "none";
          }
    
          if (row.classList.contains("selected")) {
            mySong.pause();
            row.classList.remove("selected");
            trackTitle.classList.remove("text-success");
            trackTitle.classList.add("text-light");
            row.querySelector(".text-secondary").textContent =
              selectedTrackNumber;
          } else {
            trackRows.forEach((trackRow) => {
              trackRow.classList.remove("selected");
              trackRow
                .querySelector(".track-title")
                .classList.remove("text-success");
              trackRow.querySelector(".track-title").classList.add("text-light");
              trackRow.querySelector(".text-secondary").textContent =
                trackRow.dataset.trackNumber;
            });
    
            row.classList.add("selected");
            trackTitle.classList.remove("text-light");
            trackTitle.classList.add("text-success");
            row.querySelector(".text-secondary").innerHTML =
              '<i class="bi bi-play-fill text-success fs-3"></i>';
          }
        });
      });
    }
    
    addClickEventToTrackRows();
    // Chiamata alla funzione per aggiungere gli eventi di click alle righe delle tracce

    const heart = document.getElementById('heart')
    heart.addEventListener('click', function () {
      if (heart.classList.contains('bi-heart-fill')) {
        heart.classList.remove('bi-heart-fill', 'text-success')
        heart.classList.add('bi-heart')
      } else {
        heart.classList.remove('bi-heart')
        heart.classList.add('bi-heart-fill', 'text-success')
      }
    })

    const play = document.getElementById('play-button')
    play.addEventListener('click', function () {
      if (play.classList.contains('bi-play-circle-fill')) {
        play.classList.remove('bi-play-circle-fill')
        play.classList.add('bi-pause-circle-fill')
      } else {
        play.classList.remove('bi-pause-circle-fill')
        play.classList.add('bi-play-circle-fill')
      }
    })

    const shuffle = document.getElementById('shuffle')
    shuffle.addEventListener('click', function () {
      if (
        shuffle.classList.contains('bi-shuffle') &&
        shuffle.classList.contains('text-secondary')
      ) {
        shuffle.classList.remove('text-secondary')
        shuffle.classList.add('text-success')
      } else {
        shuffle.classList.remove('text-success')
        shuffle.classList.add('text-secondary')
      }
    })

    const arrow = document.getElementById('arrow')
    arrow.addEventListener('click', function () {
      history.back();
    })

    const coverImage = album.cover_medium
    generateAverageColor(coverImage)
    .then((color) => {
      body.style.background = `linear-gradient(to bottom, ${color} 0%, #000000 30%)`
      body.style.backgroundRepeat = 'no-repeat'; // Prevent background repeat
      body.style.backgroundSize = 'cover'; 
      
    })
      .catch((error) => {
        console.error(error)
      })
  })
  .catch((error) => {
    console.error(error)
  })
