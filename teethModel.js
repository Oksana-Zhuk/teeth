function TeethModel() {


  let vievName;
  let controllerName;
  let imageList;
  let imageObject = [];
  let bufferCanvas;
  let bufferCtx;

  //  let teethSize;
  // let toothSize;
  let dLeftSize;
  let dRightSize;
  let dCenterSize;
  let dLineSize;
  let indent;
  let teethAmount;
  let battleArea;
  let scaleX;
  let scaleY;
  let scale;
  let score;
  let bindingX = [];
  let bindingY = [];
  let d;
  let divisor;
  let toothList = [];
  let spareTooth;
  //let newTooth = [];
  let gameOn;
  // let toothPositions = [];
  let tubeFlags = [];
  let weapon;
  let weaponTimer;
  let tube;
  let tubeSpeed;
  let tubeMoveTimer;

  let tubeSide;
  let tubePosition = [];
  let bulletsList = [];
  let foodList = [];
  let loaded = 0;
  let spriteFoodX = [];
  let spriteFoodY = [];
  let spriteFoodBias;
  let spriteToothX = [];
  let spriteToothY = [];
  let spriteToothBias;


  let foodDivizor;
  let playCounter;
  let playTimer;
  let makeLevelsFood = [];
  let levels;
  let level;


  this.initAll = function (viev, controller) {//подгрузка и проверка картинок
    vievName = viev;
    controllerName = controller;
    let faultTimer = 10000;
    let loadCheckStep = 50;


    console.log('Ждите, идет загрузка...')

    //this.preloadMyImages();

    // window.addEventListener('load', function () { loaded = 1 });
    //setTimeout(timeout.bind(this), 4000);
    function timeout() {
      this.loadingMessage();
      console.log('Грузится...')
      if (faultTimer >= 0) {
        faultTimer -= loadCheckStep;
        if (!loaded) {
          setTimeout(timeout.bind(this), loadCheckStep);
        } else {
          vievName.endLevel();
          this.init();
        }
      } else {
        console.log('Ошибка');
        this.initFault();
      }
    }
    vievName.endLevel();
    timeout.bind(this)();
  }

  this.init = function () {
    score = 0;
    gameOn = 0;
    playCounter = 0;
    spareTooth = 0;
    divisor = 5;
    indent = 100;
    teethAmount = 10;
    levels = 5;
    level = 0;
    battleAreaBiasY = 449;
    battleArea = [0, 0, 1000, 1000];
    weaponTimer = 0;
    tubeSide = 0;
    weapon = 0;

    tubeSpeed = 4;  //big is small
    tubeFlags = [0, 0, 0]; //left Right Fire
    // teethSize = [(imageObject[4].width / 2-10) / divisor, imageObject[4].height / divisor];
    // toothSize = [imageObject[5].width / divisor, imageObject[5].height / divisor];
    dLeftSize = [imageObject[0].width / divisor, imageObject[0].height / divisor];
    dRightSize = [imageObject[3].width / divisor, imageObject[3].height / divisor];
    dCenterSize = [imageObject[2].width / divisor, imageObject[2].height / divisor];
    dLineSize = [3, imageObject[1].height / divisor];

    vievName.init(this);
    controllerName.init(this);

    bufferCanvas = document.createElement('canvas');
    bufferCtx = bufferCanvas.getContext('2d');
    // потом перенести





      this.levelsGenerator();   //Generate levels or...


    this.tubeInit();
    this.foodInit();

    this.updateSize();
    this.toothInit();

    window.addEventListener('resize', this.updateSize.bind(this));
    /////// START!!!!
    this.newGame();
    ///////
  }


  this.newGame = function () {
    level = 0;
    let l = level + 1;

    vievName.startLevel(l)
    this.setScore(0);
    this.startGame();
    getUsersHighscores();
  }
  this.setScore = function (s) {
    score = s;
    vievName.updateScore(score)
  }



  this.levelsGenerator = function () {
    let firstFoodTimeout = 5;

    let weaponSprites = [12, 14];
    let weaponMoveTypes = [1, 2];
    let weaponSpeed = [50, 100];
    let weaponPosition = [20, 80];
    let weaponPercents = [15, 10, 8, 7, 6]
    let foodPosition = [300, 700];
    let levelsLength = [15, 20, 30, 35, 40];
    let levelsFood = [12, 20, 30, 100, 50];

    let levelsSprites = [[0, 0, 0, 1, 1, 2], [0, 0, 1, 1, 2, 5, 4], [0, 1, 2, 4, 5, 6, 7], [0, 1, 2, 3, 4, 5, 6, 7, 8], [7, 8, 3, 3, 8]];
    let levelsSpeed = [[70, 110], [110, 140], [140, 170], [170, 230], [200, 300]];
    let levelsMoves = [[0], [0, 0, 0, 1, 2], [0, 1, 2], [0, 1, 2, 3, 4], [1, 2, 3, 3, 4, 4]]
    for (let l = 0; l < levels; l++) {
      makeLevelsFood[l] = [];
      for (let f = 0; f < levelsFood[l]; f++) {
        let rand = getRandom(1, 100);
        let speed
        let startPosition
        let spriteType
        let moveType

        if (rand < weaponPercents[l]) {//weapon
          rand = getRandom(0, weaponSprites.length - 1);
          spriteType = weaponSprites[rand];

          moveType = weaponMoveTypes[rand];
          speed = getRandom(weaponSpeed[0], weaponSpeed[1]);
          startPosition = getRandom(weaponPosition[0], weaponPosition[1]);
        } else {//food

          spriteType = levelsSprites[l][getRandom(0, (levelsSprites[l].length - 1))];
          moveType = levelsMoves[l][getRandom(0, (levelsMoves[l].length - 1))];
          speed = levelsSpeed[l][getRandom(0, (levelsSpeed[l].length - 1))];
          startPosition = getRandom(foodPosition[0], foodPosition[1]);



        }

        let startsideX = getRandom(0, 1);

        let startTime = getRandom(firstFoodTimeout, (firstFoodTimeout + levelsLength[l] - 1));
        let startSideY = getRandom(0, 1);
        makeLevelsFood[l][f] = [startTime, spriteType, moveType, speed, startPosition, startsideX, startSideY]


      }
    }



    function getRandom(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
   // console.log(makeLevelsFood)

  }

  this.tubeInit = function () {
    let spriteTubeX = 107;
    let spriteTubeY = 245;
    let spriteTubeBiasX = 120;
    let spriteTubeBiasY = 250;
    let tubeDivisor = 2;
    tube = new TubeObject();
    tube.init(this, weapon, tubeSide, battleArea, spriteTubeX, spriteTubeY, spriteTubeBiasX, spriteTubeBiasY, tubeDivisor);
  }
  this.foodInit = function () {
    spriteFoodX = [118, 103, 112, 70, 110, 118, 96, 97, 49, 0, 0, 0, 200, 0, 200];//[12] colgate  [14] aquafresh
    spriteFoodY = [97, 119, 94, 128, 121, 108, 121, 106, 115, 0, 0, 0, 58, 0, 58];
    spriteFoodBias = 125;
    foodDivizor = 3
  }
  this.createFood = function (foodType, moveType, speed, startPositionX, startSideX, startSideY) {

    // WEAPON        [time,sprite 12||14 ,WeaponType 1||2, speed,StartPositionY (%), startSideX, startSideY (any)]
    // WEAPON       inModel, inId, inBattleArea, inWeaponSize, inWeaponType, inSpeed, inStartPositionY (%), inStartSideX, inStartSideY, inScale
    //   FOOD       inModel, inId, inBattleArea, inFoodSize, inMoveType, inSpeed, inStartPositionX, inStartSideX, inStartSideY, inScale
    let foodSize = [spriteFoodX[foodType] / foodDivizor, spriteFoodY[foodType] / foodDivizor];
    let t = foodList.length;
    foodList[t] = [];
    //0=object 1=visible 2=sx 3=sy 4=sWidth 5=sHeight 6=dx 7=dy 8=dWidth 9=dHeight
    if (foodType == 12 || foodType == 14) {
      foodList[t][0] = new WeaponObject();
      foodList[t][10] = 1;
    } else {
      foodList[t][0] = new FoodObject();
      foodList[t][10] = 0;
    }
    foodList[t][1] = 1;
    foodList[t][2] = spriteFoodBias * foodType;
    foodList[t][3] = 0;
    foodList[t][4] = spriteFoodX[foodType];
    foodList[t][5] = spriteFoodY[foodType];
    foodList[t][0].init(this, t, battleArea, foodSize, moveType, speed, startPositionX, startSideX, startSideY, scale)
  }

  this.updateFood = function (id, x, y, foodSize) {
    foodList[id][6] = x - foodSize[0] / 2;
    foodList[id][7] = y - foodSize[1] / 2;
    foodList[id][8] = foodSize[0]; // without devisor!!!
    foodList[id][9] = foodSize[1];
    ////check collision
    //bulletsList[0].collision();
    //foodList[0].collision();
  }

  this.bulletInit = function (color, bulletSpeed, angle) {

    let spriteBulletX = 12;
    let spriteBulletY = 12;
    let spriteBulletBias = 20;
    let bulletDivisor = 1;
    let bulletId = bulletsList.length
    bulletsList[bulletId] = [];
    //0=object 1=visible 2=sx 3=sy 4=sWidth 5=sHeight 6=dx 7=dy 8=dWidth 9=dHeight
    bulletsList[bulletId][0] = new BulletObject();
    bulletsList[bulletId][1] = 1;
    bulletsList[bulletId][2] = spriteBulletBias * color;
    bulletsList[bulletId][3] = 0;
    bulletsList[bulletId][4] = spriteBulletX;
    bulletsList[bulletId][5] = spriteBulletY;
    bulletsList[bulletId][0].init(this, bulletId, battleArea, tubePosition[4], tubePosition[5], bulletSpeed, angle); // 6=dx 7=dy will be updated
    bulletsList[bulletId][8] = spriteBulletX / bulletDivisor;
    bulletsList[bulletId][9] = spriteBulletY / bulletDivisor;
    //   console.log('New bullet! ' + tubePosition[4] + ' ' + tubePosition[5])
  }

  this.updateBullet = function (id, x, y) {
    bulletsList[id][6] = x;
    bulletsList[id][7] = y;

    for (let i = 0; i < foodList.length; i++) {
      /*     console.log('foodList[i][1] '+foodList[i][1])  
          console.log('foodList[i][6] '+foodList[i][6])   */

      if (foodList[i][1]) {
        if (foodList[i][6] < bulletsList[id][6] && foodList[i][6] + foodList[i][8] > bulletsList[id][6]) {
          if (foodList[i][7] < bulletsList[id][7] && foodList[i][7] + foodList[i][9] > bulletsList[id][7]) {
            bulletsList[id][0].collision();
            foodList[i][0].collision();
            vievName.audioKillFood();
            let s = score + 1
            this.setScore(s)
          }
        }
      }
      ////check collision
      //bulletsList[0].collision();
      //foodList[0].collision();
    }
  }

  this.deleteFood = function (id) {

    foodList[id][1] = 0;
  }

  this.deleteBullet = function (id) {
    bulletsList[id][1] = 0;
  }

  this.initFault = function () {
    vievName.errorMessage();
  }

  this.loadingMessage = function () {
    vievName.loadingMessage();
  }

 /*  this.reLoad = function () {

    vievName.reLoad();
  } */

  this.addTooth = function () {
    for (let i = 0; i < teethAmount * 2; i++) {
      if (spareTooth && !toothList[i][0]) {
        toothList[i][0] = 1;
        spareTooth--;
      }
    }
  }
  this.toothInit = function () {

    spriteToothX = 370;
    spriteToothY = 293;
    spriteToothBias = 380;


    for (let t = 0; t < teethAmount * 2; t++) {
      toothList[t] = [];
      toothList[t][0] = 1;  //visible

      if (t < teethAmount) {//down side
        toothList[t][1] = 0;
      } else {//up side
        toothList[t][1] = 1;
      }
      toothList[t][2] = spriteToothBias * toothList[t][1];
      toothList[t][3] = 0;
      toothList[t][4] = spriteToothX;
      toothList[t][5] = spriteToothY;
    }
    this.updateToothPositions();
  }


  this.updateToothPositions = function () {
    let outputToothWidth = spriteToothX / divisor;
    let outputToothHeight = spriteToothY / divisor;
    //   let outputBiasY = battleAreaBiasY/divisor

    for (let t = 0; t < teethAmount * 2; t++) {
      if (t < teethAmount) {//down side
        toothList[t][6] = (bindingX[3 + t * 2] + bindingX[4 + t * 2] - outputToothWidth) / 2;
        toothList[t][7] = battleArea[3];
      } else {//up side
        toothList[t][6] = (bindingX[3 + (t - teethAmount) * 2] + bindingX[4 + (t - teethAmount) * 2] - outputToothWidth) / 2;
        toothList[t][7] = battleArea[1] - outputToothHeight / scaleY;
      }
      toothList[t][8] = outputToothWidth;
      toothList[t][9] = outputToothHeight;

    }
    //toothPositions[id] = [sx, sy, sWidth, sHeight, dx * scale, dy * scale, dWidth * scale, dHeight * scale];
  }


  this.updateSize = function () {
    bufferCanvas.width = document.documentElement.clientWidth - 15;
    bufferCanvas.height = document.documentElement.clientHeight - 60;
    if (bufferCanvas.width > bufferCanvas.height) {
      scaleY = 1;
      scaleX = bufferCanvas.width / bufferCanvas.height;
      scale = bufferCanvas.height / 1000;
    } else {
      scaleX = 1;
      scaleY = bufferCanvas.height / bufferCanvas.width;
      scale = bufferCanvas.width / 1000;
    }
    battleArea[1] = battleAreaBiasY / divisor / scaleY;
    battleArea[3] = 1000 - battleAreaBiasY / divisor / scaleY;
    vievName.resizeCanvas(bufferCanvas.width, bufferCanvas.height)
    this.setBinding();
    //this.updateTeethSizes();
    //  this.updateTubeSizes();
    // console.log('toothSize'+toothSize)


    // this.updateTubeSizes = function () {
    //tube.updateSizes(scale);
    /*     for (let t = 0; t < teethAmount; t++) {
          let c = (bindingX[3 + t * 2] + bindingX[4 + t * 2]) / 2;
          newTooth[t].updateSize(c, battleArea[1], divisor);
        }
        for (let t = 0; t < teethAmount; t++) {
          let c = (bindingX[3 + t * 2] + bindingX[4 + t * 2]) / 2;
          newTooth[t + teethAmount].updateSize(c, battleArea[3], divisor);
        } */
    if (gameOn) { this.updateToothPositions(); }


  }
  this.Kill = function (foodID, toothSide) {
    // toothPositions[id] = [sx, sy, sWidth, sHeight, dx * scale, dy * scale, dWidth * scale, dHeightparams * scale];
    //0=object 1=visible 2=sx 3=sy 4=sWidth 5=sHeight 6=dx 7=dy 8=dWidth 9=dHeight
    let foodX1 = (foodList[foodID][6] - foodList[foodID][8] / 2) * scaleX;
    let foodX2 = (foodList[foodID][6] + foodList[foodID][8] / 2) * scaleX;
    let liveToothCount = 0;
    for (let s = 0; s <= 1; s++) {
      for (let t = 0; t < teethAmount; t++) {

        let toothID = s * teethAmount + t;
        if (toothList[toothID][0]) {
          liveToothCount++;
          if (s == toothSide) {
            if (foodX2 > toothList[toothID][6]) {
              if (foodX1 < toothList[toothID][6] + toothList[toothID][8]) {
                toothList[toothID][0] = 0;
                liveToothCount--;
                vievName.audioTeethDelete();
              }
            }
          }
        }
      }
    }
    if (!liveToothCount) { this.gameOver() }
  }

  this.foodGenerator = function () {
    playCounter++;
    // this.createFood(foodType, moveType, speed,startPositionX, startSideX, startSideY)
    for (let i = 0; i < makeLevelsFood[level].length; i++) {
      if (playCounter == makeLevelsFood[level][i][0]) {

        this.createFood(makeLevelsFood[level][i][1], makeLevelsFood[level][i][2], makeLevelsFood[level][i][3], makeLevelsFood[level][i][4], makeLevelsFood[level][i][5], makeLevelsFood[level][i][6]);
      }
    }
    let lastFood = makeLevelsFood[level].length - 1
    if (playCounter > makeLevelsFood[level][lastFood][0]) {
      let levelComplete = 1
      for (let i = 0; i < foodList.length; i++) {
        if (foodList[i][1]) {
          levelComplete = 0;
        }
      }
      if (levelComplete) {

        level++;
        this.stopGame();

        if (level < levels) {
          this.newLevel();
        } else {
          this.gameOver();
        }
      }
    }

    if (weaponTimer) {
      if (weaponTimer == 1) {
        this.changeWeapon(0);
      }
      weaponTimer--;
    }
  }

  this.newLevel = function () {
    this.addTooth();
    playCounter = 0;
    let l = level + 1;
    vievName.startLevel(l)
    this.startGame();
  }

  this.gameOver = function () {

    this.stopGame();

    for (let b = 0; b < bulletsList.length; b++) {
      if (bulletsList[b][1]) {
        bulletsList[b][0].deleteBullet()
      }
    }
    for (let f = 0; f < foodList.length; f++) {
      if (foodList[f][1]) {
        if (foodList[f][10]) {
          foodList[f][0].deleteWeapon()
        } else {
          foodList[f][0].deleteFood()
        }

      }
    }

        result=score;
if (result>nimimumScore){
      updateUsersHighscores(userName,result)
      vievName.gameOver();
      
    }else{   vievName.gameOver()}
         

  
  }




  //(25) [0, 100, 121.8, ===============21.8 d
  //196.26, 251.46,  ==============55 t
  // 325.93, 381.13, 455.60, 510.80, 585.27, 640.47, 714.94, 770.14, 844.61, 899.81, 974.27, 1029.47, 1103.94, 1159.14, 1233.61, 1288.81, 1363.28, 1418.48, 1492.95, 1514.75]

  this.setBinding = function () { //вычисляем координаты элементов и десен
    bindingX[0] = 0;
    bindingX[1] = indent * scaleX;
    bindingX[2] = bindingX[1] + dLeftSize[0]

    d = (1000 * scaleX - bindingX[2] * 2 - dCenterSize[0] * teethAmount) / (teethAmount + 1);
    for (let i = 3; i < 3 + teethAmount * 2; i += 2) {
      bindingX[i] = bindingX[i - 1] + d;
      bindingX[i + 1] = bindingX[i] + dCenterSize[0];
    }
    bindingX[3 + teethAmount * 2] = bindingX[2 + teethAmount * 2] + d;
    bindingX[4 + teethAmount * 2] = bindingX[3 + teethAmount * 2] + dRightSize[0];
    bindingY[0] = 0;
    bindingY[1] = dLeftSize[1];
    bindingY[2] = battleArea[3];
    bindingY[3] = 1000 * scaleY - dLeftSize[1];
  }

  this.startGame = function () {
    tubeMoveTimer = setInterval(this.tubeMove.bind(this), tubeSpeed);
    playTimer = setInterval(this.foodGenerator.bind(this), 1000);
    gameOn = 1;
  }

  this.stopGame = function () {
    clearInterval(tubeMoveTimer);
    clearInterval(playTimer);
    gameOn = 0;
  }

  this.preloadMyImages = function () {

    imageList = [
      'sprites/dleft.png', //0
      'sprites/dline.png',
      'sprites/dcenter.png',
      'sprites/dright.png',
      'sprites/teeth.png', //4
      'sprites/tooth.png',// 5 с десной
      'sprites/dleftTop.png', //6
      'sprites/dcenterTop.png',
      'sprites/drightTop.png',
      'sprites/dlineTop.png',
      'sprites/food.png',
      'sprites/pasta.png', //11
      'sprites/bullets.png'
    ];
    for (let i = 0; i < imageList.length; i++) {
      let myImage = new Image();
      myImage.src = imageList[i];
      imageObject[i] = myImage;
    }
    window.addEventListener('load', function () { loaded = 1 });
  }


  this.draw = function () {
    ///////////////////// Background
    bufferCtx.fillStyle = 'rgb(97, 3, 3)';
    bufferCtx.fillRect(bindingX[0], bindingY[0], 1000 * scaleX * scale, 1000 * scaleY * scale);
    bufferCtx.strokeStyle = 'blueviolet';
    bufferCtx.lineWidth = 1;
    bufferCtx.strokeRect(bindingX[0], bindingY[0], 1000 * scaleX * scale, 1000 * scaleY * scale);

    ///////////////////////// Gum bottom

    bufferCtx.drawImage(imageObject[0], bindingX[1] * scale, bindingY[3] * scale, dLeftSize[0] * scale, dLeftSize[1] * scale);

    for (let i = 2; i < 2 + teethAmount * 2; i += 2) {
      bufferCtx.drawImage(imageObject[1], bindingX[i] * scale, bindingY[3] * scale, d * scale, dLineSize[1] * scale);
      bufferCtx.drawImage(imageObject[2], bindingX[i + 1] * scale, bindingY[3] * scale, dCenterSize[0] * scale, dCenterSize[1] * scale);
    }

    bufferCtx.drawImage(imageObject[1], bindingX[bindingX.length - 3] * scale, bindingY[3] * scale, d * scale, dLineSize[1] * scale);

    bufferCtx.drawImage(imageObject[3], bindingX[bindingX.length - 2] * scale, bindingY[3] * scale, dRightSize[0] * scale, dRightSize[1] * scale);

    ///////////////////////// Gum top

    bufferCtx.drawImage(imageObject[6], bindingX[1] * scale, bindingY[0] * scale, dLeftSize[0] * scale, dLeftSize[1] * scale);

    for (let i = 2; i < 2 + teethAmount * 2; i += 2) {
      bufferCtx.drawImage(imageObject[9], bindingX[i] * scale, bindingY[0] * scale, d * scale, dLineSize[1] * scale);
      bufferCtx.drawImage(imageObject[7], bindingX[i + 1] * scale, bindingY[0] * scale, dCenterSize[0] * scale, dCenterSize[1] * scale);
    }

    bufferCtx.drawImage(imageObject[9], bindingX[bindingX.length - 3] * scale, bindingY[0] * scale, d * scale, dLineSize[1] * scale);
    bufferCtx.drawImage(imageObject[8], bindingX[bindingX.length - 2] * scale, bindingY[0] * scale, dRightSize[0] * scale, dRightSize[1] * scale);

    if (gameOn) {
      this.drawTooth();
      this.drawTube();
      this.drawFood();
      this.drawBullets();
    }

    //////////////////////// Render
    vievName.render(bufferCanvas)

  }
  this.drawBullets = function () {
    for (let t = 0; t < bulletsList.length; t++) {
      if (bulletsList[t][1] == 1) {
        //0=object 1=visible 2=sx 3=sy 4=sWidth 5=sHeight 6=dx 7=dy 8=dWidth 9=dHeight
        bufferCtx.drawImage(imageObject[12], bulletsList[t][2], bulletsList[t][3], bulletsList[t][4], bulletsList[t][5], bulletsList[t][6] * scale * scaleX - bulletsList[t][8] * scale / 2, bulletsList[t][7] * scale * scaleY - bulletsList[t][9] * scale / 2, bulletsList[t][8] * scale, bulletsList[t][9] * scale)
      }
    }
  }
  this.drawFood = function () {
    for (let t = 0; t < foodList.length; t++) {
      if (foodList[t][1] == 1) {
        //0=object 1=visible 2=sx 3=sy 4=sWidth 5=sHeight 6=dx 7=dy 8=dWidth 9=dHeight
        bufferCtx.drawImage(imageObject[10], foodList[t][2], foodList[t][3], foodList[t][4], foodList[t][5], foodList[t][6] * scale * scaleX, foodList[t][7] * scale * scaleY, foodList[t][8] * scale, foodList[t][9] * scale)
      }
    }
  }
  this.drawTooth = function () {
    for (let t = 0; t < teethAmount * 2; t++) {
      if (toothList[t][0] == 1) {
        bufferCtx.drawImage(imageObject[4], toothList[t][2], toothList[t][3], toothList[t][4], toothList[t][5], toothList[t][6] * scale, toothList[t][7] * scale * scaleY, toothList[t][8] * scale, toothList[t][9] * scale)
        // bufferCtx.drawImage(imageObject[4], toothPositions[t][0], toothPositions[t][1], toothPositions[t][2], toothPositions[t][3], toothPositions[t][4] * scale, toothPositions[t][5] * scale, toothPositions[t][6] * scale, toothPositions[t][7] * scale)
      }
    }
  }

  this.updateTubePosition = function (data) {
    tubePosition = data;
    // console.log('battleArea '+ battleArea);
    //console.log('tubePosition '+tubePosition);
  }

  this.drawTube = function () {
    if (tubeSide) {
      bufferCtx.drawImage(imageObject[11], tubePosition[0], tubePosition[1], tubePosition[2], tubePosition[3], tubePosition[4] * scale * scaleX - tubePosition[6] * scale / 2, tubePosition[5] * scale * scaleY - tubePosition[7] * scale, tubePosition[6] * scale, tubePosition[7] * scale)
    } else {
      bufferCtx.drawImage(imageObject[11], tubePosition[0], tubePosition[1], tubePosition[2], tubePosition[3], tubePosition[4] * scale * scaleX - tubePosition[6] * scale / 2, tubePosition[5] * scale * scaleY, tubePosition[6] * scale, tubePosition[7] * scale)
    }
  }

  this.tubeMove = function () {
    if (tubeFlags[0]) { tube.moveLeft(); }
    if (tubeFlags[1]) { tube.moveRight(); }
  }

  this.toggleTube = function () {
    tubeSide = !tubeSide;
    if (tubeSide) {
      vievName.audioToggleTube();
      tube.moveUp();
    } else {
      vievName.audioToggleTube();
      tube.moveDown();
    }
  }

  this.tubeLeft = function (flag) {
    tubeFlags[0] = flag;
  }

  this.tubeRight = function (flag) {
    tubeFlags[1] = flag;
  }

  //left Right Fire
  this.changeWeapon = function (w) {
    if (w) {
      weapon = w;
      weaponTimer = 10;
    } else { weapon = 0; }
    tube.changeWeapon(weapon);
  }

  this.moreFire = function () {

    this.fire(1)
  }
  this.fire = function (flag) {
    if (flag) {
      tube.pressed();
      vievName.audioShot();
      tubeFlags[2] = 1;
      if (weapon == 0) {

        let a = Math.PI * (!tubeSide);
        this.bulletInit(0, 500, a);
      } else if (weapon == 1) {
        let a = Math.PI * (!tubeSide);
        this.bulletInit(1, 2000, a);
        if (tubeFlags[2]) {
          tubeFlags[3] = setTimeout(this.moreFire.bind(this), 100);
        }
      } else {

        let a = Math.PI * (!tubeSide);
        this.bulletInit(2, 2000, a - 0.05);
        this.bulletInit(3, 2000, a);
        this.bulletInit(4, 2000, a + 0.05);
      }
    } else {
      clearTimeout(tubeFlags[3])
      tube.unPressed();
      tubeFlags[2] = 0;
    }
  }
}
