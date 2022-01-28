function WeaponObject() {

    let modelName;
    let id;
    let battleArea = [];
    let weaponSize = [];
    let x;
    let y;
    let timer;
    let speed;
    let startPositionY;

    let startSideY;
    let startSideX;
    let scale;
    let weaponType;
    let positioning;
    let stepTimer;
    let stepCounter;
    let reversX;

    this.init = function (inModel, inId, inBattleArea, inWeaponSize, inWeaponType, inSpeed, inStartPositionY, inStartSideX, inStartSideY, inScale) {
        positioning = 0;
        stepCounter = 0;

        weaponSize = inWeaponSize;
        startSideX = inStartSideX;
        startSideY = inStartSideY;
        scale = inScale;
        weaponType = inWeaponType;
        speed = inSpeed;
        modelName = inModel;
        id = inId;
        startPositionY = inStartPositionY;
        battleArea = inBattleArea

        if (startSideX) { reversX = 0; } else { reversX = 1; }

        stepTimer = (1000 / speed) | 0;
        if (!startSideX) {
            x = battleArea[2] - weaponSize[0] * scale;
        } else {
            x = battleArea[0] + weaponSize[0] * scale;
        }
        y = battleArea[1] + weaponSize[1] * scale + (battleArea[3] - weaponSize[1] * scale - battleArea[1]) * startPositionY / 100;

        modelName.updateFood(id, x, y, weaponSize);
        timer = setInterval(this.updatePosition.bind(this), stepTimer);
    }

    this.updatePosition = function () {
        stepCounter++;
        x += 1 - 2 * reversX;
        this.checkPosition();
    }

    this.checkPosition = function () {
        if (x < battleArea[0] || x > battleArea[2]) {
            this.deleteWeapon();
        } else {
            modelName.updateFood(id, x, y, weaponSize);
        }
    }

    this.deleteWeapon = function () {
        clearInterval(timer);
        modelName.deleteFood(id);
    }

    this.collision = function () {
        modelName.changeWeapon(weaponType);
        this.deleteWeapon();
    }
}