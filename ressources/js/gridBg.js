const tileSize = 40

document.addEventListener('DOMContentLoaded', ()=> {



    let canvas =  document.querySelector("#grid-canvas")
    
    initCanvas(canvas)
    
    let ctx = canvas.getContext('2d');
    let circles = []
        
    displayGrid(canvas, ctx)

    canvas.addEventListener("click", (e)=>{
        pos = {
            x:e.offsetX,
            y:e.offsetY
        }
        for(circle of circles) {
            circle.pointToGo = pos
        }
    })

    window.addEventListener('resize', initCanvas)

    function drawBalls() {
        for(let circle of circles) {
            if(circle.pos.x < 0 || circle.pos.y < 0 || circle.pos.x > canvas.width || circle.pos.y > canvas.height)
                circles.splice(circles.indexOf(circle),1)
            ctx.beginPath();
            ctx.arc(circle.pos.x-circle.size/2, circle.pos.y-circle.size/2, circle.size, 0, Math.PI*2);
            ctx.fillStyle = circle.color
            ctx.fill();
            ctx.closePath();
            circle.move()
        }
    }
    
    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        displayGrid()
        drawBalls();
    }

    function displayGrid()
    {
        ctx.beginPath();
        for(var x=0;x<canvas.width;x+=tileSize) {
            ctx.moveTo(x,0);
            ctx.lineTo(x,canvas.height);
        }

        for(var y=0; y<canvas.height; y+=tileSize) {
            ctx.moveTo(0,y);
            ctx.lineTo(canvas.width,y);
        }
        
        ctx.strokeStyle='#80b2ed';
        ctx.stroke();
        ctx.closePath();
    }

    canvas.addEventListener("mousemove", (e)=>{
        let pos = {
            x: Math.floor(e.offsetX),
            y: Math.floor(e.offsetY)
        }
        if(pos.x % tileSize < 3 || pos.y % tileSize < 3)
        {
                circles.push(new Circle(pos))
        }

    })

    function initCanvas() {
        // ...then set the internal size to match
        canvas.width  = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
    }

   
    
    setInterval(draw, 5);
})

function getRandomInt(min, max) {
    return Math.floor(min + Math.random() * (max - min +1));
}

