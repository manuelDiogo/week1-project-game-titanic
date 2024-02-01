class Obstacle {
    constructor(gameScreen, width, height, velocity, position, startPosition, image) {
        this.gameScreen = gameScreen;

        this.top = position
        this.right = startPosition;
        this.width = width;
        this.height = height;

        this.velocity = velocity;

        // create the HTML element and create deafult styling
        this.element = document.createElement("img");
        this.element.src = image;
        this.element.style.position = "absolute";
        this.element.style.width = `${this.width}px`;
        this.element.style.height = `${this.height}px`;
        this.element.style.right = `${this.right}px`;
        this.element.style.top = `${this.top}px`;

        this.gameScreen.appendChild(this.element);
    }

    move() {
        // Move obstacles from right to left
        this.right += this.velocity;
        
        this.updatePosition()
    }

    updatePosition() {
        this.element.style.right = `${this.right}px`;
        this.element.style.top = `${this.top}px`;
    }
};







