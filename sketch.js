var fnt = "Consolas";
var fntSize = 20;
var Streams = [];

var toggle = true;

function setup() {
    createCanvas(window.innerWidth, window.innerHeight);
    background(0);
    for (var i = 0; i < round(width / fntSize); i++) {
        var nStream = new Stream(i * fntSize, round(random(-1000, 0)));
        nStream.generateSymbols();
        Streams.push(nStream);
    }
}

function draw() {
    background(0, 80);
    fill(0, 255, 0);
    Streams.forEach(function(cStream) {
        cStream.render();
    });
}

function keyPressed() {
    if (keyCode === CONTROL) {
        if (toggle) {
            toggle = false;
        } else {
            toggle = true;
        }
    }
}

function Stream(x, y) {

    var x = x;
    var y = y;
    var length = random(5, 30);
    var speed = round(random(10, 26));
    var syms = [];

    this.generateSymbols = function() {
        for (var i = 0; i < length; i++) {
            var nSym = new Symbol(x, y + (fntSize * i));
            nSym.setRandomCharacter();
            syms.push(nSym);
        }
    }

    this.render = function() {
        syms[syms.length - 1].render(speed, true);
        for (var i = 0; i < syms.length - 1; i++) {
            syms[i].render(speed, false);
        }
    }

}

function Symbol(x, y) {

    var x = x;
    var y = y;
    var char;
    var randomRate;
    var leader;

    this.setRandomCharacter = function() {
        char = String.fromCharCode(0x30A0 + round(random(1, 94)));
    }

    this.fall = function(spd) {
        var speed = spd;
        y += speed;
        if (y > height) {
            y = 0;
        }
    }

    this.render = function(spd, leader) {

        if (toggle) {
            fill(255, 0, 0);
            if (leader) {
                fill(255, 50, 50);
            }
        } else {
            fill(0, 255, 60);
            if (leader) {
                fill(180, 255, 180);
            }
        }

        fill(255, 0, 0);
        if (leader) {
            fill(255, 50, 50);
        }

        this.fall(spd);
        if (round(random(1, 6)) == 1) {
            this.setRandomCharacter()
        }
        textSize(fntSize);
        textFont(fnt);
        text(char, x, y);
    }
}