<?php
$node = node_load(50);

?>

<!--(bake parts/head.php)-->

<body class="page-main">

<!--(bake parts/nav-and-header.php)-->

<?php print $messages; ?>

<section id="contacts">
    <div class="container">
        <h1><?php print $node->title; ?></h1>

        <?php print $node->body['und'][0]['safe_value']; ?>
    </div>
</section>

    <!--(bake parts/footer.php)-->
</body>
</html>
