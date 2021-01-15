
// Hockey class
function Field(canvas, tile) {

    // after click and select an shape, selected index in shapes array will set be here
    this.selectedNum = false;
    
    // default in line
    this.current = 0;
    
    // holder for previous action id for tools
    this.previous_current = 0;
    
    // draggble when is true that after clicking and move the mouse an shape is selected
    this.draggable = false;

    // when animation is started, lockField will be TRUE and screenDetector disable when browser resized
    this.lockField = false;

    // when isGrid true, grid of field will be appearance otherwise will not be appearance
    this.isGrid = true;

    // when user touch screen from mobile device is value will true
    this.isTouch = false;

    this.fieldColor = "rgba(0,0,50, .8)";
    this.gridColor = "rgba(255, 255, 255, .1)";
    this.color = "red";
    this.fillColor = "gray";
    this.temp_shapes = [];

    // all shapes as circles, rects, cones and path and etc. are here
    this.shapes = [];

    // all paths that show animation direction are save here
    this.paths = []; 

    // for every field by different width we have a special tile size
    this.tile = tile;

    // entry parameter for our canvas that show us field
    this.canvas = canvas;

    this.field = canvas.getContext("2d");
    
    // size of canvas in width
    this.width = canvas.width;

    // size of canvas in height
    this.height = canvas.height;

    // before every draw we need to clear all section of fields, this method do this
    this.clearField = function () {
        this.field.clearRect(0, 0, this.width, this.height);
    };

}
/**
 * this method is a prototype and return x and y position of mouse on our canvas
 */
Field.prototype.getMousePosition = function (e, click = true) {
    var rect = this.canvas.getBoundingClientRect();
    if (click) {
        this.isTouch = false;
        return {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        };
    }
    // is touch
    this.isTouch = true;
    return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
    };


};


/**
 * add function for add a shape to shapes array
 * x: is number of tile in X axis
 * y: is number of tile in Y axis
 * percent: define shape position according to percent in an tile width and height
 * drawType: this variable define shape type that is "simple" or "complex"
 * type: define type of shape as line rect circle etc.
 * text: name or title or number of a shape that will be show inside or top of an shape
 */
Field.prototype.add = function (x, y, percent, color, drawType, type, text) {
    this.shapes.push({x: x, y: y, percent: percent, color: color, drawType: drawType, type: type, text: text});
};

// add function for add a temp shape to temp_shapes array like a line etc.
Field.prototype.addTemp = function (x, y, color, num, type, text) {
    this.shapes.push({x: x, y: y, color: color, num: num, type: type, text: text});
};

// check an point that this point contain a shape or not in shapes array in Hockey class
Field.prototype.contain = function (x, y) {
    for (i = 0; i < this.shapes.length; i++) {
        percentX = this.shapes[i].percent[0] || 0;
        percentY = this.shapes[i].percent[1] || 0;

        column = this.shapes[i].x * this.tile;
        row = this.shapes[i].y * this.tile;

        X = (column) + ((percentX * 1 / 100) * this.tile);
        Y = (row) + ((percentY * 1 / 100) * this.tile);
        if ((X <= x) && (X + this.tile >= x) && (Y <= y) && (Y + this.tile >= y)) {
            this.selectedNum = i;
            return true;
        }
    }
    this.selectedNum = false;
    return false;
};

/**
 * draw field from shapes array-
 * ----------------------------------------
 * | name     |   description             |
 * | --------------------------------------
 * | rect     |   player (rectangle)      |
 * | circle   |   player (circle)         |
 * | line     |   line   (solid)          |
 * | ball     |   ball                    |
 * | cone     |   cone                    |
 * ----------------------------------------
 */
Field.prototype.drawField = function () {

    this.clearField();

    this.grid();

    for (i = 0; i < this.shapes.length; i++) {
        this.draw(this.shapes[i]);
    }

    if (this.temp_shapes.length) {

    }

};

