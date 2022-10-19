let raceTimer;
let gameTimer;
let gamePlaying = true;
$(document).ready(function(){
    
    raceTimer = setInterval(function() {
        let raceTime = new Date($('input#raceTime').val());
        const racingTime = parseInt($('input#race_time').val());
        let finishTime = new Date(raceTime.getTime() + racingTime * 3600 * 1000);

        var today = new Date();
        let betweenStarTime = raceTime.getTime() - today.getTime();
        let betweenFinishTime = finishTime.getTime() - today.getTime();
        if (betweenStarTime > 0){
            $("#timeLabel").html("Race starts in");
            $("#countTime").html(getTimeStr(new Date(betweenStarTime)));
            gamePlaying = false;
        }
        else if (betweenFinishTime > 0){
            $("#timeLabel").html("Time remaining");
            $("#countTime").html(getTimeStr(new Date(betweenFinishTime)));
            gamePlaying = true;
        }else{
            $("#countTime").parent().html("The race is finished.");
            toastr.warning("The race is finished");
            gamePlaying = false;
            clearTimeout(raceTimer);
        }
    }, 1000);

    gameTimer = setInterval(getProgress, 5000);

    function getProgress(){
        if (!gamePlaying)
            clearTimeout(gameTimer);
        $.get('gamestatus', function(data){
            data.forEach((player) => {
                let playerTab = $("div.playerprogress[playerId='"+player.id+"']");
                playerTab.find("div.info").css("margin-left", "calc(" + player.complete*5+"% - 50px)")
                playerTab.find("span#name").html(player.name);
                playerTab.find("div.progress div").css('width', "calc(" + player.complete*5+"%" );
                playerTab.find("div.progress div").attr('aria-valuenow', player.complete*5);
            });
        });
    }
    
    $(".taskItem").click(function(){
        if (!gamePlaying) {
            toastr.warning("You can check out tasks when the race is playing");
            return;
        }
        const taskItem = $(this);
        const tastId = taskItem.attr("taskid");
        let completedTask = parseInt($("span#completed").html());
        let status = $(this).hasClass('active') ? 0 : 1;
        const ajax_data = {
            _token: $('input[name="_token"]').val(),
            taskId: tastId,
            status: status
        }

        $.post('/updatetask', ajax_data, function(result){
            if(parseInt(result) > 0){
                const currentTask = $(".taskItem[taskid='"+result+"']");
                const numberComplete = $("span#numberComplete");
                if (status == 1){
                    currentTask.addClass('active');
                    currentTask.find("i").addClass('fa-check-square');
                    currentTask.find("i").removeClass('fa-square');
                    numberComplete.html(parseInt(numberComplete.html())+1);
                }
                else{
                    currentTask.removeClass('active');
                    currentTask.find("i").addClass('fa-square');
                    currentTask.find("i").removeClass('fa-check-square');
                    numberComplete.html(parseInt(numberComplete.html())-1);
                }
                getProgress();
                if(parseInt(numberComplete.html()) == 20){
                    toastr.success("Congratulation! You just finish all tasks");
                    $("#congratLabel").show();
                }
                else
                    $("#congratLabel").hide();

            }
        });
    });
});