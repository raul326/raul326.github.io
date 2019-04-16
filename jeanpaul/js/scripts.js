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

        // Lightbox gallery titles

    $('.lightbox-grid li a').each(function(){
      var galleryTitle = $(this).closest('.lightbox-grid').attr('data-gallery-title');
      $(this).attr('data-lightbox', galleryTitle);
    });

    // Prepare embedded video modals

    $('iframe[data-provider]').each(function(){
        var provider = jQuery(this).attr('data-provider');
        var videoID = jQuery(this).attr('data-video-id');
        var autoplay = jQuery(this).attr('data-autoplay');
        var vidURL = '';

        if(provider == 'vimeo'){
            vidURL = "http://player.vimeo.com/video/"+videoID+"?badge=0&title=0&byline=0&title=0&autoplay="+autoplay;
            $(this).attr('data-src', vidURL);
        }else if (provider == 'youtube'){
            vidURL = "https://www.youtube.com/embed/"+videoID+"?rel=0&showinfo=0&autoplay="+autoplay;
            $(this).attr('data-src', vidURL);
        }else{
            console.log('Only Vimeo and Youtube videos are supported at this time');
        }
    });

    // Multipurpose Modals

    jQuery('.foundry_modal[modal-link]').remove();

    if($('.foundry_modal').length && (!jQuery('.modal-screen').length)){
        // Add a div.modal-screen if there isn't already one there.
        var modalScreen = jQuery('<div />').addClass('modal-screen').appendTo('body');

    }

    jQuery('.foundry_modal').click(function(){
        jQuery(this).addClass('modal-acknowledged');
    });

    jQuery(document).on('wheel mousewheel scroll', '.foundry_modal, .modal-screen', function(evt){
        $(this).get(0).scrollTop += (evt.originalEvent.deltaY);
        return false;
    });

    $('.modal-container:not([modal-link])').each(function(index) {
        if(jQuery(this).find('iframe[src]').length){
          jQuery(this).find('.foundry_modal').addClass('iframe-modal');
          var iframe = jQuery(this).find('iframe');
          iframe.attr('data-src',iframe.attr('src'));
            iframe.attr('src', '');

        }
        jQuery(this).find('.btn-modal').attr('modal-link', index);

        // Only clone and append to body if there isn't already one there
        if(!jQuery('.foundry_modal[modal-link="'+index+'"]').length){
            jQuery(this).find('.foundry_modal').clone().appendTo('body').attr('modal-link', index).prepend(jQuery('<i class="ti-close close-modal">'));
        }
    });

    $('.btn-modal').unbind('click').click(function(){
      var linkedModal = jQuery('.foundry_modal[modal-link="' + jQuery(this).attr('modal-link') + '"]'),
            autoplayMsg = "";
        jQuery('.modal-screen').toggleClass('reveal-modal');
        if(linkedModal.find('iframe').length){
            if(linkedModal.find('iframe').attr('data-autoplay') === '1'){
                var autoplayMsg = '&autoplay=1'
            }
          linkedModal.find('iframe').attr('src', (linkedModal.find('iframe').attr('data-src') + autoplayMsg));
        }
        if(linkedModal.find('video').length){
            linkedModal.find('video').get(0).play();
        }
        linkedModal.toggleClass('reveal-modal');
        return false;
    });

    // Autoshow modals

  $('.foundry_modal[data-time-delay]').each(function(){
    var modal = $(this);
    var delay = modal.attr('data-time-delay');
    modal.prepend($('<i class="ti-close close-modal">'));
      if(typeof modal.attr('data-cookie') != "undefined"){
          if(!mr_cookies.hasItem(modal.attr('data-cookie'))){
                setTimeout(function(){
              modal.addClass('reveal-modal');
              $('.modal-screen').addClass('reveal-modal');
            },delay);
            }
        }else{
            setTimeout(function(){
                modal.addClass('reveal-modal');
                $('.modal-screen').addClass('reveal-modal');
            },delay);
        }
  });

    // Exit modals
    $('.foundry_modal[data-show-on-exit]').each(function(){
        var modal = $(this);
        var exitSelector = $(modal.attr('data-show-on-exit'));
        // If a valid selector is found, attach leave event to show modal.
        if($(exitSelector).length){
            modal.prepend($('<i class="ti-close close-modal">'));
            $(document).on('mouseleave', exitSelector, function(){
                if(!$('body .reveal-modal').length){
                    if(typeof modal.attr('data-cookie') !== typeof undefined){
                        if(!mr_cookies.hasItem(modal.attr('data-cookie'))){
                            modal.addClass('reveal-modal');
                            $('.modal-screen').addClass('reveal-modal');
                        }
                    }else{
                        modal.addClass('reveal-modal');
                        $('.modal-screen').addClass('reveal-modal');
                    }
                }
            });
        }
    });

    // Autoclose modals

    $('.foundry_modal[data-hide-after]').each(function(){
        var modal = $(this);
        var delay = modal.attr('data-hide-after');
        if(typeof modal.attr('data-cookie') != "undefined"){
            if(!mr_cookies.hasItem(modal.attr('data-cookie'))){
                setTimeout(function(){
                if(!modal.hasClass('modal-acknowledged')){
                    modal.removeClass('reveal-modal');
                    $('.modal-screen').removeClass('reveal-modal');
                }
                },delay);
            }
        }else{
            setTimeout(function(){
                if(!modal.hasClass('modal-acknowledged')){
                    modal.removeClass('reveal-modal');
                    $('.modal-screen').removeClass('reveal-modal');
                }
            },delay);
        }
    });

    jQuery('.close-modal:not(.modal-strip .close-modal)').unbind('click').click(function(){
      var modal = jQuery(this).closest('.foundry_modal');
        modal.toggleClass('reveal-modal');
        if(typeof modal.attr('data-cookie') !== "undefined"){
            mr_cookies.setItem(modal.attr('data-cookie'), "true", Infinity);
        }
      if(modal.find('iframe').length){
            modal.find('iframe').attr('src', '');
        }
        jQuery('.modal-screen').removeClass('reveal-modal');
    });

    jQuery('.modal-screen').unbind('click').click(function(){
        if(jQuery('.foundry_modal.reveal-modal').find('iframe').length){
            jQuery('.foundry_modal.reveal-modal').find('iframe').attr('src', '');
        }
      jQuery('.foundry_modal.reveal-modal').toggleClass('reveal-modal');
      jQuery(this).toggleClass('reveal-modal');
    });

    jQuery(document).keyup(function(e) {
     if (e.keyCode == 27) { // escape key maps to keycode `27`
            if(jQuery('.foundry_modal').find('iframe').length){
                jQuery('.foundry_modal').find('iframe').attr('src', '');
            }
      jQuery('.foundry_modal').removeClass('reveal-modal');
      jQuery('.modal-screen').removeClass('reveal-modal');
    }
  });

    // Modal Strips

    jQuery('.modal-strip').each(function(){
      if(!jQuery(this).find('.close-modal').length){
        jQuery(this).append(jQuery('<i class="ti-close close-modal">'));
      }
      var modal = jQuery(this);

        if(typeof modal.attr('data-cookie') != "undefined"){

            if(!mr_cookies.hasItem(modal.attr('data-cookie'))){
              setTimeout(function(){
                modal.addClass('reveal-modal');
              },1000);
            }
        }else{
            setTimeout(function(){
                    modal.addClass('reveal-modal');
            },1000);
        }
    });

    jQuery('.modal-strip .close-modal').click(function(){
        var modal = jQuery(this).closest('.modal-strip');
        if(typeof modal.attr('data-cookie') != "undefined"){
            mr_cookies.setItem(modal.attr('data-cookie'), "true", Infinity);
        }
      jQuery(this).closest('.modal-strip').removeClass('reveal-modal');
      return false;
    });


    // Video Modals

    jQuery('.close-iframe').click(function() {
        jQuery(this).closest('.modal-video').removeClass('reveal-modal');
        jQuery(this).siblings('iframe').attr('src', '');
        jQuery(this).siblings('video').get(0).pause();
    });


        //                                                            //
    //                                                            //
    // Contact form code                                          //
    //                                                            //
    //                                                            //
    $('form.form-email, form.form-newsletter, form.form-subscribe').submit(function (e) {

        // return false so form submits through jQuery rather than reloading page.
        if (e.preventDefault) e.preventDefault();
        else e.returnValue = false;

            var thisForm = $(this).closest('form.form-email, form.form-newsletter, form.form-subscribe'),
            submitButton = thisForm.find('button[type="submit"]'),
            error = 0,
            originalError = thisForm.attr('original-error'),
            preparedForm, iFrame, userEmail, userFullName, userFirstName, userLastName, successRedirect, formError, formSuccess;

        // Mailchimp/Campaign Monitor Mail List Form Scripts
        iFrame = $(thisForm).find('iframe.mail-list-form');

        thisForm.find('.form-error, .form-success').remove();
        submitButton.attr('data-text', submitButton.text());
        thisForm.append('<div class="form-error" style="display: none;">' + thisForm.attr('data-error') + '</div>');
        thisForm.append('<div class="form-success" style="display: none;">' + thisForm.attr('data-success') + '</div>');
        formError = thisForm.find('.form-error');
        formSuccess = thisForm.find('.form-success');
        thisForm.addClass('attempted-submit');

        // Do this if there is an iframe, and it contains usable Mail Chimp / Campaign Monitor iframe embed code
        if ((iFrame.length) && (typeof iFrame.attr('srcdoc') !== "undefined") && (iFrame.attr('srcdoc') !== "")) {

            console.log('Mail list form signup detected.');
            if (typeof originalError !== typeof undefined && originalError !== false) {
                formError.html(originalError);
            }
            userEmail = $(thisForm).find('.signup-email-field').val();
            userFullName = $(thisForm).find('.signup-name-field').val();
            if ($(thisForm).find('input.signup-first-name-field').length) {
                userFirstName = $(thisForm).find('input.signup-first-name-field').val();
            } else {
                userFirstName = $(thisForm).find('.signup-name-field').val();
            }
            userLastName = $(thisForm).find('.signup-last-name-field').val();

            // validateFields returns 1 on error;
            if (validateFields(thisForm) !== 1) {
                preparedForm = prepareSignup(iFrame);

                preparedForm.find('#mce-EMAIL, #fieldEmail').val(userEmail);
                preparedForm.find('#mce-LNAME, #fieldLastName').val(userLastName);
                preparedForm.find('#mce-FNAME, #fieldFirstName').val(userFirstName);
                preparedForm.find('#mce-NAME, #fieldName').val(userFullName);
                thisForm.removeClass('attempted-submit');

                // Hide the error if one was shown
                formError.fadeOut(200);
                // Create a new loading spinner in the submit button.
                submitButton.html(jQuery('<div />').addClass('form-loading')).attr('disabled', 'disabled');

                try{
                    $.ajax({
                        url: preparedForm.attr('action'),
                        crossDomain: true,
                        data: preparedForm.serialize(),
                        method: "GET",
                        cache: false,
                        dataType: 'json',
                        contentType: 'application/json; charset=utf-8',
                        success: function(data){
                            // Request was a success, what was the response?
                            if (data.result != "success" && data.Status != 200) {

                                // Error from Mail Chimp or Campaign Monitor

                                // Keep the current error text in a data attribute on the form
                                formError.attr('original-error', formError.text());
                                // Show the error with the returned error text.
                                formError.html(data.msg).fadeIn(1000);
                                formSuccess.fadeOut(1000);

                                submitButton.html(submitButton.attr('data-text')).removeAttr('disabled');
                            } else {

                                // Got Success from Mail Chimp

                                submitButton.html(submitButton.attr('data-text')).removeAttr('disabled');

                                successRedirect = thisForm.attr('success-redirect');
                                // For some browsers, if empty `successRedirect` is undefined; for others,
                                // `successRedirect` is false.  Check for both.
                                if (typeof successRedirect !== typeof undefined && successRedirect !== false && successRedirect !== "") {
                                    window.location = successRedirect;
                                }

                                thisForm.find('input[type="text"]').val("");
                                thisForm.find('textarea').val("");
                                formSuccess.fadeIn(1000);

                                formError.fadeOut(1000);
                                setTimeout(function() {
                                    formSuccess.fadeOut(500);
                                }, 5000);
                            }
                        }
                    });
                }catch(err){
                    // Keep the current error text in a data attribute on the form
                    formError.attr('original-error', formError.text());
                    // Show the error with the returned error text.
                    formError.html(err.message).fadeIn(1000);
                    formSuccess.fadeOut(1000);
                    setTimeout(function() {
                        formError.fadeOut(500);
                    }, 5000);

                    submitButton.html(submitButton.attr('data-text')).removeAttr('disabled');
                }



            } else {
                formError.fadeIn(1000);
                setTimeout(function() {
                    formError.fadeOut(500);
                }, 5000);
            }
        } else {
            // If no iframe detected then this is treated as an email form instead.
            console.log('Send email form detected.');
            if (typeof originalError !== typeof undefined && originalError !== false) {
                formError.text(originalError);
            }

            error = validateFields(thisForm);

            if (error === 1) {
                formError.fadeIn(200);
                setTimeout(function() {
                    formError.fadeOut(500);
                }, 3000);
            } else {

                thisForm.removeClass('attempted-submit');

                // Hide the error if one was shown
                formError.fadeOut(200);

                // Create a new loading spinner in the submit button.
                submitButton.html(jQuery('<div />').addClass('form-loading')).attr('disabled', 'disabled');

                jQuery.ajax({
                    type: "POST",
                    url: "mail/mail.php",
                    data: thisForm.serialize()+"&url="+window.location.href,
                    success: function(response) {
                        // Swiftmailer always sends back a number representing numner of emails sent.
                        // If this is numeric (not Swift Mailer error text) AND greater than 0 then show success message.

                        submitButton.html(submitButton.attr('data-text')).removeAttr('disabled');

                        if ($.isNumeric(response)) {
                            if (parseInt(response) > 0) {
                                // For some browsers, if empty 'successRedirect' is undefined; for others,
                                // 'successRedirect' is false.  Check for both.
                                successRedirect = thisForm.attr('success-redirect');
                                if (typeof successRedirect !== typeof undefined && successRedirect !== false && successRedirect !== "") {
                                    window.location = successRedirect;
                                }


                                thisForm.find('input[type="text"]').val("");
                                thisForm.find('textarea').val("");
                                thisForm.find('.form-success').fadeIn(1000);

                                formError.fadeOut(1000);
                                setTimeout(function() {
                                    formSuccess.fadeOut(500);
                                }, 5000);
                            }
                        }
                        // If error text was returned, put the text in the .form-error div and show it.
                        else {
                            // Keep the current error text in a data attribute on the form
                            formError.attr('original-error', formError.text());
                            // Show the error with the returned error text.
                            formError.text(response).fadeIn(1000);
                            formSuccess.fadeOut(1000);
                        }
                    },
                    error: function(errorObject, errorText, errorHTTP) {
                        // Keep the current error text in a data attribute on the form
                        formError.attr('original-error', formError.text());
                        // Show the error with the returned error text.
                        formError.text(errorHTTP).fadeIn(1000);
                        formSuccess.fadeOut(1000);
                        submitButton.html(submitButton.attr('data-text')).removeAttr('disabled');
                    }
                });
            }
        }
        return false;
    });

    $('.validate-required, .validate-email').on('blur change', function() {
        validateFields($(this).closest('form'));
    });

    $('form').each(function() {
        if ($(this).find('.form-error').length) {
            $(this).attr('original-error', $(this).find('.form-error').text());
        }
    });

    function validateFields(form) {
            var name, error, originalErrorMessage;

            $(form).find('.validate-required[type="checkbox"]').each(function() {
                if (!$('[name="' + $(this).attr('name') + '"]:checked').length) {
                    error = 1;
                    name = $(this).attr('name').replace('[]', '');
                    form.find('.form-error').text('Please tick at least one ' + name + ' box.');
                }
            });

            $(form).find('.validate-required').each(function() {
                if ($(this).val() === '') {
                    $(this).addClass('field-error');
                    error = 1;
                } else {
                    $(this).removeClass('field-error');
                }
            });

            $(form).find('.validate-email').each(function() {
                if (!(/(.+)@(.+){2,}\.(.+){2,}/.test($(this).val()))) {
                    $(this).addClass('field-error');
                    error = 1;
                } else {
                    $(this).removeClass('field-error');
                }
            });

            if (!form.find('.field-error').length) {
                form.find('.form-error').fadeOut(1000);
            }

            return error;
        }

    //
    //
    // End contact form code
    //
    //


