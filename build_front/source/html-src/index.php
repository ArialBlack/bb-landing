<?php
$node = node_view(node_load(1),'full');
dsm($node);

// intro
//$field = field_get_items('node', $node, 'field_name');
//$output = field_view_value('node', $node, 'field_name', $field[$delta]);

$intro = $node['field_paragraphs'][0]['entity']['paragraphs_item'][1];
$into_title = $intro['field_title']['#items'][0]['value'];
$intro_cover_uri = $intro['field_cover']['#items'][0]['uri'];
$intro_cover_image = image_style_url('cover', $intro_cover_uri);

//how it works
$how = $node['field_paragraphs'][1]['entity']['paragraphs_item'][2];
$how_title = $how['field_title']['#items'][0]['value'];
$how_subtitle = $how['pp_title']['#items'][0]['value'];

$teaser_uri_1 = $how['field_teaser_collection'][0]['entity']['field_collection_item'][1]['field_cover']['#items'][0]['uri'];
$teaser_image_1 = image_style_url('medium', $teaser_uri_1);
$teaser_title_1 = $how['field_teaser_collection'][0]['entity']['field_collection_item'][1]['field_title']['#items'][0]['value'];
$teaser_subtitle_1 = $how['field_teaser_collection'][0]['entity']['field_collection_item'][1]['field_subtitle']['#items'][0]['value'];

$teaser_uri_2 = $how['field_teaser_collection'][1]['entity']['field_collection_item'][2]['field_cover']['#items'][0]['uri'];
$teaser_image_2 = image_style_url('medium', $teaser_uri_2);
$teaser_title_2 = $how['field_teaser_collection'][1]['entity']['field_collection_item'][2]['field_title']['#items'][0]['value'];
$teaser_subtitle_2 = $how['field_teaser_collection'][1]['entity']['field_collection_item'][2]['field_subtitle']['#items'][0]['value'];

$teaser_uri_3 = $how['field_teaser_collection'][2]['entity']['field_collection_item'][3]['field_cover']['#items'][0]['uri'];
$teaser_image_3 = image_style_url('medium', $teaser_uri_3);
$teaser_title_3 = $how['field_teaser_collection'][2]['entity']['field_collection_item'][3]['field_title']['#items'][0]['value'];
$teaser_subtitle_3 = $how['field_teaser_collection'][2]['entity']['field_collection_item'][3]['field_subtitle']['#items'][0]['value'];
?>

<!--(bake parts/head.php)-->

<body class="page-main">

<!--(bake parts/nav-and-header.php)-->

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
            <li>
                <img src="<?php print $teaser_image_1; ?>" />
                <h5><?php print $teaser_title_1; ?></h5>
                <h6><?php print $teaser_subtitle_1; ?></h6>
            </li>
            <li>
                <img src="<?php print $teaser_image_2; ?>" />
                <h5><?php print $teaser_title_2; ?></h5>
                <h6><?php print $teaser_subtitle_2; ?></h6>
            </li>
            <li>
                <img src="<?php print $teaser_image_3; ?>" />
                <h5><?php print $teaser_title_3; ?></h5>
                <h6><?php print $teaser_subtitle_3; ?></h6>
            </li>
        </ul>
    </div>
</section>



    <!--(bake parts/footer.php)-->
</body>
</html>
