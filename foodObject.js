function FoodObject() {

    let modelName;
    let id;
    let battleArea = [];
    let foodSize = [];
    let x;
    let y;
    let timer;
    let speed;
    let startPositionX;

    let startSideY;
    let startSideX;
    let scale;
    let moveType;
    let positioning;
    let stepTimer;
    let stepCounter;
    let reversX;
    let reversY;

    this.init = function (inModel, inId, inBattleArea, inFoodSize, inMoveType, inSpeed, inStartPositionX, inStartSideX, inStartSideY, inScale) {
        positioning = 0;
        stepCounter = 0;

        foodSize = inFoodSize;
        startSideX = inStartSideX;
        startSideY = inStartSideY;
        scale = inScale;
        moveType = inMoveType;
        speed = inSpeed;
        modelName = inModel;
        id = inId;
        startPositionX = inStartPositionX;
        battleArea = inBattleArea
        if (startSideY) { reversY = 0; } else { reversY = 1; }
        if (startSideX) { reversX = 0; } else { reversX = 1; }


        let positioningTimer = 5; //low for faster speed
        stepTimer = (1000 / speed) | 0;
        if (startSideX) {
            x = battleArea[2] - foodSize[0] * scale;
        } else {
            x = battleArea[0] + foodSize[0] * scale;
        }
        if (startSideY) {
            y = battleArea[1] + foodSize[1] * scale;
        } else {
            y = battleArea[3] - foodSize[1] * scale;
        }
        modelName.updateFood(id, x, y, foodSize);
        timer = setInterval(this.positioning.bind(this), positioningTimer);
    }

    this.positioning = function () {

        if (startSideX) {
            if (x > startPositionX) {
                x--;
            } else { positioning = 1; }

        } else {
            if (x < startPositionX) {
                x++;
            } else { positioning = 1; }
        }

        if (positioning) {
            clearInterval(timer);
            timer = setInterval(this.updatePosition.bind(this), stepTimer);

        } else {
            modelName.updateFood(id, x, y, foodSize);
        }
    }


    this.updatePosition = function () {
        stepCounter++;

        if (moveType == 0) {
            y += 1 - 2 * reversY;
        }
        if (moveType == 1) {
            y += 1 - 2 * reversY;
            if (stepCounter % 100 == 40 || stepCounter % 100 == 99) { reversX = !reversX; }
            x += 1 - 2 * reversX;
        }
        if (moveType == 2) {

            y += 1 - 2 * reversY;

            if (stepCounter % 100 == 60 || stepCounter % 100 == 99) { reversX = !reversX; }
            x += 1 - 2 * reversX;
        }

        if (moveType == 3) {
            if (stepCounter % 200 == 150 || stepCounter % 200 == 199) { reversY = !reversY; }
            y += 1 - 2 * reversY;

            if (stepCounter % 100 == 20 || stepCounter % 100 == 80) { reversX = !reversX; }
            x += 1 - 2 * reversX;
        }

        if (moveType == 4) {
            if (stepCounter % 200 == 185 || stepCounter % 200 == 199) { reversY = !reversY; }
            y += 1 - 2 * reversY;

            if (stepCounter % 100 == 60 || stepCounter % 100 == 80 || stepCounter % 200 == 180) { reversX = !reversX; }
            x += 1 - 2 * reversX;
        }

        this.checkPosition();
    }

    this.checkPosition = function () {
        if (x < battleArea[0] || x > battleArea[2]) {
            reversX = !reversX;
        }

        if (y < battleArea[1] || y > battleArea[3]) {

            modelName.Kill(id, !startSideY);
            this.deleteFood();

        } else {
            modelName.updateFood(id, x, y, foodSize);
        }
    }

    this.deleteFood = function () {
        clearInterval(timer);
        modelName.deleteFood(id);
    }

    this.collision = function () {
        this.deleteFood();
    }
}