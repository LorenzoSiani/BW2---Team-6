const songInfoElement = document.querySelector('.song-info');
const songInfoSpans = songInfoElement.querySelectorAll('span');

function updateSongInfoAnimation() {
  if (window.innerWidth > 767 && Array.from(songInfoSpans).some(span => span.offsetWidth > songInfoElement.offsetWidth)) {
    songInfoSpans.forEach(span => span.classList.add('animate'));
  } else {
    songInfoSpans.forEach(span => span.classList.remove('animate'));
  }
}

window.addEventListener('resize', updateSongInfoAnimation);
updateSongInfoAnimation();
