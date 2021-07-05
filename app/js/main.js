$(function() {
    // $('.top-slider__inner').slick({
        
    //     // responsive: [
    //     //   {
    //     //     breakpoint: 1160,
    //     //     settings: {
    //     //       arrows:false
    //     //     }
    //     //   }
    //     // ]
        
    //   });
   

      $('.hamburger, .menu__list-link').on('click',function() {
        $('.hamburger').toggleClass('active')
        $('.menu').toggleClass('active')
      })

      $(".menu").on("click", function (e) {
          e.preventDefault();
          const id  = $(e.target).attr('href');
          const top = $(id).offset().top;
          $('body,html').animate({scrollTop: top}, 1500);
        });

  
      // Tabs
      $('.tab').on('click', function() {
        $(this)
          .addClass('tab--active').siblings().removeClass('tab--active')
          .closest('.tabs-wrapper').find('.tab-content')
          .removeClass('tab-content--active')
          .eq($(this).index())
          .addClass('tab-content--active');
      });
  
})