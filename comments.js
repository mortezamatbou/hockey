
document.getElementById("field").onclick = function (e) {
    var isRightClick;
    e = e || window.event;

    if ("which" in e) { // Gecko (Firefox), WebKit (Safari/Chrome) & Opera
        isRightClick = e.which == 3;
    } else if ("button" in e) {  // IE, Opera 
        isRightClick = e.button == 2;
    }
    if (isRightClick) {
        e.preventDefault();
    } else {
        e.preventDefault();
    }
}


for (i = 0; i < o.shapes.length; i++) {
    if (o.shapes[i].type == "rect") {
        f = o.shapes[i];
    }
    if (o.shapes[i].type == "circle") {
        d = o.shapes[i];
    }
    if (o.shapes[i].type == "ball") {
        ball = o.shapes[i];
    }
}
/**
 <!--
 <div id="resolution">
 <button onclick="setResolution(240, 120)">240 * 120</button>
 <button onclick="setResolution(360, 180)">360 * 180</button>
 <button onclick="setResolution(480, 240)">480 * 240</button>
 <button onclick="setResolution(600, 300)">600 * 300</button>
 <button onclick="setResolution(720, 360)">720 * 360</button>
 <button onclick="setResolution(840, 420)">840 * 420</button>
 <button onclick="setResolution(960, 480)">960 * 480</button>
 <button onclick="setResolution(1080, 540)">1080 * 540</button>
 <button onclick="setResolution(1200, 600)">1200 * 600</button>
 <button onclick="setResolution(1320, 660)">1320 * 660</button>
 <button onclick="setResolution(1440, 720)">1440 * 720</button>
 
 <button onclick="setResolution(1560, 780)">1560 * 780</button>
 <button onclick="setResolution(1680, 840)">1680 * 840</button>
 <button onclick="setResolution(1800, 900)">1800 * 900</button>
 <button onclick="setResolution(1920, 960)">1920 * 960</button>
 
 </div>
 
 -->
 
 
 <!-- <div id="test" style="width: 90%; margin: 10px auto; padding: 5px; border: 1px solid white; clear: both;">
 
 </div> -->
 **/



document.getElementById("field").addEventListener("mousedown", function (ev) {
    /**
     * which == 1 is left click
     * which == 2 is middle button
     * which == 3 is right click -- Gecko (Firefox), WebKit (Safari/Chrome) & Opera
     * 
     * button == 0 is left click
     * button == 1 is middle button mouse
     * button == 2 is right click
     */
    if (ev.which == 3) {
        ev.preventDefault();
    }
});




test = document.getElementById("test");

function get_x_y(line) {

    x1 = (line.x[0] * o.tile) + ((line.percent[0][0] * 1 / 100) * o.tile);
    y1 = (line.x[1] * o.tile) + ((line.percent[0][1] * 1 / 100) * o.tile);

    x2 = (line.y[0] * o.tile) + ((line.percent[1][0] * 1 / 100) * o.tile);
    y2 = (line.y[1] * o.tile) + ((line.percent[1][1] * 1 / 100) * o.tile);

    m = (y2 - y1) / parseFloat(x2 - x1); // shibe khat

    // set a point in y2 - y1 = m (x2 - x1) formula and get x and y equation
    // x = getX(y2, y1, x2, m);
    // y = getY(x2, x1, y1, m);

    // alert("x1: " + x1 + " y1: " + y1 + " x: " + x + " y:" + y);

    test.innerHTML += "m : " + m + "<br>";

    test.innerHTML += "(x1, y1) : " + x1 + "," + y1 + "<br>";

    test.innerHTML += "(x2, y2) : " + x2 + "," + y2 + "<br>";


    // for (i = x1; i <= x2; i++) {
    //     test.innerHTML += "getY ("+ (i) + ")  ->  " + getY(x1, y1, i, m) + "<br>";
    // }

    return {shape: line, m: m, x1: x1, x2: x2, y1: y1, y2: y2};


}


obj = get_x_y(line);

function temp_move(anime, interval) {
    ball.x += 1;
    ball.y += 1;
    o.drawField();
}

function getY(x0, y0, x, m) {
    y = m * x - m * x0 + y0;
    return y;
}

var abs = setInterval("temp_move(obj, abs)", 500);



// temp method
var jjj = 0;
var forward = true;
Field.prototype.move = function (dd) {

    if (jjj < 0) {
        forward = true;
    }

    if (jjj > 500) {
        forward = false;
    }

    if (forward) {
        this.shapes[12].percent[0] = this.shapes[12].percent[0] + 1;
        jjj++;
    }
    if (!forward) {
        this.shapes[12].percent[0] = this.shapes[12].percent[0] - 1;
        jjj--;
    }
    o.drawField();
};



f = o.shapes[0];
ball = o.shapes[2];
d = o.shapes[1];



window.requestAnimationFrame(myMove);


/**
 * TESTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT
 */
o.add(8, 9, [50, 40], "black", 1, "circle", "12");
o.add(23, 10, [10, 20], "rgba(0,0,0, .5)", 1, "circle", "1");


o.add(8, 10, [100, 0], "yellow", 1, "ball", "");

var jjj = 0;
var forward = true;
var stopCondition = true;

function myMove() {

    if (ball.percent[0] < 50) {
        //forward = true;
    }

    if (ball.percent[0] > 800) {
        forward = false;
    }

    if (forward) {
        ball.percent[0] = ball.percent[0] + 5;
        f.percent[0] = f.percent[0] + 5;
        jjj++;
    }
    if (!forward) {
        ball.percent[0] = ball.percent[0] + 10;
        jjj--;
    }
    o.drawField();

    if (ball.percent[0] > 1480) {
        ball.percent[0] = 100;
        f.percent[0] = 50;
        forward = true;
    }
    requestAnimationFrame(myMove);
}

//window.requestAnimationFrame(myMove);


o.add(4, 5, [0, 0], "orange", 1, "cone", "");


// -------------------------------------------------------------------




var ii = window.setInterval("o.move(ii)", 1);
window.requestAnimationFrame =
        window.requestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.msRequestAnimationFrame;

window.requestAnimationFrame(myMove);

var jjj = 0;
var forward = true;
function myMove() {

    if (jjj < 0) {
        forward = true;
    }

    if (jjj > 500) {
        forward = false;
    }

    if (forward) {
        ball.percent[0] = o.shapes[12].percent[0] + 1;
        jjj++;
    }
    if (!forward) {
        ball.percent[0] = o.shapes[12].percent[0] - 1;
        jjj--;
    }
    o.drawField();
    requestAnimationFrame(myMove);
}

canvas.addEventListener('click', function (e) {
    var pos = o.getMousePosition(e);
    var x = pos.x;
    var y = pos.y;

    xNum = Math.ceil(x / o.tile);
    yNum = Math.ceil(y / o.tile);

    //alert(xNum + " " + yNum);

    o.fillTile(xNum, yNum);

});


Hockey.prototype.fillTile = function (x, y) {
    this.field.fillStyle = "rgba(200,200,0, .13)";
    this.field.fillRect(x * o.tile - o.tile, y * o.tile - o.tile, o.tile, o.tile);
};

var ii = window.setInterval("o.move(ii)", 200);
