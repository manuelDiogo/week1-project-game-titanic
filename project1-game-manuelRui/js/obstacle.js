class Obstacle {
    constructor(gameScreen) {
        this.gameScreen = gameScreen;

        // Random Position
        this.left = Math.floor(Math.random() * 300 + 70);

        this.top = 0;
        this.width = 100;
        this.height = 150;


        // create the HTML element and create deafult styling
        this.element = document.createElement("img");
        this.element.src = "./images/iceberg.png";
        this.element.style.position = "absolute";
        this.element.style.width = `${this.width}px`;
        this.element.style.height = `${this.height}px`;
        this.element.style.left = `${this.left}px`;
        this.element.style.top = `${this.top}px`;

        this.gameScreen.appendChild(this.element);
    }

    move() {
        // Move obstacle down
        this.left += 3;

        this.updatePosition();
    }

    updatePosition() {
        this.element.style.left = `${this.left}px`;
        this.element.style.top = `${this.top}px`;
    }
};

