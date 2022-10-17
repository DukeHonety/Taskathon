let raceTimer;
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
            $("span#completed").html(completedTask);
            window.location.reload();
        });
    });
    raceTimer = setInterval(function() {
        const raceTime = new Date($('input#raceTime').val());
        var today = new Date();
        var betwenTime = new Date(raceTime.getTime() - today.getTime());
        $("#countTime").html(getTimeStr(betwenTime));
    }, 1000);
});