"use strict";
var lastScroll = 0;

//check for browser os
var isMobile = false;
var isiPhoneiPad = false;
if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
	isMobile = true;
}

if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
	isiPhoneiPad = true;
}

function SetMegamenuPosition() {
	if ($(window).width() > 991) {
		setTimeout(function () {
			var totalHeight = $('nav.navbar').outerHeight();
			$('.mega-menu').css({ top: totalHeight });
			if ($('.navbar-brand-top').length === 0)
				$('.dropdown.simple-dropdown > .dropdown-menu').css({ top: totalHeight });
		}, 200);
	} else {
		$('.mega-menu').css('top', '');
		$('.dropdown.simple-dropdown > .dropdown-menu').css('top', '');
	}
}

function pad(d) {
	return (d < 10) ? '0' + d.toString() : d.toString();
}

function isIE() {
	var ua = window.navigator.userAgent;
	var msie = ua.indexOf("MSIE ");
	if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./))  // If Internet Explorer, return version number
	{
		return true;
	} else  // If another browser, return 0
	{
		return false;
	}
}

//page title space
function setPageTitleSpace() {
	if ($('.navbar').hasClass('navbar-top') || $('nav').hasClass('navbar-fixed-top')) {
		if ($('.top-space').length > 0) {
			var top_space_height = $('.navbar').outerHeight();
			if ($('.top-header-area').length > 0) {
				top_space_height = top_space_height + $('.top-header-area').outerHeight();
			}
			$('.top-space').css('margin-top', top_space_height + "px");
		}
	}
}

//swiper button position in auto height slider
function setButtonPosition() {
	if ($(window).width() > 767 && $(".swiper-auto-height-container").length > 0) {
		var leftPosition = parseInt($('.swiper-auto-height-container .swiper-slide').css('padding-left'));
		var bottomPosition = parseInt($('.swiper-auto-height-container .swiper-slide').css('padding-bottom'));
		var bannerWidth = parseInt($('.swiper-auto-height-container .slide-banner').outerWidth());
		$('.navigation-area').css({ 'left': bannerWidth + leftPosition + 'px', 'bottom': bottomPosition + 'px' });
	} else if ($(".swiper-auto-height-container").length > 0) {
		$('.navigation-area').css({ 'left': '', 'bottom': '' });
	}
}

$(window).on("scroll", init_scroll_navigate);
function init_scroll_navigate() {
	/*==============================================================
	 One Page Main JS - START CODE
	 =============================================================*/
	var menu_links = $(".navbar-nav li a");
	var scrollPos = $(document).scrollTop();
	scrollPos = scrollPos + 60;
	menu_links.each(function () {
		var currLink = $(this);
		var hasPos = currLink.attr("href").indexOf("#");
		if (hasPos > -1) {
			var res = currLink.attr("href").substring(hasPos);
			if ($(res).length > 0) {
				var refElement = $(res);
				if (refElement.offset().top <= scrollPos && refElement.offset().top + refElement.height() > scrollPos) {
					menu_links.not(currLink).removeClass("active");
					currLink.addClass("active");
				} else {
					currLink.removeClass("active");
				}
			}
		}
	});
	/*==============================================================
	 One Page Main JS - END CODE
	 =============================================================*/

	/*==============================================================*/
	//background color slider Start
	/*==============================================================*/
	var $window = $(window),
		$body = $('.bg-background-fade'),
		$panel = $('.color-code');
	var scroll = $window.scrollTop() + ($window.height() / 2);
	$panel.each(function () {
		var $this = $(this);
		if ($this.position().top <= scroll && $this.position().top + $this.height() > scroll) {
			$body.removeClass(function (index, css) {
				return (css.match(/(^|\s)color-\S+/g) || []).join(' ');
			});
			$body.addClass('color-' + $(this).data('color'));
		}
	});
	/*==============================================================*/
	//background color slider End
	/*==============================================================*/

	/* ===================================
	 sticky nav Start
	 ====================================== */
	var headerHeight = $('nav').outerHeight();
	if (!$('header').hasClass('no-sticky')) {
		if ($(document).scrollTop() >= headerHeight) {
			$('header').addClass('sticky');

		} else if ($(document).scrollTop() <= headerHeight) {
			$('header').removeClass('sticky');
			setTimeout(function () {
				setPageTitleSpace();
			}, 500);
		}
		SetMegamenuPosition();
	}

	/* ===================================
	 header appear on scroll up
	 ====================================== */
	var st = $(this).scrollTop();
	if (st > lastScroll) {
		$('.sticky').removeClass('header-appear');
		//        $('.dropdown.on').removeClass('on').removeClass('open').find('.dropdown-menu').fadeOut(100);
	} else
		$('.sticky').addClass('header-appear');
	lastScroll = st;
	if (lastScroll <= headerHeight)
		$('header').removeClass('header-appear');
	/* ===================================
	 sticky nav End
	 ====================================== */
}

