var level = 0;
var userClickedPattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var randomChosenColour;
var gamepattern = [];
var counter = 1;
var userCounter = 0;

function addKeypress() {
    $(document).keypress(() => {
        $(document).ready(() => {
            generateSequence();
            setHeading();
        })
        $(document).unbind('keypress');
    })
}

addKeypress();
$('.btn').click(function () {
    var userChosenColour = $(this).attr('id');
    playSound(userChosenColour);
    animatePress(userChosenColour);
    userClickedPattern.push(userChosenColour);
    userCounter++;
    checker();
})

function nextSequence() {
    var randomNumber = Math.floor(Math.random() * 4);
    return randomNumber
}


function generateSequence() {
    var timer =1000;
    for (let i = 0; i < counter; i++) {
        setTimeout(() => {
            randomChosenColour = buttonColours[nextSequence()]; 
            $('#' + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
            playSound(randomChosenColour);
            gamepattern.push(randomChosenColour);
        }, timer);
        timer = timer + 500;
    }
}


function playSound(name) {
    var audio = new Audio('sounds/' + name + '.mp3');
    audio.play();
}

function animatePress(currentColor) {
    var pressedButton = $('#' + currentColor);
    pressedButton.addClass('pressed');
    setTimeout(() => {
        pressedButton.removeClass('pressed');
    }, 100)
}

function setHeading() {
    $('h1').text('Level ' + level);
    level++;
}


function checker() {
    for (let i = 0; i < userClickedPattern.length; i++) {
        if (userClickedPattern[i] != gamepattern[i]) {
            $('h1').text('You Lost,click any button to try again?')
            $('.btn').unbind('click');
            $(document).keypress(() => {
                window.location.reload();
                $(document).unbind('keypress');
            })
        }

    }
    if (userClickedPattern.length == counter) {
       
        resetGame()
    }
}

function resetGame(params) {
    setHeading();
    counter++;
    userClickedPattern = [];
    gamepattern = [];
    generateSequence();
}