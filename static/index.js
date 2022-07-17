
//get the canvas element
var canvas = document.getElementById('canvas');
//get the 2d context
var ctx = canvas.getContext('2d');

padding = 40;
var sizex = 25;
var sizey = 25;
blocksize = (window.innerHeight - padding) / sizex;

canvas.width = sizex * blocksize;
canvas.height = sizey * blocksize;

var snake_color = 'green';

var button3 = document.createElement("button");
button3.innerHTML = "Leaderboard";
button3.onclick = function() {
     location.href = "/leaderboard";
 }
document.body.appendChild(button3);

//create a button to restart the game
var button = document.createElement("button");
button.innerHTML = "Restart";
button.onclick = function() {
    location.reload();
}
document.body.appendChild(button);

//draw a grid on the canvas
function drawGrid() {
    //set the stroke style to black
    ctx.strokeStyle = 'black';
    //set the line width to 1
    ctx.lineWidth = 1;
    //loop through the rows
    for (var i = 0; i < canvas.width + 1; i += blocksize) {
        //loop through the columns
        for (var j = 0; j < canvas.height + 1; j += blocksize) {
        //draw a line from the current point to the next point
        ctx.beginPath();
        ctx.moveTo(i, j);
        ctx.lineTo(i + blocksize, j);
        ctx.stroke();
        ctx.closePath();
        ctx.beginPath();
        ctx.moveTo(i, j);
        ctx.lineTo(i, j + blocksize);
        ctx.stroke();
        ctx.closePath();
        }
    }
}

//create a tupple to store the starting position of the snake in the middle of the canvas
middle = [Math.floor(sizex / 2), Math.floor(sizey / 2)];
var snake = [{x: middle[0], y: middle[1]}, {x: middle[0], y: middle[1] - 1}, {x: middle[0], y: middle[1] - 2}];
set1 = new Set();
set1.add(snake[1], snake[2]);
food = {x: Math.floor(Math.random() * sizex), y: Math.floor(Math.random() * sizey)};

var direction = 'right';
var changed = false;

//if the arrow key is pressed, change the direction of the snake
document.addEventListener('keydown', function(event) {
    if (changed == false) {
        if (event.key == 'ArrowUp' && direction != 'down') {
            direction = 'up';
        }else if (event.key == 'ArrowDown' && direction != 'up') {
            direction = 'down';
        }else if (event.key == 'ArrowLeft' && direction != 'right') {
            direction = 'left';
        }else if (event.key == 'ArrowRight' && direction != 'left') {
            direction = 'right';
        }
        changed = true;
    }
}
)


var run = true;
    //pause for 1 second
mainloop = function() {

    if (run == true) {
        //clear the canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        //draw the grid
        drawGrid();

        //move the snake
        for (var i = snake.length - 1; i >= 0; i--) {
            if (i == 0) {
                //move the head
                if (direction == 'right') {
                    snake[i].x++;
                } else if (direction == 'left') {
                    snake[i].x--;
                } else if (direction == 'up') {
                    snake[i].y--;
                } else if (direction == 'down') {
                    snake[i].y++;
                }
            } else {
                //move the body
                snake[i].x = snake[i - 1].x;
                snake[i].y = snake[i - 1].y;
            }
        }
        
        if (snake[0].x < 0 || snake[0].x >= sizex || snake[0].y < 0 || snake[0].y >= sizey) {
            console.log("Game Over");
            console.log("Score: " + snake.length);
            console.log("You hit the edge of the board")
            //display the game over, score, and reason on the canvas
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = 'black';
            ctx.font = '30px Arial';
            ctx.fillText("Game Over", canvas.width / 2 - 50, canvas.height / 2);
            ctx.fillText("Score: " + snake.length, canvas.width / 2 - 50, canvas.height / 2 + 50);
            ctx.fillText("You hit the edge of the board", canvas.width / 2 - 50, canvas.height / 2 + 100);
            snake_color = 'blue';
            run = false;
        }
     

        //check if the snake has hit itself
        for (var i = 1; i < snake.length; i++) {
            if (snake[0].x == snake[i].x && snake[0].y == snake[i].y) {
                console.log("black");
                console.log("Score: " + snake.length);
                console.log("You hit yourself")
                //display the game over, score, and reason on the canvas
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.font = "30px Arial";
                ctx.fillStyle = 'black';
                ctx.fillText("Game Over", canvas.width / 2 - 50, canvas.height / 2);
                ctx.fillText("Score: " + snake.length, canvas.width / 2 - 50, canvas.height / 2 + 50);
                ctx.fillText("You hit yourself", canvas.width / 2 - 50, canvas.height / 2 + 100);
                snake_color = 'blue';
                run = false;
            }
        }

        //check if the snake has hit the food
        if (snake[0].x == food.x && snake[0].y == food.y) {
            //add a new block to the snake
            snake.push({x: food.x, y: food.y});
            //generate a new food
            food = {x: Math.floor(Math.random() * sizex), y: Math.floor(Math.random() * sizey)};
        }

        //draw the snake
        for (var i = 0; i < snake.length; i++) {
            ctx.fillStyle = snake_color;
            ctx.fillRect(snake[i].x * blocksize, snake[i].y * blocksize, blocksize, blocksize);
            ctx.strokeStyle = 'black';
            ctx.strokeRect(snake[i].x * blocksize, snake[i].y * blocksize, blocksize, blocksize);
        }

        //draw the food
        ctx.fillStyle = 'red';
        ctx.fillRect(food.x * blocksize, food.y * blocksize, blocksize, blocksize);
        changed = false;
    }

}
    
int = 200;
function start()
{
   setTimeout(function() {
      mainloop();
      int -= 0.4;
      if (run == true) {
        start();
      } else {
        var topnav = document.getElementById('topnav');
        //create a button to add to the leaderboard
        var button2 = document.createElement("button");
        button2.innerHTML = "Add to Leaderboard";
        //change the color to red
        button2.style.backgroundColor = "red";
        //increase the size of the button
        button2.style.fontSize = "20px";
        button2.style.width = "200px";
        button2.style.height = "50px";
        button2.onclick = function() {
            var name = prompt("Enter your name");
            var score = snake.length;
            var data = {name: name, score: score, time: Date.now()};
            var xhr = new XMLHttpRequest();
            xhr.open("POST", window.location.href, true);
            $.post( window.location.href, {
                name: name,
                score: score,
                time: Date.now() 
            });
            console.log(JSON.stringify(data));
            alert("Your score has been added to the leaderboard");
        }
        topnav.appendChild(button2);

    }
   }, int);
}
start();

