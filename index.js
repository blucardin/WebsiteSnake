//get the canvas element
var canvas = document.getElementById('canvas');
//get the 2d context
var ctx = canvas.getContext('2d');

blocksize = 10;
var sizex = 10;
var sizey = 10;


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
        ctx.lineTo(i + 10, j);
        ctx.stroke();
        ctx.closePath();
        }
    }
}
drawGrid

//create a tupple to store the starting position of the snake in the middle of the canvas
middle = [Math.floor(sizex / 2), Math.floor(sizey / 2)];
var snake = [{x: middle[0], y: middle[1]}, {x: middle[0], y: middle[1] - 1}, {x: middle[0], y: middle[1] - 2}];
set1 = new Set(snake);
food = {x: Math.floor(Math.random() * sizex), y: Math.floor(Math.random() * sizey)};

direction = 'right';

while (true){
    //loop over the snake
    for (var i = 0; i < snake.length; i++) {
        //check if the snake has hit itself
        if (set1.has(snake[i])) {
            console.log("Game Over");
            console.log("Score: " + snake.length);
            console.log("You hit yourself")
        }
    
        //check if the snake has hit the edge of the canvas
        if (snake[i].x < 0 || snake[i].x >= sizex || snake[i].y < 0 || snake[i].y >= sizey) {
            console.log("Game Over");
            console.log("Score: " + snake.length);
            console.log("You hit the edge of the board")
        }

        //check if the snake has hit the food
        if (snake[i].x == food.x && snake[i].y == food.y) {
            //add a new block to the snake
            snake.push({x: food.x, y: food.y});
            //generate a new food
            food = {x: Math.floor(Math.random() * sizex), y: Math.floor(Math.random() * sizey)};
        }
    }

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
    
    //delete the last block of the snake
    snake.pop();

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