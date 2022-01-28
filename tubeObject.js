function TubeObject() {

    let modelName;
    let tybeType;
    let tubePressed;
    let topSidePosition;
    let battleArea = [];
    let imgCoordinateX;
    let imgCoordinateY;

    let imgSizeX;
    let imgSizeY;
    let imgDivisor;
    let spriteX;
    let spriteWidth;
    let spriteY;
    let spriteHeight;
    let spriteBiasX;
    let spriteBiasY;

    this.init = function (model, type, topSide, tubeBattleArea, spriteTubeX, spriteTubeY, spriteTubeBiasX, spriteTubeBiasY, inDivisor) {

        modelName = model;
        spriteWidth = spriteTubeX;
        spriteHeight = spriteTubeY;
        imgDivisor = inDivisor;
        tubePressed = 0;
        tybeType = type;
        topSidePosition = topSide;

        spriteBiasX = spriteTubeBiasX;
        spriteBiasY = spriteTubeBiasY;

        spriteX = (1 + tybeType * 2) * spriteBiasX;
        imgSizeX = spriteWidth / imgDivisor;
        imgSizeY = spriteHeight / imgDivisor;

        battleArea[0] = tubeBattleArea[0] + imgSizeX;
        battleArea[1] = tubeBattleArea[1] + imgSizeY;
        battleArea[2] = tubeBattleArea[2] - imgSizeX;
        battleArea[3] = tubeBattleArea[3] - imgSizeY;
        imgCoordinateX = (battleArea[0] + battleArea[2]) / 2;
        if (topSidePosition) {
            this.moveUp();
        } else {
            this.moveDown();
        }
    }

    this.changeWeapon = function (w) {
        tybeType = w;
        spriteX = (1 + tybeType * 2) * spriteBiasX;
        this.updateView();
    }

    this.pressed = function () {
        spriteX = (tybeType * 2) * spriteBiasX;
        this.updateView();
    }

    this.unPressed = function () {
        spriteX = (1 + tybeType * 2) * spriteBiasX;
        this.updateView();
    }

    this.moveUp = function () {
        spriteY = spriteBiasY * 2 - spriteHeight;
        imgCoordinateY = battleArea[1];
        this.updateView();
    }

    this.moveDown = function () {
        spriteY = 0;
        imgCoordinateY = battleArea[3];
        this.updateView();
    }

    this.moveLeft = function () {
        if (imgCoordinateX > battleArea[0]) {
            imgCoordinateX--;
        }
        this.updateView();
    }

    this.moveRight = function () {
        if (imgCoordinateX < battleArea[2]) {
            imgCoordinateX++;
        }
        this.updateView();
    }

    this.updateView = function () {
        let data = [spriteX, spriteY, spriteWidth, spriteHeight, imgCoordinateX, imgCoordinateY, imgSizeX, imgSizeY];
        modelName.updateTubePosition(data);
    }
}