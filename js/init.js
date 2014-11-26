/*
	Big Picture by HTML5 UP
	html5up.net | @n33co
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/
(function ($)
{
    var settings = {

        // Fullscreen?
        fullScreen: true,

        // Section Transitions?
        sectionTransitions: true,

        // Fade in speed (in ms).
        fadeInSpeed: 1000

    };

    skel.init(
    {
        reset: 'full',
        breakpoints:
        {
            'max':
            {
                range: '*',
                href: 'css/style.css',
                containers: 1440,
                viewport:
                {
                    scalable: false
                },
                grid:
                {
                    gutters: 40
                }
            },
            'wide':
            {
                range: '-1920',
                href: 'css/style-wide.css',
                containers: 1360
            },
            'normal':
            {
                range: '-1680',
                href: 'css/style-normal.css',
                containers: 1200
            },
            'narrow':
            {
                range: '-1280',
                href: 'css/style-narrow.css',
                containers: 960
            },
            'narrower':
            {
                range: '-1000',
                href: 'css/style-narrower.css',
                containers: '95%'
            },
            'mobile':
            {
                range: '-736',
                href: 'css/style-mobile.css',
                grid:
                {
                    gutters: 20
                }
            },
            'mobile-narrow':
            {
                range: '-480',
                grid:
                {
                    collapse: true,
                    gutters: 10
                }
            }
        }
    });
    
    $(function ()
    {

        var $window = $(window),
            $body = $('body'),
            $header = $('#header'),
            $logo = $('#logo'),
            $all = $body.add($header),
            sectionTransitionState = false;

        // Settings.

        // IE<10?
        if (skel.vars.IEVersion < 10)
        {

            // Turn off transitions.
            settings.sectionTransitions = false;

        }

        // Touch?
        if (skel.vars.isTouch)
        {

            // Disable section transitions
            settings.sectionTransitions = false;

            // Turn on touch mode
            $body.addClass('touch');

        }

        // Fade in once everything's loaded.
        $all
            .addClass('is-loading')
            .fadeTo(0, 0.0001);

        $window.load(function ()
        {
            window.setTimeout(function ()
            {
                $all
                    .fadeTo(settings.fadeInSpeed, 1, function ()
                    {
                        $body.removeClass('is-loading');
                        $all.fadeTo(0, 1);
                    });
            }, settings.fadeInSpeed);
        });

        // Forms (IE<10).
        var $form = $('form');
        if ($form.length > 0)
        {

            $form.find('.form-button-submit')
                .on('click', function ()
                {
                    $(this).parents('form').submit();
                    return false;
                });

            //            $form.find('#directions-input input[type=submit]')
            //                .on('click', function () {
            //                    $(this).parents('form').submit();
            //                    return false;
            //                });

            if (skel.vars.IEVersion < 10)
            {
                $.fn.n33_formerize = function ()
                {
                    var _fakes = new Array(),
                        _form = $(this);
                    _form.find('input[type=text],textarea').each(function ()
                    {
                        var e = $(this);
                        if (e.val() == '' || e.val() == e.attr('placeholder'))
                        {
                            e.addClass('formerize-placeholder');
                            e.val(e.attr('placeholder'));
                        }
                    }).blur(function ()
                    {
                        var e = $(this);
                        if (e.attr('name').match(/_fakeformerizefield$/)) return;
                        if (e.val() == '')
                        {
                            e.addClass('formerize-placeholder');
                            e.val(e.attr('placeholder'));
                        }
                    }).focus(function ()
                    {
                        var e = $(this);
                        if (e.attr('name').match(/_fakeformerizefield$/)) return;
                        if (e.val() == e.attr('placeholder'))
                        {
                            e.removeClass('formerize-placeholder');
                            e.val('');
                        }
                    });
                    _form.find('input[type=password]').each(function ()
                    {
                        var e = $(this);
                        var x = $($('<div>').append(e.clone()).remove().html().replace(/type="password"/i, 'type="text"').replace(/type=password/i, 'type=text'));
                        if (e.attr('id') != '') x.attr('id', e.attr('id') + '_fakeformerizefield');
                        if (e.attr('name') != '') x.attr('name', e.attr('name') + '_fakeformerizefield');
                        x.addClass('formerize-placeholder').val(x.attr('placeholder')).insertAfter(e);
                        if (e.val() == '') e.hide();
                        else x.hide();
                        e.blur(function (event)
                        {
                            event.preventDefault();
                            var e = $(this);
                            var x = e.parent().find('input[name=' + e.attr('name') + '_fakeformerizefield]');
                            if (e.val() == '')
                            {
                                e.hide();
                                x.show();
                            }
                        });
                        x.focus(function (event)
                        {
                            event.preventDefault();
                            var x = $(this);
                            var e = x.parent().find('input[name=' + x.attr('name').replace('_fakeformerizefield', '') + ']');
                            x.hide();
                            e.show().focus();
                        });
                        x.keypress(function (event)
                        {
                            event.preventDefault();
                            x.val('');
                        });
                    });
                    _form.submit(function ()
                    {
                        $(this).find('input[type=text],input[type=password],textarea').each(function (event)
                        {
                            var e = $(this);
                            if (e.attr('name').match(/_fakeformerizefield$/)) e.attr('name', '');
                            if (e.val() == e.attr('placeholder'))
                            {
                                e.removeClass('formerize-placeholder');
                                e.val('');
                            }
                        });
                    }).bind("reset", function (event)
                    {
                        event.preventDefault();
                        $(this).find('select').val($('option:first').val());
                        $(this).find('input,textarea').each(function ()
                        {
                            var e = $(this);
                            var x;
                            e.removeClass('formerize-placeholder');
                            switch (this.type)
                            {
                            case 'submit':
                            case 'reset':
                                break;
                            case 'password':
                                e.val(e.attr('defaultValue'));
                                x = e.parent().find('input[name=' + e.attr('name') + '_fakeformerizefield]');
                                if (e.val() == '')
                                {
                                    e.hide();
                                    x.show();
                                }
                                else
                                {
                                    e.show();
                                    x.hide();
                                }
                                break;
                            case 'checkbox':
                            case 'radio':
                                e.attr('checked', e.attr('defaultValue'));
                                break;
                            case 'text':
                            case 'textarea':
                                e.val(e.attr('defaultValue'));
                                if (e.val() == '')
                                {
                                    e.addClass('formerize-placeholder');
                                    e.val(e.attr('placeholder'));
                                }
                                break;
                            default:
                                e.val(e.attr('defaultValue'));
                                break;
                            }
                        });
                        window.setTimeout(function ()
                        {
                            for (x in _fakes) _fakes[x].trigger('formerize_sync');
                        }, 10);
                    });
                    return _form;
                };
                $form.n33_formerize();
            }

            // Custom select.
            $form.find('.select select')
                .on('focus', function ()
                {
                    $(this).parent().addClass('focus');
                })
                .on('blur', function ()
                {
                    $(this).parent().removeClass('focus');
                });

        }

        // CSS polyfills (IE<9).
        if (skel.vars.IEVersion < 9)
            $(':last-child').addClass('last-child');

        // Gallery.
        $('.gallery').poptrox(
        {
            baseZIndex: 10001,
            useBodyOverflow: false,
            usePopupEasyClose: false,
            overlayColor: '#1f2328',
            overlayOpacity: 0.65,
            usePopupDefaultStyling: false,
            usePopupCaption: true,
            popupLoaderText: '',
            windowMargin: (skel.isActive('mobile') ? 5 : 50),
            usePopupNav: true
        });

        // Section transitions.
        if (settings.sectionTransitions)
        {


            // Intro.
            $('#intro')
                .scrollwatch(
                {
                    delay: 50,
                    range: 0.5,
                    anchor: 'center',
                    init: function (t)
                    {
                        t.addClass('inactive');
                    },
                    on: function (t)
                    {
//                        console.log("scrolled onto Intro");
                        t.removeClass('inactive');
                        $logo.addClass('inactive');
//                        scrollTM('#' + t.attr('id'));
                    },
                    off: function (t)
                    {
                        t.addClass('inactive');
                        $logo.removeClass('inactive');
                    }
                });

            $('.main.style2')
                .scrollwatch(
                {
                    delay: 50,
                    range: 0.5,
                    anchor: 'center',
                    init: function (t)
                    {
                        t.addClass('inactive');

                    },
                    on: function (t)
                    {
                        t.removeClass('inactive');
                        $logo.removeClass('inactive');
//                        scrollTM('#' + t.attr('id'));
                    },
                    off: function (t)
                    {
                        t.addClass('inactive');
                    }
                });


            // Gallery.
            $('#gallery')
                .scrollwatch(
                {
                    delay: 25,
                    range: 0.6,
                    anchor: 'center',
                    init: function (t)
                    {
                        t.find('.row.images').addClass('inactive');
                    },
                    on: function (t)
                    {
                        var rows = t.find('.row.images'),
                            length = rows.length,
                            n = 0;
                        rows.each(function ()
                        {
                            var row = $(this);
                            window.setTimeout(function ()
                            {
                                row.removeClass('inactive');
                            }, 100 * (length - n++));
                        });
                        $logo.removeClass('inactive');
                    },
                    off: function (t)
                    {
                        var rows = t.find('.row.images'),
                            length = rows.length,
                            n = 0;
                        
                        rows.each(function ()
                        {
                            var row = $(this);
                            window.setTimeout(function ()
                            {
                                row.addClass('inactive');
                            }, 100 * (length - n++));
                        });
                    }
                });

            // Contact.
            $('#contact')
                .scrollwatch(
                {
                    delay: 25,
                    range: 0.5,
                    anchor: 'center',
                    init: function (t)
                    {
                        t.addClass('inactive');
                        $logo.removeClass('inactive');
                    },
                    on: function (t)
                    {
                        t.removeClass('inactive');
                        $logo.removeClass('inactive');
//                        scrollTM('#' + t.attr('id'));
                    },
                    off: function (t)
                    {
                        t.addClass('inactive');
                    }
                });

        }

        // Events.

        // Change (skel).
        skel.change(function ()
        {

            // Force touch mode if we're in mobile.
            if (skel.isActive('mobile'))
                $body.addClass('touch');
            else if (!skel.vars.isTouch)
                $body.removeClass('touch');

            // Section transitions.
            if (settings.sectionTransitions)
            {

                if (skel.isActive('mobile'))
                {

                    // Intro.
                    $('#intro')
                        .scrollwatchSuspend();

                    // Generic sections.
                    $('.main.style1')
                        .scrollwatchSuspend();

                    $('.main.style2')
                        .scrollwatchSuspend();

                    // Gallery.
                    $('#gallery')
                        .scrollwatchSuspend();

                    // Contact.
                    $('#contact')
                        .scrollwatchSuspend();

                }
                else
                {

                    // Intro.
                    $('#intro')
                        .scrollwatchResume();
                    // Generic sections.
                    $('.main.style1')
                        .scrollwatchResume();

                    $('.main.style2')
                        .scrollwatchResume();

                    // Gallery.
                    $('#gallery')
                        .scrollwatchResume();

                    // Contact.
                    $('#contact')
                        .scrollwatchResume();

                }

            }

        });

        // Resize.
        var resizeTimeout, resizeScrollTimeout;

        $window.resize(function ()
        {

            // Disable animations/transitions.
            $body.addClass('is-loading');

            window.clearTimeout(resizeTimeout);

            resizeTimeout = window.setTimeout(function ()
            {

                // Update scrolly links.
                $('a[href^=#]').scrolly(1500, $header.outerHeight() - 1);

                // Resize fullscreen elements.
                if (settings.fullScreen && !skel.isActive('mobile'))
                {
                    $('.fullscreen').each(function ()
                    {

                        var $t = $(this),
                            $c = $t.children('.content'),
                            x = Math.max(100, Math.round(($window.height() - $c.outerHeight() - $header.outerHeight()) / 2) + 1);
                        //x = Highest returned number from this rounded up calc: (Window.height - .content.Height - #header.height) / 2 + 1;
                        //x = (957 - 448 - 68) = 441 / 2 = 220.5 + 1
                        //x = 441 / 2 = 220.5
                        //x = 220.5 + 1 = 221.5
                        //x = Round(221.5) = 222
                        //x = 222

                        if ($t.attr('id') == 'intro')
                        {
                            $t
                                .css('padding-top', '')
                                .css('padding-bottom', '');
                            var introHeight = Math.max(100, Math.round($window.height() - $header.outerHeight()));
                            $t.find('div.content').css('height', introHeight); //450 when / 2

                        }
                        else if ($t.attr('id') == 'directions')
                        {
                            $t
                                .css('padding-top', x)
                                .css('padding-bottom', x);

                        }
                        else
                        {
                            $t
                                .css('padding-top', x)
                                .css('padding-bottom', x);
                        }


                    });
                }
                else
                    $('.fullscreen')
                    .css('padding-top', '')
                    .css('padding-bottom', '');


                // Re-enable animations/transitions.
                window.setTimeout(function ()
                {
                    $body.removeClass('is-loading');
                    $window.trigger('scroll');
                }, 0);

            }, 100);

        });

        // Trigger events on load.
        $window.load(function ()
        {
            $window
                .trigger('resize')
                .trigger('scroll');
        });
        
        $('a[href^=#]').click(function(){
            scrollSnapEnabled = false;
            var clickedItem = this;
//            console.log('clickedItem : ' + clickedItem);
            var clickedItemAttr = clickedItem.hash;
//            console.log('clickedItemAttr : ' + clickedItemAttr);
//            console.log(this.hash);
        })
        

    });

    function scrollTM(anchor)
    {
          if (anchor != undefined)   {
//              $('a[href='+anchor+']').scrolly();
//              $('a[href='+anchor+']').scrollTop(0);
          }   
    }
    
    

})(jQuery);