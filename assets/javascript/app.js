$("#start").on("click", function() {
    $("#start").remove();
    rungame.countdown();
    rungame.loadQuestion();
})

// Find how to scroll through page since answer button is after page changes
$(document).on("click", ".answer-button", function(e) {
    rungame.clicked(e);
});

$(document).on("click", "#reset", function() {
    rungame.reset();
});

// An array of questions for the trivia game: ques=question, answers, ca=correctanswer, & image
  var questions = [
    { ques: "What percentage of the earth does the ocean cover?", 
        answers: ["~60%", "~85%", "~50%", "~70%"],
        ca:"~70%",
        image: "assets/images/earthsurface.gif",
    },
    { ques: "How does water move around the world?", 
        answers: ["gravity", "wind", "gravity & wind", "gravity, wind, ice"],
        ca: "gravity & wind",
        image: "assets/images/gravity.gif",
    },
    { ques: "What type of water is more dense?", 
        answers: ["thermal, hot water", "polar, cold water", "ocean water", "thermal flow"],
        ca: "polar, cold water",
        image: "assets/images/polar.gif",
    },
    { ques: "What are the main categories of sea life?", 
        answers: ["swimmers, floaters, and plankton", "floaters, plankton, and fish", "mammals, fish, and micromaterials", "swimmers, floaters, and creatures on the sea floor"],
        ca: "swimmers, floaters, and creatures on the sea floor",
        image: "assets/images/creatures.gif",
    },
    { ques: "What is an example of microscopic seaweed", 
        answers: ["phytoplankton", "algae", "sea vegetables", "kelp"],
        ca: "phytoplankton",
        image: "assets/images/seaweed.gif",
    }];

    // In the game, need to run it so that the questions are loaded, know what # we're on, log # of in/correct responses, set counter to 30

    var rungame = {
        questions: questions,
        onQuestion: 0,
        counter: 30,
        correctResponse: 0,
        incorrectResponse: 0,  
        unansweredQs: 0,
        
        // Countdown for the timers, counting down 1sec from starting 30seconds, times up at 0sec
        countdown: function() {
            rungame.counter--;
            $("#counter").html(rungame.counter);
            if(rungame.counter<=0){
                console.log("Time is up!");
                rungame.timeUp();
            }
        },

        // Need to display the question and multiple answers onto the page
        loadQuestion: function() {
            timer = setInterval(rungame.countdown,1000);
            $(".container2").html("<p id='counter'>" + rungame.counter + "</p>");
            $(".container2").append("<h2>" + questions[rungame.onQuestion].ques+ "</h2>");
            for (var i = 0; i < questions[rungame.onQuestion].answers.length; i++) {
                $(".container2").append('<button class="answer-button" id="button'+i+'" data-name="'+questions[rungame.onQuestion].answers[i]+'">' + questions[rungame.onQuestion].answers[i]+'</button>');
            }
        },

        nextQuestion: function() {
            rungame.counter = 30;
            $("#counter").html(rungame.counter); 
            rungame.onQuestion++;
            rungame.loadQuestion();
        },

        timeUp: function() {
            clearInterval(timer);
            rungame.unansweredQs++;
            $(".container2").html("<h2>Time's up!");
            $(".container2").append("<p id='right-answer'>Right answer = " + questions[rungame.onQuestion].ca+ "</p>");
            var images = $("<img>");
            images.attr("src", questions[rungame.onQuestion].image);
            images.attr("class", "image");
            $(".container2").append(images);
            if (rungame.onQuestion==questions.length-1){
                setTimeout(rungame.results,3*1000);
            } else {
                setTimeout(rungame.nextQuestion,3*1000);
            }
        },
        
        results: function() {
            clearInterval(timer);
            $(".container2").html("<p id='finish'> You finished! </h2>");
            $(".container2").append("<h4 class='results'> Correct: " + rungame.correctResponse + "</h4>");
            $(".container2").append("<h4 class='results'> Incorrect: " + rungame.incorrectResponse + "</h4>");
            $(".container2").append("<h4 class='results'> Unanswered Questions: " + rungame.unansweredQs + "</h4>");
            $(".container2").append("<button id='reset'>Reset Game</button>");
        },

        clicked: function(e) {
            clearInterval(timer);
            if($(e.target).data("name")==questions[rungame.onQuestion].ca){
                rungame.answeredCorrect();
            } else {
                rungame.answeredIncorrect();
            }
        },
        answeredCorrect: function() {
            console.log("Yay!");
            clearInterval(timer);
            rungame.correctResponse++;
            $(".container2").html("<p id='correct'>Correct!<p>");
            $(".container2").append("<p id='right-answer'>Right answer = " + questions[rungame.onQuestion].ca+ "</p>");
            var images = $("<img>");
            images.attr("src", questions[rungame.onQuestion].image);
            images.attr("class", "image");
            $(".container2").append(images);
            if (rungame.onQuestion==questions.length-1){
                setTimeout(rungame.results,3*1000);
            } else {
                setTimeout(rungame.nextQuestion,3*1000);
            }
        },
        answeredIncorrect: function() {
            console.log("Nope...");
            clearInterval(timer);
            rungame.incorrectResponse++;
            $(".container2").html("<p id='wrong'>Wrong answer...<p>");
            $(".container2").append("<p id='right-answer'>Right answer = " + questions[rungame.onQuestion].ca+ "</p>");
            var images = $("<img>");
            images.attr("src", questions[rungame.onQuestion].image);
            images.attr("class", "image");
            $(".container2").append(images);
            if (rungame.onQuestion==questions.length-1){
                setTimeout(rungame.results,3*1000);
            } else {
                setTimeout(rungame.nextQuestion,3*1000);
            }
        },
        reset: function() {
            rungame.onQuestion = 0;
            rungame.counter = 0;
            rungame.correctrResponse = 0;
            rungame.incorrectResponse = 0;
            rungame.unansweredQs = 0;
            rungame.loadQuestion();
        }
    }