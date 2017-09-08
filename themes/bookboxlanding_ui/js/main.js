var category_json = 'https://lib.bookbox.ua/json/category',
    hits_json = 'https://lib.bookbox.ua/json/hits',
    menu = '<ul><li class="hits category active"><a href="#">Хіти</a></li>',
    books = '',
    categories,
    hits;


function getRequests() {
    getHits();
    getCategory();
}

function getCategory() {
    $.getJSON( category_json, {format: "json"})
        .done(function( data ) {
            categories = data;
            for(var i=0; i < categories.length; i++) {

                for(var j=0; j < categories[i].children.length; j++) {
                    var tid_json = category_json + '/' + categories[i].children[j].tid;
                    //console.log(categories[i].children[j].name);

                    $.getJSON( tid_json, {format: "json", async: false})
                        .done(function( data0 ) {

                            if(data0.books.length > 0) {
                                //console.log(data0.books);
                            }
                        });
                }
            }
        });
}

function getHits() {
    $.getJSON( hits_json, {format: "json"})
       .done(function( data0 ) {
           hits = data0.hits;
           //console.log(hits)
       });
}

function buildBookList() {
    books = books + '<li><ul class="books-container">';

    for(var n=0; n < hits.length; n++) {
        books = books + '<li class="book-block"><img src="' + hits[n].node.cover.src + '" />';
        books = books + '<h5>' + hits[n].node.title + '</h5>';
        books = books + '<h6>' + hits[n].node.автор + '</h6></li>';
    }
  checkBookName();
    books = books + '</ul></li>';
}

function buildBookBlocks() {
  for(var b = 1; b<7; b++) {
    //console.log('book numeration works!');

    var bookBlock = '#books .books-container .book-block:nth-child(' + b + ')';
    //console.log(bookBlock);

    $(bookBlock).addClass('num-'+1);
    checkBookName();
  }

  var bookListPages = Math.ceil($('.books-container .book-block').length/6);
  for (var p = 1; p <= bookListPages; p++) {
    $('.list-page-indicators ul').append('<li' + ' class="indicator indicator-' + p + '">'+ p + '</li>');
  }

  $('.list-page-indicators li:first-child').addClass('active');

  if ($('.list-page-indicators li').length > 4) {
    for (p = 4; p < $('.list-page-indicators li').length; p++) {
      $('.list-page-indicators li:nth-child(' + p + ')').addClass('hidden');
    }

    $("<li class='dots'>...</li>").insertBefore($(".list-page-indicators ul li:last-child"));
    $(".list-page-indicators").prepend('<span class="left">◀</span>');
    $(".list-page-indicators").append('<span class="right is">▶</span>');
  }
}

function checkBookName() {
  for(var tb = 0; tb<$('.books-container .book-block').length; tb++) {
    // console.log('checking book name');
    if ($('.book-block:nth-child('+ tb +' ) h5').text().length > 32) {
      //console.log('book name is too long');
      var newBookName = $('.book-block:nth-child('+ tb +' ) h5').text().substr(0, 31);
      $('.book-block:nth-child('+ tb +' ) h5').text(newBookName + '...');
    }
  }
}

function buildCategory() {

  for(var i=0; i < categories.length; i++) {
    //console.log(data[i]);

    menu = menu + '<li class="category"><a class="category-title" href="#">' + categories[i].name + '</a>';
    menu = menu + '<ul class="child-categories">';
    //console.log(data[i].children.length);

    for(var j=0; j < categories[i].children.length; j++) {
      menu = menu + '<li class="child-category"><a href="#" class="child-category-title" data-id="'+ categories[i].children[j].tid +'">' + categories[i].children[j].name + '</a></li>';

    }

    menu = menu + '</ul></li>';
  }

  menu = menu + '</ul>';
  $('.books-nav').html(menu);

  books = books +'<div class="list-page-indicators"><ul></ul></div>';
  $('.books-list').html(books);
  initListeners();
}

// function changeFaqColor() {
//   console.log($('.faq-tab-content.active .panel.panel-default:nth-child(2)').height);
//   var faqIndex =$('.faq-tab .faq-tab-content.active .panel.panel-default');
//   for (var faqCount = 1; faqCount <= faqIndex.length; faqCount++) {
//     if ($('.faq-tab-content.active .panel.panel-default:nth-child('+ faqCount +')').outerHeight > 2000) {
//       $('.faq-tab-content.active .panel.panel-default:nth-child .panel-heading').css('opacity', '.6');
//       $('.faq-tab-content.active .panel.panel-default:nth-child('+ faqCount +') .panel-heading').css('opacity', '1');
//     } else {
//       $('.faq-tab-content.active .panel.panel-default:nth-child('+ faqCount +') .panel-heading').css('opacity', '1');
//     }
//   }
// }


