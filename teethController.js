function TeethController() {

    let modelName;
    let shiftFlag;

    this.init = function (model) {
        modelName = model;
        shiftFlag = 1;

        document.addEventListener('keydown', this.keyDown, false);
        document.addEventListener('keyup', this.keuUp, false);
        
       /*  window.addEventListener('unload', ()=>console.log('fcgbn')); */
    }

    this.keyDown = function (event) {
        if (!event.repeat) {
            if (event.code == 'ArrowLeft') {
                modelName.tubeLeft(true);
            } else if (event.code == 'ArrowRight') {
                modelName.tubeRight(true);
            } else if (event.code == 'ShiftLeft' || event.code == 'ShiftRight') {
                if (shiftFlag) {
                    shiftFlag = 0;
                    modelName.toggleTube();
                }
            } else if (event.code == 'Space') {
                modelName.fire(true);
            } else if (event.code == 'Digit1' || event.code == 'Numpad1') {
                modelName.changeWeapon(0);
            } else if (event.code == 'Digit2' || event.code == 'Numpad2') {
                modelName.changeWeapon(1);
            } else if (event.code == 'Digit3' || event.code == 'Numpad3') {
                modelName.changeWeapon(2);
            }
        }
    }

    this.keuUp = function (event) {

        if (event.code == 'ArrowLeft') {
            modelName.tubeLeft(false);
        } else if (event.code == 'ArrowRight') {
            modelName.tubeRight(false);
        } else if (event.code == 'Space') {
            modelName.fire(false);
        } else if (event.code == 'ShiftLeft' || event.code == 'ShiftRight') {
            shiftFlag = 1
        }
    }
}