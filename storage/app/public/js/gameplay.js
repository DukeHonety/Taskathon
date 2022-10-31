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
                let divInfo = $(playerTab).children('.info');
                
                let lastPos = playerTab.find('li[position="' + (player.complete) + '"]').position();
                divInfo.css('position','absolute');
                divInfo.css('left', lastPos.left + 7);

                playerTab.find("span#name").html(player.name);
                // render progress bar
                var taskCompletence = player.complete;
                console.log('taskCompletence:', taskCompletence);
                var milestones = playerTab.find("li");
                if(taskCompletence !== 0 || taskCompletence !== null) {
                    for(let index = 0; index < taskCompletence; index++) {
                        $(milestones[index]).addClass("is-complete");
                    }
                    for(let milestones; milestones < taskCompletence; milestones--) {
                        $(milestones[index]).removeClass("is-complete");
                    }
                }
                // playerTab.find("div.progress div").css('width', "calc(" + player.complete*5+"%" );
                // playerTab.find("div.progress div").attr('aria-valuenow', player.complete*5);
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
                getProgress();
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
                        const taskModal = $("#tasklistModal .modal-body .task-list");
                        
                        data['current_tasks'].forEach((item, key) => {
                            var lineNo = key + 1;
                            var taskStatus = item.status === 1 ? 'done' : 'in progress';
                            // const task = '<h4 class="task-on-modal" tid="'+item.id+'"><span class="line-num"> '+ lineNo +' </span>' + item.title + '<span class="task-status">' + taskStatus + '</span></h4>';
                            const task =    '<tr>' + 
                                                '<td class="line-num"" tid="'+item.id+'">' + lineNo + '</td>' + 
                                                '<td  class="task-on-modal">' + item.title + '</td>' +
                                                '<td  class="task-status">' + taskStatus +
                                            '</tr>'
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
        $(".modal-body .task-list").empty();
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
    function renderProgressBar() {
        
    }
});