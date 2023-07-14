const albumsArray = [85363, 62646342, 1434890, 1434890, 92071, 397544257, 51001312, 8887733, 1345688, 9536122, 1121181, 303415, 68346981, 70200002, 212377];
const albumUrl = 'https://striveschool-api.herokuapp.com/api/deezer/album/';
const albumCont = document.getElementById('album-container');
const albumCont2 = document.getElementById('album-container-2');
console.log(albumUrl + albumsArray[1]);

const homePageRend = function() {
  albumsArray.forEach(el => {
    fetch(albumUrl + el)
      .then(res => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error('Error in fetch');
        }
      })
      .then((detail) => {
        console.log(detail);
        let newDiv = document.createElement('div');
        newDiv.classList.add('col');
        newDiv.innerHTML = `
          <div class="card img-card p-2">
            <img src="${detail.cover_medium}" class="card-img-top " alt="...">
            <div class="card-body">
              <a href="http://127.0.0.1:5500/AlbumPage/album.html?id=${detail.id}" class="text-light f-4 fw-medium d-block">${detail.title}</a>
              <a href="http://127.0.0.1:5500/ArtistPage/artist.html?id=${detail.artist.id}" class="text-light f-6 fw-lighter">${detail.artist.name}</a>
            </div>
          </div>
        `;
        albumCont.appendChild(newDiv);
      })
      .catch(err => {
        console.log(err);
      });
  });
};

homePageRend();

const generateAverageColor = function(imageUrl) {
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
};

const homePageRend2 = function() {
  albumsArray.forEach(el => {
    fetch(albumUrl + el)
      .then(res => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error('Error in fetch');
        }
      })
      .then((detail) => {
        console.log(detail);
        let newDiv = document.createElement('div');
        newDiv.classList.add('col');
        newDiv.innerHTML = `
          <div class="card mainCards2">
            <div class="card-body">
              <div>
                <div class="d-flex">
                  <img src="${detail.cover_medium}" alt="Immagine" width="150px" />
                  <div class="right-div ms-3">
                    <a href="http://127.0.0.1:5500/AlbumPage/album.html?id=${detail.id}" class="text-light f-4 fw-medium d-block">${detail.title}</a>
                    <a href="http://127.0.0.1:5500/ArtistPage/artist.html?id=${detail.artist.id}" class="text-light">${detail.artist.name}</a>
                  </div>
                </div>
                <div class="text-light d-flex mt-2 align-items-center justify-content-between">
                  <div>
                    <i class="bi bi-heart fs-3 p-2"></i>
                    <i class="bi bi-three-dots-vertical fs-3 p-2"></i>
                  </div>
                  <div class="d-flex align-items-center">
                    <p>${detail.tracks.data.length} brani</p>
                    <i  class=" bi bi-play-circle fs-3 p-2"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        `;

        albumCont2.appendChild(newDiv);
        const card = newDiv.querySelector('.mainCards2');
        const coverImage = detail.cover_medium;

        generateAverageColor(coverImage)
          .then((color) => {
            card.style.background = `linear-gradient(to bottom right, ${color} 0%, #171717 20%)`;
            card.style.backgroundRepeat = 'no-repeat';
            card.style.backgroundSize = 'cover';
          })
          .catch((err) => {
            console.log(err);
          });

        const heart = newDiv.querySelector('.bi-heart');
        heart.addEventListener('click', function () {
          if (heart.classList.contains('bi-heart-fill')) {
            heart.classList.remove('bi-heart-fill', 'text-success');
            heart.classList.add('bi-heart');
          } else {
            heart.classList.remove('bi-heart');
            heart.classList.add('bi-heart-fill', 'text-success');
          }
        });

        
    const play = newDiv.querySelector('.bi-play-circle');
    play.addEventListener('click', function () {
      if (play.classList.contains('bi-play-circle')) {
        play.classList.remove('bi-play-circle')
        play.classList.add('bi-pause-circle-fill')
      } else {
        play.classList.remove('bi-pause-circle-fill')
        play.classList.add('bi-play-circle')
      }
    })
      })
      .catch(err => {
        console.log(err);
      });
  });
};

homePageRend2();



