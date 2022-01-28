function TeethView() {

  let modelName;
  let canvas = null;
  let ctx = null;
  let currentScore;
  let audioList = [];
  let audioObject = [];

  this.init = function (model) {

    modelName = model;

    currentScore = document.querySelector('#currentScore');

    canvas = document.querySelector('#game');
    ctx = canvas.getContext('2d');

    document.body.style.overflow = "hidden";
    this.preloadMyAudio();
    console.log('Загружено')
    window.requestAnimationFrame(modelName.draw.bind(modelName));  
  }

  this.loadingMessage = function () {
    let windowLevel = document.querySelector('#levels');
    if (windowLevel) {
    windowLevel.classList.add('levels');
    windowLevel.classList.remove('level0');
    windowLevel.querySelector('p').textContent = `Ждите, идет загрузка...`;
    }
  }

  this.errorMessage = function () {
    let windowLevel = document.querySelector('#levels');
    if (windowLevel) {
    windowLevel.classList.add('levels');
    windowLevel.classList.remove('level0');
    windowLevel.querySelector('p').textContent = `Ошибка! Попробуйте обновить страницу`;
    }
  }

  this.preloadMyAudio = function () {

    audioList = [
      'audio/level.mp3',
      'audio/shot.mp3',
      'audio/top.mp3',
      'audio/kill.mp3',
      'audio/teeth_delete.mp3',
      'audio/game_over.mp3',

    ];
    for (let i = 0; i < audioList.length; i++) {
      let myAudio = new Audio();
      myAudio.src = audioList[i];
      audioObject[i] = myAudio;
    }
  }

  this.render = function (frame) {
    ctx.drawImage(frame, 0, 0);
    window.requestAnimationFrame(modelName.draw.bind(modelName))
  }

  this.resizeCanvas = function (w, h) {
    canvas.width = w;
    canvas.height = h;
  }

  this.startLevel = function (l) {

    let windowLevel = document.querySelector('#levels');
    if (windowLevel) {

      windowLevel.classList.add('levels');
      windowLevel.classList.remove('level0');
      audioObject[0].play();
      windowLevel.querySelector('p').textContent = `Уровень ${l}`;
      setTimeout(this.endLevel, 2000);
    }
  }

  this.endLevel = function () {
    let windowLevel = document.querySelector('#levels');
    if (windowLevel) {
      windowLevel.classList.remove('levels');
      windowLevel.classList.add('level0');
    }
  }


  this.updateScore = function (s) {
    currentScore.textContent = `Очки: ${s}`;
  }

  this.gameOver = function () {
    let windowLevel = document.querySelector('#levels');
    if (windowLevel) {
     
      audioObject[5].play();
      windowLevel.querySelector('p').textContent = `конец игры!!! счет ${result}`;
      setTimeout(this.endLevel, 5000);
      windowLevel.classList.add('levels');
      windowLevel.classList.remove('level0');

      setTimeout(function () { document.location.hash = '#score' }, 5000);
    }
  }

  this.audioShot = function () {
    audioObject[1].volume = 0.5;
    audioObject[1].play();
  }

  this.audioToggleTube = function () {
    audioObject[2].play();
  }

  this.audioKillFood = function () {
    audioObject[3].play();
  }

  this.audioTeethDelete = function () {
    audioObject[4].play();
  }
}
