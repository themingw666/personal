/*
 * Copyright (c) 2024 Frenify
 * Author: Frenify
 * This file is made for CURRENT THEME
*/


/*

	@Author: Frenify
	@URL: http://themeforest.net/user/frenify


	This file contains the jquery functions for the actual theme, this
	is the file you need to edit to change the structure of the
	theme.

	This files contents are outlined below.

*/


// All other theme functions
(function ($){

	"use strict";
	
    var TokyoInit 		= {
		
		
		
		pageNumber: 1,
		
        init: function () {
			this.cursor();
			this.moreMenu();
			this.menuScroll();
			this.hamburgerOpener__Mobile();
			this.submenu__Mobile();
			this.imgToSVG();
			this.isotopeMasonry();
			this.dataFnBgImg();
			this.toTopJumper();
			this.fixedTotopScroll();
			this.tokyo_fn_fixedsub();
			this.tokyo_fn_fixedsubReCalc();
			this.site_skin();
			this.share();
			this.pricing();
        },

		pricing: function(){
			$(document).on('click', '.fn__pricing_tables .pt_filter a', function(e) {
				var element		= $(this),
					parent		= element.closest('.fn__pricing_tables');
				if(!element.hasClass('active')){
					var ccc		= parent.find('.ccc');
					var w 		= element.outerWidth();
					ccc.css({width: w,left: element.position().left});
					if(element.hasClass('monthly')){
						parent.attr('data-active', 'monthly');
					}else{
						parent.attr('data-active', 'yearly');
					}
					element.addClass('active');
					element.siblings().removeClass('active');
				}
				return false;
			});
		},

		share: function(){
			$('.tokyo_fn_helper_icons .share').off().on('click',function(){
				$('.tokyo_fn_helper_icons').addClass('share_active');
				return false;
			});
			$('.tokyo_fn_helper_icons .share_back').off().on('click',function(){
				$('.tokyo_fn_helper_icons').removeClass('share_active');
				return false;
			});
			$('.tokyo_fn_helper_icons .featured,.tokyo_fn_mobilemenu_wrap .featured').off().on('click',function(){
				$('body').addClass('featured_active');
				return false;
			});
			$('.fn__featured_posts .featured_closer,.fn__featured_posts_overlay').off().on('click',function(){
				$('body').removeClass('featured_active');
				setTimeout(function(){
					$('.fn__featured_posts').scrollTop(0);
				},500)
				return false;
			});
		},

		moreMenu: function(){
			$('.tokyo_fn_main_nav').each(function(){
				var nav = $(this);
				nav.find('>li').each(function(){
					var e = $(this);
					var text = e.children('a').text();
					if(text.charAt(0) === '-' && e.index() != 0){
						if(!e.prev().hasClass('menu-item-has-children')){
							e.prev().children('a').append($('.fn__header_icon').html());
							e.prev().addClass('menu-item-has-children').append('<ul class="sub-menu"></ul>');
						}
						e.children('a').text(text.substring(1));
						e.prev().find('.sub-menu').append('<li role="menuitem">'+e.html()+'</li>');
						e.remove();
					}
				});
			});
				
			$('.vert_menu_list > li').each(function(){
				var e = $(this);
				var text = e.children('a').text();
				if(text.charAt(0) === '-' && e.index() != 0){
					if(!e.prev().hasClass('menu-item-has-children')){
						e.prev().children('a').append($('.fn__header_icon').html());
						e.prev().addClass('menu-item-has-children').append('<ul class="sub-menu"></ul>');
					}
					e.children('a').text(text.substring(1));
					e.prev().find('.sub-menu').append('<li role="menuitem">'+e.html()+'</li>');
					e.remove();
				}
			});
			
		},

		site_skin: function(){
			$(document).on('click', '.fn__site_skins', function(e) {
				e.preventDefault();
				if($('html').attr('data-site-skin') === 'light'){
					$('html').attr('data-site-skin','dark');
					localStorage.tokyo_skin = 'dark';
					document.querySelector("script[data-color-scheme]").setAttribute("data-color-scheme", 'dark');
				}else{
					$('html').attr('data-site-skin','light');
					localStorage.tokyo_skin = 'light';
					document.querySelector("script[data-color-scheme]").setAttribute("data-color-scheme", 'light');
				}
				return false;
			});
		},
		
		tokyo_fn_fixedsub: function(){
			var self				= this;
			var fixedsub 			= $('#tokyo_fn_fixedsub');
			var li					= $('ul.tokyo_fn_main_nav li');
			var leftpartW			= $('.tokyo_fn_header').outerWidth();
			var rightpart			= $('.tokyo_fn_page, .tokyo_fn_header .fn_logo');
			var adminBar 			= 0;
			if($('body').hasClass('admin-bar')){
				adminBar  = 32;
			}
			
			fixedsub.css({left:leftpartW});


			li.on('mouseenter', function(){
				var parentLi 		= $(this);
				var subMenu			= parentLi.children('ul.sub-menu');
				var subMenuHtml 	= subMenu.html();
				//parentLi;
				if(subMenu.length){
					li.removeClass('hovered');
					parentLi.addClass('hovered').parent().addClass('hovered');
					fixedsub.removeClass('opened').children('ul').html('').html(subMenuHtml);
					fixedsub.addClass('opened');
				}else{
					fixedsub.removeClass('opened');
					parentLi.removeClass('hovered').parent().removeClass('hovered');
				}
				var topOffSet 		= parentLi.offset().top;
				var menuBar			= $('.tokyo_fn_header');
				var menuBarOffSet	= menuBar.offset().top;
				var asd				= topOffSet-menuBarOffSet+adminBar;
				leftpartW = $('.tokyo_fn_header').outerWidth();

				fixedsub.css({top:asd,left:leftpartW});
				self.tokyo_fn_fixedsub_abc(rightpart,fixedsub,li);
			});
			self.tokyo_fn_fixedsub_abc(rightpart,fixedsub,li);
		},

		tokyo_fn_fixedsub_abc: function(rightpart,fixedsub,li){
			rightpart.on('mouseenter', function(){
				fixedsub.removeClass('opened');
				li.removeClass('hovered').parent().removeClass('hovered');
			});
		},

		tokyo_fn_fixedsubReCalc: function(){
			var fixedsub 	= $('#tokyo_fn_fixedsub');
			var leftpartW	= $('.tokyo_fn_header').outerWidth();
			fixedsub.css({left:leftpartW});
		},
		
		runPreloader: function(){
			var  speed = 500,self = this;
			setTimeout(function(){self.preloader();},speed);
		},
		
		preloader: function(){
			var isMobile 	= /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ? true : false;
			var preloader 	= $('.tokyo_fn_pageloader');
			if (!isMobile) {
				setTimeout(function() {
					preloader.addClass('fn_ready');
				}, 800);
				setTimeout(function() {
					preloader.remove();
				}, 2000);
			}else{
				preloader.remove();
			}
		},
		
		menuScroll: function(){
			var H 				= $(window).height(),
				header			= $('.tokyo_fn_header'),
				nav				= header.find('.header_nav'),
				logoH			= header.find('.fn_logo').outerHeight(true,true),
				searchH			= header.find('.search_wrap').outerHeight(true,true),
				copyH			= header.find('.header_copyright').outerHeight(true,true),
				adminBarH		= 0;
			if($('body').hasClass('admin-bar')){
				adminBarH	= 32;
			}
			nav.css({maxHeight: (H-logoH-searchH-copyH-adminBarH-100) + 'px'});
		},
		
		
		cursor: function () {
			var myCursor = $('.frenify-cursor');
			if (myCursor.length) {
				if ($("body").length) {
					const e = document.querySelector(".cursor-inner"),
						t = document.querySelector(".cursor-outer");
					var n, i = 0,W = 0,intro = 0,
						o = !1;
					if($('.tokyo_fn_intro').length){intro=1;}
					
					var buttons = ".fn__featured_posts_overlay, .fn_cs_accordion .acc_head, .tokyo_fn_popupshare .share_closer, .tokyo_fn_header .fn_finder, .tokyo_fn_header .fn_trigger, a, input[type='submit'], .cursor-link, button";
					var sliders = ".owl-carousel, .swiper-container, .cursor-link";
					// link mouse enter + move
					window.onmousemove = function(s) {
						o || (t.style.transform = "translate(" + s.clientX + "px, " + s.clientY + "px)"), e.style.transform = "translate(" + s.clientX + "px, " + s.clientY + "px)", n = s.clientY, i = s.clientX
					}, $("body").on("mouseenter", buttons, function() {
						e.classList.add("cursor-hover"), t.classList.add("cursor-hover")
					}), $("body").on("mouseleave", buttons, function() {
						$(this).is("a") && $(this).closest(".cursor-link").length || (e.classList.remove("cursor-hover"), t.classList.remove("cursor-hover"))
					}), e.style.visibility = "visible", t.style.visibility = "visible";
					
					
					// Intro functions
					var intro_left 	= '.tokyo_fn_intro .left';
					var intro_right = '.tokyo_fn_intro .right';
					var intro_price = '.tokyo_fn_intro_fixed_price .anim';
					$('body').on('mouseenter', intro_left, function(){
						e.classList.add('left-demo');
						t.classList.add('left-demo');
					}).on('mouseleave', intro_left,function(){
						e.classList.remove('left-demo');
						t.classList.remove('left-demo');
					});
					$('body').on('mouseenter', intro_right, function(){
						e.classList.add('right-demo');
						t.classList.add('right-demo');
					}).on('mouseleave', intro_right,function(){
						e.classList.remove('right-demo');
						t.classList.remove('right-demo');
					});
					$('body').on('mouseenter', intro_price, function(){
						e.classList.add('intro-price');
						t.classList.add('intro-price');
					}).on('mouseleave', intro_price,function(){
						e.classList.remove('intro-price');
						t.classList.remove('intro-price');
					});
					
					// slider mouse enter
					$('body').on('mouseenter', sliders, function(){
						e.classList.add('cursor-slider');
						t.classList.add('cursor-slider');
					}).on('mouseleave', sliders,function(){
						e.classList.remove('cursor-slider');
						t.classList.remove('cursor-slider');
					});
					
					// slider mouse hold
					$('body').on('mousedown', sliders, function(){
						e.classList.add('mouse-down');
						t.classList.add('mouse-down');
					}).on('mouseup', sliders, function(){
						e.classList.remove('mouse-down');
						t.classList.remove('mouse-down');
					});
				}
			}
		},
		
		fixedTotopScroll: function(){
			var totop			= $('.tokyo_fn_totop');
			var height 			= 400;
			if(totop.length){
				if($(window).scrollTop() > height){
					totop.addClass('scrolled');
				}else{
					totop.removeClass('scrolled');
				}
			}
		},
		
		
		toTopJumper: function(){
			var totop		= $('.tokyo_fn_footer .footer_totop a,a.tokyo_fn_totop,.tokyo_fn_footer .footer_right_totop a');
			if(totop.length){
				totop.on('click', function(e) {
					e.preventDefault();		
					$("html, body").animate(
						{ scrollTop: 0 }, 'slow');
					return false;
				});
			}
		},
		
		
		submenu__Mobile: function(){
			var nav 						= $('ul.vert_menu_list, .widget_nav_menu ul.menu');
			var mobileAutoCollapse			= $('.tokyo-fn-wrapper').data('mobile-autocollapse');
			nav.each(function(){
				$(this).find('a').off().on('click', function(e){
					var element 			= $(this);
					var parentItem			= element.parent('li');
					var parentItems			= element.parents('li');
					var parentUls			= parentItem.parents('ul.sub-menu');
					var subMenu				= element.next();
					var allSubMenusParents 	= nav.find('li');

					allSubMenusParents.removeClass('opened');

					if(subMenu.length){
						e.preventDefault();

						if(!(subMenu.parent('li').hasClass('active'))){
							if(!(parentItems.hasClass('opened'))){parentItems.addClass('opened');}

							allSubMenusParents.each(function(){
								var el = $(this);
								if(!el.hasClass('opened')){el.find('ul.sub-menu').slideUp();}
							});

							allSubMenusParents.removeClass('active');
							parentUls.parent('li').addClass('active');
							subMenu.parent('li').addClass('active');
							subMenu.slideDown();


						}else{
							subMenu.parent('li').removeClass('active');
							subMenu.slideUp();
						}
						return false;
					}
					if(mobileAutoCollapse === 'enable'){
						if(nav.parent().parent().hasClass('opened')){
							nav.parent().parent().removeClass('opened').slideUp();
							$('.tokyo_fn_mobilemenu_wrap .hamburger').removeClass('is-active');
						}
					}
				});
			});
		},
		
		hamburgerOpener__Mobile: function(){
			var hamburger		= $('.tokyo_fn_mobilemenu_wrap .hamburger');
			hamburger.off().on('click',function(){
				var element 	= $(this);
				var menupart	= $('.tokyo_fn_mobilemenu_wrap .mobilemenu');
				if(element.hasClass('is-active')){
					element.removeClass('is-active');
					menupart.removeClass('opened');
					menupart.slideUp(500);
				}else{
					element.addClass('is-active');
					menupart.addClass('opened');
					menupart.slideDown(500);
				}return false;
			});
		},
		
		
		
		imgToSVG: function(){
			$('img.fn__svg').each(function(){
				var img 		= $(this);
				var imgClass	= img.attr('class');
				var imgURL		= img.attr('src');

				$.get(imgURL, function(data) {
					var svg 	= $(data).find('svg');
					if(typeof imgClass !== 'undefined') {
						svg 	= svg.attr('class', imgClass+' replaced-svg');
					}
					img.replaceWith(svg);

				}, 'xml');

			});	
		},
		
		
		dataFnBgImg: function(){
			var bgImage 	= $('*[data-fn-bg-img]');
			bgImage.each(function(){
				var element = $(this);
				var attrBg	= element.attr('data-fn-bg-img');
				var bgImg	= element.data('fn-bg-img');
				if(typeof(attrBg) !== 'undefined'){
					element.addClass('frenify-ready').css({backgroundImage:'url('+bgImg+')'});
				}
			});
		},
		
		isotopeMasonry: function(){
			var masonry = $('.tokyo_fn_masonry');
			if($().isotope){
				masonry.each(function(){
					$(this).isotope({
						itemSelector: '.tokyo_fn_masonry_in',
						masonry: {}
					});
				});
			}
		},
		
    };
	
	
	
	// ready functions
	$(document).ready(function(){
		TokyoInit.init();
	});
	
	// resize functions
	$(window).on('resize',function(e){
		e.preventDefault();
		TokyoInit.tokyo_fn_fixedsubReCalc();
		TokyoInit.menuScroll();
		TokyoInit.isotopeMasonry();
	});
	
	// scroll functions
	$(window).on('scroll', function(e) {
		e.preventDefault();
		TokyoInit.fixedTotopScroll();
    });
	
	// load functions
	$(window).on('load', function(e) {
		e.preventDefault();
		TokyoInit.runPreloader();
		TokyoInit.isotopeMasonry();
		setTimeout(function(){
			TokyoInit.isotopeMasonry();
			var scripto = document.querySelector("script[data-color-scheme]");
			if(scripto != null){scripto.setAttribute("data-color-scheme", localStorage.tokyo_skin);}
		},100);
	});
	
})(jQuery);