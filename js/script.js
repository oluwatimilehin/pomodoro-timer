/**
 * These are the global variables which are accessed by both objects.
 */
var audio = document.getElementById('alarm');
var interval;

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
        this.currentMinutes = 5;
        this.currentSeconds = 0;
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
    workButton: document.getElementById('work'),
    plusButton: document.getElementById('plus'),
    minusButton: document.getElementById('minus'),
    breakButton: document.getElementById('break'),
    resetButton: document.getElementById('reset'),
    startButton: document.getElementById('start'),
    workMode: function () {
        audio.pause();
        controls.setToWorkMode();
    },
    increaseTime: function () {
        audio.pause();
        controls.increaseTime();
    },
    decreaseTime: function () {
        audio.pause();
        controls.decreaseTime();
    },
    breakMode: function () {
        audio.pause();
        controls.setToBreakMode();
    },
    resetTimer: function () {
        audio.pause();
        controls.resetTimer();
    },
    setUpEventListeners: function () {
        this.workButton.addEventListener('click', this.workMode);
        this.plusButton.addEventListener('click', this.increaseTime);
        this.minusButton.addEventListener('click', this.decreaseTime);
        this.breakButton.addEventListener('click', this.breakMode);
        this.resetButton.addEventListener('click', this.resetTimer);
        var that = this;
        var startTimer = function () {
            controls.startTimer();
            that.workButton.removeEventListener('click', that.workMode);
            that.plusButton.removeEventListener('click', that.increaseTime);
            that.minusButton.removeEventListener('click', that.decreaseTime);
            that.startButton.removeEventListener('click', startTimer);
            that.breakButton.removeEventListener('click', that.breakMode);
        };
        this.startButton.addEventListener('click', startTimer);
    },
    addRemovedListeners: function () {
        this.workButton.addEventListener('click', this.workMode);
        this.breakButton.addEventListener('click', this.breakMode);
        this.plusButton.addEventListener('click', this.increaseTime);
        this.minusButton.addEventListener('click', this.decreaseTime);
    }
};
view.setUpEventListeners();