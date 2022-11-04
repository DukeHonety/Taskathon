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
    $('button.navbar-toggler').click(function() {
        $('div#navbarSupportedContent').slideToggle();
    });
});

function getTimeStr(betweenTime){
    const day = betweenTime.getUTCDate();
    const hours = betweenTime.getUTCHours();
    const minutes = betweenTime.getUTCMinutes();
    const seconds = betweenTime.getSeconds();
    // const timeString = hours.toString().padStart(2, '0') + ':' + minutes.toString().padStart(2, '0') + ':' + seconds.toString().padStart(2, '0');
    let exportDateStr = '';
    if (day-1 > 0)
        exportDateStr+= (day-1) + ' day(s), ';
    if (hours > 0)
        exportDateStr+= hours + ' hour(s), ';
    if (minutes > 0)
        exportDateStr+= minutes + ' minute(s), ';
    if (seconds > 0)
        exportDateStr+= seconds + ' second(s)';
    return exportDateStr;
}
