/*****************************************************
                            jQuery-UI FRUIT NINJA
******************************************************/
var score;
var playing = false;
var fruits = ['apple', 'banana', 'cherries', 'grapes', 'mango', 'orange', 'peach', 'pear', 'watermelon'];
var trialsLeft;
var action; //var for set interval
var step;

$(function (){
    $("#startreset").click(function () {
        if (playing == true) {
            //I want to reset
            location.reload();
        } else {
            //I want to play
            playing = true;
            score = 0;
            $("#scorevalue").text = score;
            trialsLeft = 3;
            $("#trialsLeft").show();
            addHearts();
            $("#gameOver").hide();
            $("#startreset").text("Reset Game");
            //Start sending fruits
            startAction();
        }
    });

    function addHearts() {
        $("#trialsLeft").empty();
        for (i = 0; i < trialsLeft; i++) {
            $("#trialsLeft").append("<img src='IMAGES/heart.png' class='life'>")
        }
    }
    $("#fruit1").mouseover(function (){
        score++;
        $("#scorevalue").text(score);
        $("#slicesound")[0].play();
        stopAction();
        $("#fruit1").hide("explode",500);
        //Again start sending the fruits!!!
        setTimeout(startAction,600);
    });

    function startAction() {
        $("#fruit1").show();
        chooseFruit();
        $("#fruit1").css({
            'left': Math.round(Math.random() * 550),
            'top': -60,
        });
        step = 1 + Math.round(Math.random() * 5);
        action = setInterval(function () {
            $("#fruit1").css("top", $("#fruit1").position().top + step)
            if ($("#fruit1").position().top > $("#fruitsContainer").height()) {
                //check if we have trials left
                if (trialsLeft > 1) {
                    //generate a fruit again and reduce trials left
                    //THERE MAY BE A BUG!!!
                    chooseFruit();
                    $("#fruit1").css({
                        'left': Math.round(Math.random() * 550),
                        'top': -60,
                    });
                    step = 1 + Math.round(Math.random() * 5);
                    trialsLeft--;
                    addHearts();
                }else{
                    //Game over
                    playing = false;
                    $("#startreset").text("Start Game");
                    $("#gameOver").show();
                    $("#gameOver").html("<p>Game Over!</p><p>Your Score "+score+"</p>");
                    $("#trialsLeft").hide();
                    $("scorevalue").text("");  
                    stopAction();
                }
            }
        },10);
    }
    function chooseFruit(){
        $("#fruit1").attr("src",'IMAGES/'+fruits[Math.round(Math.random()*(fruits.length-1))]+'.png');
    }
    function stopAction(){
        clearInterval(action);
    }
});
