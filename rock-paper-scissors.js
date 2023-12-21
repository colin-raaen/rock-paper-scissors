//Let forms load first before executing
document.addEventListener('DOMContentLoaded', function(){
    let playerWinCount = 0; // variable to store player win count
    let computerWinCount = 0; // variable to store computer win count 
    let drawCount = 0; // variable to store draw count

    // Define the possible choices
    const choices = ["rock", "paper", "scissors"];

    const pageContainer = document.getElementById("page-container"); // Get and store page container
    const playerWinCountSpan = document.getElementById("player-win-count-number"); // Get player count number
    const computerWinCountSpan = document.getElementById("computer-win-count-number"); // Get player count number
    const drawCountSpan = document.getElementById("draw-count-number"); // Get player count number
    const computerMoveTitle = document.getElementById("computer-move-title");
    const computerMoveRock = document.getElementById("computer-move-rock");
    const computerMovePaper = document.getElementById("computer-move-paper");
    const computerMoveScissors = document.getElementById("computer-move-scissors");
    const winMessage = document.getElementById("win-message");
    const loseMessage = document.getElementById("lose-message");
    const drawMessage = document.getElementById("draw-message");

    // Listener event for click
    pageContainer.addEventListener('click', function(event) {
        // if click was on a rock paper scissors icon
        if (event.target.classList.contains('fa-solid')){
            // store move of player
            const divMove = event.target.parentElement;
            const playersMove = divMove.id;

            // call function to randomly generate computers move
            const computersMove = generateComputerMove();

            // call function to add computers move to page
            showComputerMove(computersMove);

            // call function, passing in players move and computers move to see who won 
            const winner = findWinner(playersMove, computersMove)

            // if player wins increment player win count and update page
            if (winner === 'player') {
                playerWinCount++;
                // call function to flash message
                handleFlashMessage(winner);
                // Update the HTML element with the new score
                playerWinCountSpan.textContent = playerWinCount;
            }

            // else if computer wins, increment computer win count and update page
            else if (winner === 'computer'){
                computerWinCount++
                // call function to flash message
                handleFlashMessage(winner);
                // Update the HTML element with the new score
                computerWinCountSpan.textContent = computerWinCount;
            }
            // else if draw, increment draw count and update page score
            else if (winner === 'draw') {
                drawCount++;
                // call function to flash message
                handleFlashMessage(winner);
                // Update the HTML element with the new score
                drawCountSpan.textContent = drawCount;
            }

        }

    });

    // Helper function to randomly generate computers move
    function generateComputerMove() {
        // Generate a random index between 0 and 2 (inclusive)
        const randomIndex = Math.floor(Math.random() * choices.length);

        // Return the corresponding choice based on the index
        return choices[randomIndex];
    }

    // helper function to hide and show appropriate computer move
    function showComputerMove(computerMove) {

        // if computer move already exists, delete the icon
        if (computerMoveTitle.style.display === 'none'){
            computerMoveTitle.style.display = 'block';
        }

        // if computers move is rock, create rock icon and add to page
        if (computerMove === 'rock'){
            // show rock icon
            computerMoveRock.style.display = 'block';

            // hide other icons
            computerMovePaper.style.display = 'none';
            computerMoveScissors.style.display = 'none';
        }

        // else if computers move is paper, create paper icon and add to page
        else if (computerMove === 'paper'){
            // show rock icon
            computerMovePaper.style.display = 'block';

            // hide other icons
            computerMoveRock.style.display = 'none';
            computerMoveScissors.style.display = 'none';
        }

        // else if computers move is scissors, create scissors icon and add to page
        else if (computerMove === 'scissors'){
            // show rock icon
            computerMoveScissors.style.display = 'block';

            // hide other icons
            computerMoveRock.style.display = 'none';
            computerMovePaper.style.display = 'none';
        }
        
        return;
    }

    // Helper function to evaluate if player or computer won, passing in move from each
    function findWinner(playersMove, computersMove) {
        // else if computer winning scenarios
        if ((playersMove === 'rock' && computersMove === 'paper') || (playersMove === 'paper' && computersMove === 'scissors') ||
                (playersMove === 'scissors' && computersMove === 'rock')){
            return 'computer'; // return computer as winner
        }
        // else if player winning scenarios
        else if ((playersMove === 'rock' && computersMove === 'scissors') || (playersMove === 'paper' && computersMove === 'rock') ||
                (playersMove === 'scissors' && computersMove === 'paper')){
            return 'player'; // return player as winner
        }

        // if none of the winning conditions are met return draw
        return 'draw'; 
    }

    // Helper function to flash message
    function handleFlashMessage(winner){
        // remove message from screen if message already there

        // if winner is player
        if (winner === 'player') {
            handleMessage(winMessage); // call function to fade message away
        }

        // else if winner is computer
        else if (winner === 'computer'){
            handleMessage(loseMessage); // call function to fade message away
        }
         // else draw
        else if (winner === 'draw') {
            
            handleMessage(drawMessage); // call function to fade message away
        }
    }
    
    // JQuery Helper function to hide flash message after 5 seconds
    function handleMessage(messageElement) {
        // Show the message
        $(messageElement).fadeIn();

        // Set a timer to wait 2.5 seconds before fading
        setTimeout(() => {
          // Use jQuery `fadeOut` animation (requires Bootstrap JS included)
          $(messageElement).fadeOut(500, () => {
            // Hide the element after fade is complete
            messageElement.style.display = 'none';
          });
        }, 2000); // Set timeout to 2.5 seconds
      }
});