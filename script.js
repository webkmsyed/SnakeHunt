const board = document.querySelector('.board');
const blockHeight = 50;
const blockWidth = 50;

const cols = Math.floor(board.clientWidth / blockWidth);
const rows = Math.floor(board.clientHeight / blockHeight);

const blocks = {};
const snake = [{ x: 2, y: 4 }, { x: 2, y: 5 }, { x: 2, y: 6 }];
let direction = 'left';
let intervalId = null;


// For Loop TYPE 01
// for(i=0; i < row*col; i++){
//     const block = document.createElement('div');
//     block.classList.add('block');
//     board.appendChild(block);
//     block.Id
// }

//For loop type 2 but same result as 01
for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
        const block = document.createElement('div');
        block.classList.add('block');
        board.appendChild(block);
        block.innerText = `${row}-${col}`
        // if (row <= 9) { block.innerText = `${row}-${col}` }  My Experiment
        blocks[`${row}-${col}`] = block

    }

}

function render() {
    snake.forEach(segment => {
        const fillSnake = blocks[`${segment.x}-${segment.y}`];
        fillSnake.classList.add('fill');
    });
}

intervalId = setInterval(() => {
    // let head = null;
    // if(direction === 'left'){
    //     head = {x: snake[0].x, y: snake[0].y-1}
    // }  Video Solution

    //ChatGPT Solution to this classList Erro
    let newX = snake[0].x;
    let newY = snake[0].y;

    if (direction === 'left') {
        newY = newY - 1;

        if (newY < 0) {
            console.log("Wall hit (left)");
            alert('Game Over!');
            clearInterval(intervalId);
            return;
        }
    }
    
    if (direction === 'right') {
        newY = newY + 1;
        
        if (newY >= cols) {
            console.log("Wall hit (right)");
            alert('Game Over!');
            clearInterval(intervalId);
            return;
        }
    }
    
    if (direction === 'up') {
        newX = newX - 1;
        
        if (newX < 0) {
            console.log("Wall hit (up)");
            alert('Game Over!');
            clearInterval(intervalId);
            return;
        }
    }
    
    if (direction === 'down') {
        newX = newX + 1;
        
        if (newX >= rows) {
            console.log("Wall hit (down)");
            alert('Game Over!');
            clearInterval(intervalId);
            return;
        }
    }

    let head = { x: newX, y: newY };

    snake.forEach(segment => {
        const fillSnake = blocks[`${segment.x}-${segment.y}`];
        fillSnake.classList.remove('fill');
    });
    snake.unshift(head)
    snake.pop()
    render();
}, 500);


//ChatGpt 3 answers for blinking
//03--------------
// let visible = true;
// setInterval(() => {
//     snake.forEach(segment => {
//         const el = blocks[`${segment.x}-${segment.y}`];
//         if (visible) {
//             el.classList.add('fill');
//         } else {
//             el.classList.remove('fill');
//         }
//     });

//     visible = !visible;
// }, 300);

//02-------------- Better Approach
// function clearBoard() {
//     Object.values(blocks).forEach(block => {
//         block.classList.remove('fill');
//     });
// }
// function render() {
//     clearBoard();

//     snake.forEach(segment => {
//         const fillSnake = blocks[`${segment.x}-${segment.y}`];
//         fillSnake.classList.add('fill');
//     });
// }

//01------------ toggle
// function render() {
//     snake.forEach(segment => {
//         const fillSnake = blocks[`${segment.x}-${segment.y}`];
//         fillSnake.classList.toggle('fill');
//     });
// }

addEventListener("keydown", (keyEvent) => {
    if (keyEvent.key === "ArrowUp") {
        direction = 'up'
    } else if (keyEvent.key === "ArrowDown") {
        direction = 'down'
    } else if (keyEvent.key === "ArrowLeft") {
        direction = 'left'
    } else if (keyEvent.key === "ArrowRight") {
        direction = 'right'
    }
})

