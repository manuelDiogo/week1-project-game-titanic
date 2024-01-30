class Obstacle {
    constructor(gameScreen) {
        this.gameScreen = gameScreen;

        // Random Position
        this.top = Math.floor(Math.random() * 550 + 0);

        let width = 0;
        let height = 0;

        if (Game.obstacles.length === 4) {

            width = 200;
            height = 200;

        };

        if (Game.obstacles.length !== 4) {

            width = 50;
            height = 50;
        };

        this.right = 0;
        this.width = width;
        this.height = height;


        // create the HTML element and create deafult styling
        this.element = document.createElement("img");
        this.element.src = "./images/iceberg.png";
        this.element.style.position = "absolute";
        this.element.style.width = `${this.width}px`;
        this.element.style.height = `${this.height}px`;
        this.element.style.right = `${this.right}px`;
        this.element.style.top = `${this.top}px`;

        this.gameScreen.appendChild(this.element);
    }

    move() {
        // Move obstacles from right to left
        this.right += 10;
        this.updatePosition()
    }

    collision() {
        this.right - 5;
    }
    
    updatePosition() {
        this.element.style.right = `${this.right}px`;
        this.element.style.top = `${this.top}px`;
    }


};

class BigIce extends Obstacle {



}




