function TeethObject() {

    let modelName;
    let imgId;
    let imgTopSide;
    let imgCoordinateX;
    let gumCoordinateX;
    let imgCoordinateY;
    let gumCoordinateY;
    let imgSizeX;
    let imgSizeY;
    let imgDivisor;

    let spriteX;
    let spriteWidth;
    let spriteY;
    let spriteHeight;

    this.createTeeth = function (model, id, topSide, coordinateX, coordinateY, divisor) {

        modelName = model;
        spriteWidth = 370;
        spriteHeight = 293;   ///449 с десной
        imgId = id;
        imgTopSide = topSide;
        gumCoordinateX = coordinateX;
        gumCoordinateY = coordinateY;
        imgDivisor = divisor;

        if (imgTopSide) {
            spriteX = 380;
            spriteY = 0;
        } else {
            spriteX = 0;
            spriteY = 0;
        }

        this.updateSize(gumCoordinateX, gumCoordinateY, imgDivisor)
    }

    this.updateSize = function (x, y, d) {
        imgSizeX = spriteWidth / d;
        imgSizeY = spriteHeight / d;
        imgCoordinateX = x - imgSizeX / 2;
        if (imgTopSide) {
            imgCoordinateY = y - imgSizeY;
        } else { imgCoordinateY = y; }

        modelName.refreshToothPositions(imgId, spriteX, spriteY, spriteWidth, spriteHeight, imgCoordinateX, imgCoordinateY, imgSizeX, imgSizeY)

    }

    this.delete = function () {
        modelName.deleteTooth(imgId)
    }

    this.collision = function () {
        this.delete();
    }
}