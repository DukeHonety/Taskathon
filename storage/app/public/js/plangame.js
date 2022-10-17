let raceTimer;
$(document).ready(function(){
    raceTimer = setInterval(function() {
        const raceTime = new Date($('input#raceTime').val());
        var today = new Date();
        var betwenTime = new Date(raceTime.getTime() - today.getTime());
        $("#countTime").html(getTimeStr(betwenTime));
    }, 1000);
    $(".avatarSlideItem").click(function(){
        const avatarId = $(this).attr("id");
        $(".avatarSlideItem").removeClass("active");
        $(this).addClass("active");
        $("input#playeravatar").val(avatarId);
    })
    $("button#submit").click(function(){
        const playerAvatar = $("input#playeravatar").val();
        if (playerAvatar === '' ){
            alert("Select one Avatar");
            return false;
        }
        return true;
    });
    $("button.slide-left").click(function(){
        const total = parseInt($(".avatarContent").attr("total"));
        sliderPos++;
        if (total == sliderPos)
            sliderPos = 0;
        $('.avatarContent').css('margin-left', '-' + sliderPos*120 + 'px');
    });
    $("button.slide-right").click(function(){
        const total = parseInt($(".avatarContent").attr("total"));
        sliderPos--;
        if (sliderPos < 0)
            sliderPos = total-1;
        $('.avatarContent').css('margin-left', '-' + sliderPos*120 + 'px');
    });
});