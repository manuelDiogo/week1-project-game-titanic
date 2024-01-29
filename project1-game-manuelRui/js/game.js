class Game {
    constructor() {

        // Get all Game Screens.
        // gameScreen and gameEndScreen are initially not displayed.
        this.startScreen = document.getElementById("game-intro");
        this.gameScreen = document.getElementById("game-screen");
        this.gameEndScreen = document.getElementById("game-end");
        this.skyScreen = document.getElementById("sky-img");

        // I am going to create a player in the future. For now, I'll leave it to null.
        this.player = new Player(this.gameScreen, 250, 150, 150, 70, "./images/titanic.png");


        // Style for the game board.
        this.height = 600;
        this.width = 1200;



        // Obstacles
        this.obstacles = [];

        // Score
        this.score = 0;

        // Lives
        this.lives = 3;

        // Variable to Check If I'm in the Process of creating an Obstacle
        this.isPushingObstacle = false;

        // Variable that checks if the Game is over
        this.gameIsOver = false;
    }

    start() {

        // - Sets the height and width of the game screen.
        this.gameScreen.style.height = `${this.height}px`;
        this.gameScreen.style.width = `${this.width}px`;

        this.skyScreen.style.height = `${200}px`;
        this.skyScreen.style.width = `${1200}px`;


        // - Hides the start screen.
        this.startScreen.style.display = "none";

        // - Shows the game screen.
        this.gameScreen.style.display = "block";






        // - Starts the game loop 
        this.gameLoop();
    }

    gameLoop() {

        if (this.gameIsOver) {
            return;
        }

        this.update();

        window.requestAnimationFrame(() => this.gameLoop());

    }

    update() {
        /* Score, Lives, Scoreboard */
        let score = document.getElementById("score");
        let lives = document.getElementById("lives");

        /* Every frame of the game, I want to check if the car is moving */
        this.player.move();

        // Iterate over the obstacles array and make them move
        for (let i = 0; i < this.obstacles.length; i++) {
            const obstacle = this.obstacles[i];
            obstacle.move();

            if (this.player.didCollide(obstacle)) {



                setTimeout(() => {
                    obstacle.collision();
                    obstacle.element.remove();
                }, 120);



                obstacle.right -= 3

                this.obstacles.splice(i, 1);

                //this.lives--          
            }

            else if (obstacle.right > this.width) {
                this.score++;

                // Remove the Obstacle HTML Element from the HTML.
                obstacle.element.remove();

                // Remove the Obstacle from the Game Class' obstacles array.
                this.obstacles.splice(i, 1);
            }
        }

        if (this.lives === 0) {
            this.endGame();
        }

        // If there are no obstacles, push a new one in after 1 second and a half
        if (!this.obstacles.length + 8 && !this.isPushingObstacle) {
            this.isPushingObstacle = true;
            setTimeout(() => {

                this.obstacles.push(new Obstacle(this.gameScreen));
                this.isPushingObstacle = false;

            }, 700);


        }

        score.innerHTML = this.score;
        lives.innerHTML = this.lives;
    }

    endGame() {
        // Change the gameIsOver status. if it's true, remeber that this is going to break the animaton loop.
        this.gameIsOverOver = true;

        // Remove Player
        this.player.element.remove();

        // Remove all Obstacles
        this.obstacles.forEach((obstacle, index) => {
            // Remove the Obstacle from JS.
            this.obstacles.splice(index, 1);

            // Remove the Obstacle from HTML
            obstacle.element.remove();
        });


        // Hide the current Game Screen
        this.gameScreen.style.display = "none";

        // In order to display the Game End Screen
        this.gameEndScreen.style.display = "block";

    }

};




