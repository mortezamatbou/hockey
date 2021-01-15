
// select canvas that this element send by as parameter to Hockey class for initialize.
var canvas = document.getElementById('field');

/**
 * o variable is our main object that we need to work at all duration of application when is run.
 */
var o = new Field(canvas, 55);

o.screenDetector();

/**
 * when screen size changed, we will must detect the best resolution for current size of screen in width.
 */
window.addEventListener("resize", function () {
    o.screenDetector();
});

o.grid();

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// columnNum, rowNum, percent, color, drawType, type, text
// drawType 1 -> simple, 2 -> complex
rang1 = "rgba(0,0,0, .5)";
rang2 = "rgba(0,255,255, .8)";
rang4 = "rgba(255,255,0, .8)";
o.add(21, 1,  [0, 0], rang1, 1, "circle", "1");
o.add(3, 6,   [0, 0], rang1, 1, "circle", "2");
//o.add(3, 10,  [50, 10], rang1, 1, "circle",   "3");
//o.add(9, 1,   [50, 3],  rang1, 1, "circle",   "4");
//o.add(10, 5,  [20, 30], rang1, 1, "circle",   "5");
//o.add(10, 10, [20, 3],  rang1, 1, "circle",   "6");

o.add(13, 2,  [0, 0],   rang2, 1, "cone", "4");
o.add(15, 2,  [0, 0],   rang2, 1, "cone", "3");
o.add(17, 2, [0, 0],   rang2, 1, "cone", "2");
o.add(19, 2,  [0, 0],   rang2, 1, "cone", "1");
o.add(7, 5,  [0, 50],   rang2, 1, "cone", "5");
//o.add(13, 8,  [0, 0],   rang2, 1, "circle", "LF");

o.add(20, 1,  [70, 0],   rang4, 1, "ball", "");

//o.add([10, 6], [12, 10], [[0, 0], [0, 0]], "white", 1, "line", "");

/** ********************************************************************************************/


o.drawField();
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

line = o.shapes[13];

function current_tool(tool_number) {
    o.previous_cuurent = o.current;
    o.current = tool_number;
}
function get_current() {
    alert(o.current);
}
function get_current_shape_num() {
    alert(o.selectedNum);
}

function clear_lines() {
    temp_new_shape = [];
    for (i = 0; i < o.shapes.length; i++) {
        if (o.shapes[i].type !== "line" && o.shapes[i].type != "line-dash") {
            temp_new_shape.push(o.shapes[i]);
        }
    }
    
    o.shapes = temp_new_shape;
    o.drawField();
    
}

/**
 * this method set isGrid value as true or false. if current value of isGrid is true, it will be false and reverse.
 */
function grid_toggle() {
    if (o.isGrid) {
        o.isGrid = false;
    } else {
        o.isGrid = true;
    }
    o.drawField();
}

/**
 * --------------------------------------------------------------------------------------------------------------------------------------
 | Event            | Description                                                                                             |   DOM   |
 | --------------------------------------------------------------------------------------------------------------------------------------
 | onclick          | The event occurs when the user clicks on an element                                                     |    2    |
 | oncontextmenu    | The event occurs when the user right-clicks on an element to open a context menu                        |    3    |
 | ondblclick       | The event occurs when the user double-clicks on an element                                              |    2    |
 | onmousedown      | The event occurs when the user presses a mouse button over an element                                   |    2    |
 | onmouseenter     | The event occurs when the pointer is moved onto an element                                              |    2    |
 | onmouseleave     | The event occurs when the pointer is moved out of an element                                            |    2    |
 | onmousemove      | The event occurs when the pointer is moving while it is over an element                                 |    2    |
 | onmouseover      | The event occurs when the pointer is moved onto an element, or onto one of its children                 |    2    |
 | onmouseout       | The event occurs when a user moves the mouse pointer out of an element, or out of one of its children   |    2    |
 | onmouseup        | The event occurs when a user releases a mouse button over an element                                    |    2    |
 * -------------------------------------------------------------------------------------------------------------------------------------- 
 */

