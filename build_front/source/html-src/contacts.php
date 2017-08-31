<?php
$node_object = node_load(49);
$node = node_view(node_load(49),'full');

//form
$form = $node['field_paragraphs'][0]['entity']['paragraphs_item'][16];
$form_title = $form['field_title']['#items'][0]['value'];
$form_subtitle = $form['pp_title']['#items'][0]['value'];
?>

<!--(bake parts/head.php)-->

<body class="page-main">

<!--(bake parts/nav-and-header.php)-->

<?php print $messages; ?>

<section id="contacts">
    <div class="container">
        <h2><?php print $form_title; ?></h2>
        <h3><?php print $form_subtitle; ?></h3>

        <?php
            $feedback_block = module_invoke('webform', 'block_view', 'client-block-49');
            print render($feedback_block['content']);
        ?>
    </div>
</section>

    <!--(bake parts/footer.php)-->
</body>
</html>
