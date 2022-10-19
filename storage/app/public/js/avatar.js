let raceTimer;
let imageTimer;
$(document).ready(function(){
    clearTimeout(raceTimer);
    clearTimeout(imageTimer);
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
    imageTimer = setInterval(function() {
        $.get('imagestatus/all', function(data){
            data.forEach((image) => {
                if (image.used){
                    $("img#avatar"+image.id).parent().hide();
                }
                else
                    $("img#avatar"+image.id).parent().show();
            });
        });
    }, 3000);

    $(".avatarSlideItem").click(function(){
        const avatarId = $(this).attr("imgid");
        $(".avatarSlideItem").removeClass("active");
        $(this).addClass("active");
        $("input#playeravatar").val(avatarId);
    })
    function goPlanTasks(){
        $("form.hometab").submit();
    };

    $("form.hometab button#goPlan").click(function(){
        const playerAvatar = $("input#playeravatar").val();
        const playerName = $("input#playername").val();
        if (playerName === ''){
            toastr.warning("Input your player name");
            return;
        }
        if (playerAvatar === '' || playerAvatar == 0 ){
            toastr.warning("Select one Avatar");
            return false;
        }
        $.get('imagestatus/'+playerAvatar, function(data){
            if(data){
                goPlanTasks();
            }
            $("input#playeravatar").val(0);
        });
    });

    // $("button.slide-left").click(function(){
    //     const total = parseInt($(".avatarContent").attr("total"));
    //     sliderPos++;
    //     if (total == sliderPos)
    //         sliderPos = 0;
    //     $('.avatarContent').css('margin-left', '-' + sliderPos*120 + 'px');
    // });
    // $("button.slide-right").click(function(){
    //     const total = parseInt($(".avatarContent").attr("total"));
    //     sliderPos--;
    //     if (sliderPos < 0)
    //         sliderPos = total-1;
    //     $('.avatarContent').css('margin-left', '-' + sliderPos*120 + 'px');
    // });
});