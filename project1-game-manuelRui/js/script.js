window.onload = function () {
  const startButton = document.getElementById("start-button");
  const restartButton = document.getElementById("restart-button");

  let game;

  startButton.addEventListener("click", function () {
    startGame();
  });

  restartButton.addEventListener("click", function () {
    // JS, in the current tab, is going to refresh (reload) the page.
    location.reload();
  })

  function startGame() {
    //console.log("start game");
    game = new Game();
    game.start();
  };

  let angle = 0;



  function handleKeydown(event) {
    const key = event.key;
    const possibleKeys = ["ArrowLeft", "ArrowUp", "ArrowRight", "ArrowDown"]

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
          case "ArrowRight":
            game.player.directionX = 5;
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
    const possibleKeys = ["ArrowLeft", "ArrowUp", "ArrowRight", "ArrowDown"]

    if (possibleKeys.includes(key)) {
      event.preventDefault();

      if (game) {
        switch (key) {
          case "ArrowLeft":
            game.player.directionX = -1;
            break;
          case "ArrowUp":
            game.player.directionY = -1;
            break;
          case "ArrowRight":
            game.player.directionX = 1;
            break;
          case "ArrowDown":
            game.player.directionY = 1;
        }
      }
    }
  }

  window.addEventListener("keydown", handleKeydown);
  window.addEventListener("keyup", handleKeyup);
};
