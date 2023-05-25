//Slide and fade script
/*When a scroll is detected, any element with the assigned class will be examined to determine whether it is in view on the screen,if it is in view, the animation will begin*/
$(document).ready(function() {
    $(window).scroll( function(){
        $('.js-scroll').each( function(i){
            
            let bottom_of_element = $(this).offset().top + $(this).outerHeight();
            let bottom_of_window = $(window).scrollTop() + $(window).height();
            
            if( bottom_of_window > bottom_of_element ){
                $(this).animate({'opacity':'1'},800);
            }
            
        }); 
    });
  });