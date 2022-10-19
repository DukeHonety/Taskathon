let raceTimer;
let gameTimer;
$(document).ready(function(){
    $(".taskItem").click(function(){
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
            if(parseInt(result)>0){
                console.log(result);
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
    raceTimer = setInterval(function() {
        const raceTime = new Date($('input#raceTime').val());
        var today = new Date();
        var betwenTime = new Date(raceTime.getTime() - today.getTime());
        $("#countTime").html(getTimeStr(betwenTime));
    }, 1000);

    gameTimer = setInterval(getProgress, 5000);

    function getProgress(){
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
});