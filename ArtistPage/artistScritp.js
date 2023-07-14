const artistUrl = 'https://striveschool-api.herokuapp.com/api/deezer/artist/';
const addressCont = new URLSearchParams(location.search);
const artistId = addressCont.get('id');
const body = document.querySelector('#conteiner-artist')
console.log(artistId)
fetch(artistUrl + artistId
)
  .then((res) => {
    if (res.ok) {
      return res.json()
    } else {
        if(res.status === 404){
            throw new Error('Not found')
        }else if(res.status === 500){
            throw new Error('Internal Server Error')
        }else{
            throw new Error('Errore della chiamata API')
        }
    }
  })
  .then((detail) => {
    
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
    console.log('DETAIL', detail)
    console.log(detail)
    const divArtist = document.getElementById('conteiner-artist')
    divArtist.innerHTML = `
  
    <div class="position-relative">  
    <div id="background-img" style="background-image: url('${detail.picture_xl}'); ">
      <h3 class="detailName mx-3">${detail.name}</h3>
      <i id="arrow" class="bi bi-arrow-left-short position-absolute" style="top: 0; transform: translateY(2%); left: 20px;"></i>
      <p id="ascoltatori" class="p-1 mx-3 text-left text-secondary" >${detail.nb_fan} Ascoltatori Mensili</p>
      </div>

  </div>
<div>
 
</div>
<div class="comands mt-5">
        <div id="first-comands">
       <button  class="not-clicked ">Segui</button>

        <i class="bi bi-three-dots-vertical text-secondary d-inline-block d-lg-none"></i>
        <i class="bi bi-three-dots text-secondary d-none d-lg-inline-block"></i>
        </div>
        <div id="second-comands">
          <i id="shuffle" class="bi bi-shuffle text-secondary"></i>
          <i id="play-button" class="bi bi-play-circle-fill text-success mx-3"></i>
        </div>
      </div>
   


<div class="d-flex justify-content-start p-2 mx-5">
  <div>
    <img id="artist-img" src="${detail.picture}" alt="" />
  </div>
  <div>
    <h5>Brani che ti piacciono</h5>
    <p>12 Brani di ${detail.name}</p>
  </div>
</div>
<h3  class=" mx-5 mt-3" >Popolari</h3>
<div id="tracklist-conteiner" class="d-flex flex-column">
</div>
    `

    

// COLLEGAMENTO ARROW
const arrow = document.getElementById('arrow')
    arrow.addEventListener('click', function () {
      history.back();
    })

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
    fetch(detail.tracklist)
    .then((res)=>{
        if(res.ok){
            return res.json();
        }else{
            throw new Error('Brani popolari non trovati')
        }
    })
    .then((brani)=>{
        console.log(brani.data)
        const divTracks = document.getElementById('tracklist-conteiner')
        
        
        brani.data.forEach((el,i) => {
            const divBrano = document.createElement('div')
            divBrano.classList.add('container')
            divBrano.innerHTML=`
            <div class="row mt-5 track-row" data-track-number="${i + 1}">
            <div class="col-1 align-items-center mt-5 d-lg-flex">
              <p class="text-secondary fs-6 mb-0">${i + 1}</p>
            </div>
            <div class="col-9 col-lg-7 d-flex align-items-center mt-3">
              <div class="d-flex align-items-center ">
              <img id="song-img" src="${el.album.cover}" alt="" />
              <div class="d-flex flex-column   mx-5" >
                <h5  class="track-title text-light ">${el.title}</h5>
                <p class="text-secondary fs-6 d-flex d-lg-none ">
                ${el.rank}
              </p>
                </div>
              </div>
            </div>
            <div class="col-3 col-lg-1 d-none d-lg-flex align-items-center justify-content-end">
             <p class="text-secondary fs-6 ">
              ${el.rank}
              </p>
            </div>
            <div class="col-2 col-lg-1 d-flex align-items-center justify-content-end">
              
              <div class="d-flex  align-items-center">
              <i class="bi bi-three-dots-vertical text-secondary"></i>
            </div>
               
              </div>
            
            </div>
          </div>

           

          
            `
            divTracks.appendChild(divBrano)
        });

        const follow = document.querySelector('.not-clicked')
       
       follow.addEventListener('click', function () {
          if (follow.classList.contains( 'not-clicked')) {
            follow.classList.remove('not-clicked')
            follow.innerText= 'Seguito'
            follow.classList.add('clicked', 'text-success')
          } else {
            follow.classList.remove('clicked', 'text-success')
            follow.innerText= 'Segui'
            follow.classList.add('not-clicked')
          }
        })


        function addClickEventToTrackRows() {
          const trackRows = document.querySelectorAll(".track-row");
          trackRows.forEach((row) => {
            row.addEventListener("click", function () {
              const selectedTrackNumber = row.dataset.trackNumber;
              const trackTitle = row.querySelector(".track-title");
        
              const trackIndex = selectedTrackNumber - 1;
              const track = brani.data[trackIndex];
        
              // Update the album cover image
              const img = document.querySelector("#album-cover");
              img.src = track.album.cover_small;
        
              // Update the current song bar or footer depending on screen size
              if (window.matchMedia("(max-width: 767px)").matches) {
                // Update the current song bar on smaller screens
                const currentSongBar = document.querySelector(".current-song-bar");
                const currentSongTitle = currentSongBar.querySelector(".song-title");
                const currentSongArtist = currentSongBar.querySelector(".song-artist");
        
                currentSongTitle.textContent = track.title;
                currentSongArtist.textContent = track.artist.name;
        
                // Show the current song bar
                currentSongBar.style.display = "flex";
              } else {
                // Update the footer on larger screens
                const footer = document.querySelector("footer");
                const footerSongTitle = footer.querySelector(".fs-5.text.mb-0");
                const footerSongArtist = footer.querySelector(
                  ".d-none.d-md-block.fs-6.text.mt-0.fw-light"
                );
        
                footerSongTitle.textContent = track.title;
                footerSongArtist.textContent = track.artist.name;
        
                // Hide the current song bar
                const currentSongBar = document.querySelector(".current-song-bar");
                currentSongBar.style.display = "none";
              }
        
              if (row.classList.contains("selected")) {
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
        
    })
    const coverImage = detail.picture_xl
    generateAverageColor(coverImage)
    .then((color) => {
      body.style.background = `linear-gradient(to bottom, ${color} 0%, #000000 70%)`
      body.style.backgroundRepeat = 'no-repeat'; // Prevent background repeat
      body.style.backgroundSize = 'cover'; 
      
    })
      .catch((error) => {
        console.error(error)
      })
  })
  .catch((err) => {
    console.log(err)
  })
