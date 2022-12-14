$(document).ready(function(){
    $("button#updateStart").click(function(){
        const newdate = $("input#year").val() + "-" +$("input#month").val() + "-" + $("input#day").val() + " " +$("input#hour").val() + ":" + $("input#min").val() + ":00";
        const ajax_data = {
            _token: $('input[name="_token"]').val(),
            id: $('input#raceId').val(),
            time: newdate,
            raceTime: $('input#racetime').val()
        };
        $.post('updatestart', ajax_data, function(data){
            if(data)
                toastr.success("Update new start race time");
            else
                toastr.warning("Please check date again");
        });
    });
    $("button#restartRace").click(function(){
        if (confirm('Are you sure you want to restart race?')) {
            const ajax_data = {
                _token: $('input[name="_token"]').val()
            };
            $.post('restartrace', ajax_data, function(data){
                if(data)
                    toastr.success("Successfully restarted");
                else
                    toastr.warning("Server Error");
            });
          }
    });
});