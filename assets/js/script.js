/*
* ----------------------------------------------------------------------------------------
Author       : Tanvir Hossain
Template Name: Noir - Premium Portfolio Template
Version      : 1.0                                          
* ----------------------------------------------------------------------------------------
*/


(function($) {
    "use strict";


    /*
     * ----------------------------------------------------------------------------------------
     *  SWIPER JS
     * ----------------------------------------------------------------------------------------
     */
    var postboxSlider = new Swiper('.postbox__slider', {
        slidesPerView: 1,
        spaceBetween: 0,
        loop: true,
        autoplay: {
            delay: 3000,
        },
        // Navigation arrows
        navigation: {
            nextEl: ".postbox-slider-button-next",
            prevEl: ".postbox-slider-button-prev",
        },
        breakpoints: {
            '1200': {
                slidesPerView: 1,
            },
            '992': {
                slidesPerView: 1,
            },
            '768': {
                slidesPerView: 1,
            },
            '576': {
                slidesPerView: 1,
            },
            '0': {
                slidesPerView: 1,
            },
        },
    });


    /*
     * ----------------------------------------------------------------------------------------
     *  SMOTH SCROOL JS
     * ----------------------------------------------------------------------------------------
     */

    function scrollNav() {
        $('.onepage li a').click(function(e) {
            var target = $(this).attr('href');

            if (!target || target.charAt(0) !== '#') {
                return;
            }

            var $target = $(target);

            if (!$target.length) {
                return;
            }

            e.preventDefault();
            $(".onepage li a.active").removeClass("active");
            $(this).addClass("active");

            $('html, body').stop().animate({
                scrollTop: $target.offset().top - 100
            }, 1000);
        });
    }
    scrollNav();

    /*
     * ----------------------------------------------------------------------------------------
     *  EXTRA JS
     * ----------------------------------------------------------------------------------------
     */
    if ($('.counter-text-wrap').length) {
        $('.counter-text-wrap').appear(function() {

            var $t = $(this),
                n = $t.find(".count-text").attr("data-stop"),
                r = parseInt($t.find(".count-text").attr("data-speed"), 10);

            if (!$t.hasClass("counted")) {
                $t.addClass("counted");
                $({
                    countNum: $t.find(".count-text").text()
                }).animate({
                    countNum: n
                }, {
                    duration: r,
                    easing: "linear",
                    step: function() {
                        $t.find(".count-text").text(Math.floor(this.countNum));
                    },
                    complete: function() {
                        $t.find(".count-text").text(this.countNum);
                    }
                });
            }

        }, {
            accY: 0
        });
    }

    /*
     * ----------------------------------------------------------------------------------------
     *  EXTRA JS
     * ----------------------------------------------------------------------------------------
     */

    // menu last item
    $('.main-menu nav > ul > li').slice(-4).addClass('menu-last');

    $('#mobile-menu').meanmenu({
        meanMenuContainer: '.mobile-menu',
        meanScreenWidth: "991",
        meanExpand: ['<i class="fal fa-plus"></i>'],
    });

    $(".sidebar__close-btn ,.mobile-menu .onepage li a  > *:not(button)").on("click", function() {
        $(".sidebar__area").removeClass("sidebar-opened");
        $(".body-overlay").removeClass("opened");
    });

    $(".sidebar-toggle-btn").on("click", function() {
        $(".sidebar__area").addClass("sidebar-opened");
        $(".body-overlay").addClass("opened");
    });
    $(".sidebar__close-btn").on("click", function() {
        $(".sidebar__area").removeClass("sidebar-opened");
        $(".body-overlay").removeClass("opened");
    });

    $(".body-overlay").on("click", function() {
        $(".sidebar__area").removeClass("sidebar-opened");
        $(".body-overlay").removeClass("opened");
    });



    /*
     * ----------------------------------------------------------------------------------------
     *  MAGNIFIC POPUP JS
     * ----------------------------------------------------------------------------------------
     */

    var magnifPopup = function() {
        $('.work-popup').magnificPopup({
            type: 'image',
            removalDelay: 300,
            mainClass: 'mfp-with-zoom',
            gallery: {
                enabled: true
            },
            zoom: {
                enabled: false, // By default it's false, so don't forget to enable it

                duration: 300, // duration of the effect, in milliseconds
                easing: 'ease-in-out', // CSS transition easing function

                // The "opener" function should return the element from which popup will be zoomed in
                // and to which popup will be scaled down
                // By defailt it looks for an image tag:
                opener: function(openerElement) {
                    // openerElement is the element on which popup was initialized, in this case its <a> tag
                    // you don't need to add "opener" option if this code matches your needs, it's defailt one.
                    return openerElement.is('img') ? openerElement : openerElement.find('img');
                }
            }
        });


        $('.popup-youtube, .popup-vimeo, .popup-gmaps, .popup-video').magnificPopup({
            disableOn: 700,
            type: 'iframe',
            mainClass: 'mfp-fade',
            removalDelay: 160,
            preloader: false,

            fixedContentPos: false
        });

    };
    // Call the functions 
    magnifPopup();

    function enablePopupSwipe() {
        if (!window.jQuery || !$.magnificPopup) {
            return;
        }

        var startX = 0;
        var startY = 0;
        var tracking = false;
        var moved = false;
        var minSwipe = 45;

        function getPopup() {
            var popup = $.magnificPopup.instance;

            if (!popup || !popup.isOpen || !popup.items || popup.items.length < 2) {
                return null;
            }

            return popup;
        }

        function isIgnoredTarget(target) {
            return $(target).closest('.mfp-close, .mfp-arrow, button, input, textarea, select, a').length > 0;
        }

        document.addEventListener('touchstart', function(event) {
            if (!getPopup() || event.touches.length !== 1 || isIgnoredTarget(event.target)) {
                tracking = false;
                return;
            }

            startX = event.touches[0].clientX;
            startY = event.touches[0].clientY;
            moved = false;
            tracking = true;
        }, { passive: true });

        document.addEventListener('touchmove', function(event) {
            if (!tracking || event.touches.length !== 1) {
                return;
            }

            var diffX = event.touches[0].clientX - startX;
            var diffY = event.touches[0].clientY - startY;

            if (Math.abs(diffX) > 12 && Math.abs(diffX) > Math.abs(diffY)) {
                moved = true;
                event.preventDefault();
            }
        }, { passive: false });

        document.addEventListener('touchend', function(event) {
            var popup = getPopup();

            if (!tracking || !popup || !moved) {
                tracking = false;
                return;
            }

            var endTouch = event.changedTouches[0];
            var diffX = endTouch.clientX - startX;
            var diffY = endTouch.clientY - startY;

            tracking = false;

            if (Math.abs(diffX) < minSwipe || Math.abs(diffX) < Math.abs(diffY) * 1.35) {
                return;
            }

            if (diffX < 0) {
                popup.next();
            } else {
                popup.prev();
            }
        }, { passive: true });
    }

    enablePopupSwipe();


    /*
     * ----------------------------------------------------------------------------------------
     *  SCROOL TO UP JS
     * ----------------------------------------------------------------------------------------
     */

    var progressPath = document.querySelector('.progress-wrap path');
    var pathLength = progressPath.getTotalLength();
    progressPath.style.transition = progressPath.style.WebkitTransition = 'none';
    progressPath.style.strokeDasharray = pathLength + ' ' + pathLength;
    progressPath.style.strokeDashoffset = pathLength;
    progressPath.getBoundingClientRect();
    progressPath.style.transition = progressPath.style.WebkitTransition = 'stroke-dashoffset 10ms linear';
    var updateProgress = function() {
        var scroll = $(window).scrollTop();
        var height = $(document).height() - $(window).height();
        var progress = pathLength - (scroll * pathLength / height);
        progressPath.style.strokeDashoffset = progress;
    }
    updateProgress();


    $(window).scroll(updateProgress);
    var offset = 150;
    var duration = 550;
    jQuery(window).on('scroll', function() {
        if (jQuery(this).scrollTop() > offset) {
            jQuery('.progress-wrap').addClass('active-progress');
        } else {
            jQuery('.progress-wrap').removeClass('active-progress');
        }
    });
    jQuery('.progress-wrap').on('click', function(event) {
        event.preventDefault();
        jQuery('html, body').animate({
            scrollTop: 0
        }, duration);
        return false;
    })

    /* ==========================================================================
                       SCROLLER ANIMATION
    ========================================================================== */

    const scrollers = document.querySelectorAll(".scroller");

    // If a user hasn't opted in for recuded motion, then we add the animation
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        addAnimation();
    }

    function addAnimation() {
        scrollers.forEach((scroller) => {
            // add data-animated="true" to every `.scroller` on the page
            scroller.setAttribute("data-animated", true);

            // Make an array from the elements within `.scroller-inner`
            const scrollerInner = scroller.querySelector(".scroller__inner");
            const scrollerContent = Array.from(scrollerInner.children);

            // For each item in the array, clone it
            // add aria-hidden to it
            // add it into the `.scroller-inner`
            scrollerContent.forEach((item) => {
                const duplicatedItem = item.cloneNode(true);
                duplicatedItem.setAttribute("aria-hidden", true);
                scrollerInner.appendChild(duplicatedItem);
            });
        });
    }




    // ## Testimonials Active
    if ($('.testimonials-wrap').length) {
        $('.testimonials-wrap').slick({
            dots: false,
            infinite: true,
            autoplay: true,
            autoplaySpeed: 2000,
            arrows: true,
            speed: 1000,
            focusOnSelect: false,
            prevArrow: '.testimonial-prev',
            nextArrow: '.testimonial-next',
            slidesToShow: 2,
            slidesToScroll: 1,
            responsive: [{
                breakpoint: 767,
                settings: {
                    slidesToShow: 1,
                }
            }]
        });
    }



    // ## Project Filter
    $(".project-filter li").on('click', function() {
        $(".project-filter li").removeClass("current");
        $(this).addClass("current");

        var selector = $(this).attr('data-filter');
        $('.project-masonry-active').imagesLoaded(function() {
            $(".project-masonry-active").isotope({
                itemSelector: '.item',
                filter: selector,
                masonry: {
                    columnWidth: '.item'
                }
            });
        });

    });



    // ## Nice Select
    $('select').niceSelect();


    // ## WOW Animation
    if ($('.wow').length) {
        var wow = new WOW({
            boxClass: 'wow', // animated element css class (default is wow)
            animateClass: 'animated', // animation css class (default is animated)
            offset: 0, // distance to the element when triggering the animation (default is 0)
            mobile: false, // trigger animations on mobile devices (default is true)
            live: true // act on asynchronously loaded content (default is true)
        });
        wow.init();
    }




    /*
     * ----------------------------------------------------------------------------------------
     *  AJAX CONTACT JS
     * ----------------------------------------------------------------------------------------
     */

    /* ==========================================================================
       When document is scroll, do
       ========================================================================== */

    $(window).on('scroll', function() {

        // ## Header Style and Scroll to Top
        function headerStyle() {
            if ($('.main-header').length) {
                var windowpos = $(window).scrollTop();
                var siteHeader = $('.main-header');
                var scrollLink = $('.scroll-top');
                if (windowpos >= 100) {
                    siteHeader.addClass('fixed-header');
                    scrollLink.fadeIn(300);
                } else {
                    siteHeader.removeClass('fixed-header');
                    scrollLink.fadeOut(300);
                }
            }
        }

        headerStyle();

    });



    /* ==========================================================================
       When document is loaded, do
       ========================================================================== */

    $(window).on('load', function() {


        const svg = document.getElementById("preloaderSvg");
        const tl = gsap.timeline();
        const curve = "M0 502S175 272 500 272s500 230 500 230V0H0Z";
        const flat = "M0 2S175 1 500 1s500 1 500 1V0H0Z";

        tl.to(".preloader-heading .load-text , .preloader-heading .cont", {
            delay: 1.5,
            y: -100,
            opacity: 0,
        });
        tl.to(svg, {
            duration: 0.5,
            attr: { d: curve },
            ease: "power2.easeIn",
        }).to(svg, {
            duration: 0.5,
            attr: { d: flat },
            ease: "power2.easeOut",
        });
        tl.to(".preloader", {
            y: -1500,
        });
        tl.to(".preloader", {
            zIndex: -1,
            display: "none",
        });


    });

})(jQuery); // End jQuery
