class Game {
    constructor() {

        // Get all Game Screens.
        // gameScreen and gameEndScreen are initially not displayed.
        this.startScreen = document.getElementById("game-intro");
        this.gameScreen = document.getElementById("game-screen");
        this.gameEndScreen = document.getElementById("game-end");
        this.gameWinScreen = document.getElementById("win-game");
        this.timer = document.getElementById("time-remaining");

        // I am going to create a player in the future. For now, I'll leave it to null.
        this.player = new Player(this.gameScreen, 125, 75, 75, 50, "./docs/images/titanic.png")

        //this.obstacle = new Obstacle(this.gameScreen, width, height, velocity, kickback, position, image)

        // Style for the game board.
        this.height = 600;
        this.width = 1200;


        // Obstacles
        this.obstacles = [];

        
        


        // Variable to Check If I'm in the Process of creating an Obstacle
        this.isPushingObstacle = false;

        // Variable that checks if the Game is lost
        this.gameIsOver = false;

        // Variable that checks if the Game is won
        this.gameIsWon = false;
    }

    start() {

        // - Sets the height and width of the game screen.
        this.gameScreen.style.height = `${this.height}px`;
        this.gameScreen.style.width = `${this.width}px`;

        /*
        this.skyScreen.style.height = `${200}px`;
        this.skyScreen.style.width = `${1200}px`;
        */


        // - Hides the start screen.
        this.startScreen.style.display = "none";

        // - Shows the game screen.
        this.gameScreen.style.display = "block";

        //Shows timer
        this.timer.style.display = "block";


        // - Starts the game loop 
        this.gameLoop();

        // - Starts timer
        this.startTimer();

        this.soundTrack = document.getElementById("soundtrackGame");
        this.soundTrack1 = document.getElementById("soundtrackWin");
        this.soundTrack2 = document.getElementById("soundtrackLose");

        this.soundTrack.play();
        this.soundTrack.volume = 0.5;
    }

    
    gameLoop() {

        if (this.gameIsOver) {
            return;
        }

        this.update();

        window.requestAnimationFrame(() => this.gameLoop());

    }

    update() {
        /* Score */
        let score = document.getElementById("score");
        
        /* Every frame of the game, I want to check if the ship is moving */
        this.player.move();

        // Iterate over the obstacles array and make them move
        for (let i = 0; i < this.obstacles.length; i++) {
            const obstacle = this.obstacles[i];
            obstacle.move();

            if (this.player.didCollide(obstacle)) {

                setTimeout(() => {
                    
                    obstacle.element.remove();

                }, 150);

                this.obstacles.splice(i, 1);

                this.kickback(obstacle);

            }

            if (obstacle.right > this.width) {
                
                // Remove the Obstacle HTML Element from the HTML.
                obstacle.element.remove();

                // Remove the Obstacle from the Game Class' obstacles array.
                this.obstacles.splice(i, 1);
            }

            else if (obstacle.velocity < 0 && (obstacle.right + obstacle.width) <= 0) {
                

                // Remove the Obstacle HTML Element from the HTML.
                obstacle.element.remove();

                // Remove the Obstacle from the Game Class' obstacles array.
                this.obstacles.splice(i, 1);
            }

        }

    

        if (this.player.left + this.player.width >= this.gameScreen.offsetWidth) {
            this.winGame();
        }

        // Pushing new objects in
        if (!this.obstacles.length + 1 && !this.isPushingObstacle) {
            this.isPushingObstacle = true;


            setTimeout(() => {

                this.obstacles.push(new Obstacle(this.gameScreen, 50, 50, 10, (Math.floor(Math.random() * 550 + 0)), -210, "./docs/images/iceberg.png"));
                this.isPushingObstacle = false;

            }, 500);
        }

        if (!this.obstacles.length + 1 && !this.isPushingIce) {
            this.isPushingIce = true;

            setTimeout(() => {

                this.obstacles.push(new Obstacle(this.gameScreen, 85, 85, 8, (Math.floor(Math.random() * 550 + 0)), -210, "./docs/images/iceberg.png"));
                this.isPushingIce = false;

            }, 900);
        }

        if (!this.obstacles.length + 1 && !this.isPushingBigIce) {
            this.isPushingBigIce = true;

            setTimeout(() => {

                this.obstacles.push(new Obstacle(this.gameScreen, 180, 180, 2, (Math.floor(Math.random() * 550 + 0)), -210, "./docs/images/iceberg.png"));
                this.isPushingBigIce = false;

            }, 5000);
        }

        if (!this.obstacles.length + 1 && !this.isPushingLongIce) {
            this.isPushingLongIce = true;

            setTimeout(() => {

                this.obstacles.push(new Obstacle(this.gameScreen, 120, 40, -3, 0, 1200, "./docs/images/icebergdown.png"));
                this.isPushingLongIce = false;

            }, 500);
        }

        if (!this.obstacles.length + 1 && !this.isPushingDownIce) {
            this.isPushingDownIce = true;

            setTimeout(() => {

                this.obstacles.push(new Obstacle(this.gameScreen, 120, 60, -3, 540, 1200, "./docs/images/iceberg.png"));
                this.isPushingDownIce = false;

            }, 500);
        }

    }

    kickback(obstacle) {

        if (obstacle.height === 40) {

            this.player.directionY += 5;
            this.player.directionX -= 10;
        }

        if (obstacle.height === 60) {

            this.player.directionY -= 5;
            this.player.directionX -= 10;
        }

        if (obstacle.height === 50) {

            this.player.directionX -= 8;

        }

        if (obstacle.height === 85) {

            this.player.directionX -= 12;
        }

        if (obstacle.height === 180) {

            this.player.directionX -= 17;
        }
    }

    startTimer() {
        let time = 119;

        let timerElement = document.getElementById("time-remaining");

        let count = setInterval(() => {
            let minutes = Math.floor(time / 60).toString().padStart(2, "0");
            let seconds = (time % 60).toString().padStart(2, "0");

            timerElement.innerHTML = `Time left ${minutes}:${seconds}`;

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

        //Hides timer
        this.timer.style.display = "none";

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

        this.soundTrack.pause()

        // In order to display the Game End Screen
        this.gameEndScreen.style.display = "block";

        this.soundTrack2.play();
    }

    winGame() {
        // Change the gameIsWon status. if it's true, remember that this is going to break the animaton loop.
        this.gameIsWon = true;

        // Remove Player
        this.player.element.remove();

        //Hides timer
        this.timer.style.display = "none";

        // Remove all Obstacles
        this.obstacles.forEach((obstacle, index) => {
            // Remove the Obstacle from JS.
            this.obstacles.splice(index, 1);

            // Remove the Obstacle from HTML
            obstacle.element.remove();
        });

        // Hide the current Game Screen
        this.gameScreen.style.display = "none";

        this.soundTrack.pause()

        // In order to display the Game End Screen
        this.gameWinScreen.style.display = "block";

        this.soundTrack1.play()
    }
}