$(function() {
    $('.blog-article__slider').slick({
      prevArrow:'<button type="button" class="slick-prev"><svg xmlns="http://www.w3.org/2000/svg" width="6" height="11" viewBox="0 0 6 11"><g><g><path fill="#8d8d8d" d="M.64 5.163a.75.75 0 0 1 .178-.492L4.559.387a.556.556 0 0 1 .863 0 .77.77 0 0 1 0 .987L2.11 5.164l3.31 3.79a.77.77 0 0 1 0 .986.556.556 0 0 1-.862 0L.818 5.656a.748.748 0 0 1-.178-.493z"/></g></g></svg></button>',
      nextArrow:'<button type="button" class="slick-next"><svg xmlns="http://www.w3.org/2000/svg" width="5" height="11" viewBox="0 0 5 11"><g><g><path fill="#8d8d8d" d="M5.005 5.179a.75.75 0 0 0-.18-.494L1.06.388a.561.561 0 0 0-.868 0 .772.772 0 0 0 0 .99l3.332 3.801L.193 8.98a.772.772 0 0 0 0 .99c.24.273.628.273.867 0l3.765-4.297a.75.75 0 0 0 .18-.495z"/></g></g></svg></button>',
        infinite:false
        // responsive: [
        //   {
        //     breakpoint: 1160,
        //     settings: {
        //       arrows:false
        //     }
        //   }
        // ]
        
      });
   

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
      
          
       // Rate
      
        $(".products__rate").rateYo({
          starWidth: "18px",
          normalFill: "#ccccce",
          ratedFill: "#ffc35b",
          readOnly: true
        });


        
      $(".js-range-slider").ionRangeSlider({
        type: "double",
        onChange: function (data) {
          $('.filter-price__from').text(data.from)
          $('.filter-price__to').text(data.to)
      },
      onStart: function (data) {
        $('.filter-price__from').text(data.from)
        $('.filter-price__to').text(data.to)
    },
       
      });
    
 

  // Timer

    if(document.querySelector('.promo')) {

    function getTimeRemaining(endtime){
      const total = Date.parse(endtime) - Date.parse(new Date())
      const days = Math.floor(total/ (1000*60*60*24))
      const hours = Math.floor((total/(1000*60*60))%24)
      const minutes = Math.floor((total/(1000*60))%60)
      const seconds = Math.floor((total/1000)%60)
  
      return {
          total,
          days,
          hours,
          minutes,
          seconds
      }
  }
  function getZero (num) {
      if (num<=9) {
          return `0${num}`
      }else {
          return num
      }
  }
  function setClock (selector, endtime) {
      const timer =document.querySelector(selector),
      days=timer.querySelector('.days'),
      hours=timer.querySelector('.hours'),
      minutes=timer.querySelector('.minutes'),
      seconds=timer.querySelector('.seconds'),
      timeInterval=setInterval(updateClock,1000);
  
      updateClock()
  
      function updateClock () {
          const timeObj=getTimeRemaining(endtime)
  
          days.textContent=getZero(timeObj.days)
          hours.textContent=getZero(timeObj.hours)
          minutes.textContent=getZero(timeObj.minutes)
          seconds.textContent=getZero(timeObj.seconds)
  
          if(timeObj.total<=0) {
              clearInterval(timeInterval)
          }
      }
  
      
  }
  
    const deadline = $('.promo__timer').attr('data-time')
    setClock('.promo__timer', deadline)

  
  }

  $('.select-style').styler();

  $('.shop-filters__btn').on('click',function () {
    $('.shop-filters__btn').removeClass('active')
    $(this).addClass('active')
  })

  $('.button-list').on('click',function () {
    $('.shop .products-item').addClass('products-item--list')
  })

  $('.button-grid').on('click',function () {
    $('.shop .products-item').removeClass('products-item--list')
  })
 

   
})