/*==============================================================
 parallax text - START CODE
 ==============================================================*/
function parallax_text() {
	var window_width = $(window).width();
	if (window_width > 1024) {
		if ($('.swiper-auto-slide .swiper-slide').length !== 0) {
			$(document).on("mousemove", ".swiper-auto-slide .swiper-slide", function (e) {
				var positionX = e.clientX;
				var positionY = e.clientY;
				positionX = Math.round(positionX / 10) - 80;
				positionY = Math.round(positionY / 10) - 40;
				$(this).find('.parallax-text').css({ 'transform': 'translate(' + positionX + 'px,' + positionY + 'px)', 'transition-duration': '0s' });
			});

			$(document).on("mouseout", ".swiper-auto-slide .swiper-slide", function (e) {
				$('.parallax-text').css({ 'transform': 'translate(0,0)', 'transition-duration': '0.5s' });
			});
		}
	}
}
/*==============================================================*/
//parallax text - END CODE
/*==============================================================*/


/*==============================================================
 equalize - START CODE
 ==============================================================*/
function equalizeHeight() {
	$(document).imagesLoaded(function () {
		if ($(window).width() < 768) {
			$('.equalize').equalize({ equalize: 'outerHeight', reset: true });
			$('.equalize.md-equalize-auto').children().css("height", "");
			$('.equalize.sm-equalize-auto').children().css("height", "");
			$('.equalize.xs-equalize-auto').children().css("height", "");
			return false;
		} else if ($(window).width() < 992) {
			$('.equalize').equalize({ equalize: 'outerHeight', reset: true });
			$('.equalize.md-equalize-auto').children().css("height", "");
			$('.equalize.sm-equalize-auto').children().css("height", "");
			return false;
		} else if ($(window).width() < 1199) {
			$('.equalize').equalize({ equalize: 'outerHeight', reset: true });
			$('.equalize.md-equalize-auto').children().css("height", "");
			return false;
		} else {
			$('.equalize').equalize({ equalize: 'outerHeight', reset: true });
		}
	});
}
/*==============================================================
 equalize - END CODE
 ==============================================================*/

/*==============================================================
 dynamic font size START CODE
 ==============================================================*/
function feature_dynamic_font_line_height() {
	if ($('.dynamic-font-size').length > 0) {
		var site_width = 1100;
		var window_width = $(window).width();
		if (window_width < site_width) {
			var window_site_width_ratio = window_width / site_width;
			$('.dynamic-font-size').each(function () {
				var font_size = $(this).attr('data-fontsize');
				var line_height = $(this).attr('data-lineheight');
				if (font_size != '' && font_size != undefined) {
					var new_font_size = Math.round(font_size * window_site_width_ratio * 1000) / 1000;
					$(this).css('font-size', new_font_size + 'px');
				}
				if (line_height !== '' && line_height !== undefined) {
					var new_line_height = Math.round(line_height * window_site_width_ratio * 1000) / 1000;
					$(this).css('line-height', new_line_height + 'px');
				}
			});
		} else {
			$('.dynamic-font-size').each(function () {
				var font_size = $(this).attr('data-fontsize');
				var line_height = $(this).attr('data-lineheight');
				if (font_size !== '' && font_size !== undefined) {
					$(this).css('font-size', font_size + 'px');
				}
				if (line_height !== '' && line_height !== undefined) {
					$(this).css('line-height', line_height + 'px');
				}
			});
		}
	}
}
/*==============================================================
 dynamic font size END CODE
 ==============================================================*/

/*==============================================================
 set parallax
 ==============================================================*/
function stellarParallax() {
	if ($(window).width() > 1024) {
		$.stellar();
	} else {
		$.stellar('destroy');
		$('.parallax').css('background-position', '');
	}
}

/*==============================================================
 full screen START CODE
 ==============================================================*/