$(".faq-tab-menu>div.list-group>a").click(function(e) {
    e.preventDefault();
    $(this).siblings('a.active').removeClass("active");
    $(this).addClass("active");
    var index = $(this).index();
    $(".faq-tab>.faq-tab-content").removeClass("active");
    $(".faq-tab>.faq-tab-content").eq(index).addClass("active");
});

$('.panel-collapse').on('shown.bs.collapse', function () {
    $('.faq-tab-content.active .panel-collapse').not(this).removeClass('in');
});

$(document).ready (function() {
    //console.log('run');

    getRequests();
});

$(document).ajaxStop(function () {
  if ($('.books-nav > ul').length !== 1) {
    buildBookList();
    buildCategory();
    buildBookBlocks();

  }
});

function initListeners() {
  //Books Functions

  if( $(window).width() >= 768 ) {
    $(document).on('click', '.page-main .books-nav li.category .category-title', function(e) {
      e.preventDefault();
      e.stopPropagation();
      //console.log($(this).parent());
      if ($(this).parent().hasClass('active')) {
        $('.page-main .books-nav li.category.active .child-categories').animate({height: 0}, 200);
        $(this).parent().removeClass('active');
      } else {
      // тут скрывается предыдущая.
      $('.page-main .books-nav li.category.active .child-categories').animate({height: 0}, 200);
      // закрывается предыдущая.
        $('.page-main .books-nav li.category.active .child-categories .child-category-title').removeClass('active');
        $('.page-main .books-nav li.category.active').removeClass('active');
      $(this).parent().addClass('active');
      $('.page-main .books-nav li.category.active .child-categories').animate({height: $('.page-main .books-nav li.category.active .child-categories')[0].scrollHeight}, 200);
       }
      return;
    });
    $(document).on('click', '.page-main .books-nav li.category.active .child-categories .child-category-title', function() {
      $('.page-main .books-nav li.category.active .child-categories .child-category-title').removeClass('active');
      $(this).addClass('active')
    });
  } else {
    //If device width <768px

    $('.books-nav').prepend('<p class="filters">Фільтр по категоріям</p>');
    $('.books-nav > ul .hits').addClass('category-title');
    // $('.books-nav > ul').prepend('<li class="hits category"><a href="#">Хіти</a></li>');
    $('.books-nav > ul > li:not(.active)').addClass('hidden');
    $('.books-nav > ul').css('height', $('.books-nav .category.active').outerHeight());
    $('.books-nav > ul').css('overflow', 'hidden');
    $('.books-nav > ul > li.active >a').css('text-align','right');

    $(document).on('click', '.page-main .books-nav li.category.active > a', function(e) {
      e.preventDefault();
       $('.books-nav > ul > li.hidden').removeClass('hidden');
      $('.books-nav > ul > li.active:not(.hits) >a').css('text-align','left');
      if ($('.books-nav li.category').hasClass('hits')) {

        if ($('.books-nav > ul').outerHeight() == '55') {
          $('.books-nav > ul').animate({height: $('.books-nav > ul')[0].scrollHeight}, 200);
        } else {
          $('.books-nav > ul').animate({height: '55px'}, 200);
        }

      } else {
        $(this).parent().css('height',  (55 + $('.books-nav .category.active .child-categories')[0].scrollHeight) + 10 + 'px');
        $('.books-nav .category.active .child-categories').css('height', $('.books-nav .category.active .child-categories')[0].scrollHeight + 'px');
        // $('.books-nav > ul').animate({height: $('.books-nav > ul')[0].scrollHeight}, 200);
        $('.page-main .books-nav>ul').css('height',$('.page-main .books-nav>ul')[0].scrollHeight  );
      }
    });

    $(document).on('click', '.page-main .books-nav li.category:not(.active) > .category-title', function(e) {
      e.preventDefault();
      e.stopImmediatePropagation();
      $('.page-main .books-nav li.category.active').css('height', '55px');
      $('.page-main .books-nav>ul').css('height',$('.page-main .books-nav>ul').outerHeight() - $('.page-main .books-nav li.category.active .child-categories').outerHeight());
      $('.page-main .books-nav li.category.active .child-categories').css('height', '0');
      $('.page-main .books-nav li.category.active').removeClass('active');

      if ($(this).hasClass('hits')) {
        $(this).parent().addClass('active');
        $('.page-main .books-nav>ul > li.category.active').css('height', $('.page-main .books-nav>ul > li.category.active')[0].scrollHeight);
        $('.page-main .books-nav>ul').css('height',$('.page-main .books-nav>ul').outerHeight());

      } else {
        $(this).parent().addClass('active');
        $('.page-main .books-nav li.category.active .child-categories').css('height', $('.books-nav .category.active .child-categories')[0].scrollHeight + 'px');
        $('.page-main .books-nav>ul > li.category.active').css('height', $('.page-main .books-nav>ul > li.category.active')[0].scrollHeight + 10 + 'px');
        $('.page-main .books-nav>ul').css('height',$('.page-main .books-nav>ul').outerHeight() + $('.page-main .books-nav li.category.active .child-categories').outerHeight());
      }
    });

    $(document).on('click','.page-main .books-nav li.category.active .child-categories .child-category a', function() {
      $('.books-nav > ul > li:not(.active)').addClass('hidden');
      // $('.page-main .books-nav li.category.active .child-categories').css('height', '0');
      // $('.page-main .books-nav li.category.active').css('height', 'inherit');
      $('.page-main .books-nav>ul').css('height', '55px');
      $('.books-nav > ul > li.active >a').css('text-align','right');

    });
  }


  $(document).on('click', '.list-page-indicators .indicator', function(e) {
    e.preventDefault();
    e.stopImmediatePropagation();
    var previousInd = parseInt($('.list-page-indicators ul li.active').text());
    //console.log(previousInd);
    $('.list-page-indicators ul li:not(.dots)').removeClass('active');
    $(this).addClass('active');

    if (parseInt($('.list-page-indicators ul li.active').text()) >= 2) {
      if($('.list-page-indicators ul li').length > 4) {
        if (parseInt($('.list-page-indicators ul li.active').text()) > previousInd) {
          //console.log('click plus');
          $('.list-page-indicators ul li.indicator-' + ($('.list-page-indicators ul li.active').text() - 1 + 2)).removeClass('hidden');
          $('.list-page-indicators ul li.indicator-' + ($('.list-page-indicators ul li.active').text() - 2)).addClass('hidden');
          $('.list-page-indicators ul li:last-child').removeClass('hidden');

          if (parseInt($('.list-page-indicators ul li.active').text()) == parseInt($('.list-page-indicators ul li:last-child').text())) {
            $('.list-page-indicators ul li:not(.dots)').addClass('hidden');
            $('.list-page-indicators ul li.indicator-' + ($('.list-page-indicators ul li.active').text() - 1)).removeClass('hidden');
            $('.list-page-indicators ul li.indicator-' + $('.list-page-indicators ul li.active').text()).removeClass('hidden');
            $('.list-page-indicators ul li.indicator-' + ($('.list-page-indicators ul li.active').text() - 2)).removeClass('hidden');
          }
        }  else if (parseInt($('.list-page-indicators ul li.active').text()) < previousInd) {
          //console.log('click plus');
          $('.list-page-indicators ul li.indicator-' + ($('.list-page-indicators ul li.active').text() - 2 + 1)).removeClass('hidden');
          $('.list-page-indicators ul li.indicator-' + ($('.list-page-indicators ul li.active').text() - 1 + 3)).addClass('hidden');
          $('.list-page-indicators ul li.indicator-' + ($('.list-page-indicators ul li.active').text() - 1 + 4)).addClass('hidden');
          $('.list-page-indicators ul li:last-child').removeClass('hidden');
        }
      }
    }

    //console.log('indicator which was clicked', $(this).text());
    $('.books-container .book-block').removeClass('num-1');
    var currentPage = $(this).text();
    for(var c = (currentPage * 6 - 5); c < (currentPage * 6 + 1) ;c++) {
      var bookBlock2 = '.books-container .book-block:nth-child(' + c + ')';
      $(bookBlock2).addClass('num-1');
    }
  });

  // $(document).on('click', '#books .list-page-indicators .indicator', function() {
  //
  //   if (parseInt($(this).text()) == parseInt($('.list-page-indicators ul li:last-child').text())) {
  //     $('.dots').remove();
  //     $("<li class='dots'>...</li>").insertBefore($('.list-page-indicators ul li:nth-child(' + ($(".list-page-indicators ul li:last-child").text() - 2) + ')'));
  //   } else {
  //     $('.dots').remove();
  //     $("<li class='dots'>...</li>").insertBefore('.list-page-indicators ul li:last-child');
  //   }
  // });

  $(document).on('click', '#books .list-page-indicators .left', function(e) {

    e.stopImmediatePropagation();
    if ($('.list-page-indicators ul li.active').text() == 1) {
      return;
    } else {
      var currentPage2 = $('.list-page-indicators ul li.active').text();

      if (currentPage2 > 2) {
        $('.list-page-indicators ul li.indicator-' + (currentPage2 - 1 + 2)).addClass('hidden');
        $('.list-page-indicators ul li.indicator-' + (currentPage2 - 1)).removeClass('hidden');
        $('.list-page-indicators ul li.indicator-' + (currentPage2 - 2)).removeClass('hidden');
        $('.list-page-indicators ul li:last-child').removeClass('hidden');
      }

      $('.list-page-indicators ul li.indicator-' + (currentPage2)).removeClass('active');
      $('.list-page-indicators ul li.indicator-' + (currentPage2 - 1)).addClass('active');
      currentPage2 = $('.list-page-indicators ul li.active').text();
      $('.books-container .book-block').removeClass('num-1');

      for(var d = (currentPage2 * 6 - 5); d < (currentPage2 * 6 + 1) ;d++) {
        var bookBlock2 = '.books-container .book-block:nth-child(' + d + ')';
        $(bookBlock2).addClass('num-1');
      }
    }
  });

  $(document).on('click', '.list-page-indicators .right', function(e) {
    e.stopImmediatePropagation();
    if ($('.list-page-indicators ul li.active').text() == $('.list-page-indicators ul li:last-child').text()) {
      return;
    } else {
      var currentPage3 = $('.list-page-indicators ul li.active').text();
      $('.list-page-indicators ul li.indicator-' + (currentPage3)).removeClass('active');
      $('.list-page-indicators ul li.indicator-' + (currentPage3 - 1 + 2)).addClass('active');
      currentPage3 = $('.list-page-indicators ul li.active').text();
      $('.books-container .book-block').removeClass('num-1');

      if (currentPage3 > 2) {
        $('.list-page-indicators ul li.indicator-' + (currentPage3 - 1 + 2)).removeClass('hidden');
        $('.list-page-indicators ul li.indicator-' + (currentPage3 - 2)).addClass('hidden');
        $('.list-page-indicators ul li:last-child').removeClass('hidden');
      }



      for (var f = (currentPage3 * 6 - 5); f < (currentPage3 * 6 + 1); f++) {
        var bookBlock3 = '.books-container .book-block:nth-child(' + f + ')';
        $(bookBlock3).addClass('num-1');
      }
    }
  });

  $(document).on('click', '#books .books-nav .child-categories .child-category .child-category-title', function(e) {
    e.preventDefault();
    e.stopImmediatePropagation();
    //console.log('this attr id', e.target);
    var currentCategory = category_json +'/'+ e.target.getAttribute('data-id');
    //console.log(currentCategory);
    $.getJSON( currentCategory, {format: "json"})
      .done(function( data ) {
        //console.log('books loaded', data);
        data = data.books;
        books ='<li><ul class="books-container">';

        for(var n=0; n < data.length; n++) {
          books = books + '<li class="book-block"><img src="' + data[n].node.cover.src + '" />';
          books = books + '<h5>' + data[n].node.title + '</h5>';
          books = books + '<h6>' + data[n].node.автор + '</h6></li>';
        }

        books = books + '</ul></li>';
        books = books +'<div class="list-page-indicators"><ul></ul></div>' + '</ul>';
        $('.books-list').html(books);
        buildBookBlocks();
      });
  });

  $(document).on('click', '#books .books-nav .hits', function(e) {
    e.preventDefault();

    if ($(window).width() >= 768) {
      $('.page-main .books-nav li.category.active .child-categories').animate({height: 0}, 200);
      $('.page-main .books-nav li.category.active .child-categories .child-category-title').removeClass('active');
      $('.page-main .books-nav li.category.active').removeClass('active');
      $(this).addClass('active');
    }
    // else {
    //   $(this).css('text-aling', 'right');
    //   $('.page-main .books-nav li.category.active').css('height', '55px');
    //   $('.page-main .books-nav>ul').css('height',$('.page-main .books-nav>ul').outerHeight() - $('.page-main .books-nav li.category.active .child-categories').outerHeight());
    //   $('.page-main .books-nav li.category.active .child-categories').css('height', '0');
    //   $('.page-main .books-nav li.category.active').removeClass('active');
    //
    //   $(this).addClass('active');
    //   $('.page-main .books-nav > ul').css('height', '55px');
    // }
    books = '';
    buildBookList();
    books = books +'<div class="list-page-indicators"><ul></ul></div>';
    $('.books-list').html(books);
    buildBookBlocks();
  });




  // End of Books functions
}

