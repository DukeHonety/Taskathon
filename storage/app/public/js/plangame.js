let raceTimer;
let imageTimer;
$(document).ready(function(){
    clearTimeout(raceTimer);
    clearTimeout(imageTimer);
    raceTimer = setInterval(function() {
        const raceTime = new Date($('input#raceTime').val());
        var today = new Date();
        var betweenTime = new Date(raceTime.getTime() - today.getTime());
        $("#countTime").html(getTimeStr(betweenTime));
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
        const playerAvatar = $("input#playeravatar").val();
        if (playerAvatar === '' || playerAvatar === '0' ){
            alert("Select one Avatar");
            return false;
        }
        $("form.hometab").submit();
    };

    $("form.hometab button#goPlan").click(function(){
        $playerAvatar = $("input#playeravatar").val();
        $.get('imagestatus/'+$playerAvatar, function(data){
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