function fullScreenHeight() {
	var element = $(".full-screen");
	var $minheight = $(window).height();
	element.parents('section').imagesLoaded(function () {
		if ($(".top-space .full-screen").length > 0) {
			var $headerheight = $("header nav.navbar").outerHeight();
			$(".top-space .full-screen").css('min-height', $minheight - $headerheight);
		} else {
			element.css('min-height', $minheight);
		}
	});

	var minwidth = $(window).width();
	$(".full-screen-width").css('min-width', minwidth);

	var sidebarNavHeight = $('.sidebar-nav-style-1').height() - $('.logo-holder').parent().height() - $('.footer-holder').parent().height() - 10;
	$(".sidebar-nav-style-1 .nav").css('height', (sidebarNavHeight));
	var style2NavHeight = parseInt($('.sidebar-part2').height() - parseInt($('.sidebar-part2 .sidebar-middle').css('padding-top')) - parseInt($('.sidebar-part2 .sidebar-middle').css('padding-bottom')) - parseInt($(".sidebar-part2 .sidebar-middle .sidebar-middle-menu .nav").css('margin-bottom')));
	$(".sidebar-part2 .sidebar-middle .sidebar-middle-menu .nav").css('height', (style2NavHeight));


}
/*==============================================================
 full screen END CODE
 ==============================================================*/
function SetResizeContent() {
	//    all function call
	feature_dynamic_font_line_height();
	SetMegamenuPosition();
	setPageTitleSpace();
	setButtonPosition();
	parallax_text();
	stellarParallax();
	fullScreenHeight();
	equalizeHeight();
}

/* ===================================
 START RESIZE
 ====================================== */
$(window).resize(function (event) {
	// Bootsnav menu work with eualize height
	$("nav.navbar.bootsnav ul.nav").each(function () {
		$("li.dropdown", this).on("mouseenter", function (e) {
			if ($(window).width() > 991) {
				$(this).find('.equalize').equalize({ equalize: 'outerHeight', reset: true });
				return false;
			}
		});
	});

	setTimeout(function () {
		SetResizeContent();
	}, 500);

	event.preventDefault();
});
/* ===================================
 END RESIZE
 ====================================== */

/* ===================================
 START READY
 ====================================== */
