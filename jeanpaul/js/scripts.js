    // Mobile Menu

    $('.mobile-toggle').click(function() {
        $('.nav-bar').toggleClass('nav-open');
        $(this).toggleClass('active');
    });

    $('.menu li').click(function(e) {
        if (!e) e = window.event;
        e.stopPropagation();
        if ($(this).find('ul').length) {
            $(this).toggleClass('toggle-sub');
        } else {
            $(this).parents('.toggle-sub').removeClass('toggle-sub');
        }
    });

    $('.menu li a').click(function() {
        if ($(this).hasClass('inner-link')){
            $(this).closest('.nav-bar').removeClass('nav-open');
        }
    });

    $('.module.widget-handle').click(function() {
        $(this).toggleClass('toggle-widget-handle');
    });

    $('.search-widget-handle .search-form input').click(function(e){
        if (!e) e = window.event;
        e.stopPropagation();
    });

    // Offscreen Nav

    if($('.offscreen-toggle').length){
      $('body').addClass('has-offscreen-nav');
    }
    else{
        $('body').removeClass('has-offscreen-nav');
    }

    $('.offscreen-toggle').click(function(){
      $('.main-container').toggleClass('reveal-nav');
      $('nav').toggleClass('reveal-nav');
      $('.offscreen-container').toggleClass('reveal-nav');
    });

    $('.main-container').click(function(){
      if($(this).hasClass('reveal-nav')){
        $(this).removeClass('reveal-nav');
        $('.offscreen-container').removeClass('reveal-nav');
        $('nav').removeClass('reveal-nav');
      }
    });

    $('.offscreen-container a').click(function(){
      $('.offscreen-container').removeClass('reveal-nav');
      $('.main-container').removeClass('reveal-nav');
      $('nav').removeClass('reveal-nav');
    });


    