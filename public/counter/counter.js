window.app = {};

window.app.counter = 0;

function padDigits(number, digits) {
    return Array(Math.max(digits - String(number).length + 1, 0)).join(0) + number;
}

function hhmmss(t) {
    var time = Math.floor(t);
    var milli = time % 1000;
    var s = Math.floor(time / 1000) % 60;
    var m = Math.floor(time / (1000 * 60)) % 60;
    var h = Math.floor(time / (1000 * 60 * 60));

    return (h + "h " + padDigits(m, 2) + "' " + padDigits(s, 2) + "\" " + padDigits(milli, 3));
}

function draw() {
    requestAnimationFrame(draw);
    if (window.app.counter > 0) {
        var now = window.performance.now();
        document.getElementById("time_start").innerHTML = hhmmss(now - window.app.time_start);
        document.getElementById("time_last").innerHTML = hhmmss(now - window.app.time_last);
    } else {
        document.getElementById("time_start").innerHTML = "";
        document.getElementById("time_last").innerHTML = "";
    }
    document.getElementById("counter").innerHTML = window.app.counter;
}

function counterInc() {
    var now = window.performance.now();
    if (window.app.counter === 0) {
        window.app.time_start = now;
    }
    window.app.time_last = now;
    window.app.counter++;
};

function counterDec() {
    if (window.app.counter > 0) {
        var now = window.performance.now();
        window.app.counter--;
        window.app.time_last = now;
    }
}

function counterReset() {
    window.app.counter = 0;
}

function startApp() {
    document.addEventListener("click", function () {
        counterInc();
    });
    document.addEventListener("keydown", function (e) {
        var k = e.keyCode;
        if (k === 38 || k === 32 || k === 13) {
            counterInc();
        } else if (k === 40) {
            counterDec();
        } else if (k === 82 || k === 17) {
            counterReset();
        }
    });
    draw();
}

document.addEventListener("DOMContentLoaded", function(){
    startApp();
});
