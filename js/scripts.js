
//Enuire Now Pop
$(".fancyBoxLink").fancybox({
	helpers : {
		media : {},
		width: '960px'
	}
});

//set accordion effect
$('.accordion-content').hide();
$('.accordion-ticker').first().toggleClass('on').toggleClass('off');
$('.accordion-content').first().slideDown().toggleClass('active');
$('.accordion-ticker').toggleClass('off');

$('.accordion-ticker').click(function () {
	if($(this).is('.off')) {
		$('.on').toggleClass('off').toggleClass('on').next().slideToggle().toggleClass('active');
		$(this).toggleClass('off').toggleClass('on');
		$(this).next().slideToggle().toggleClass('active');
	}
	else {
		$(this).toggleClass('on').toggleClass('off');
		$(this).next().slideToggle().toggleClass('active');
	}
	return false;
});

//Slick Featured Products
$('.home-advertiser-list').slick({
	slidesToShow: 4,
	slidesToScroll: 1,
	speed: 800,
	autoplay: true,
	dots: false,
	arrows: false,
	responsive: [
		{
			breakpoint: 768,
			settings: {
				slidesToShow: 2,
				slidesToScroll: 1,
				arrows: false,
				fade: false,
				autoplay: true,
				dots: false
			}
		},
		{
			breakpoint: 480,
			settings: {
				slidesToShow: 1,
				slidesToScroll: 1,
				arrows: false,
				fade: false,
				autoplay: true,
				dots: false,
				adaptiveHeight: true
			}
		}
	]
});


//Slick Featured Products
$('.client-testimonial-list').slick({
	slidesToShow: 1,
	slidesToScroll: 1,
	speed: 600,
	autoplay: true,
	dots: true,
	arrows: false,
	responsive: [
		{
			breakpoint: 768,
			settings: {
				slidesToShow: 1,
				slidesToScroll: 1,
				arrows: false,
				fade: false,
				autoplay: true
			}
		},
		{
			breakpoint: 480,
			settings: {
				slidesToShow: 1,
				slidesToScroll: 1,
				arrows: false,
				fade: false,
				autoplay: true,
				adaptiveHeight: true
			}
		}
	]
});