/**
 * this prototype draw a shape by special type
 * this method is a member of Hockey class and work with Hockey variables and other methods
 */
Field.prototype.draw = function (s) {

    // simple line
    if (s.type == "line" || s.type == "line-dash" && s.drawType == "1") {

        percentX1 = s.percent[0][0] || 0;
        percentY1 = s.percent[0][1] || 0;

        percentX2 = s.percent[1][0] || 0;
        percentY2 = s.percent[1][1] || 0;

        columnP1 = s.x[0] * this.tile;
        rowP1 = s.x[1] * this.tile;

        columnP2 = s.y[0] * this.tile;
        rowP2 = s.y[1] * this.tile;

        X1 = columnP1 + ((percentX1 * 1 / 100) * this.tile);
        Y1 = rowP1 + ((percentY1 * 1 / 100) * this.tile);

        X2 = columnP2 + ((percentX2 * 1 / 100) * this.tile);
        Y2 = rowP2 + ((percentY2 * 1 / 100) * this.tile);


    } else if (s.type == "line" || s.type == "line-dash" && s.drawType == "2") { // complex line

    } else if (s.drawType == "1") {
        /**
         * this variables define position of shape in an grid, this value fetch from entry parameter that is an object from shapes array
         * in Hockey class
         * percent[0] is percent of x position
         * percent[1] is percent of y position
         */
        percentX = s.percent[0] || 0;
        percentY = s.percent[1] || 0;

        /**
         * we will find x and y position of shape by column and row number that it info exist in shape object and we will compute position 
         * by current tile size. in different tile of size our x and y has different value
         */
        column = s.x * this.tile;
        row = s.y * this.tile;

        /**
         * after compute x and y of shape tile, we must compute shape percent in real x and y on canvas
         */
        X = (column) + ((percentX * 1 / 100) * this.tile);
        Y = (row) + ((percentY * 1 / 100) * this.tile);

    }

    /**
     * cause draw different shape have different methods , and every shape exist in one category that this category defined by type property.
     */
    // if drawType is 1 so shape is simple
    if (s.drawType == "1") {
        switch (s.type) {
            case "rect": // player recangle
                /**
                 * every recangle will be draw by half of tile size in x and y.
                 * X and Y is converted value for current tile size.
                 * 
                 * tile always is square and its x and y is equal.
                 */
                this.field.fillStyle = this.shapes[i].color || "red";

                this.field.fillRect(X, Y, this.tile / 2, this.tile / 2);
                if (true && s.text.length > 0) {
                    this.field.fillStyle = "white";
                    this.field.fillText(s.text, X+this.tile/1.8, Y+this.tile/1.2);
                }
                
                break;

            case "circle": // player circle
                /**
                 * circles will be darw from center point and radius. radius claculated of 1/3 current tile size.
                 * cause circles will be draw by center point, we also add 1/3 of tile size value to X and Y.
                 * note: 1/3 of tile that add to X and Y is for the reason that we drawed circle by radius 1/3 of tile size and
                 *       beacause we want after draw circle show in 0 and 0 of current tile we added 1/3 of tile size to X and Y.
                 */
                this.field.fillStyle = s.color || "red";
                
                this.field.beginPath();
                this.field.arc(X + this.tile / 3, Y + this.tile / 3, this.tile / 3, 0, 2 * Math.PI);
                this.field.fill();
                
                this.addDirectionLine({X1: X, Y1: Y});
                
                if (true && s.text.length > 0) {
                    this.field.fillStyle = "white";
                    this.field.fillText(s.text, X+this.tile/2, Y+this.tile);
                }
                
                break;
                
            case "line-dash":
            case "line":
                var headlen = 10;   // length of head in pixels
                var angle = Math.atan2(Y2 - Y1, X2 - X1);
                this.field.strokeStyle = s.color || "red";
                if (s.type == "line-dash") {
                    this.field.setLineDash([5, 3]);
                }
                this.field.beginPath();
                this.field.moveTo(X1, Y1);
                this.field.lineTo(X2, Y2);
                this.field.lineTo(X2 - headlen * Math.cos(angle - Math.PI / 6), Y2 - headlen * Math.sin(angle - Math.PI / 6));
                this.field.moveTo(X2, Y2);
                this.field.lineTo(X2 - headlen * Math.cos(angle + Math.PI / 6), Y2 - headlen * Math.sin(angle + Math.PI / 6));
                this.field.closePath();
                this.field.stroke();

                this.field.setLineDash([0, 0]);
                // alert(percentX1);

                break;

            case "ball":
                /**
                 * draw ball is like draw circle shape. but we choose the radius of ball 1/8 of tile size and this haven't any special reason -
                 * and is our convention.
                 * because we choose 1/8 of tile for radius, therefor we must add 1/8 of tile size add to X and Y.
                 */
                this.field.fillStyle = s.color || "white";

                this.field.beginPath();
                this.field.arc(X + this.tile / 8, Y + this.tile / 8, this.tile / 8, 0, 2 * Math.PI);
                this.field.closePath();
                this.field.fill();
                break;

            case "cone": // cone
                /**
                 * 
                 */
                this.field.fillStyle = this.shapes[i].color || "orange";
                this.field.beginPath();
                this.field.moveTo(X, Y);
                this.field.lineTo(X + this.tile / 3, Y + this.tile / 3);
                this.field.lineTo(X - this.tile / 3, Y + this.tile / 3);
                this.field.closePath();
                this.field.fill();
                if (true && s.text.length > 0) {
                    this.field.fillStyle = "white";
                    this.field.fillText(s.text, X, Y+this.tile/1.5);
                }
                break;
        }
    }
};

