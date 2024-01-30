class Obstacle {
    constructor(gameScreen, width, height, velocity, kickback, position, image) {
        this.gameScreen = gameScreen;

        // Random Position
        //this.top = (Math.floor(Math.random() * 550 + 0));

        this.top = position

        this.right = -210;
        this.width = width;
        this.height = height;

        // create the HTML element and create deafult styling
        this.element = document.createElement("img");
        this.element.src = image;
        this.element.style.position = "absolute";
        this.element.style.width = `${this.width}px`;
        this.element.style.height = `${this.height}px`;
        this.element.style.right = `${this.right}px`;
        this.element.style.top = `${this.top}px`;

        this.velocity = velocity;

        this.kickback = kickback;

        this.gameScreen.appendChild(this.element);
    }

    move() {
        // Move obstacles from right to left
        this.right += this.velocity;
        this.updatePosition()
    }


    collision() {
        this.right += this.kickback;
    }
    
    updatePosition() {
        this.element.style.right = `${this.right}px`;
        this.element.style.top = `${this.top}px`;
    }


};







