// YouTube Background Music Configuration
const YOUTUBE_VIDEO_ID = "vhVBWw6rId0"; // "Heaven Can Wait"
var ytPlayer;
var playerReady = false;

window.onYouTubeIframeAPIReady = function() {
  ytPlayer = new YT.Player('youtube-player', {
    height: '1',
    width: '1',
    videoId: YOUTUBE_VIDEO_ID,
    playerVars: {
      'autoplay': 0,
      'controls': 0,
      'loop': 1,
      'playlist': YOUTUBE_VIDEO_ID,
      'playsinline': 1 // Essential for mobile browsers (iOS/Android)
    },
    events: {
      'onReady': function(event) {
        playerReady = true;
        event.target.unMute();
        event.target.setVolume(100);
      }
    }
  });
};

document.addEventListener("DOMContentLoaded", () => {
  const introOverlay = document.getElementById("intro-overlay");
  const introEnvelope = document.getElementById("intro-envelope");

  // Open intro envelope, trigger confetti, and force audio playback on touch
  introEnvelope.addEventListener("click", () => {
    introEnvelope.classList.add("open");

    // Force playback on user touch/click gesture
    if (ytPlayer && typeof ytPlayer.playVideo === 'function') {
      ytPlayer.unMute();
      ytPlayer.playVideo();
    }

    confetti({
      particleCount: 70,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#8c7355', '#d98880', '#f7f3ed', '#ffb7b2']
    });

    setTimeout(() => {
      introOverlay.classList.add("fade-out");
    }, 600);
  });

  // ... rest of your existing script.js logic ...
});

document.addEventListener("DOMContentLoaded", () => {
  // Intro Envelope Elements
  const introOverlay = document.getElementById("intro-overlay");
  const introEnvelope = document.getElementById("intro-envelope");

  // Open intro envelope, trigger confetti, and play background music
  introEnvelope.addEventListener("click", () => {
    introEnvelope.classList.add("open");
    
    // Play background music
    if (ytPlayer && typeof ytPlayer.playVideo === 'function') {
      ytPlayer.playVideo();
    }

    // Initial Confetti Burst on opening
    confetti({
      particleCount: 70,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#8c7355', '#d98880', '#f7f3ed', '#ffb7b2']
    });

    // Fade out intro overlay after flap animation completes
    setTimeout(() => {
      introOverlay.classList.add("fade-out");
    }, 600);
  });

  const polaroid = document.getElementById("polaroid");
  const cardImg = document.getElementById("card-img");
  const cardCaption = document.getElementById("card-caption");
  const cardDate = document.getElementById("card-date");
  const noteText = document.getElementById("note-text");
  const nextBtn = document.getElementById("next-btn");
  const secretBtn = document.getElementById("secret-btn");
  const secretModal = document.getElementById("secret-modal");
  const closeModal = document.getElementById("close-modal");

  // Array of scrapbook slides/memories
  const memorySlides = [
    {
      img: "cute.jpg",
      caption: "",
      date: "HAPPY BIRTHDAY!",
      note: "Wishing you a day filled with love, laughter, and all the things that make you happiest. You deserve the best!"
    },
    {
      img: "pretty.jpg",
      caption: "",
      date: "HAPPY BIRTHDAY!",
      note: "May your birthday be as wonderful and extraordinary as you are. Here's to another year of amazing adventures and cherished memories!"
    },
    {
      img: "beautiful.jpg",
      caption: "",
      date: "HAPPY BIRTHDAY!",
      note: "On your special day, I hope you are surrounded by the people you love and the things that bring you joy. Happy Birthday!"
    }
  ];

  let currentIndex = 0;

  // Trigger Confetti Burst on clicking Polaroid
  polaroid.addEventListener("click", () => {
    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.65 },
      colors: ['#8c7355', '#d98880', '#f7f3ed', '#ffb7b2']
    });
  });

  // Cycle through memories on button click
  nextBtn.addEventListener("click", () => {
    currentIndex++;

    if (currentIndex < memorySlides.length) {
      updateSlide(currentIndex);
      
      if (currentIndex === memorySlides.length - 1) {
        nextBtn.textContent = "Back to Start";
        secretBtn.classList.remove("hidden"); // Reveal secret button on last slide
      }
    } else {
      currentIndex = 0;
      updateSlide(currentIndex);
      nextBtn.textContent = "Next";
    }
  });

  function updateSlide(index) {
    const slide = memorySlides[index];
    
    // Slight tilt animation effect on slide switch
    polaroid.style.transform = "rotate(6deg) scale(0.95)";
    setTimeout(() => {
      cardImg.src = slide.img;
      cardCaption.textContent = slide.caption ? `"${slide.caption}"` : "";
      cardDate.textContent = slide.date;
      noteText.textContent = slide.note;
      polaroid.style.transform = "rotate(-3deg) scale(1)";
    }, 200);
  }

  // Secret Modal Handlers
  secretBtn.addEventListener("click", () => {
    secretModal.classList.add("active");
    confetti({
      particleCount: 100,
      spread: 100,
      origin: { y: 0.5 }
    });
  });

  closeModal.addEventListener("click", () => {
    secretModal.classList.remove("active");
  });

  secretModal.addEventListener("click", (e) => {
    if (e.target === secretModal) {
      secretModal.classList.remove("active");
    }
  });
});