Field.prototype.addDirectionLine = function (point) {
    point.X1 = point.X1 + this.tile/5;
    point.Y1 = point.Y1 + this.tile/3;
    point.X2 = point.X1 + this.tile/3;
    point.Y2 = point.Y1;
    var headlen = 5;   // length of head in pixels
    var angle = Math.atan2(point.Y2 - point.Y1, point.X2 - point.X1);
    
    
    this.field.strokeStyle = "white";
    this.field.beginPath();
    this.field.moveTo(point.X1, point.Y1);
    this.field.lineTo(point.X2, point.Y2);
    
    this.field.lineTo(point.X2 - headlen * Math.cos(angle - Math.PI / 6), point.Y2 - headlen * Math.sin(angle - Math.PI / 6));
    this.field.moveTo(point.X2, point.Y2);
    this.field.lineTo(point.X2 - headlen * Math.cos(angle + Math.PI / 6), point.Y2 - headlen * Math.sin(angle + Math.PI / 6));
    this.field.closePath();
    this.field.stroke();
    this.field.restore();
};

/**
 * this method will draw grid of field.
 * if isGrid variable has true grid will be draw and otherwise nothing.
 * also this method draw the center line of field and D area and 3m dashed D.
 */
Field.prototype.grid = function () {
    this.field.fillStyle = this.fieldColor;

    this.field.fillRect(0, 0, this.width, this.height);


    this.field.strokeStyle = "white";
    //this.field.lineWidth = 5;

    this.field.beginPath();

    this.field.moveTo(this.width / 2, 0);
    this.field.lineTo(this.width / 2, this.height);

    this.field.closePath();
    this.field.stroke();

    /**
     * draw D area in field
     */
    this.field.beginPath();
    this.field.arc(0, this.height / 2, this.height / 2 - 10, 0.5 * Math.PI, 1.5 * Math.PI, true);  // LEFT D
    this.field.moveTo(this.width, this.height / 2);
    this.field.arc(this.width, this.height / 2, this.height / 2 - 10, 0.5 * Math.PI, 1.5 * Math.PI, false); // RIGHT D
    this.field.closePath();
    this.field.stroke();


    /**
     * draw dashed 3m D area
     */
    //    this.field.setLineDash([10, 15]);
    //    
    //    this.field.beginPath();
    //    this.field.arc(80, this.height / 2, this.height / 2, 0.5 * Math.PI, 1.5 * Math.PI, true);  // LEFT D
    //    this.field.moveTo(this.width, this.height / 2);
    //    this.field.arc(this.width, this.height / 2, this.height / 2 - 10, 0.5 * Math.PI, 1.5 * Math.PI, false); // RIGHT D
    //    this.field.closePath();
    //    this.field.stroke();


    this.field.setLineDash([0, 0]);


    /**
     * if isGrid variable in Hockey class is true, grid will be darw otherwise nothing.
     * this method draw every tile size line in vertical and horizontal at the field.
     */
    if (this.isGrid) {
        this.field.strokeStyle = this.gridColor;
        this.field.lineWidth = 1;


        this.field.beginPath();
        for (i = 0; i < this.width; i += this.tile) {
            this.field.moveTo(i, 0);
            this.field.lineTo(i, this.height);
        }
        this.field.closePath();
        this.field.stroke();

        this.field.beginPath();
        for (i = 0; i < this.height; i += this.tile) {
            this.field.moveTo(0, i);
            this.field.lineTo(this.width, i);
        }
        this.field.closePath();
        this.field.stroke();
    }
};


