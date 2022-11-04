let raceTimer;
var isShare = 1;
$(document).ready(function(){

    // $("input#isSharingTask").prop( "checked", $("input#isSharingTask").attr('status') == 1 ? true : false );
    // Task sharing option checking function. 
    // $("input#isSharingTask").click( function(){
    //     let is_share = parseInt($("input#isSharingTask").attr('status'));
    //     is_share = is_share === 1 ? 0 : 1;
    //     $(this).attr('status', is_share);

    //     const ajax_data = {
    //         _token: $('input[name="_token"]').val(),
    //         player_id: $(this).attr("pid"),
    //         is_sharing: is_share,
    //     }

    //     if($(this).is(':checked')) {
    //         $.post('update_share_task', ajax_data, function(data){
    //             if(data)
    //                 toastr.success("Your tasks are sharing to everybody!");
    //             else
    //                 toastr.warning("Something wrong with server");
    //         });
    //         return;
    //     }
    //     $.post('update_share_task', ajax_data, function(data){
    //         if(data)
    //             toastr.success("The others can't see your tasks");
    //         else
    //             toastr.warning("Something wrong with server");
    //     });
    //  });

    if (parseInt($("span#numberTasks").html()) <= 0)
        $("span#numberTasks").parent().html("Your Tasks");
    // In case "Enter" key press function
    $(document).on('keypress',function(e) {
        if(e.which == 13) {
            $( "button#taskadd" ).trigger( "click" );
        }
    });
    // In case "Add" button click function
    $("button#taskadd").click(function(){
        if (updating) return;
        const tasklimit = $("span#numberTasks").html();
        if (isNaN(tasklimit)) {
            toastr.info("You already have 20 tasks. To add more, edit your tasks below");
            return;
        }
        const newtask = $("input#task").val();
        if(newtask === ''){
            toastr.warning("Please fill the input");
            return;
        }
        const ajax_data = {
            _token: $('input[name="_token"]').val(),
            taskId: '',
            task: newtask,
            is_share: isShare
        };
        // check if new task is duplicated
        let duplicated = false;
        $("div.task_tab .item").each(function(){
            if ($(this).html().toLowerCase() === newtask.toLowerCase()){
                duplicated = true;
            }
        });
        if (duplicated){
            toastr.warning("Same task is already existed");
            return;
        }
        // update data
        updating = true;
        $.post("mytask", ajax_data, function(data) {
            if (!data){
                toastr.warning(data.message);
                return;
            }
            // const newFlag = $("div[taskid='"+data['id']+"']").html() == undefined;
            const newElement = $('<div class="col-md-12 col-sm-12 item d-flex flex-row justify-content-between shadow p-3 mb-2 bg-white rounded text-capitalize " taskid="' + data['id'] + '" is-share="'+ data['is_share'] +'" >' 
                                + '<span>' + data['title'] + '</span>' +
                                    '</div>');
            newElement.append('<i id="state-eye" class="far fa-eye float-right"></i>');
            newElement.bind("click", function(){
                // const taskId = $(this).attr("taskId");
                // const dataModal = $(this).attr("data-modal");
                // updateModalDisplyer(dataModal, taskId, data['title']);
                taskItem = $(this);
                hanleTaskUpdate(taskItem);
            });
            $("div.task_tab").append(newElement);
            $("span#numberTasks").html(parseInt($("span#numberTasks").html())-1);
            if (parseInt($("span#numberTasks").html()) <= 0)
                $("span#numberTasks").parent().html("Your Tasks");

            if (isNaN($("span#numberTasks").html())){
                $("#inputLabel").addClass('hidden');
                $("#goRaceLabel").removeClass('hidden');
                $("#confirmIsSharing").removeClass('hidden');
            }
            $("input#task").val('');
            $("input#task").focus();
            updating = false;

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

    // Handle dynamic task update
    var choosenTask = '';
    let isFirstClick = true;
    $('div.task_tab .item').click(function(e) {
        const taskItem = $(this);
        hanleTaskUpdate(taskItem);
    });

    // Static eye click function
    // $('i#state-eye').click(function() {
    //     const parentOfEye = $(this).parent();
    //     isShare = parseInt($(this).parent().attr("is-share")) === 1 ? true : false;
    //     isShare ? parentOfEye.attr('is-share', '0') : parentOfEye.attr('is-share', '1');
    //     eyeClass = isShare ? 'fa-eye-slash' : 'fa-eye';
    //     $(this).removeClass('far-eye');
    //     $(this).removeClass('far-eye-slash');
    //     $(this).addClass(eyeClass);

    // });
    
    //-- Handling Modal Code
    $('#modal-submit').click(function() {
        var newVal = $('#modal-input').val();
        const taskId = $('#modal-input').attr('taskId');
        const ajax_data = {
            _token: $('input[name="_token"]').val(),
            t_id: taskId,
            t_title: newVal
        };
        if(newVal !== '') {
            $.post('update_task_title', ajax_data, function(data){
                if(data)
                toastr.success("Success!");
                else
                    toastr.warning("Something wrong with server");
                });
                
                $('div.task_tab .item[taskId="'+ choosenTask +'"]').html(newVal);
                return;
            }
        toastr.warning('Task name is required');
    });
    $(".close-modal, .modal-sandbox").click(function(){
        $(".modal").css({"display":"none"});
        $(".modal-body .task-list").empty();
        $("body").css({"overflow-y": "auto"}); //Prevent double scrollbar.
    });
    function updateModalDisplyer(dataModal, taskId, currentVal) {
        $("#" + dataModal).css({"display":"block"});
        $("body").css({"overflow-y": "hidden"}); //Prevent double scrollbar.
        //-- Render modal content..
        
        // const taskInputTag = '<input id="modal-input" class="form-control" maxlength="128" task-id="'+ taskId +'" value="'+ currentVal +'"  autofocus/>';
        const taskTitleInput = $("#" + dataModal).find('#modal-input');
        taskTitleInput.attr('taskId', taskId);
        taskTitleInput.val(currentVal);
        
        choosenTask = taskId;
        //-- Reserve choosen task item                
    }
    function hanleTaskUpdate(taskItem) {
        isShare = parseInt(taskItem.attr("is-share"));
        let eyeClass = '';
        let eyeIcon = isShare == 1 ? '<i id="eye" class="far fa-eye float-right"></i>' 
                                   : '<i id="eye" class="far fa-eye-slash float-right"></i>';
        const dataModal = taskItem.attr("data-modal");
        const taskId = taskItem.attr('taskId');
        const valueOfTaskItem = taskItem.find('span').text();
        const textarea = '<textarea class="dynamic-textarea text-capitalize" maxlength="80">'+ valueOfTaskItem +'</textarea>';
        const saveButton = '<button id="btn-dynamic-update" class="btn btn-primary">Save</button>';
        
        if(isFirstClick) {
            isFirstClick = false;
            taskItem.find('span').remove();
            taskItem.find('i#state-eye').hide();
            taskItem.find('textarea').focus();
            taskItem.append(textarea)
                    .append('<div></div>')
                    .find('div')
                        .addClass('textarea-toolbar d-flex justify-content-between align-items-center')
                        .append(saveButton)
                        .append(eyeIcon);
            taskItem.addClass('flex-column');
            taskItem.removeClass('flex-row justify-content-between');

            taskItem.find('button#btn-dynamic-update').bind("click", function(){
                const modifiedTask = taskItem.find('textarea').val();
                const ajax_data = {
                    _token: $('input[name="_token"]').val(),
                    t_id     :taskId,
                    t_title  :modifiedTask,
                    is_share :isShare
                }
                if(modifiedTask !== '') {
                    $.post('update_task_title', ajax_data, function(data){
                        if(data) {
                            eyeClass = parseInt(data[0].is_share) === 1 ? 'fa-eye' : 'fa-eye-slash';
                            taskItem.find('textarea').remove();
                            taskItem.find('div.textarea-toolbar').remove();
                            taskItem.find('i#state-eye')
                                    .show()
                                    .removeClass('fa-eye')
                                    .removeClass('fa-eye-slash')
                                    .addClass(eyeClass);
                            taskItem.prepend('<span>'+ data[0].title +'</span>');
                            taskItem.removeClass('flex-column');
                            taskItem.addClass('flex-row justify-content-between');
                            isFirstClick = true;
                            toastr.success("Success!");
                        } else {
                            toastr.warning("Something wrong with server");
                        }
                    });
                } else {
                    toastr.warning('You must fill the form');
                }
            });
            taskItem.find('i#eye').bind("click", function() {
                isShare == 1 ? taskItem.attr('is-share', '0') : taskItem.attr('is-share', '1');
                isShare = isShare == 1 ? 0 : 1;
                eyeClass = isShare == 0 ? 'fa-eye-slash' : 'fa-eye';
                taskItem.find('i#eye').removeClass('far-eye');
                taskItem.find('i#eye').removeClass('fa-eye-slash');
                taskItem.find('i#eye').addClass(eyeClass);
            });
        }
    }
});
