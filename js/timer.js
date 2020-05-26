let timer;
let remaining = 0;

function sound(fname, msg) {
  let audio = new Audio();
  audio.src = fname;
  audio.onended = function() {
    window.speechSynthesis.speak(new SpeechSynthesisUtterance(msg));
  };
  audio.play();
}

function testSound() {
  sound("sound.mp3", "音声テストです");
}

function startTimer() {
  const startButton = document.getElementById('start');
  startButton.disabled = true;

  const minutes = parseInt(document.getElementById('minutes').value);
  const seconds = parseInt(document.getElementById('seconds').value);
  remainingSeconds = minutes*60+seconds;

  sound("gong-played1.mp3", "");

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
    sound("gong-played2.mp3", "終了です");

    const startButton = document.getElementById('start');
    startButton.disabled = false;
    clearInterval(timer);

  } else {
    if (seconds == 59) {
      sound("sound.mp3", "残り時間" + (minutes + 1) + "分です");
    }

    if (seconds == 30) {
      sound("sound.mp3", (seconds) + "秒経過");
    }
  }
}

