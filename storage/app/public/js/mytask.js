let raceTimer;
$(document).ready(function(){
    $("button#taskadd").click(function(){
        const tasklimit = $("input#taskcount").val();
        if (parseInt(tasklimit) >= 20 && $("input#taskId").val() == '') {
            
            toastr.info("You already have 20 tasks. To add more, edit your tasks below");
            return false;
        }
        return true;
    });
    $(".task_tab .item").click(function(){
        const targetId = $(this).attr("taskId");
        $("input#taskId").val(targetId);
        $("button#taskadd").html("Update");
        $("input#task").val($(this).html());
    });
    raceTimer = setInterval(function() {
        const raceTime = new Date($('input#raceTime').val());
        var today = new Date();
        var betwenTime = new Date(raceTime.getTime() - today.getTime());
        // console.log(raceTime, today, timeString);
        $("#countTime").html(getTimeStr(betwenTime));
    }, 1000);
});
