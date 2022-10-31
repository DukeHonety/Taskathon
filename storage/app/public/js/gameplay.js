let raceTimer;
let gameTimer;
let gamePlaying = false;
$(document).ready(function(){
    getProgress();
    raceTimer = setInterval(function() {
        let raceTime = new Date($('input#raceTime').val());
        const racingTime = parseInt($('input#race_time').val());
        let finishTime = new Date(raceTime.getTime() + racingTime * 3600 * 1000);

        var localDate = new Date();
        var year  = localDate.getUTCFullYear();
        var month = localDate.getUTCMonth();
        var date  = localDate.getUTCDate();
        var ptHours  = localDate.getUTCHours() - 7;
        var minutes = localDate.getUTCMinutes();
        var seconds = localDate.getUTCSeconds();
        var today = new Date(year, month, date, ptHours, minutes, seconds);
        
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
                let divInfo = playerTab.find('.info');
                // let lastPos = playerTab.find('li[position="' + (player.complete) + '"]').position();
                // playerTab.find("div.progress ol").css('width', "calc(" + player.complete*5+"%" );
                var taskCompletence = player.complete;
                var imagePos = player.complete < 1 ? 1 : player.complete

                divInfo.css('margin-left', "calc(" + (imagePos*5 - 2.5) + "% - 75px)");

                playerTab.find("span#name").html(player.name);
                // render progress bar
                var milestones = playerTab.find("li");
                playerTab.find('li').removeClass('is-complete');
                if(taskCompletence !== 0 || taskCompletence !== null) {
                    for(let index = 0; index < taskCompletence; index++) {
                        $(milestones[index]).addClass("is-complete");
                    }
                }
                if (player.complete == 20) {
                    playerTab.find("div.progress div").addClass('complete');
                }
                else
                    playerTab.find("div.progress div").removeClass('complete');
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
                    getProgress();
                }
                else{
                    currentTask.removeClass('active');
                    currentTask.find("i").addClass('fa-square');
                    currentTask.find("i").removeClass('fa-check-square');
                    numberComplete.html(parseInt(numberComplete.html())-1);
                    getProgress();
                }
                if(parseInt(numberComplete.html()) == 20){
                    toastr.success("Congratulation! You just finish all tasks");
                    $("#congratLabel").show();
                    confettiDisp();
                }
                else
                    $("#congratLabel").hide();

            }
        });
        
    });
    
    $('img.player-avatar').click(function() {
        var user_id = $(this).attr('uid');
        var visible = parseInt($(this).attr('visible'));
        const ajax_data = {
            _token: $('input[name="_token"]').val(),
            user_id: user_id
        }
        if(visible !== 0) {
            $.post('get_tasks_by_user', ajax_data, function(data) {
                if (data) {
                    if(data['player_info'][0].share_task != 0) {
                        $(".modal-body .contents-wrapper").empty();
                        const taskModal = $("#tasklistModal .modal-body .contents-wrapper");
                        
                        data['current_tasks'].forEach((item, key) => {
                            var taskStatus = item.status === 1 ? '&#9733;' : '&#9734;';
                            // const task = '<h4 class="task-on-modal" tid="'+item.id+'"><span class="line-num"> '+ lineNo +' </span>' + item.title + '<span class="task-status">' + taskStatus + '</span></h4>';
                            
                            const task =    '<div class="col-md-6 col-sm-6"><span  class="task-status">' + taskStatus + '</span>' +
                                            '<span  class="task-on-modal">' + item.title + '</span></div>';
                            taskModal.append($(task));
                        });
                        var modalTitle = data['player_info'][0].name + "'s tasks";
                        $("#tasklistModal .modal-header h3").html(modalTitle);
                    }
                }
                else 
                toastr.warning("Server says: 'You might be a scammer.'");
            });
            dataModal = $(this).attr("data-modal");
            $("#" + dataModal).css({"display":"block"});
            $("body").css({"overflow-y": "hidden"}); //Prevent double scrollbar.
            
            return;
        }
        toastr.warning("The player doesn't want to share tasks" );
    });
    $(".close-modal, .modal-sandbox").click(function(){
        $(".modal").css({"display":"none"});
        $("body").css({"overflow-y": "auto"}); //Prevent double scrollbar.
    });
    function confettiDisp() {
        const cssForCanvasOn = { "display": "block", "position": "fixed", "left": "0", "top": "0", "z-index": "1" };
        const cssForCanvasOff = { "display": "none", "position": "", "left": "", "top": "", "z-index": "" };

        $('canvas').css(cssForCanvasOn);
        setTimeout(function() { 
            $('canvas').css(cssForCanvasOff);
        }, 3000);
    }
});