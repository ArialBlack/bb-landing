<?php
$node_object = node_load(1);
$node = node_view(node_load(1),'full');

// intro
$intro = $node['field_paragraphs'][0]['entity']['paragraphs_item'][1];
$into_title = $intro['field_title']['#items'][0]['value'];
$intro_cover_uri = $intro['field_cover']['#items'][0]['uri'];
$intro_cover_image = image_style_url('cover', $intro_cover_uri);

//how it works
$how = $node['field_paragraphs'][1]['entity']['paragraphs_item'][2];
$how_title = $how['field_title']['#items'][0]['value'];
$how_subtitle = $how['pp_title']['#items'][0]['value'];

//price
$price = $node['field_paragraphs'][2]['entity']['paragraphs_item'][3];
$price_title = $price['field_title']['#items'][0]['value'];
$price_value = $price['field_price']['#items'][0]['value'];
$price_prefix = $price['field_subtitle']['#items'][0]['value'];
$price_notes = $price['pp_title']['#items'][0]['value'];

//partners
$partners = $node['field_paragraphs'][3]['entity']['paragraphs_item'][4];
$partners_title = $partners['field_title']['#items'][0]['value'];
$partners_subtitle = $partners['pp_title']['#items'][0]['value'];

//rates
$rates_title = $node['field_paragraphs'][4]['entity']['paragraphs_item'][5]['field_title']['#items'][0]['value'];

//articles
$articles_title = $node['field_paragraphs'][5]['entity']['paragraphs_item'][6]['field_title']['#items'][0]['value'];

//FAQ
$faq_title = $node['field_paragraphs'][6]['entity']['paragraphs_item'][7]['field_title']['#items'][0]['value'];

//form
$form = $node['field_paragraphs'][8]['entity']['paragraphs_item'][15];
$form_title = $form['field_title']['#items'][0]['value'];
$form_subtitle = $form['pp_title']['#items'][0]['value'];
?>

<!--(bake parts/head.php)-->

<body class="page-main">

<!--(bake parts/nav-and-header.php)-->

<?php print $messages; ?>

<section id="intro">
        <h1><?php print $into_title; ?></h1>
        <img src="<?php print $intro_cover_image; ?>" />
        <a class="btn btn-danger" href="#order">Замовити</a>
</section>

<section id="how">
    <div class="container">
        <h2><?php print $how_title; ?></h2>
        <h3><?php print $how_subtitle; ?></h3>

        <ul>
            <?php
                $how_length = count($how['field_teaser_collection']['#items']);

            for($i=0; $i<$how_length; $i++) {
                $teaser_uri = $how['field_teaser_collection'][$i]['entity']['field_collection_item'][$i+1]['field_cover']['#items'][0]['uri'];
                $teaser_image = image_style_url('medium', $teaser_uri);
                $teaser_title = $how['field_teaser_collection'][$i]['entity']['field_collection_item'][$i+1]['field_title']['#items'][0]['value'];
                $teaser_subtitle = $how['field_teaser_collection'][$i]['entity']['field_collection_item'][$i+1]['field_subtitle']['#items'][0]['value'];

                print '<li><img src="' . $teaser_image . '" />';
                print ' <h5>' . $teaser_title . '</h5>';
                print ' <h6>' . $teaser_subtitle . '</h6>';
            }
            ?>
        </ul>
    </div>
</section>

<section id="books">
    <div class="container">
        <div class="books-nav"></div>
        <div class="books-list"></div>
    </div>
</section>

<section id="price">
    <div class="container">
        <h2><?php print $price_title; ?></h2>
        <h3><?php print $price_value; ?></h3>
        <h4><?php print $price_prefix; ?></h4>
        <h5><?php print $price_notes; ?></h5>
    </div>
</section>

<section id="partners">
    <div class="container">
        <h2><?php print $partners_title; ?></h2>
        <h3><?php print $partners_subtitle ?></h3>

        <?php
        print views_embed_view('partners', 'block_1');
        ?>

    </div>
</section>

<section id="rates">
    <div class="container">
        <h2><?php print $rates_title; ?></h2>

        <?php
            print views_embed_view('rates', 'block');
        ?>
    </div>
</section>

<div id="articles">
    <div class="container">
        <h2><?php print $articles_title; ?></h2>

        <?php
            print views_embed_view('articles', 'block');
        ?>
    </div>
</div>

<div id="faq">
    <div class="container">
        <h2><?php print $faq_title; ?></h2>

        <!--(bake parts/faq.php)-->
    </div>
</div>

<section id="contacts">
    <div class="container">
        <h2><?php print $form_title; ?></h2>
        <h3><?php print $form_subtitle ?></h3>

        <?php
            $feedback_block = module_invoke('webform', 'block_view', 'client-block-48');
            print render($feedback_block['content']);
        ?>
    </div>
</section>

    <!--(bake parts/footer.php)-->
</body>
</html>
