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
        this.player = new Player(this.gameScreen, 125, 75, 75, 50, "./images/titanic.png")

        //this.obstacle = new Obstacle(this.gameScreen, width, height, velocity, kickback, position, image)

        // Style for the game board.
        this.height = 600;
        this.width = 1200;


        // Obstacles
        this.obstacles = [];

        // Border Obstacles
        this.borders = [];


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

        this.soundTrack = document.getElementById("soundtrackgame");
        this.soundTrack1 = document.getElementById("soundtrackwin");
        this.soundTrack2 = document.getElementById("soundtracklose");
        //this.soundTrack5 = document.getElementById("soundtrackscream");
        this.soundTrack.play();
        this.soundTrack.volume = 0.5;
    }

    borderUp() {

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

                //this.soundTrack5.play();
                //this.soundTrack5.volume = 0.1;

                setTimeout(() => {
                    //obstacle.collision();
                    obstacle.element.remove();
                    
                }, 150);


                //obstacle.right -= 10;

                if (obstacle.height === 40) {

                    this.player.directionY += 5;
                }

                if (obstacle.height === 60) {

                    this.player.directionY -= 5;
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



                this.obstacles.splice(i, 1);

                //this.lives--          
            }


            if (obstacle.right > this.width) {
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

        else if (this.player.left + this.player.width >= this.gameScreen.offsetWidth) {
            this.winGame();

        }



        // If there are no obstacles, push a new one in after 1 second and a half
        if (!this.obstacles.length + 100 && !this.isPushingObstacle) {
            this.isPushingObstacle = true;


            setTimeout(() => {

                this.obstacles.push(new Obstacle(this.gameScreen, 50, 50, 10, -20, (Math.floor(Math.random() * 550 + 0)), "./images/iceberg.png"));
                this.isPushingObstacle = false;

            }, 700);
        }

        if (!this.obstacles.length + 100 && !this.isPushingIce) {
            this.isPushingIce = true;

            setTimeout(() => {

                this.obstacles.push(new Obstacle(this.gameScreen, 85, 85, 8, -10, (Math.floor(Math.random() * 550 + 0)), "./images/iceberg.png"));
                this.isPushingIce = false;

            }, 900);
        }

        if (!this.obstacles.length + 100 && !this.isPushingBigIce) {
            this.isPushingBigIce = true;

            setTimeout(() => {

                this.obstacles.push(new Obstacle(this.gameScreen, 180, 180, 2, -20, (Math.floor(Math.random() * 550 + 0)), "./images/iceberg.png"));
                this.isPushingBigIce = false;

            }, 2500);
        }

        if (!this.obstacles.length + 100 && !this.isPushingLongIce) {
            this.isPushingLongIce = true;

            setTimeout(() => {

                this.obstacles.push(new Obstacle(this.gameScreen, 100, 40, 2, -40, 0, "./images/icebergdown.png"));
                this.isPushingLongIce = false;

            }, 500);
        }

        if (!this.obstacles.length + 100 && !this.isPushingDownIce) {
            this.isPushingDownIce = true;

            setTimeout(() => {

                this.obstacles.push(new Obstacle(this.gameScreen, 100, 60, 2, -20, 540, "./images/iceberg.png"));
                this.isPushingDownIce = false;

            }, 500);
        }


        score.innerHTML = this.score;
        lives.innerHTML = this.lives;
    }

    startTimer() {
        let time = 10;

        let timerElement = document.getElementById("time-remaining");

        let count = setInterval(() => {
            let minutes = Math.floor(time / 60).toString().padStart(2, "0");
            let seconds = (time % 60).toString().padStart(2, "0");

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

        this.soundTrack.pause()

        // In order to display the Game End Screen
        this.gameEndScreen.style.display = "block";

        this.soundTrack2.play();
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


        this.soundTrack.pause()

        // In order to display the Game End Screen
        this.gameWinScreen.style.display = "block";


        this.soundTrack1.play()

        
    }
}











