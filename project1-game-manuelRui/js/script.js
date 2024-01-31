window.onload = function () {
  const startButton = document.getElementById("start-button");
  const restartButton = document.getElementById("restart-button");
const restartButtonn = document.getElementById("restart-buttonn");
  let game;

  startButton.addEventListener("click", function () {
    startGame();
  });

  restartButton.addEventListener("click", function () {
    // JS, in the current tab, is going to refresh (reload) the page.
    location.reload();
  })

  restartButtonn.addEventListener("click", function () {
    // JS, in the current tab, is going to refresh (reload) the page.
    location.reload();
  })

  function startGame() {
    //console.log("start game");
    game = new Game();
    game.start();
  };

  function handleKeydown(event) {
    const key = event.key;
    const possibleKeys = ["ArrowLeft", "ArrowUp", " ", "ArrowDown"]

    if (possibleKeys.includes(key)) {
      event.preventDefault();

      let angle = 0;

      if (game) {
        switch (key) {
          case "ArrowLeft":
            game.player.directionX = -5;
            break;
          case "ArrowUp":



            game.player.directionY = -5;



            break;
          case " ":
            game.player.directionX =0;
            break;
          case "ArrowDown":



            game.player.directionY = 5;



        }

      }
    }
  }





  //game.player.rotate(angle);

  function handleKeyup(event) {
    const key = event.key;
    const possibleKeys = ["ArrowLeft", "ArrowUp", " ", "ArrowDown"]

    if (possibleKeys.includes(key)) {
      event.preventDefault();

      if (game) {
        switch (key) {
          case "ArrowLeft":
            game.player.directionX = -1;
            break;
          case "ArrowUp":
            game.player.directionY = -5;
            break;
          case " ":
            this.soundTrack6 = document.getElementById("soundtrackengine");
            this.soundTrack6.play()
            this.soundTrack6.volume = 0.8;
            game.player.directionX = 3;
            break;
          case "ArrowDown":
            game.player.directionY = 5;
        }
      }
    }
  }

  window.addEventListener("keydown", handleKeydown);
  window.addEventListener("keyup", handleKeyup);
};
