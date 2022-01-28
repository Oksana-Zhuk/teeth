const mySPA = (function () {

  /* ------- begin view -------- */
  function ViewSPA() {
    let myContainer = null;
    let mainWindow = null;
    let canvas;
    let ctx;

    const InitialWindow = {
      id: 'main',
      title: 'Главное меню',
      render: (className = 'container') => {
        return `
              <section class="${className}">
              <canvas class="background"></canvas>
              <div id="pages" class="pages">
              <p> Привет, дружище!!!</p> <p> Добро пожаловать в игру "СПАСИ ЗУБЫ"!!!! </p>
              </br>
              <label>Ваше имя:</label><input id="username" type="text" placeholder="игрок" value="игрок"> 
              </br> </br>
              <a href="#rules">узнать правила</a>
              <a href="#myGame" onClick="userName=document.getElementById('username').value">начать игру</a>
              </div>        
              </section>
            `;
      }
    }

    const GameComponent = {
      id: 'myGame',
      title: 'Спаси зубы!',
      render: (className = 'container') => {
        return `
              <section class="${className}">
              <div id="levels" class="level0"><p></p></div>
              <canvas id="game"></canvas>
              <div id="currentResults">
              <p id="currentScore">счет</p>
              </div>
              </section>
            `;
      }
    };

    const RulesComponent = {
      id: 'rules',
      title: 'Правила игры',
      render: (className = 'container') => {
        return `
              <section class="${className}">
              <canvas class="background"></canvas>
              <div id="pages" class="pages">
                <p>Необходимо защитить зубы от еды!</p> <p>Стрелки "<-" и "->" - движение тюбика влево и вправо </br> "shift" - перемещение тюбика в верхнюю или нижнюю позиции </br> "пробел" - стрелять</p>
                <a href="#main">назад</a>
                <a href="#myGame">начать игру</a> 
                </div>
              </section>
            `;
      }
    };

    const ScoreComponent = {
      id: 'score',
      title: 'КОНЕЦ ИГРЫ!',
      render: (className = 'container') => {
        return `
              <section class="${className}">
              <canvas class="background"></canvas>
              <div id="pages" class="pages">
              <p id="result">${userName}! Ваш результат ${result} очков !!!</p>
              <ol id="records">
              <li> ${highscoreList[0][0]}, счет: ${highscoreList[0][1]}</li>
              <li> ${highscoreList[1][0]}, счет: ${highscoreList[1][1]}</li>
              <li> ${highscoreList[2][0]}, счет: ${highscoreList[2][1]}</li>
              <li> ${highscoreList[3][0]}, счет: ${highscoreList[3][1]}</li>
              <li> ${highscoreList[4][0]}, счет: ${highscoreList[4][1]}</li>
              </ol>
              <a href="#myGame">начать игру</a>
                </div>
              </section>
            `;
      }

    };


    const ErrorComponent = {
      id: "error",
      title: "Произошла ошибка",
      render: (className = "container") => {
        return `
            <section class="${className}">
            <canvas class="background"></canvas>
            <div id="pages" class="pages">
              <h1>Ошибка 404</h1>
              <p>Страница не найдена, попробуйте вернуться на <a href="#main">главную</a></p>
              </div>
            </section>
          `;
      }
    };

    const router = {
      main: InitialWindow,
      mygame: GameComponent,
      rules: RulesComponent,
      score: ScoreComponent,
      default: InitialWindow,
      error: ErrorComponent
    };

    this.init = function (container) {
      myContainer = container;
      mainWindow = myContainer.querySelector("#main");
      document.body.style.overflow = "hidden";
    }

    this.drawBackground = function () {
      canvas = myContainer.querySelector('.background');
      ctx = canvas.getContext('2d');
      canvas.width = document.documentElement.clientWidth;
      canvas.height = document.documentElement.clientHeight;

      ctx.fillStyle = 'rgb(97, 3, 3)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fill();

      window.addEventListener('resize', function () {
        canvas.width = document.documentElement.clientWidth;
        canvas.height = document.documentElement.clientHeight;
        ctx.fillStyle = 'rgb(97, 3, 3)';
        ctx.fillRect(0, 0, canvas.width, canvas.height); 
        ctx.fill();
      }, false);
    }



    this.renderContent = function (hashPageName) {
      let routeName = "default";

      if (hashPageName.length > 0) {
        routeName = hashPageName in router ? hashPageName : "error";
      }
      window.document.title = router[routeName].title;
      myContainer.innerHTML = router[routeName].render(routeName);

      if (routeName == 'mygame') {
        if (loaded) {
          myGameModel.initAll(myGameView, myGameController);
        } else { document.location.hash = '#main' }
      }
      if (routeName == 'main' || routeName == 'default') {
        loaded = 1;
      }
      if (routeName != 'mygame') {
        window.requestAnimationFrame(this.drawBackground);
      }

    }
  };
  /* -------- end view --------- */
  /* ------- begin model ------- */
  function ModelSPA() {
    let myView = null;

    this.init = function (view) {
      myView = view;
    }

    this.updateState = function (hashPageName) {
      myView.renderContent(hashPageName);
    }

  }

  /* -------- end model -------- */
  /* ----- begin controller ---- */
  function ControllerSPA() {
    let myContainer = null;
    let myModel = null;

    this.init = function (container, model) {
      myContainer = container;
      myModel = model;

      window.addEventListener("hashchange", this.updateState);

      this.updateState();

    }

    this.updateState = function () {
      const hashPageName = location.hash.slice(1).toLowerCase();
      myModel.updateState(hashPageName);
    }
  };
  /* ------ end controller ----- */

  return {
    init: function (container) {

      const view = new ViewSPA();
      const model = new ModelSPA();
      const controller = new ControllerSPA();

      view.init(document.getElementById(container));
      model.init(view);
      controller.init(document.getElementById(container), model);
    }
  };

}());
/* ------ end app module ----- */

/*** --- init module --- ***/
document.addEventListener("DOMContentLoaded", mySPA.init("content")); // инициализируем модуль как только DOM готов.
