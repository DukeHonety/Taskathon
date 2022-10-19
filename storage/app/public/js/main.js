let RACE_START_TIME = '';
let RACE_END_TIME = '';
$(document).ready(function(){
    $(".card-header button#minimize").click(function(){
        const card = $(this).parent().parent();
        if (card.hasClass('minimize')){
            card.removeClass('minimize');
            $(this).html('<i class="fa fa-minus"></i>');
        }
        else{
            card.addClass('minimize');
            $(this).html('<i class="fa fa-plus"></i>');
        }
    });
});

function getTimeStr(betwenTime){
    const hours = betwenTime.getUTCHours();
    const minutes = betwenTime.getUTCMinutes();
    const seconds = betwenTime.getSeconds();
    const timeString = hours.toString().padStart(2, '0') + ':' + minutes.toString().padStart(2, '0') + ':' + seconds.toString().padStart(2, '0');
    return timeString;
}
