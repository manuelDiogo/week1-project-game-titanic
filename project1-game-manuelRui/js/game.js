class Game {
    constructor() {

        // Get all Game Screens.
        // gameScreen and gameEndScreen are initially not displayed.
        this.startScreen = document.getElementById("game-intro");
        this.gameScreen = document.getElementById("game-screen");
        this.gameEndScreen = document.getElementById("game-end");
        this.skyScreen = document.getElementById("sky-img");
        this.gameWinScreen = document.getElementById("win-game");

        // I am going to create a player in the future. For now, I'll leave it to null.
        this.player = new Player(this.gameScreen, 125, 75, 75, 35, "./images/titanic.png")

        // Style for the game board.
        this.height = 600;
        this.width = 1200;


        // Obstacles
        this.obstacles = [];

        // Boss
        this.bigIces = [];

        // Score
        this.score = 0;

        // Lives
        this.lives = 3;

        // Variable to Check If I'm in the Process of creating an Obstacle
        this.isPushingObstacle = false;

        // Variable that checks if the Game is over
        this.gameIsOver = false;

        this.gameIsWon = false;
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

        // - Starts timer
        this.startTimer();
    }

    gameLoop() {

        if (this.gameIsOver) {
            return;
        }

        else if (this.gameIsWon) {
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
                }, 150);

                obstacle.right -= 10;

                //this.player.directionX = -30;

                this.obstacles.splice(i, 1);

                this.lives--          
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

        if(this.player.left + this.player.width >= this.gameScreen.offsetWidth) {
            this.winGame();

        }

        //const iceBerg1 = new Obstacle(this.gameScreen, 50, 50)

        //const iceBerg2 = new Obstacle(this.gameScreen, 200, 200)

        // If there are no obstacles, push a new one in after 1 second and a half
        if (!this.obstacles.length + 20 && !this.isPushingObstacle) {
            this.isPushingObstacle = true;


            setTimeout(() => {

                this.obstacles.push(new Obstacle(this.gameScreen, 50, 50, 10, -5));
                this.isPushingObstacle = false;

            }, 300);


        }
        if (!this.obstacles.length + 9 && !this.isPushingIce) {
            this.isPushingIce = true;

            setTimeout(() => {

                this.obstacles.push(new Obstacle(this.gameScreen, 150, 150, 2, -60));
                this.isPushingIce = false;

            }, 2000);

        }


        score.innerHTML = this.score;
        lives.innerHTML = this.lives;
    }

    startTimer() {
        let time = 60;

        let timerElement = document.getElementById("time-remaining");

        let count = setInterval(() => {
            let minutes = Math.floor(time / 60);
            let seconds = time % 60;

            timerElement.innerHTML = `Time left: ${minutes}:${seconds}`;

            if (time < 0) {
                clearInterval(count);
                this.endGame();
            }

            if (this.player.left + this.player.width >= this.gameScreen.offsetWidth) {
                clearInterval(count);
            }
            time--;
        }, 1000);

    }

    

    endGame() {
        // Change the gameIsOver status. if it's true, remeber that this is going to break the animaton loop.
        this.gameIsOver = true;

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

        this.gameWinScreen.style.display = "none";

        // In order to display the Game End Screen
        this.gameEndScreen.style.display = "block";
    }

    winGame() {
        // Change the gameIsOver status. if it's true, remeber that this is going to break the animaton loop.
        this.gameIsWon = true;

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

        //this.gameEndScreen.style.display = "none";

        // In order to display the Game End Screen
        this.gameWinScreen.style.display = "block";
    }
}











