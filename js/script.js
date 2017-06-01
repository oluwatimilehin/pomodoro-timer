/**
 * These are the global variables which are accessed by both objects.
 */
var audio = document.getElementById('alarm');
var interval;
var startTimer;

/**
 * This is the object which controls the state of the timer.
 */
var controls = {
    modeSetting: document.getElementById('mode'),
    minutes: document.getElementById('minutes'),
    seconds: document.getElementById('seconds'),
    currentMinutes: parseInt(this.minutes.textContent),
    currentSeconds: parseInt(this.seconds.textContent),
    /**
     *  Set timer to 25 minutes
     */
    setToWorkMode: function () {
        this.minutes.textContent = "25";
        this.currentMinutes = 25;
        this.seconds.textContent = "00";
        this.currentSeconds = 0;
        this.modeSetting.textContent = "Work";
    },
    /**
     * Set timer to 5 minutes
     */
    setToBreakMode: function () {
        this.minutes.textContent = "05";
        this.seconds.textContent = "00";
        this.currentMinutes = 5;
        this.currentSeconds = 0;
        this.modeSetting.textContent = "Break";
    },
    increaseTime: function () {
        /**
         * Increase the current time by 30 seconds
         */
        this.currentSeconds += 30;
        /**
         * Set maximum time allowed to 99 minutes
         */
        if (this.minutes.textContent === "99" && this.seconds.textContent === "00") {
            return;
        }
        if (this.currentSeconds === 30) {
            this.seconds.textContent = this.currentSeconds;
        }
        else {
            this.currentSeconds = 0;
            this.seconds.textContent = "00";
            this.currentMinutes++; //The current minute increases by 1 for everytime we have 60 seconds.
            this.minutes.textContent = this.currentMinutes;
            if (this.minutes.textContent < 10) {
                this.minutes.textContent = "0" + this.minutes.textContent; //Ensure that double digits are always displayed.
            }
        }
    },
    decreaseTime: function () {
        this.currentSeconds -= 30;
        /**
         * Ensure that time does not go to negative values
         */
        if (this.seconds.textContent === "00" && this.minutes.textContent === "00") {
            this.currentMinutes = 0;
            this.currentSeconds = 0;
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
        var that = this;//This is declared so that the inner function can access the current object
        function reduceSeconds() {
            /**
             * When the timer shows 00:00, clear the interval and reset the timer.
             */
            if (that.seconds.textContent === "00" && that.minutes.textContent === "00") {
                clearInterval(interval);
                view.addRemovedListeners();
                that.currentSeconds = 0;
                that.currentMinutes = 0;
                audio.play();
                return;
            }
            else {
                if (this.seconds.textContent === "00") {
                    this.currentSeconds = 60;
                    this.currentSeconds--;
                    /**
                    * This block ensures that the minute section shows double digits when below 10.
                    */
                    if (this.minutes.textContent <= 10) {
                        this.minutes.textContent--;
                        this.minutes.textContent = "0" + this.minutes.textContent;
                    }
                    else {
                        this.minutes.textContent--;
                    }
                    this.seconds.textContent = this.currentSeconds;
                }
                /**
                 * Block for anytime that the timer is not on 60 seconds
                 */
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
/**
 * Object which controls the page elements
 */
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
        var that = this; //Done so that the inner function has access to this object
        startTimer = function () {
            controls.startTimer();
            /**
             * When the timer starts, remove the event listeners
             */
            that.workButton.removeEventListener('click', that.workMode);
            that.plusButton.removeEventListener('click', that.increaseTime);
            that.minusButton.removeEventListener('click', that.decreaseTime);
            that.breakButton.removeEventListener('click', that.breakMode);
            that.startButton.removeEventListener('click', startTimer);
        };
        this.startButton.addEventListener('click', startTimer);
    },
    /**
     * When the timer stops or is reset, return the removed event listeners
     */
    addRemovedListeners: function () {
        this.workButton.addEventListener('click', this.workMode);
        this.breakButton.addEventListener('click', this.breakMode);
        this.plusButton.addEventListener('click', this.decreaseTime);
        this.startButton.addEventListener('click', startTimer);
    }
};
view.setUpEventListeners();