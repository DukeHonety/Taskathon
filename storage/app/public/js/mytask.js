let raceTimer;
$(document).ready(function(){
    $("input#isSharingTask").prop( "checked", $("input#isSharingTask").attr('status') == 1 ? true : false );
    
    $("input#isSharingTask").click( function(){
        let is_share = parseInt($("input#isSharingTask").attr('status'));
        is_share = is_share === 1 ? 0 : 1;
        $(this).attr('status', is_share);

        const ajax_data = {
            _token: $('input[name="_token"]').val(),
            player_id: $(this).attr("pid"),
            is_sharing: is_share,
        }

        if( $(this).is(':checked') ) {
            $.post('update_share_task', ajax_data, function(data){
                if(data)
                    toastr.success("Your tasks are sharing to everybody!");
                else
                    toastr.warning("Something wrong with server");
            });
            return;
        }
        $.post('update_share_task', ajax_data, function(data){
            if(data)
                toastr.success("The others can't see your tasks");
            else
                toastr.warning("Something wrong with server");
        });
     });

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
                toastr.success("You just created a task!");
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
                $("#confirmIsSharing").removeClass('hidden');
            }
            $("input#taskId").val('');
            $("input#task").val('');
            $("button#taskadd").html("Add");
        });
    });
    raceTimer = setInterval(function() {
        const raceTime = new Date($('input#raceTime').val());
        
        var localDate = new Date();
        var year  = localDate.getUTCFullYear();
        var month = localDate.getUTCMonth();
        var date  = localDate.getUTCDate();
        var ptHours  = localDate.getUTCHours() - 7;
        var minutes = localDate.getUTCMinutes();
        var seconds = localDate.getUTCSeconds();
        var today = new Date(year, month, date, ptHours, minutes, seconds);

        const betweenTime = raceTime.getTime() - today.getTime();
        if (betweenTime > 0)
            $("#countTime").html(getTimeStr(new Date(betweenTime)));
        else{
            $("#countTime").parent().html("The race is already started.");
            clearTimeout(raceTimer);
        }
    }, 1000);

    //-- Handling Modal Code
    var choosenTask = '';
    $('div.modal-trigger').click(function() {
        //-- Modal displaying...
        const dataModal = $(this).attr("data-modal");
        const taskId = $(this).attr('taskId');
        $("#" + dataModal).css({"display":"block"});
        $("body").css({"overflow-y": "hidden"}); //Prevent double scrollbar.
        //-- Render modal content..
        const currentVal = $(this).html();
        const taskInputTag = '<input id="modal-input" class="form-control" maxlength="128" task-id="'+ taskId +'" value="'+ currentVal +'"  autofocus/>';
        const editorModal = $("#taskEditorModal .modal-body .contents-wrapper");
        editorModal.append($(taskInputTag));
        //-- Reserve choosen task item
        choosenTask = $(this);                      
    });
    $('#modal-submit').click(function() {
        var newVal = $('#modal-input').val();
        const taskId = $('#modal-input').attr('task-id');
        const ajax_data = {
            _token: $('input[name="_token"]').val(),
            t_id: taskId,
            t_title: newVal
        };
        if(newVal !== '') {
            console.log(ajax_data);
            $.post('update_task_title', ajax_data, function(data){
                if(data)
                    toastr.success("Success!");
                else
                    toastr.warning("Something wrong with server");
            });

            choosenTask.html(newVal);
            return;
        }
        toastr.warning('Task name is required');
    });
    $(".close-modal, .modal-sandbox").click(function(){
        $(".modal").css({"display":"none"});
        $(".modal-body .task-list").empty();
        $("body").css({"overflow-y": "auto"}); //Prevent double scrollbar.
        $("#taskEditorModal .modal-body .contents-wrapper").empty();
    });
});
