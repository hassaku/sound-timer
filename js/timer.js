let timer;
let remaining = 0;

function sound(msg) {
  let audio = new Audio();
  audio.src = "sound.mp3";
  audio.onended = function() {
    window.speechSynthesis.speak(new SpeechSynthesisUtterance(msg));
  };
  audio.play();
}

function testSound() {
  sound("音声テストです");
}

function startTimer() {
  const startButton = document.getElementById('start');
  startButton.disabled = true;

  const minutes = parseInt(document.getElementById('minutes').value);
  remainingSeconds = minutes*60;

  timer = setInterval(async () => {
    update();
  }, 1000);
}

function update() {
  remainingSeconds -= 1;

  minutes = Math.floor(remainingSeconds / 60);
  seconds = remainingSeconds % 60;
  const remaining = document.getElementById('remaining');
  remaining.innerHTML = "残り" + minutes + "分" + seconds + "秒";

  if (remainingSeconds <= 0) {
    sound("終了です");
    const startButton = document.getElementById('start');
    startButton.disabled = false;
    clearInterval(timer);

  } else {
    if (seconds == 59) {
      sound("残り時間" + (minutes + 1) + "分です");
    }
  }
}

