$(document).ready(function(){

    /**
     * STICKY NAV
     */
    $(window).scroll(function(){
        sticky_nav();
    });
    sticky_nav();

    function sticky_nav() {
        if($(this).scrollTop() > 30) {
            $('.main-head').addClass('sticky');
            $('.head-recall .btn').removeClass('btn-white').addClass('btn-red');
        } else {
            $('.main-head').removeClass('sticky');
            $('.head-recall .btn').addClass('btn-white').removeClass('btn-red');
        }
    }
    /**
     * end STICKY NAV
     */

    /**
     * mobile-mnu customization
     */
    var mmenu = $('#mobile-mnu');
    var $mmenu = mmenu.mmenu({
        "pageScroll": true,
        "navbar": {
            "title" : "",
        },
        "extensions": [
            "position-front",
            "fullscreen",

        ],
    }, {
        offCanvas: {
            pageSelector: "#page-wrapper"
        },
        "autoHeight": true
    });

    var mmenuBtn = $("#mmenu-btn");
    var API = $mmenu.data("mmenu");

    mmenuBtn.click(function() {
        API.open();
        setTimeout(function(){
            $('.mmenu-btn').addClass('is-active')
        }, 300);

    });

    $('#close-mnu').click(function(e){
        e.preventDefault();
        API.close();
    });

    API.bind( "close:start", function() {
        setTimeout(function() {
            $('.mmenu-btn').removeClass( "is-active" );
        }, 300);
    });
    /**
     * end mobile-mnu customization
     */

    /**
     * VIDEO
     */



    //youtube script
    var tag = document.createElement('script');
    tag.src = "//www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    var vp;

    var $playerID = 'videoPlayer-0';

    onYouTubeIframeAPIReady = function () {

        $("a[href='#video-popup']").on('click', function(){


            var $videoID = $(this).data("video");


            vp = new YT.Player($playerID, {
                videoId: $videoID,
                playerVars: {
                    'autoplay': 1,
                    'rel': 0,
                    'showinfo': 0
                },
                events: {
                    'onStateChange': onPlayerStateChange
                }
            });
        });
    };

    onPlayerStateChange = function (event) {
        if (event.data == YT.PlayerState.ENDED) {
            $.magnificPopup.close();
        }
    };

    $(function () {
        $("a[href='#video-popup']").magnificPopup({
            type: "inline",
            fixedContentPos: !1,
            fixedBgPos: !0,
            overflowY: "auto",
            closeBtnInside: !0,
            preloader: !1,
            midClick: !0,
            removalDelay: 300,
            mainClass: "my-mfp-zoom-in",
            callbacks: {
                close: function(){
                    vp.stopVideo();
                    vp.destroy();
                }
            }
        })
    });
    /**
     * end VIDEO
     */


    $("a[href='#popup-form']").magnificPopup({
        type: "inline",
        fixedContentPos: !1,
        fixedBgPos: !0,
        overflowY: "auto",
        closeBtnInside: !0,
        preloader: !1,
        midClick: !0,
        removalDelay: 300,
        mainClass: "my-mfp-zoom-in",

    });




    $('img.svg').each(function(){
        var $img = jQuery(this);
        var imgID = $img.attr('id');
        var imgClass = $img.attr('class');
        var imgURL = $img.attr('src');

        jQuery.get(imgURL, function(data) {
            // Get the SVG tag, ignore the rest
            var $svg = jQuery(data).find('svg');

            // Add replaced image's ID to the new SVG
            if(typeof imgID !== 'undefined') {
                $svg = $svg.attr('id', imgID);
            }
            // Add replaced image's classes to the new SVG
            if(typeof imgClass !== 'undefined') {
                $svg = $svg.attr('class', imgClass+' replaced-svg');
            }

            // Remove any invalid XML tags as per http://validator.w3.org
            $svg = $svg.removeAttr('xmlns:a');

            // Check if the viewport is set, if the viewport is not set the SVG wont't scale.
            if(!$svg.attr('viewBox') && $svg.attr('height') && $svg.attr('width')) {
                $svg.attr('viewBox', '0 0 ' + $svg.attr('height') + ' ' + $svg.attr('width'))
            }

            // Replace image with new SVG
            $img.replaceWith($svg);
        }, 'xml');
    });

    $('.color-item').each(function(){
        var th = $(this),
            color = th.data('color');

        console.log(color);

        th.css("fill",color);
    });

    $( "#ex-tabs" ).tabs();

    $('.result-img').photoswipe();
    $('.inner-pages').photoswipe();


    function heightses() {
        if ($(window).width()>992) {
            $('.blog-item-title').height('auto').equalHeights();
        }
    }

    $(window).resize(function() {
        heightses();
    });
    heightses();

    $("a.btn-down").mPageScroll2id();

    /**
     * FROMS
     */
    $.validate({
        form : '.contact-form',
        scrollToTopOnError: false
    });

        $('.contacts-select').styler();

    function getSelectIcon(){
        $('.jq-selectbox.contacts-select').each(function(){
            var th = $(this);
            var selectedItem = th.find('li.selected');
            var icon = selectedItem.data('icon');
            var placeholder = selectedItem.data('ph');
            var input = th.find('.jq-selectbox__select');
            var form = th.parents('.contact-form');
            var dataInput = form.find('.data-input');

            dataInput.attr("placeholder", placeholder);

            input.cssBefore('background-image', 'url("'+ icon +'")');
        });
    }

    getSelectIcon();

    $('.jq-selectbox.contacts-select').change(function(){
        getSelectIcon();
    });

    $("a[href='#popup-form']").click(function(){
        getSelectIcon();
    });

    //E-mail Ajax Send
    $("form").submit(function() { //Change
        var th = $(this);

        $.ajax({
            type: "POST",
            url: "mail.php", //Change
            data: th.serialize()
        }).done(function() {

        });
        return false;
    });
    /**
     * end FORMS
     */



    $('.preloader').fadeOut();


});
