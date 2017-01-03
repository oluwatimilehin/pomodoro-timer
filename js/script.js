/**
 * These are the global variables which are accessed by both objects.
 */
var audio = document.getElementById('alarm');
var interval;
var workButton = document.getElementById('work');
var workMode = function () {
    audio.pause();
    controls.setToWorkMode();
    plusButton.addEventListener('click', increaseTime);
    minusButton.addEventListener('click', decreaseTime);
};
var plusButton = document.getElementById('plus');
var increaseTime = function () {
    audio.pause();
    controls.increaseTime();
};
var minusButton = document.getElementById('minus');
var decreaseTime = function () {
    audio.pause();
    controls.decreaseTime();
};
var breakButton = document.getElementById('break');
var breakMode = function () {
    audio.pause();
    controls.setToBreakMode();
    plusButton.removeEventListener('click', increaseTime);
    minusButton.removeEventListener('click', decreaseTime);
};
var resetButton = document.getElementById('reset');
var resetTimer = function () {
    audio.pause();
    controls.resetTimer();
};
var startButton = document.getElementById('start');
var startTimer = function () {
    controls.startTimer();
    workButton.removeEventListener('click', workMode);
    breakButton.removeEventListener('click', breakMode);
    plusButton.removeEventListener('click', increaseTime);
    minusButton.removeEventListener('click', decreaseTime);
    startButton.removeEventListener('click', startTimer);
};


/**
 * This is the object which controls the state of the timer.
 */
var controls = {
    modeSetting: document.getElementById('mode'),
    minutes: document.getElementById('minutes'),
    seconds: document.getElementById('seconds'),
    currentMinutes: parseInt(this.minutes.textContent),
    currentSeconds: parseInt(this.seconds.textContent),
    setToWorkMode: function () {
        this.minutes.textContent = "25";
        this.currentMinutes = 25;
        this.seconds.textContent = "00";
        this.currentSeconds = 0;
        this.modeSetting.textContent = "Work";
    },
    setToBreakMode: function () {
        this.minutes.textContent = "05";
        this.seconds.textContent = "00";
        this.modeSetting.textContent = "Break";
    },
    increaseTime: function () {
        this.currentSeconds += 30;
        if (this.currentSeconds === 30) {
            this.seconds.textContent = this.currentSeconds;
        }
        else {
            this.seconds.textContent = "00";
            this.currentMinutes++; //The current minute increases by 1 for everytime we have 60 seconds.
            this.minutes.textContent = this.currentMinutes;
            if (this.minutes.textContent < 10) {
                this.minutes.textContent = "0" + this.minutes.textContent; //Ensure that double digits are always displayed.
                //    this.seconds.textContent;
            }
            this.currentSeconds = 0;
        }
    },
    decreaseTime: function () {
        this.currentSeconds -= 30;
        if (this.seconds.textContent === "00" && this.minutes.textContent === "00") {
            return;
        }
        if (this.currentSeconds === 0) {
            this.seconds.textContent = "00";
        }
        else {
            this.seconds.textContent = "30";
            this.currentSeconds = 30;
            this.currentMinutes--;
            this.minutes.textContent = this.currentMinutes;
            if (this.minutes.textContent < 10) {
                this.minutes.textContent = "0" + this.minutes.textContent;
            }
        }
    },
    startTimer: function () {
        controls.startTimer = 0;
        interval = setInterval(reduceSeconds, 1000);
        function reduceSeconds() {
            if (this.seconds.textContent === "00" && (this.minutes.textContent === "0" || this.minutes.textContent === "00")) {
                this.currentSeconds = 0;
                this.currentMinutes = 0;
                clearInterval(interval);
                view.addRemovedListeners();
                audio.play();
                return;
            }
            else {
                if (this.seconds.textContent === "00") {
                    this.currentSeconds = 60;
                    this.currentSeconds--;
                    if (this.minutes.textContent <= 10) {
                        this.minutes.textContent--;
                        this.minutes.textContent = "0" + this.minutes.textContent;
                    }
                    else {
                        this.minutes.textContent--;
                    }
                    this.seconds.textContent = this.currentSeconds;
                }
                else {
                    this.seconds.textContent--;
                    if (this.seconds.textContent === 0) {
                        this.seconds.textContent = "00";
                    }
                    else {
                        if (this.seconds.textContent < 10) {
                            this.seconds.textContent = "0" + this.seconds.textContent;
                        }
                    }
                }
            }
        }
    },
    resetTimer: function () {
        this.setToWorkMode();
        clearInterval(interval);
        view.addRemovedListeners();
    }
};
var view = {
    setUpEventListeners: function () {
        workButton.addEventListener('click', workMode);
        plusButton.addEventListener('click', increaseTime);
        minusButton.addEventListener('click', decreaseTime);
        breakButton.addEventListener('click', breakMode);
        startButton.addEventListener('click', startTimer);
        resetButton.addEventListener('click', resetTimer);
    },
    addRemovedListeners: function () {
        workButton.addEventListener('click', workMode);
        breakButton.addEventListener('click', breakMode);
        plusButton.addEventListener('click', increaseTime);
        minusButton.addEventListener('click', decreaseTime);
    }
};
view.setUpEventListeners();