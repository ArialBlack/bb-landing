var category_json = 'http://new.bookbox.ua/json/category',
    hits_json = 'http://new.bookbox.ua/json/hits',
    menu = '<ul><li class="hits category active"><a href="#">Хіти</a></li>',
    books = '<ul>',
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
            initListeners();
            for(var i=0; i < categories.length; i++) {

                for(var j=0; j < categories[i].children.length; j++) {
                    var tid_json = category_json + '/' + categories[i].children[j].tid;
                    console.log(categories[i].children[j].name);

                    $.getJSON( tid_json, {format: "json", async: false})
                        .done(function( data0 ) {

                            if(data0.books.length > 0) {
                                console.log(data0.books);
                            }
                        });

                    console.log('----------');
                }
            }
        });
}

function getHits() {
    $.getJSON( hits_json, {format: "json"})
       .done(function( data0 ) {
           hits = data0.hits;
           console.log(hits)
       });
}

function buildBookList() {
    books = books + '<li><ul class="books-container">';

    for(var n=0; n < hits.length; n++) {
        books = books + '<li class="book-block"><img src="' + hits[n].node.cover.src + '" />';
        books = books + '<h5>' + hits[n].node.title + '</h5>';
        books = books + '<h6>' + hits[n].node.автор + '</h6></li>';
    }

    books = books + '</ul></li>';
}

function buildBookBlocks() {
  for(var b = 1; b<7; b++) {
    console.log('book numeration works!');

    var bookBlock = '#books .books-container .book-block:nth-child(' + b + ')';
    console.log(bookBlock);

    $(bookBlock).addClass('num-'+1);
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

    $("<li class='dots'>...</li>").insertAfter($(".list-page-indicators ul li:nth-child(3)"));
    $(".list-page-indicators").prepend('<span class="left">◀</span>');
    $(".list-page-indicators").append('<span class="right is">▶</span>');
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

  books = books +'<div class="list-page-indicators"><ul></ul></div>' + '</ul>';
  $('.books-list').html(books);

}


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
})