$(document).ready(function () {
	"use strict";



	// Active class to current menu for only html
	var pgurl = window.location.href.substr(window.location.href.lastIndexOf("/") + 1);
	var $hash = window.location.hash.substring(1);

	if ($hash) {
		$hash = "#" + $hash;
		pgurl = pgurl.replace($hash, "");
	} else {
		pgurl = pgurl.replace("#", "");
	}

	$(".nav li a").each(function () {
		if ($(this).attr("href") == pgurl || $(this).attr("href") == pgurl + '.html') {
			$(this).parent().addClass("active");
			$(this).parents('li.dropdown').addClass("active");
		}
	});
	$(window).scroll(function () {
		if ($(this).scrollTop() > 150)
			$('.scroll-top-arrow').fadeIn('slow');
		else
			$('.scroll-top-arrow').fadeOut('slow');
	});
	//Click event to scroll to top
	$(document).on('click', '.scroll-top-arrow', function () {
		$('html, body').animate({ scrollTop: 0 }, 800);
		return false;
	});

	/* ===================================
	 swiper slider
	 ====================================== */
	

	var swiperAutoFade = new Swiper('.swiper-auto-fade', {
		allowTouchMove: true,
		loop: true,
		slidesPerView: 1,
		preventClicks: false,
		effect: 'fade',
		autoplay: {
			delay: 5000
		},
		keyboard: {
			enabled: true
		},
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev'
		},
		pagination: {
			el: '.swiper-auto-pagination',
			clickable: true
		},
		on: {
			resize: function () {
				swiperAutoFade.update();
			}
		}
	});

	var swiperVerticalPagination = new Swiper('.swiper-vertical-pagination', {
		allowTouchMove: true,
		direction: 'vertical',
		slidesPerView: 1,
		spaceBetween: 0,
		preventClicks: false,
		mousewheel: {
			mousewheel: true,
			sensitivity: 1,
			releaseOnEdges: true
		},
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev'
		},
		pagination: {
			el: '.swiper-pagination-vertical',
			clickable: true
		},
		on: {
			resize: function () {
				swiperVerticalPagination.update();
			}
		}
	});



	var swiperFourSlides = new Swiper('.swiper-four-slides', {
		allowTouchMove: true,
		slidesPerView: 3,
		preventClicks: false,
		pagination: {
			el: '.swiper-pagination-four-slides',
			clickable: true
		},
		autoplay: {
			delay: 15000
		},
		keyboard: {
			enabled: true
		},
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev'
		},
		breakpoints: {
			1199: {
				slidesPerView: 3
			},
			991: {
				slidesPerView: 2
			},
			767: {
				slidesPerView: 1
			}
		},
		on: {
			resize: function () {
				swiperFourSlides.update();
			}
		}
	});

	var $swiperAutoSlideIndex = 0;
	var swiperAutoSlide = new Swiper('.swiper-auto-slide', {
		allowTouchMove: true,
		slidesPerView: 'auto',
		centeredSlides: true,
		spaceBetween: 80,
		preventClicks: false,
		observer: true,
		speed: 1000,
		pagination: {
			el: null
		},
		scrollbar: {
			el: '.swiper-scrollbar',
			draggable: true,
			hide: false,
			snapOnRelease: true
		},
		autoplay: {
			delay: 3000
		},
		mousewheel: {
			invert: false
		},
		keyboard: {
			enabled: true
		},
		navigation: {
			nextEl: '.swiper-next-style2',
			prevEl: '.swiper-prev-style2'
		},
		breakpoints: {
			1199: {
				spaceBetween: 60
			},
			960: {
				spaceBetween: 30
			},
			767: {
				spaceBetween: 15
			}
		},
		on: {
			resize: function () {
				swiperAutoSlide.update();
			}
		}
	});

	if ($(window).width() > 767) {
		var swiperBottomScrollbarFull = new Swiper('.swiper-bottom-scrollbar-full', {
			allowTouchMove: true,
			slidesPerView: 'auto',
			grabCursor: true,
			preventClicks: false,
			spaceBetween: 30,
			keyboardControl: true,
			speed: 1000,
			pagination: {
				el: null
			},
			scrollbar: {
				el: '.swiper-scrollbar',
				draggable: true,
				hide: false,
				snapOnRelease: true
			},
			mousewheel: {
				enable: true
			},
			keyboard: {
				enabled: true
			},
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev'
			}
		});
	}

	var swiperAutoHieght = new Swiper('.swiper-auto-height-container', {
		allowTouchMove: true,
		effect: 'fade',
		loop: true,
		autoHeight: true,
		pagination: {
			el: '.swiper-auto-height-pagination',
			clickable: true
		},
		autoplay: {
			delay: 3000
		},
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev'
		},
		on: {
			resize: function () {
				swiperAutoHieght.update();
			}
		}
	});


	var resizeId;

	$(window).resize(function () {
		if ($(".swiper-auto-slide").length > 0 && swiperAutoSlide) {
			$swiperAutoSlideIndex = swiperAutoSlide.activeIndex;
			swiperAutoSlide.detachEvents();
			swiperAutoSlide.destroy(true, false);
			swiperAutoSlide = undefined;
			$(".swiper-auto-slide .swiper-wrapper").css("transform", "").css("transition-duration", "");
			$(".swiper-auto-slide .swiper-slide").css("margin-right", "");

			setTimeout(function () {
				swiperAutoSlide = new Swiper('.swiper-auto-slide', {
					allowTouchMove: true,
					slidesPerView: 'auto',
					centeredSlides: true,
					spaceBetween: 80,
					preventClicks: false,
					mousewheelControl: true,
					observer: true,
					speed: 1000,
					pagination: {
						el: null
					},
					scrollbar: {
						el: '.swiper-scrollbar',
						draggable: true,
						hide: false,
						snapOnRelease: true
					},
					autoplay: {
						delay: 3000
					},
					keyboard: {
						enabled: true
					},
					navigation: {
						nextEl: '.swiper-next-style2',
						prevEl: '.swiper-prev-style2'
					},
					breakpoints: {
						1199: {
							spaceBetween: 60
						},
						960: {
							spaceBetween: 30
						},
						767: {
							spaceBetween: 15
						}
					},
					on: {
						resize: function () {
							swiperAutoSlide.update();
						}
					}
				});

				swiperAutoSlide.slideTo($swiperAutoSlideIndex, 1000, false);
			}, 1000);
		}

		if ($(".swiper-bottom-scrollbar-full").length > 0) {
			clearTimeout(resizeId);
			resizeId = setTimeout(doneResizing, 1000);
		}

		/* update all swiper on window resize */

		setTimeout(function () {
			if ($('.swiper-full-screen').length > 0 && swiperFull) {
				swiperFull.update();
			}

			if ($('.swiper-auto-fade').length > 0 && swiperAutoFade) {
				swiperAutoFade.update();
			}

			if ($('.swiper-slider-second').length > 0 && swiperSecond) {
				swiperSecond.update();
			}

			if ($('.swiper-slider-third').length > 0 && swiperThird) {
				swiperThird.update();
			}

			if ($('.swiper-number-pagination').length > 0 && swiperNumber) {
				swiperNumber.update();
			}

			if ($('.swiper-vertical-pagination').length > 0 && swiperVerticalPagination) {
				swiperVerticalPagination.update();
			}

			if ($('.swiper-slider-clients').length > 0 && swiperClients) {
				swiperClients.update();
			}

			if ($('.swiper-slider-clients-second').length > 0 && swiperClients2) {
				swiperClients2.update();
			}

			if ($('.swiper-three-slides').length > 0 && swiperThreeSlides) {
				swiperThreeSlides.update();
			}

			if ($('.swiper-four-slides').length > 0 && swiperFourSlides) {
				swiperFourSlides.update();
			}

			if ($('.swiper-demo-header-style').length > 0 && swiperDemoHeaderStyle) {
				swiperDemoHeaderStyle.update();
			}

			if ($('.swiper-auto-slide').length > 0 && swiperAutoSlide) {
				swiperAutoSlide.update();
			}

			if ($('.swiper-auto-height-container').length > 0 && swiperAutoHieght) {
				swiperAutoHieght.update();
			}

			if ($('.swiper-multy-row-container').length > 0 && swiperMultyRow) {
				swiperMultyRow.update();
			}

			if ($('.swiper-blog').length > 0 && swiperBlog) {
				swiperBlog.update();
			}

			if ($('.swiper-presentation').length > 0 && swiperPresentation) {
				swiperPresentation.update();
			}

		}, 500);
		if (isIE()) {
			setTimeout(function () {
				if ($('.swiper-full-screen').length > 0 && swiperFull) {
					swiperFull.update();
				}

				if ($('.swiper-auto-fade').length > 0 && swiperAutoFade) {
					swiperAutoFade.update();
				}

				if ($('.swiper-slider-second').length > 0 && swiperSecond) {
					swiperSecond.update();
				}

				if ($('.swiper-slider-third').length > 0 && swiperThird) {
					swiperThird.update();
				}

				if ($('.swiper-number-pagination').length > 0 && swiperNumber) {
					swiperNumber.update();
				}

				if ($('.swiper-vertical-pagination').length > 0 && swiperVerticalPagination) {
					swiperVerticalPagination.update();
				}

				if ($('.swiper-slider-clients').length > 0 && swiperClients) {
					swiperClients.update();
				}

				if ($('.swiper-slider-clients-second').length > 0 && swiperClients2) {
					swiperClients2.update();
				}

				if ($('.swiper-three-slides').length > 0 && swiperThreeSlides) {
					swiperThreeSlides.update();
				}

				if ($('.swiper-four-slides').length > 0 && swiperFourSlides) {
					swiperFourSlides.update();
				}

				if ($('.swiper-demo-header-style').length > 0 && swiperDemoHeaderStyle) {
					swiperDemoHeaderStyle.update();
				}

				if ($('.swiper-auto-slide').length > 0 && swiperAutoSlide) {
					swiperAutoSlide.update();
				}

				if ($('.swiper-auto-height-container').length > 0 && swiperAutoHieght) {
					swiperAutoHieght.update();
				}

				if ($('.swiper-multy-row-container').length > 0 && swiperMultyRow) {
					swiperMultyRow.update();
				}

				if ($('.swiper-blog').length > 0 && swiperBlog) {
					swiperBlog.update();
				}

				if ($('.swiper-presentation').length > 0 && swiperPresentation) {
					swiperPresentation.update();
				}

			}, 500);
		}

	});

	function doneResizing() {
		if (swiperBottomScrollbarFull) {
			swiperBottomScrollbarFull.detachEvents();
			swiperBottomScrollbarFull.destroy(true, true);
			swiperBottomScrollbarFull = undefined;
		}

		$(".swiper-bottom-scrollbar-full .swiper-wrapper").css("transform", "").css("transition-duration", "");
		$(".swiper-bottom-scrollbar-full .swiper-slide").css("margin-right", "");
		$('.swiper-bottom-scrollbar-full .swiper-wrapper').removeAttr('style');
		$('.swiper-bottom-scrollbar-full .swiper-slide').removeAttr('style');

		if ($(window).width() > 767) {
			setTimeout(function () {
				swiperBottomScrollbarFull = new Swiper('.swiper-bottom-scrollbar-full', {
					allowTouchMove: true,
					slidesPerView: 'auto',
					grabCursor: true,
					preventClicks: false,
					spaceBetween: 30,
					keyboardControl: true,
					speed: 1000,
					pagination: {
						el: null
					},
					scrollbar: {
						el: '.swiper-scrollbar',
						draggable: true,
						hide: false,
						snapOnRelease: true
					},
					mousewheel: {
						enable: true
					},
					keyboard: {
						enabled: true
					},
					navigation: {
						nextEl: '.swiper-button-next',
						prevEl: '.swiper-button-prev'
					}
				});
			}, 500);
		}
	}

	/*==============================================================
	 smooth scroll
	 ==============================================================*/

	var scrollAnimationTime = 1200, scrollAnimation = 'easeInOutExpo';
	$(document).on('click.smoothscroll', 'a.scrollto', function (event) {
		event.preventDefault();
		var target = this.hash;
		if ($(target).length != 0) {
			$('html, body').stop()
				.animate({
					'scrollTop': $(target)
						.offset()
						.top
				}, scrollAnimationTime, scrollAnimation, function () {
					window.location.hash = target;
				});
		}
	});

	/*==============================================================
	 humburger menu one page navigation
	 ==============================================================*/

	if ($('.full-width-pull-menu').length > 0) {
		$(document).on('click', '.full-width-pull-menu .inner-link', function (e) {
			//$('body').removeClass('overflow-hidden position-fixed');
			$(".full-width-pull-menu .close-button-menu").trigger("click");
			var _this = $(this);
			setTimeout(function () {
				var target = _this.attr("href");
				if ($(target).length > 0) {
					$('html, body').stop()
						.animate({
							'scrollTop': $(target).offset().top
						});
				}
			}, 500);
		});
	}

	// Inner links
	if ($('.navbar-top').length > 0 || $('.navbar-scroll-top').length > 0 || $('.nav-top-scroll').length > 0) {
		$('.inner-link').smoothScroll({
			speed: 900,
			offset: 0
		});
	} else {
		$('.inner-link').smoothScroll({
			speed: 900,
			offset: -59
		});
	}

	$('.section-link').smoothScroll({
		speed: 900,
		offset: 1
	});


	/*==============================================================
	 wow animation - on scroll
	 ==============================================================*/
	var wow = new WOW({
		boxClass: 'wow',
		animateClass: 'animated',
		offset: 0,
		mobile: false,
		live: true
	});
	$(window).imagesLoaded(function () {
		wow.init();
	});


	/* ===================================
	 left nav
	 ====================================== */
	$(document).on('click', '.right-menu-button', function (e) {
		$('body').toggleClass('left-nav-on');
	});

	/*==============================================================*/
	//    hamburger menu 
	/*==============================================================*/
	$(document).on('click', '.btn-hamburger', function () {
		$('.hamburger-menu').toggleClass('show-menu');
		$('body').removeClass('show-menu');
	});

	/*==============================================================*/
	//sidebar nav open
	/*==============================================================*/
	$(document).on('click', '#mobileToggleSidenav', function () {
		$(this).closest('nav').toggleClass('sidemenu-open');
	});

	

	$('.atr-nav').on("click", function () {
		$(".atr-div").append("<a class='close-cross' href='#'>X</a>");
		$(".atr-div").animate({
			width: "toggle"
		});
	});

	$('.close-cross').on("click", function () {
		$(".atr-div").hide();
	});

	var menuRight = document.getElementById('cbp-spmenu-s2'),
		showRightPush = document.getElementById('showRightPush'),
		body = document.body;
	if (showRightPush) {
		showRightPush.onclick = function () {
			classie.toggle(this, 'active');
			if (menuRight)
				classie.toggle(menuRight, 'cbp-spmenu-open');
		};
	}

	var test = document.getElementById('close-pushmenu');
	if (test) {
		test.onclick = function () {
			classie.toggle(this, 'active');
			if (menuRight)
				classie.toggle(menuRight, 'cbp-spmenu-open');
		};
	}


	/*==============================================================*/
	//big menu open close start
	/*==============================================================*/
	$('.big-menu-open').on("click", function () {
		$('.big-menu-right').addClass("open");
	});

	$('.big-menu-close').on("click", function () {
		$('.big-menu-right').removeClass("open");
	});
	/*==============================================================*/
	//big menu open close end
	/*==============================================================*/



	$(document).on("click", '.navbar .navbar-collapse a.dropdown-toggle, .accordion-style1 .panel-heading a, .accordion-style2 .panel-heading a, .accordion-style3 .panel-heading a, .toggles .panel-heading a, .toggles-style2 .panel-heading a, .toggles-style3 .panel-heading a, a.carousel-control, .nav-tabs a[data-toggle="tab"], a.shopping-cart', function (e) {
		e.preventDefault();
	});

	$(document).on('touchstart click', 'body', function (e) {
		if ($(window).width() < 992) {
			if (!$('.navbar-collapse').has(e.target).is('.navbar-collapse') && $('.navbar-collapse').hasClass('in') && !$(e.target).hasClass('navbar-toggle')) {
				$('.navbar-collapse').collapse('hide');
			}
		} else {
			if (!$('.navbar-collapse').has(e.target).is('.navbar-collapse') && $('.navbar-collapse ul').hasClass('in')) {
				$('.navbar-collapse').find('a.dropdown-toggle').addClass('collapsed');
				$('.navbar-collapse').find('ul.dropdown-menu').removeClass('in');
				$('.navbar-collapse a.dropdown-toggle').removeClass('active');
			}
		}
	});

	$('.navbar-collapse a.dropdown-toggle').on('touchstart', function (e) {
		$('.navbar-collapse a.dropdown-toggle').not(this).removeClass('active');
		if ($(this).hasClass('active'))
			$(this).removeClass('active');
		else
			$(this).addClass('active');
	});

	$('button.navbar-toggle').on("click", function (e) {
		if (isMobile) {
			$(".cart-content").css('opacity', '0');
			$(".cart-content").css('visibility', 'hidden');
		}
	});

	$('a.dropdown-toggle').on("click", function (e) {
		if (isMobile) {
			$(".cart-content").css('opacity', '0');
			$(".cart-content").css('visibility', 'hidden');
		}
	});

   

	/* ===================================
	 touchstart click
	 ====================================== */
	$('body').on('touchstart click', function (e) {
		if ($(window).width() < 992) {
		}
	});

	/*==============================================================*/
	//Set Resize Header Menu - START CODE
	/*==============================================================*/
	$('nav.full-width-pull-menu ul.panel-group li.dropdown a.dropdown-toggle').on("click", function (e) {
		if ($(this).parent('li').find('ul.dropdown-menu').length > 0) {
			if ($(this).parent('li').hasClass('open')) {
				$(this).parent('li').removeClass('open');
			} else {
				$(this).parent('li').addClass('open');
			}
		}
	});

	SetResizeContent();

	var $allNonRatinaImages = $("img:not([data-rjs])");
	$allNonRatinaImages.attr('data-no-retina', '');


	$(document).on("touchstart", ".sidebar-wrapper", function () {
		clearOpen();
	});

	var getNav = $("nav.navbar.bootsnav"), getIn = getNav.find("ul.nav").data("in"), getOut = getNav.find("ul.nav").data("out");
	// Hidden dropdown
	function clearOpen() {
		$('li.dropdown').removeClass("on").removeClass("open");
		$(".dropdown-menu").stop().fadeOut('fast');
		$(".dropdown-menu").removeClass(getIn);
		$(".dropdown-menu").addClass(getOut);
	}

});
/* ===================================
 END READY
 ====================================== */


/* ===================================
 START Page Load
 ====================================== */
$(window).load(function () {
	var hash = window.location.hash.substr(1);
	if (hash != "") {
		setTimeout(function () {
			$(window).imagesLoaded(function () {
				var scrollAnimationTime = 1200,
					scrollAnimation = 'easeInOutExpo';
				var target = '#' + hash;
				if ($(target).length > 0) {

					$('html, body').stop()
						.animate({
							'scrollTop': $(target).offset().top
						}, scrollAnimationTime, scrollAnimation, function () {
							window.location.hash = target;
						});
				}
			});
		}, 500);
	}

	fullScreenHeight();
});