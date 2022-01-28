function BulletObject() {

    let modelName;
    let id;
    let battleArea = [];
    let x;
    let y;
    let angle;
    let timer;
    let speed;

    this.init = function (inModel, inId, inBattleArea, inStartPositionX, inStartPositionY, inSpeed, inAngle) {
        speed = 5;
        modelName = inModel;
        spriteSize = 12;
        id = inId;
        angle = inAngle;
        x = inStartPositionX;
        y = inStartPositionY;
        battleArea = inBattleArea
        let stepTimer = (1000 / inSpeed) | 0;
        this.updatePosition();
        timer = setInterval(this.updatePosition.bind(this), stepTimer);
    }

    this.updatePosition = function () {
        x += Math.sin(angle) * speed
        y += Math.cos(angle) * speed
        if (battleArea[0] < x && battleArea[2] > x && battleArea[1] < y && battleArea[3] > y) {  // 
            modelName.updateBullet(id, x, y);
        } else {
            this.deleteBullet();
        }
    }
    this.deleteBullet = function () {
        clearInterval(timer);
        modelName.deleteBullet(id);
    }

    this.collision = function () {
        this.deleteBullet();
    }
}