// start drill
Field.prototype.start = function () {

};

// pause drill
Field.prototype.pause = function () {

};

// stop drill
Field.prototype.stop = function () {

};

/**
 * recevie two integer parameter and set canvas width, height and tile for field
 * this method set values to Hockey width, height and tile vars by main object
 * @param {*} width int 
 * @param {*} height int
 * @returns void
 */
Field.prototype.setResolution = function (width, height, tile) {
    this.tile = tile;
    this.canvas.width = width;
    this.canvas.height = height;
    this.width = width;
    this.height = height;
    this.drawField();
};

/**
 * this method detect screen resolution and set width, height and tile of canvas 
 * this method use setResolution method to set our requirements
 */
Field.prototype.screenDetector = function () {
    if (this.lockField) {
        return;
    }
    // inner width of browser
    fullScreenTarget = window.innerWidth;
    target = document.getElementById("ci");
    //w = target.clientWidth; // 728 + borders width
    w = target.offsetWidth; // 728 + borders width
    // length of resolution arrays
    l = resolution.length;
    // resolution array that is defined sizes in x and y and tiles
    r = resolution;
    for (i = 0; i < l; i++) {
        // if next index is available
        if (i + 1 < l) {
            // if current inner width of browser bigger or equal than current index in resolution AND current inner width -
            // less than width in next index we will assign curren width and height and tile to our field.
            if (w >= r[i].w && w < r[i + 1].w) {
                // if our find value exist in first index of resolution array , we assign it to our config variables -
                // otherwise if index is not first, we assign value of previous index to our config variables of field.
                // k is index of resolution array.
                if (i == 0) {
                    k = i;
                } else if (i > 0) {
                    k = i;
                }
                this.setResolution(r[k].w, r[k].h, r[k].tile);
                break;
            }
            // if next index of resolution array is not available. it will assign current resolution to field 
        } else {
            if (r[i].w < w) {
                this.setResolution(r[i].w, r[i].h, r[i].tile);
                break;
            }
        }
    }
};

Field.prototype.getTileInfo = function (x, y) {

    Xtile = x / this.tile;
    Ytile = y / this.tile;

    XtileNum = Math.ceil(Xtile);
    YtileNum = Math.ceil(Ytile);

    Xoffset = (XtileNum * this.tile) - x;
    Yoffset = (YtileNum * this.tile) - y;

    Xpercent = (100 * (this.tile - Xoffset)) / this.tile;
    Ypercent = (100 * (this.tile - Yoffset)) / this.tile;
    
    info = {
        x:{num: Math.floor(Xtile), percent: Xpercent},
        y:{num: Math.floor(Ytile), percent: Ypercent}
    };
    
    return info;
    
};
