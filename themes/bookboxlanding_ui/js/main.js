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

function buildCategory() {
    for(var i=0; i < categories.length; i++) {
        //console.log(data[i]);

        menu = menu + '<li class="category"><a href="#">' + categories[i].name + '</a>';
        menu = menu + '<ul class="child-categories">';
        //console.log(data[i].children.length);

        for(var j=0; j < categories[i].children.length; j++) {
            menu = menu + '<li class="child-category"><a href="#">' + categories[i].children[j].name + '</a></li>';

        }

        menu = menu + '</ul></li>';
    }

    menu = menu + '</ul>';
    $('.books-nav').html(menu);

    books = books +'<div class="list-page-indicators"><ul></ul></div>' + '</ul>';
    $('.books-list').html(books);

    //Books Functions
  console.log($('.page-main .books-nav li.category>a').length);

  $('.page-main .books-nav li.category').click(function(e) {
    e.preventDefault();
    console.log('categories works');

    $('.page-main .books-nav li.category.active').removeClass('active');
    $('.page-main .books-nav li.category .child-categories').animate({height: 0}, 200);

    $(this).addClass('active');
    $('.page-main .books-nav li.category.active .child-categories').animate({height: $('.page-main .books-nav li.category.active .child-categories')[0].scrollHeight + 15 }, 200);
  });

  for(var b = 1; b<7; b++) {
    console.log('book numeration works!');

    var bookBlock = '.books-container .book-block:nth-child(' + b + ')';
    console.log(bookBlock);

    $(bookBlock).addClass('num-'+b);
  }

  var bookListPages = Math.ceil($('.books-container .book-block').length/6);
  for (var p = 1; p <= bookListPages; p++) {
    $('.list-page-indicators ul').append('<li' + ' class="indicator-' + p + '">'+ p + '</li>');
  }

  $('.list-page-indicators li:first-child').addClass('active');

  if ($('.list-page-indicators li').length > 4) {
    for (p = 4; p<$('.list-page-indicators li').length; p++) {
      $('.list-page-indicators li:nth-child(' + p + ')').addClass('hidden');
    }
    $("<li class='dots'>...</li>").insertAfter($(".list-page-indicators ul li:nth-child(3)"));
    $(".list-page-indicators").prepend('<span class="left">◀</span>');
    $(".list-page-indicators").append('<span class="right is">▶</span>');
  }
  // End of Books functions
}

$(".faq-tab-menu>div.list-group>a").click(function(e) {
    e.preventDefault();
    $(this).siblings('a.active').removeClass("active");
    $(this).addClass("active");
    var index = $(this).index();
    $(".faq-tab>.faq-tab-content").removeClass("active");
    $(".faq-tab>.faq-tab-content").eq(index).addClass("active");
});

$(document).ready (function() {
    console.log('run');

    getRequests();
});

$(document).ajaxStop(function () {
    buildBookList();
    buildCategory();
});


$(document).ready(function() {

  $('.nav.navbar-nav li a').click(function(e) {
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
  //
  // if ($('body').height() < $(window).height()) {
  //   $('.footer').css('position', 'absolute');
  //   $('.footer').css('bottom', '0');
  //   $('.footer').css('width', '100%');
  // }

  //Books block functions
  // console.log('Books Works');
  // $('.page-main .books-nav ul>.category').click(function(e) {
  //   e.preventDefault();
  //   $(this).siblings('.active').removeClass('active');
  //   $(this).addClass('active');
  //   $('.books-nav .category .child-categories').addClass('active');
  // });
  //End of books block functions
});
