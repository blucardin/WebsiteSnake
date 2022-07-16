//get the canvas element
var canvas = document.getElementById('canvas');
//get the 2d context
var ctx = canvas.getContext('2d');

padding = 10;
var sizex = 25;
var sizey = 25;
blocksize = (window.innerHeight - padding) / sizex;

canvas.width = sizex * blocksize;
canvas.height = sizey * blocksize;

//draw a grid on the canvas
function drawGrid() {
    //set the stroke style to black
    ctx.strokeStyle = 'black';
    //set the line width to 1
    ctx.lineWidth = 1;
    //loop through the rows
    for (var i = 0; i < canvas.width; i += blocksize) {
        //loop through the columns
        for (var j = 0; j < canvas.height; j += blocksize) {
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
drawGrid()

//create a tupple to store the starting position of the snake in the middle of the canvas
middle = [Math.floor(sizex / 2), Math.floor(sizey / 2)];
var snake = [{x: middle[0], y: middle[1]}, {x: middle[0], y: middle[1] - 1}, {x: middle[0], y: middle[1] - 2}];
set1 = new Set();
set1.add(snake[1], snake[2]);
food = {x: Math.floor(Math.random() * sizex), y: Math.floor(Math.random() * sizey)};

var direction = 'right';

//if the arrow key is pressed, change the direction of the snake
document.addEventListener('keydown', function(event) {
    if (event.key == 'ArrowUp' && direction != 'down') {
        direction = 'up';
    }else if (event.key == 'ArrowDown' && direction != 'up') {
        direction = 'down';
    }else if (event.key == 'ArrowLeft' && direction != 'right') {
        direction = 'left';
    }else if (event.key == 'ArrowRight' && direction != 'left') {
        direction = 'right';
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
        

        //loop over the snake
        for (var i = 0; i < snake.length; i++) {    
            //check if the snake has hit the edge of the canvas
            if (snake[i].x < 0 || snake[i].x >= sizex || snake[i].y < 0 || snake[i].y >= sizey) {
                console.log("Game Over");
                console.log("Score: " + snake.length);
                console.log("You hit the edge of the board")
                run = false;
            }

            //check if the snake has hit the food
            if (snake[i].x == food.x && snake[i].y == food.y) {
                //add a new block to the snake
                snake.push({x: food.x, y: food.y});
                //generate a new food
                food = {x: Math.floor(Math.random() * sizex), y: Math.floor(Math.random() * sizey)};
            }
        }

        if (set1.has(snake[0])) {
            console.log("Game Over");
            console.log("Score: " + snake.length);
            console.log("You hit yourself")
            run = false;
        }  

        //draw the snake
        for (var i = 0; i < snake.length; i++) {
            ctx.fillStyle = 'green';
            ctx.fillRect(snake[i].x * blocksize, snake[i].y * blocksize, blocksize, blocksize);
            ctx.strokeStyle = 'black';
            ctx.strokeRect(snake[i].x * blocksize, snake[i].y * blocksize, blocksize, blocksize);
        }

        //draw the food
        ctx.fillStyle = 'red';
        ctx.fillRect(food.x * blocksize, food.y * blocksize, blocksize, blocksize);
    }

}
    
int = 200;
function start()
{
   setTimeout(function() {
      mainloop();
      int -= 0.1;
      if (run == true) {
        start();
      }
      console.log(int);
   }, int);
}
start();

