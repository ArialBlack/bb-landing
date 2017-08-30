var category_json = 'http://new.bookbox.ua/json/category',
    hits_json = 'http://new.bookbox.ua/json/hits',
    menu = '<ul><li><a href="#">Хіти</a></li>',
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
    books = books + '<li>Хіти<ul>';

    for(var n=0; n < hits.length; n++) {
        books = books + '<li><img src="' + hits[n].node.cover.src + '" />';
        books = books + '<h5>' + hits[n].node.title + '</h5>';
        books = books + '<h6>' + hits[n].node.автор + '</h6></li>';
    }

    books = books + '</ul></li>';
}

function buildCategory() {
    for(var i=0; i < categories.length; i++) {
        //console.log(data[i]);

        menu = menu + '<li><a href="#">' + categories[i].name + '</a></li>';
        menu = menu + '<ul>';
        //console.log(data[i].children.length);

        for(var j=0; j < categories[i].children.length; j++) {
            menu = menu + '<li><a href="#">' + categories[i].children[j].name + '</a></li>';

        }

        menu = menu + '</ul>';
    }

    menu = menu + '</ul>';
    $('.books-nav').html(menu);

    books = books + '</ul>';
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

$(document).ready (function() {
    console.log('run');

    getRequests();
});

$(document).ajaxStop(function () {
    buildBookList();
    buildCategory();
});

