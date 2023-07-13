// Icona Cuore 
const heartIconBig = document.getElementById("heartIconBig");
let isFilledBig = false;

heartIconBig.addEventListener("click", function () {
  if (isFilledBig) {
    heartIconBig.classList.remove("bi-heart-fill");

    heartIconBig.innerHTML = "";
    heartIconBig.className = "bi bi-heart mx-2";

    isFilledBig = false;
  } else {
    heartIconBig.classList.add("bi-heart-fill");

    heartIconBig.innerHTML = "";
    heartIconBig.className = "bi bi-heart-fill mx-2";

    isFilledBig = true;
  }
});

// Icona play
// Get the play button element
const playButton = document.querySelector("#playPause");

// Add an event listener to the play button
playButton.addEventListener("click", () => {
  // Check if the button is currently showing the play icon
  if (playButton.classList.contains("bi-play-circle-fill")) {
    // Change the button to show the pause icon
    playButton.classList.remove("bi-play-circle-fill");
    playButton.classList.add("bi-pause-circle-fill");
  } else {
    // Change the button to show the play icon
    playButton.classList.remove("bi-pause-circle-fill");
    playButton.classList.add("bi-play-circle-fill");
  }
});

// Icona shuffle e repeat
// Get the shuffle and repeat button elements
const shuffleButton = document.querySelector("#shuffleIcon");
const repeatButton = document.querySelector("#repeatIcon");

// Add an event listener to the shuffle button
shuffleButton.addEventListener("click", () => {
  // Toggle the active class on the shuffle button
  shuffleButton.classList.toggle("active");
});

// Add an event listener to the repeat button
repeatButton.addEventListener("click", () => {
  // Toggle the active class on the repeat button
  repeatButton.classList.toggle("active");
});