$(document).ready (function() {
    console.log('run');

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
      console.log($(this).parent());
      // if ($(this).parent().hasClass('active')) {
      //   $('.page-main .books-nav li.category.active .child-categories').animate({height: 0}, 200);
      //   $(this).parent().removeClass('active');
      // } else {
      // тут скрывается предыдущая.
      $('.page-main .books-nav li.category.active .child-categories').animate({height: 0}, 200);
      // закрывается предыдущая.
      $('.page-main .books-nav li.category.active').removeClass('active');

      $(this).parent().addClass('active');
      // открывается текущая? Yes
      // $('.page-main .books-nav li.category.active .child-categories').animate({height: $('.page-main .books-nav li.category.active .child-categories')[0].scrollHeight}, 200);
      // copy please
      $('.page-main .books-nav li.category.active .child-categories').animate({height: $('.page-main .books-nav li.category.active .child-categories')[0].scrollHeight}, 200);
      // }
      return;
    });
  } else {
    //If device width <768px
    $('.books-nav').prepend('<p class="filters">Фільтр по категоріям</p>');
    $('.books-nav > ul').css('height', $('.category.active').outerHeight());
    $('.books-nav > ul').css('overflow', 'hidden');
    // $('.books-nav > ul > li:not(.active)').addClass('hidden');

    $(document).on('click', '.page-main .books-nav li.category.active > a', function(e) {
      e.preventDefault();
      console.log('Else doesnt work');

      // $('.books-nav > ul > li.hidden').removeClass('hidden');
      $('.books-nav > ul').animate({height: $('.books-nav > ul')[0].scrollHeight}, 200);
    });

    // почему именно li.category:not(.active)? потому что при ширине екрана <768 пкс он меняет свою анимацию
    // там он немного по другому выпадает, а ок.
    $(document).on('click', '.page-main .books-nav li.category:not(.active) > .category-title', function(e) {
      e.preventDefault();
      e.stopImmediatePropagation();
      // смотри логика такая: по клику на айтем - убрать предыдщуий эктив, что ты и делаешь, поотом добавить класс на родителя (что раскрыть), дальше скрыть все остальные. и
      // после этого с анимировать, верно? Да
      $('.page-main .books-nav li.category.active').removeClass('active');
      $(this).parent().addClass('active');
      $('.books-nav > ul > li:not(.active)').addClass('hidden');
      $('.page-main .books-nav>ul > li.category.active').animate({height: $(this).parent()[0].scrollHeight}, 200);
    });
  }


  $(document).on('click', '.list-page-indicators .indicator', function(e) {
    e.preventDefault();
    e.stopImmediatePropagation();
    $('.list-page-indicators ul li:not(.dots)').removeClass('active');
    $(this).addClass('active');

    if (parseInt($('.list-page-indicators ul li.active').text()) > 2) {
      $('.list-page-indicators ul li.indicator-' + ($('.list-page-indicators ul li.active').text() + 1)).removeClass('hidden');
      $('.list-page-indicators ul li.indicator-' + ($('.list-page-indicators ul li.active').text() - 2)).addClass('hidden');
    }

    console.log('indicator which was clicked', $(this).text());
    $('.books-container .book-block').removeClass('num-1');
    var currentPage = $(this).text();
    for(var c = (currentPage * 6 - 5); c < (currentPage * 6 + 1) ;c++) {
      var bookBlock2 = '.books-container .book-block:nth-child(' + c + ')';
      $(bookBlock2).addClass('num-1');
    }
  });

  $(document).on('click', '#books .list-page-indicators .left', function(e) {

    e.stopImmediatePropagation();
    if ($('.list-page-indicators ul li.active').text() == 1) {
      return;
    } else {
      var currentPage2 = $('.list-page-indicators ul li.active').text();

      if (currentPage2 > 2) {
        $('.list-page-indicators ul li.indicator-' + (currentPage2 - 1 + 2)).addClass('hidden');
        $('.list-page-indicators ul li.indicator-' + (currentPage2 - 2)).removeClass('hidden');
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

  $(document).on('click', '#books .books-nav .child-categories .child-category .child-category-title', function(e) {
    e.preventDefault();
    e.stopImmediatePropagation();
    console.log('this attr id', e.target);

    var currentCategory = category_json +'/'+ e.target.getAttribute('data-id');
    console.log(currentCategory);
    $.getJSON( currentCategory, {format: "json"})
      .done(function( data ) {
        console.log('books loaded', data);
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

  $(document).on('click', '.list-page-indicators .right', function(e) {
    e.stopImmediatePropagation();
    if ($('.list-page-indicators ul li.active').text() == $('.list-page-indicators ul li:last-child').text()) {
      return;
    } else {
      var currentPage3 = $('.list-page-indicators ul li.active').text();

      if (currentPage3 > 2) {
        $('.list-page-indicators ul li.indicator-' + (currentPage3 - 1 + 2)).removeClass('hidden');
        $('.list-page-indicators ul li.indicator-' + (currentPage3 - 2)).addClass('hidden');
      }

      $('.list-page-indicators ul li.indicator-' + (currentPage3)).removeClass('active');
      $('.list-page-indicators ul li.indicator-' + (currentPage3 - 1 + 2)).addClass('active');
      currentPage3 = $('.list-page-indicators ul li.active').text();
      $('.books-container .book-block').removeClass('num-1');

      for (var f = (currentPage3 * 6 - 5); f < (currentPage3 * 6 + 1); f++) {
        var bookBlock3 = '.books-container .book-block:nth-child(' + f + ')';
        $(bookBlock3).addClass('num-1');
      }
    }
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
      console.log('.page-main .faq-tab-menu .list-group-item:nth-child(' + (s - 1 + 2) +')' + ' add ' + '.page-main .faq-tab #tab-id-' + s );
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

  if ($(window).width() > 768) {
   $(".col-sm-9.faq-tab .faq-tab-content").niceScroll({cursorborder:"",cursorcolor:"rgba(0, 0, 0, .2)",boxzoom:false});
  }

  $('.page-contacts .collapse.navbar-collapse a').


  //Front Validation
  $(document).on('click', '.page-main .webform-client-form .webform-submit',function() {
    validateEmail('#edit-submitted-email');
    validateTel('#edit-submitted-tel');
    validateCompany('#edit-submitted-company');
    validateNotEmpty('#edit-submitted-name');
  });

  $('.page-contacts #contacts .webform-submit').click(function() {
    validateEmail('#edit-submitted-email');
    validateNotEmpty('#edit-submitted-name');
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
      $(emailId).css('border', '2px solid red');
      $(emailId).attr('placeholder', 'Це поле необхідно заповнити');
      return false;
    }
  }

  function validateTel(telId) {
    var telValue = $(telId).val().trim();
    var re = /^((8|0|((\+|00)\d{1,2}))[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/;
    if(re.test(telValue) ){
      $(telId).css('border', '2px solid #dfdfdf');
      $(telId).css('background', '#e9e9e9');
      $(telId).css('color', '#dfdfdf');
      return true;
    } else {
      $(telId).css('border', '2px solid red');
      $(telId).attr('placeholder', 'Це поле необхідно заповнити');
      return false;
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
      $(id).css('border', '2px solid red');
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
      $(id).css('border', '2px solid red');
      $(id).attr('placeholder', 'Це поле необхідно заповнити');
      return false
    }
  }

});