$(document).ready(function() {

  $('.page-main .nav.navbar-nav li a').click(function(e) {
    e.preventDefault();
    var target = $(this).attr('href');
    var offsetScroll = $(target).offset().top;
    $('html, body').animate( { scrollTop:  offsetScroll}, 1400);
  });

  $('.scroll-to').click(function(e) {
    e.preventDefault();
    var target = $(this).attr('href');
    var offsetScroll = $(target).offset().top;
    $('html, body').animate( { scrollTop:  offsetScroll}, 1400);
  });

  $('.webform-component--employers .form-item-submitted-employers .control-label').click(function() {
    $('.webform-component--employers .form-item-submitted-employers .control-label').removeClass('active');
    $(this).addClass('active');
  });

  $('.webform-component--office .form-item-submitted-office .control-label').click(function() {
    $('.webform-component--office .form-item-submitted-office .control-label').removeClass('active');
    $(this).addClass('active');
  });

  if ($(window).width() < 768) {
    var faqCount = $('.faq-tab-menu .list-group > a').length;
    for(var s = 0; s < faqCount; s++) {
      //console.log('.page-main .faq-tab-menu .list-group-item:nth-child(' + (s - 1 + 2) +')' + ' add ' + '.page-main .faq-tab #tab-id-' + s );
      $('.faq-tab-menu .list-group').append('<div class="faq-inner-block-' + (s - 1 + 2) +'">');
      $('.faq-tab-menu .list-group .faq-inner-block-' + (s - 1 + 2)).append($('.page-main .faq-tab #tab-id-' + s));
    }
    var r = faqCount;
    while(r > 1) {
      $('.faq-tab-menu .list-group .faq-inner-block-' + r ).prepend($('.faq-tab-menu .list-group .list-group-item:nth-child(' + r + ')'));
      r--;
    };
    $('.faq-tab-menu .list-group .faq-inner-block-1').prepend($('.faq-tab-menu .list-group>.list-group-item:first-child'));
    $('.faq-tab-menu .list-group > div > .faq-tab-content:not(.active)').css('height', '0');
    $('.faq-tab-menu .list-group > div > a.list-group-item').click(function() {
      if($(this)[0].className == 'list-group-item active text-center') {
        $(this).removeClass('active');
        $('.faq-tab-menu .list-group > div > .faq-tab-content.active').animate({height: 0}, 400);
        $('.faq-tab-menu .list-group > div > .faq-tab-content.active').removeClass('active');
      } else {
        $('.faq-tab-menu .list-group > div > .faq-tab-content').animate({height: 0}, 400);
        $('.faq-tab-menu .list-group > div > .faq-tab-content.active').removeClass('active');
        $('.faq-tab-menu .list-group > div').removeClass('active');
        $('.faq-tab-menu .list-group > div > a.list-group-item').removeClass('active');
        $(this).addClass('active');
        $(this).parent().addClass('active');
        $('.faq-tab-menu .list-group > div.active > .faq-tab-content').addClass('active');
        $('.faq-tab-menu .list-group > div > .faq-tab-content.active').animate({height: $('.faq-tab-menu .list-group > div > .faq-tab-content.active')[0].scrollHeight}, 400);

  }
      $(this).addClass('active');

    });
  }

  $('.page-main #faq .faq-tab-container .faq-tab .panel.panel-default .panel-heading a').click(function() {
    var offsetFaqHeight = $(this).parent().parent().position().top;
    ///console.log(offsetFaqHeight);
    //console.log($(this).parent().parent().parent());
    //console.log($('.page-main #faq .faq-tab-container .faq-tab .panel.panel-default .panel-heading a').position().top);
    $('.page-main #faq .faq-tab-container .faq-tab .faq-tab-content.active').animate({scrollTop: offsetFaqHeight}, 100);
    setTimeout(function() {    $(".col-sm-9.faq-tab .faq-tab-content").getNiceScroll().resize();}, 200);
  });

  //Front Validation
  $('#webform-client-form-48 .webform-submit').on('click', function(e) {
    e.preventDefault();
    e.stopPropagation();
    var email = validateEmail('#edit-submitted-email');
    var tel = validateTel('#edit-submitted-tel');
    var company = validateCompany('#edit-submitted-company');
    var text = validateTextField('#edit-submitted-message');
    var name = validateNotEmpty('#edit-submitted-name');
    var buttons1 = validateButtons('#edit-submitted-office');
    var buttons2 = validateButtons('#edit-submitted-employers');

    if ( email && tel && company && text && name && buttons1 && buttons2) {
      $('.front-modal').modal();
    }
  });

  $('.front-modal button').on("hidden.bs.modal", function () {
    $('#webform-client-form-48').submit();
  });

  $('.page-main #contacts .webform-component input, .page-main #contacts .webform-component textarea, .page-contacts #contacts .webform-component input, .page-contacts textarea').click(function() {
    $(this).css('border','1px solid #ccc');
    $(this).css('border-bottom',' 3px solid #f9d35c');
    $(this).css('background','#fff');
    $(this).css('color','#2e2e2e');
    // $(this).attr('placeholder', ' ');
  });

  $('#webform-client-form-49 .webform-submit').on('click', function(e) {
    e.preventDefault();
    e.stopPropagation();
    var email = validateEmail('#edit-submitted-email');
    var name = validateNotEmpty('#edit-submitted-name');
    var text = validateTextField('#edit-submitted-message');

    if ( email && name && text) {
      $('.contacts-modal').modal();
    }
  });

  $(".contacts-modal button").on("hidden.bs.modal", function () {
    $('#webform-client-form-49').submit();
  });

  function validateEmail(emailId) {
    var emailValue = $(emailId).val();

    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(emailValue.length !== 0 && re.test(emailValue)) {
      $(emailId).css('border', '2px solid #dfdfdf');
      $(emailId).css('background', '#e9e9e9');
      $(emailId).css('color', '#dfdfdf');
      return true;
    } else {
      if(emailValue.length < 1) {
        $(emailId).attr('placeholder', 'Це поле необхідно заповнити');
        $(emailId).css('border', '2px solid #db553f');
        $(emailId).css('background', 'rgba(255, 0, 0, .06)');
        return false;
      }
      if(!re.test(emailValue) && emailValue.length > 1) {
        $(emailId).attr('placeholder', 'Введіть дійсний email');
        $(emailId).css('border', '2px solid #db553f');
        $(emailId).css('background', 'rgba(255, 0, 0, .06)');
        document.getElementById('edit-submitted-email').value='';
        // $(emailId).text(' ');
        return false;
      }
    }
  }

  function validateTel(telId) {
    var telValue = $(telId).val().trim();
    var re = /^((8|0|((\+|00)\d{1,2}))[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/;
    if(telValue.length !== 0 && re.test(telValue)){
      $(telId).css('border', '2px solid #dfdfdf');
      $(telId).css('background', '#e9e9e9');
      $(telId).css('color', '#dfdfdf');
      return true;
    } else {
      if(telValue.length < 1) {
        $(telId).css('border', '2px solid #db553f');
        $(telId).css('background', 'rgba(255, 0, 0, .06)');
        $(telId).attr('placeholder', 'Це поле необхідно заповнити');
        return false;
      }
      if(!re.test(telValue) && telValue.length > 1) {
        $(telId).css('border', '2px solid #db553f');
        $(telId).css('background', 'rgba(255, 0, 0, .06)');
        document.getElementById('edit-submitted-tel').value='';
        $(telId).attr('placeholder', 'Можемо запрограмувати формат 380XXXXXXXXX');
      }
    }
  }

  function validateNotEmpty(id){
    var value = $(id).val();
    if( value.length !== 0){
      $(id).css('border', '2px solid #dfdfdf');
      $(id).css('background', '#e9e9e9');
      $(id).css('color', '#dfdfdf');
      return true;
    } else {
      $(id).css('border', '2px solid #db553f');
      $(id).css('background', 'rgba(255, 0, 0, .06)');
      $(id).attr('placeholder', 'Це поле необхідно заповнити');
      return false
    }
  }

  function validateCompany(id){
    var value = $(id).val();
    if( value.length !== 0){
      $(id).css('border', '2px solid #dfdfdf');
      $(id).css('background', '#e9e9e9');
      $(id).css('color', '#dfdfdf');
      return true;
    } else {
      $(id).css('border', '2px solid #db553f');
      $(id).css('background', 'rgba(255, 0, 0, .06)');
      $(id).attr('placeholder', 'Це поле необхідно заповнити');
      return false
    }
  }

  function validateTextField(id){
    var value = $(id).val();
    if( value.length !== 0){
      $(id).css('border', '2px solid #dfdfdf');
      $(id).css('background', '#e9e9e9');
      $(id).css('color', '#dfdfdf');
      return true;
    } else {
      $(id).css('border', '2px solid #db553f');
      $(id).css('background', 'rgba(255, 0, 0, .06)');
      $(id).attr('placeholder', 'Це поле необхідно заповнити');
      return false
    }
  }

  $(document).ready(function() {
    if ($(window).width() < 768) {
      $($('.nav.navbar-nav a'). on('click', function() {
        $('.navbar-collapse.collapse.in').removeClass('in');
        $('.navbar-toggle').addClass('collapsed');
      })
      );
    }
  });

  $(document).ajaxStop(function () {
    if ($(window).width() > 768) {
      // $(".col-sm-9.faq-tab .faq-tab-content").getNiceScroll();
      $(".col-sm-9.faq-tab .faq-tab-content").getNiceScroll().resize();
      $(".col-sm-9.faq-tab .faq-tab-content").niceScroll({
        cursorborder:"",
        cursorcolor:"rgba(0, 0, 0, .4)",
        background: "rgba(0, 0, 0, .2)",
        railoffset: true,
        boxzoom:false,
        spacebarenabled: true,
        autohidemode: false
      });
    }
  });

  // setTimeout(function() {
  //   console.log($('.book-block:first-child h2').innerHTML);
  //   console.log('heloo, its book block');
  // },8000);
  //
  function validateButtons(id){
    // var value = $(id).val();
    var outputValue = false;
    for (var vall = 0; vall<=2; vall++) {
      if ($(id + ' .form-item:nth-child('+ vall +') .control-label').hasClass('active')) {
        outputValue = true;
      }
    }

    if( outputValue ){
      $(id).css('border', 'none');
      $(id).css('background', '#e9e9e9');
      $(id).css('color', '#dfdfdf');
      return true;
    } else {
      $(id).css('border', '2px solid #db553f');
      $(id).css('background', 'rgba(255, 0, 0, .06)');
      return false
    }
  }

  // console.log('Message 1');
  //
  // var faqActiveBlocks = '.faq-tab>.faq-tab-content';
  // for(var faqnum = 0; faqnum<= faqActiveBlocks.eq(index).children('.panel.panel-default').length; faqnum++) {
  //   console.log('Message 2');
  //   $('.faq-tab>.faq-tab-content.active .panel-group .panel.panel-default:nth-child('+ faqnum +') .panel-title').append('<div class="arrow">▼</div>');
  //
  //   if($('.faq-tab>.faq-tab-content.active .panel-group .panel.panel-default:nth-child('+ faqnum +') .panel-collapse').hasClass('in')) {
  //     console.log($('.faq-tab>.faq-tab-content.active .panel-group .panel.panel-default:nth-child('+ faqnum +') .panel-collapse').hasClass('in'));
  //     $('.faq-tab>.faq-tab-content.active .panel-group .panel.panel-default:nth-child('+ faqnum +') .panel-title .arrow').addClass('rotate');
  //   } else {
  //     // console.log($('.faq-tab>.faq-tab-content.active .panel-group .panel.panel-default:nth-child('+ faqnum +') .panel-collapse').hasClass('in'));
  //     $('.faq-tab>.faq-tab-content.active .panel-group .panel.panel-default:nth-child('+ faqnum +') .panel-title .arrow').removeClass('rotate');
  //   }
  // }
});
