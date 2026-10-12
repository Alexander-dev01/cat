  
  $(document).ready(function(){
  $('.nomera_slider').slick({
      infinite: true,
      arrows:true,
      dots: true,
      slidesToShow: 1,
      slidesToScroll: 1,

      waitForAnimate: false,

      autoplay: false,
      autoplaySpeed: 1500,
      pauseOnHover:true,
      pauseOnDotsHover:true,
      speed:2000,

    });
  $('.reviews_slider').slick({
      infinite: false,
      arrows:true,
      dots: true,
      slidesToShow: 1,
      slidesToScroll: 1,

      waitForAnimate: false,

      autoplay: false,
      autoplaySpeed: 1500,
      pauseOnHover:true,
      pauseOnDotsHover:true,
      speed:2000,

    });

    
  })

  