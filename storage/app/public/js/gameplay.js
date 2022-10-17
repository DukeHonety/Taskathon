let raceTimer;
$(document).ready(function(){
    $(".taskItem button").click(function(){
        const taskItem = $(this).parent();
        const tastId = taskItem.attr("taskid");
        let completedTask = parseInt($("span#completed").html());
        let status = 0;
        if (taskItem.hasClass('active')) {
            if (!confirm('Would you remove completion of this task?'))
                return;
            taskItem.removeClass('active');
            $(this).html('<i class="fa fa-check"></i>');
            status = 0;
            completedTask--;
        }
        else {
            if (!confirm('Would you like to complete this task?'))
                return;
            taskItem.addClass('active');
            $(this).html('<i class="fa fa-times"></i>');
            status = 1;
            completedTask++;
        }
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