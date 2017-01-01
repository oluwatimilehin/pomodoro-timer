var audio = document.getElementById('alarm');
var interval;
var controls = {
    modeSetting: document.getElementById('mode'),
    minutes: document.getElementById('minutes'),
    seconds: document.getElementById('seconds'),
    currentMinutes: parseInt(this.minutes.textContent),
    currentSeconds: parseInt(this.seconds.textContent),
    setToWorkMode: function () {
        this.minutes.textContent = "25";
        this.seconds.textContent = "00";
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
            this.currentMinutes++;
            this.minutes.textContent = this.currentMinutes;
            if (this.minutes.textContent < 10) {
                this.minutes.textContent = "0" + this.minutes.textContent;
            }
            this.currentSeconds = 0;
        }
    },
    decreaseTime: function () {
        this.currentSeconds -= 30;
        if (this.seconds.textContent === "00" && (this.minutes.textContent === "0" || this.minutes.textContent === "00")) {
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
                clearInterval(interval);
                audio.play();
                view.setUpEventListeners();
            }
            else {
                if (this.seconds.textContent === "00") {
                    this.currentSeconds = 60;
                    this.currentSeconds--;
                    if (this.minutes.textContent <= 10) {
                        this.minutes.textContent--;
                        this.seconds.textContent;
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
        view.setUpEventListeners();
    }
}
var view = {
    setUpEventListeners: function () {
        var workButton = document.getElementById('work');
        var workMode = function () {
            audio.pause();
            controls.setToWorkMode();
            plusButton.addEventListener('click', increaseTime);
            minusButton.addEventListener('click', decreaseTime);
        };
        workButton.addEventListener('click', workMode);
        var plusButton = document.getElementById('plus');
        var increaseTime = function () {
            audio.pause();
            controls.increaseTime();
        };
        plusButton.addEventListener('click', increaseTime);

        var minusButton = document.getElementById('minus');
        var decreaseTime = function () {
            audio.pause();
            controls.decreaseTime();
        };
        minusButton.addEventListener('click', decreaseTime);

        var breakButton = document.getElementById('break');
        var breakMode = function () {
            audio.pause();
            controls.setToBreakMode();
            plusButton.removeEventListener('click', increaseTime);
            minusButton.removeEventListener('click', decreaseTime);
        };
        breakButton.addEventListener('click', breakMode);

        var startButton = document.getElementById('start');
        var clicked = 0;
        var startTimer = function () {
            controls.startTimer();
            clicked++;
            workButton.removeEventListener('click', workMode);
            breakButton.removeEventListener('click', breakMode);
            plusButton.removeEventListener('click', increaseTime);
            minusButton.removeEventListener('click', decreaseTime);
            startButton.removeEventListener('click', startTimer);
        };
        startButton.addEventListener('click', startTimer);
        var resetButton = document.getElementById('reset');
        resetButton.addEventListener('click', function () {
            audio.pause();
            controls.resetTimer();
        });
    }
};
view.setUpEventListeners();