/**
 * 
 */
var x1, x2, y1, y2;

/**
 * touch mode -------------------------------------------------------
 */

canvas.addEventListener("touchstart", function (e) {
    var touch = o.getMousePosition(e.touches[0], false);
    var mouseEvent = new MouseEvent("mousedown", {
        clientX: touch.x,
        clientY: touch.y
    });
    o.draggable = false;

    isSelect = o.contain(mouseEvent.clientX, mouseEvent.clientY);

    if (isSelect) {
        if (o.selectedNum >= 0) {
            tempColor = o.shapes[o.selectedNum].color;
            o.shapes[o.selectedNum].color = "rgba(0, 0, 0, .5)";
            o.drawField();
            o.shapes[o.selectedNum].color = tempColor;
            o.draggable = true;
        }
    } else {
        o.drawField();
    }

});
canvas.addEventListener("touchend", function (e) {
//    var pos = o.getMousePosition(e.touches[0], false);
//    var mouseEvent = new MouseEvent("mouseup", {
//        clientX: pos.x,
//        clientY: pos.y
//    });
//    alert(e.touches[0]);
});
canvas.addEventListener("touchmove", function (e) {
    var pos = o.getMousePosition(e.touches[0], false);
//    var mouseEvent = new MouseEvent("mousemove", {
//        clientX: touch.x,
//        clientY: touch.y
//    });
    
    if (o.draggable) {
        mouseX = pos.x - o.tile;
        mouseY = pos.y - o.tile;

        column = Math.ceil(mouseX / o.tile);
        row = Math.ceil(mouseY / o.tile);

        X = (column - 1) * o.tile;
        Y = (row - 1) * o.tile + 10;
        

        X2 = X + o.tile;
        Y2 = Y + o.tile;


        OX = mouseX - X;
        OY = mouseY - Y;

        percentX = Math.floor((OX * 100) / o.tile);
        percentY = Math.floor((OY * 100) / o.tile);

        // alert(percentX + " " + percentY);

        o.shapes[o.selectedNum].percent = [percentX, percentY];
        o.shapes[o.selectedNum].x = column - 1;
        o.shapes[o.selectedNum].y = row - 1;
        o.drawField();

    }
});



/**
 * Click mode
 */

/**
 * when mouse clicked
 */
canvas.addEventListener("mousedown", function (e) {
    if (o.isTouch) {
        return;
    }
    var pos = o.getMousePosition(e);
    // if mouse click is left otherwise do nothing
    if (e.which != 1) {
        return;
    }

    if (o.field.isPointInStroke(pos.x, pos.y)) {
        //alert("exist");
    }

    o.draggable = false;

    isSelect = o.contain(pos.x, pos.y);

    if (isSelect) {
        if (o.selectedNum >= 0) {
            tempColor = o.shapes[o.selectedNum].color;
            o.shapes[o.selectedNum].color = "rgba(0, 0, 0, .5)";
            o.drawField();
            o.shapes[o.selectedNum].color = tempColor;
        }
    } else {
        o.drawField();
    }

    if (o.current == 0) { // hand tools
        if (isSelect) {
            if (o.selectedNum >= 0) {
                tempColor = o.shapes[o.selectedNum].color;
                o.shapes[o.selectedNum].color = "rgba(0, 0, 0, .5)";
                o.drawField();
                o.shapes[o.selectedNum].color = tempColor;
                o.draggable = true;
            }
        } else {
            o.drawField();
        }
    } else if (o.current == 1 || o.current == 1.1) { // draw line


        x1 = pos.x;
        y1 = pos.y;
        
        o.draggable = true;


    } else if (o.current == 2) {

        o.add(Math.ceil(pos.x / o.tile) - 1, Math.ceil(pos.y / o.tile) - 1, [0, 0], "black", 1, "rect", o.shapes.length+1+"");
        o.drawField();

    } else if (o.current == 3) {

        o.add(Math.ceil(pos.x / o.tile) - 1, Math.ceil(pos.y / o.tile) - 1, [0, 0], "black", 1, "circle", o.shapes.length+1+"");
        o.drawField();

    } else if (o.current == 4) {

        

    }
});

