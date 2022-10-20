let raceTimer;
let imageTimer;
$(document).ready(function(){
    clearTimeout(raceTimer);
    clearTimeout(imageTimer);
    
    raceTimer = setInterval(function() {
        const raceTime = new Date($('input#raceTime').val());
        var today = new Date();
        let betweenTime = raceTime.getTime() - today.getTime();
        if (betweenTime > 0){
            $("#countTime").html(getTimeStr(new Date(betweenTime)));
        }
        else{
            $("#countTime").parent().html("The race is already started.");
            clearTimeout(raceTimer);
        }
    }, 1000);
    imageTimer = setInterval(function() {
        const cPAvatar = parseInt($("input#currentPlayerAvatar").val());
        $.get('imagestatus/all', function(data){
            data.forEach((image) => {
                if (image.used && image.id != cPAvatar){
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
        $("input#playerAvatar").val(avatarId);
    })
    function goPlanTasks(){
        $("form.hometab").submit();
    };

    $("form.hometab button#goPlan").click(function(){
        const playerAvatar = $("input#playerAvatar").val();
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
            else
                $("input#playerAvatar").val(0);
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