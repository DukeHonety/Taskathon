let raceTimer;
$(document).ready(function(){
    $("button#taskadd").click(function(){
        const tasklimit = $("span#numberTasks").html();
        if (parseInt(tasklimit) >= 20 && $("input#taskId").val() == '') {
            toastr.info("You already have 20 tasks. To add more, edit your tasks below");
            return;
        }
        const newtask = $("input#task").val();
        const taskId = $("input#taskId").val();
        if(newtask == ''){
            toastr.warning("Input task");
            return;
        }
        const ajax_data = {
            _token: $('input[name="_token"]').val(),
            taskId: taskId,
            task: newtask
        };
        $.post("mytask", ajax_data, function(data) {
            if (!data){
                toastr.warning(data.message);
                return;
            }
            if (parseInt(taskId) > 0){
                toastr.success("You just update a task!");
                $("div[taskid='"+data['id']+"']").html(data['title']);
            }
            else {
                toastr.success("You just create a task!");
                $("div.task_tab").append('<div class="col-md-5 item btn btn-light" taskid="' + data['id'] + '">' + data['title'] + '</div>');
                $("span#numberTasks").html(parseInt($("span#numberTasks").html())+1);
            }
            $("input#taskId").val('');
            $("input#task").val('');
            $("button#taskadd").html("Add");
        });
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
