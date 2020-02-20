// Configuration object for the game
let config = {
    type: Phaser.AUTO,
    // width of the game
    width: 800,
    // height of the game
    height: 450,
    // background color of the game
    backgroundColor: 0x6dc4f2,
    scene: {
        create: create,
        update: update,
    }
};

// Create a new Phaser Game
let game = new Phaser.Game(config);

// Declare our variables
let ball, ground, pillar;

// declaring the score variable
let scoretext;

// declaring the infotext variable
let infotext;
// declaring the gamestate variable
let playing = false;

/**
 * Create function
 * This function gets executed once and creates the game scene
 * 
 * Use this function to create and configure all your game elements 
 * in the scene
 */
function create() {
    // Create and add the bouncy ball
    ball = this.add.circle(100, 370, 20, 0x931f9c);
    // Create and add the ground
    ground = this.add.rectangle(400, 420, 800, 60, 0x38963c);
    // Create and add the pillar where we will bounce over
    pillar = this.add.rectangle(700, 340, 50, 100, 0xff0000);

    //catching the space bar
    space = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    // displaying score
    scoretext = this.add.text(
        400, 50, score, {
            fontFamily: '"Arial"',
            fontSize: "50pt"
        }
    );

    // displaying info at the start of the game
    infotext = this.add.text(
        50,
        400,
        'Press space to start game', {
            fontFamily: '"Arial"',
            fontSize: "20pt"
        }
    );
}

let jumping = false;
let keylock = false;
let score = 0;
/**
 * Main update loop
 * The code in this function gets executed on every game update (default 60 times per second)
 *
 * Use this function for all elements that change overtime
 */
function update() {
    if (playing) {
        if (!jumping) {
            // we can only jump if space is down and isn't locked
            if (space.isDown && !keylock) {
                jump();
            }
            // unlock space
            else if (space.isUp) {
                keylock = false;
            }
        }

        // moving pillar towards the ball
        pillar.setX(pillar.x - 5);

        // if the pillar is under the ball and the ball is not in the air
        if (pillar.x == 100 && ball.y == 370) {
            gameover();
        }

        // the pillar is past the ball
        if (pillar.x < 0) {
            scoreOnePoint();
        }
    } else {
        // if we are not playing and space is pressed we start the game
        if (space.isDown) {
            playing = true;
            // hiding the infotext when playing
            infotext.visible = false;
        }
    }
}

function scoreOnePoint() {
    // Moving the pillar to the other side of the screen
    pillar.setX(1000);
    // Adding a point to the score
    score += 1;
    // update score text
    scoretext.text = score;
}

function jump() {
    // jump as in teleport the ball up with 150 pixels
    ball.setPosition(ball.x, ball.y - 150);
    // set jumping state to true so we can only jump once
    jumping = true;
    keylock = true;
    // Javascript construct to call a function in the future
    setTimeout(dropdown, 500);
}

function dropdown() {
    // reset the position of the ball
    ball.setPosition(ball.x, ball.y + 150);
    // after dropping down we can jump again
    jumping = false;
}

function gameover() {
    // Game is over, so we are not playing
    playing = false;
    // Display the final score
    infotext.text = 'Final score ' + score + ', press space to start a new game';
    infotext.visible = true;
    // reset the game
    resetGame();
}

function resetGame() {
    // score back to one
    score = 0;
    scoretext.text = score;
    // pillar to initial position
    pillar.setPosition(700, 340);
}
