var jjj = 0;
var forward = true;
var ball = o.shapes[7];

function move() {

    if (jjj < 0) {
        forward = true;
    }

    if (jjj > 100) {
        forward = false;
    }

    if (forward) {
        ball.percent[0] = ball.percent[0] - 10;
        jjj++;
    }
    if (!forward) {
        ball.percent[0] = ball.percent[0] - 10;
        jjj--;
    }
    o.drawField();
    if (jjj < 100) {
        requestAnimationFrame(move);
    }

}

var speed = 1;

function move2() {
//    X = line.x;
//    alert(X[1]);
    limit = line.x[0] - line.y[0];
    if(limit < 0) {
        limit *= -100;
    } else {
        limit *= 100;
    }
    
    if (jjj < limit) {
        x1 = (line.x[0] * o.tile) + ((line.percent[0][0] * 1 / 100) * o.tile);
    y1 = (line.x[1] * o.tile) + ((line.percent[0][1] * 1 / 100) * o.tile);

    x2 = (line.y[0] * o.tile) + ((line.percent[1][0] * 1 / 100) * o.tile);
    y2 = (line.y[1] * o.tile) + ((line.percent[1][1] * 1 / 100) * o.tile);

    m = (y2 - y1) / parseFloat(x2 - x1); // shibe khat
        jjj++;
        ball.percent[0] += speed;
        ball.percent[1] += m;
        o.drawField();
        window.requestAnimationFrame(move2);
    }
}


//move();
