let raceTimer;
$(document).ready(function(){
    if (parseInt($("span#numberTasks").html()) <= 0)
        $("span#numberTasks").parent().html("Your Tasks");
    $("button#taskadd").click(function(){
        const tasklimit = $("span#numberTasks").html();
        if (isNaN(tasklimit) && $("input#taskId").val() == '') {
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
        // check if new task is duplicated
        let duplicated = false;
        $("div.task_tab .item").each(function(){
            if ($(this).html() == newtask){
                duplicated = true;
            }
        });
        console.log(duplicated);
        if (duplicated){
            toastr.warning("Same task is already existed");
            return;
        }
        // update data
        $.post("mytask", ajax_data, function(data) {
            if (!data){
                toastr.warning(data.message);
                return;
            }
            const newFlag = $("div[taskid='"+data['id']+"']").html() == undefined;
            if (newFlag){
                toastr.success("You just create a task!");
                const newElement = $('<div class="col-md-5 item btn btn-light text-capitalize" taskid="' + data['id'] + '">' + data['title'] + '</div>');
                newElement.bind("click", function(){
                    const targetId = $(this).attr("taskId");
                    $("input#taskId").val(targetId);
                    $("button#taskadd").html("Update");
                    $("input#task").val($(this).html());
                });
                $("div.task_tab").append(newElement);
                $("span#numberTasks").html(parseInt($("span#numberTasks").html())-1);
                if (parseInt($("span#numberTasks").html()) <= 0)
                    $("span#numberTasks").parent().html("Your Tasks");
            }
            else {
                toastr.success("You just update a task!");
                $("div[taskid='"+data['id']+"']").html(data['title']);
            }
            if (isNaN($("span#numberTasks").html())){
                $("#inputLabel").addClass('hidden');
                $("#goRaceLabel").removeClass('hidden');
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
        const betweenTime = raceTime.getTime() - today.getTime();
        if (betweenTime > 0)
            $("#countTime").html(getTimeStr(new Date(betweenTime)));
        else{
            $("#countTime").parent().html("The race is already started.");
            clearTimeout(raceTimer);
        }
    }, 1000);
});