// $(".prod-text-wrap").clone().appendTo(".prod-text-mobile");   
// test();
// $( window ).resize(function() {   
//     test();
// });


// function test(){
// let width = $(window).width(); 
//     if ( width > 992 ) {       
//         let row1 = $('.switchable');
//         if(!row1.hasClass('noswitch')) {
//             row1.addClass('noswitch');
//             $('.products-available-wrap .container .row:nth-child(2)').after(row1.clone());
//             row1.remove();
//         }
        
//     } else {
//         let row2 = $('.switchable');
//         if(row2.hasClass('noswitch')) {
//             row2.removeClass('noswitch');
//             $('.products-available-wrap .container').prepend(row2.clone());
//             row2.remove();
//         }
//     }
// }


    // Image Sliders
    if($('.slider-all-controls, .slider-paging-controls, .slider-arrow-controls, .slider-thumb-controls, .logo-carousel').length){
        $('.slider-all-controls').flexslider({
            start: function(slider){
                if(slider.find('.slides li:first-child').find('.fs-vid-background video').length){
                   slider.find('.slides li:first-child').find('.fs-vid-background video').get(0).play();
                }
            },
            after: function(slider){
                if(slider.find('.fs-vid-background video').length){
                    if(slider.find('li:not(.flex-active-slide)').find('.fs-vid-background video').length){
                        slider.find('li:not(.flex-active-slide)').find('.fs-vid-background video').get(0).pause();
                    }
                    if(slider.find('.flex-active-slide').find('.fs-vid-background video').length){
                        slider.find('.flex-active-slide').find('.fs-vid-background video').get(0).play();
                    }
                }
            }
        });
        $('.slider-paging-controls').flexslider({
            animation: "slide",
            directionNav: false
        });
        $('.slider-arrow-controls').flexslider({
            controlNav: false
        });
        $('.slider-thumb-controls .slides li').each(function() {
            var imgSrc = $(this).find('img').attr('src');
            $(this).attr('data-thumb', imgSrc);
        });
        $('.slider-thumb-controls').flexslider({
            animation: "slide",
            controlNav: "thumbnails",
            directionNav: true,
            slideshowSpeed: 12000
        });
        $('.logo-carousel').flexslider({
            minItems: 1,
            maxItems: 4,
            move: 1,
            itemWidth: 200,
            itemMargin: 0,
            animation: "slide",
            slideshow: true,
            slideshowSpeed: 3000,
            directionNav: false,
            controlNav: false
        });
    }

    // Lightbox gallery titles

    $('.lightbox-grid li a').each(function(){
        var galleryTitle = $(this).closest('.lightbox-grid').attr('data-gallery-title');
        $(this).attr('data-lightbox', galleryTitle);
    });