/**
 * when mouse released
 */
canvas.addEventListener("mouseup", function (e) {
    if (o.isTouch) {
        return;
    }
    pos = o.getMousePosition(e);

    // if mouse click is left otherwise do nothing
    if (e.which != 1) {
        return;
    }

    if (o.current == 0) {

        if (o.draggable) {
            mouseX = pos.x - o.tile / 4;
            mouseY = pos.y - o.tile / 4;


            column = Math.ceil(mouseX / o.tile);
            row = Math.ceil(mouseY / o.tile);

            X = (column - 1) * o.tile;
            Y = (row - 1) * o.tile;

            X2 = X + o.tile;
            Y2 = Y + o.tile;


            OX = mouseX - X;
            OY = mouseY - Y;

            percentX = Math.floor((OX * 100) / o.tile);
            percentY = Math.floor((OY * 100) / o.tile);

            //            alert(percentX + " " + percentY);

            o.shapes[o.selectedNum].percent = [percentX, percentY];
            o.shapes[o.selectedNum].x = column - 1;
            o.shapes[o.selectedNum].y = row - 1;
            o.drawField();
            o.draggable = false;

        }

    } else if (o.current == 1 || o.current == 1.1) { // draw line
        

        if (o.draggable) {
            x2 = pos.x;
            y2 = pos.y;
            x = [x1, y1];
            y = [x2, y2];
            
            p1 = o.getTileInfo(x1, y1);
            p2 = o.getTileInfo(x2, y2);
            lineType = o.current == 1 ? "line" : "line-dash";
            o.add([p1.x.num, p1.y.num], [p2.x.num, p2.y.num], [ [p1.x.percent, p1.y.percent], [p2.x.percent, p2.y.percent] ], "white", 1, lineType, "text");

            o.drawField();

            o.draggable = false;
        }


    } else if (o.current == 2) {



    } else if (o.current == 3) {



    } else if (o.current == 4) {



    }
});

/**
 * when mouse moving
 */
canvas.addEventListener("mousemove", function (e) {

    if (o.isTouch) {
        return;
    }

    pos = o.getMousePosition(e);
    // if mouse click is left otherwise do nothing
    if (e.which != 1) {
        return;
    }

    if (o.current == 0) {

        if (o.draggable) {
            mouseX = pos.x - o.tile / 4;
            mouseY = pos.y - o.tile / 4;

            column = Math.ceil(mouseX / o.tile);
            row = Math.ceil(mouseY / o.tile);

            X = (column - 1) * o.tile;
            Y = (row - 1) * o.tile;

            X2 = X + o.tile;
            Y2 = Y + o.tile;


            OX = mouseX - X;
            OY = mouseY - Y;

            percentX = Math.floor((OX * 100) / o.tile);
            percentY = Math.floor((OY * 100) / o.tile);

            // alert(percentX + " " + percentY);

            o.shapes[o.selectedNum].percent = [percentX, percentY];
            o.shapes[o.selectedNum].x = column - 1;
            o.shapes[o.selectedNum].y = row - 1;
            o.drawField();
        }

    } else if (o.current == 1) { // draw line

        if (o.draggable) {
//            x2 = pos.x;
//            y2 = pos.y;
//
//            x = [x1, y1];
//            y = [x2, y2];

//            o.add(x, y, "white", 2, "line", "text");

//            o.drawField();
        }


    } else if (o.current == 2) {

    } else if (o.current == 3) {

    } else if (o.current == 4) {

    }


}
);



