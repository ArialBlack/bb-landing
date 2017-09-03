<?php
$node = node_load(50);

?>

<!--(bake parts/head.php)-->

<body class="page-privacy">

<!--(bake parts/nav-and-header.php)-->

<?php print $messages; ?>

<section id="privacy">
    <div id="block-1" class="first-block-privacy">
        <div class="container">
          <div class="row">
            <div class="col-md-8">
              <h1><?php print $node->title; ?></h1>
            </div>
            <div class="col-md-4">
            <img src="sites/all/themes/bookboxlanding_ui/images/privacy.png">
            </div>
          </div>
        </div>
    </div>

    <div class="second-block-privacy">
      <div class="container">
          <h2> About This Privacy Policy</h2>
          <?php print $node->body['und'][0]['safe_value']; ?>
      </div>
    </div>
    <a href="#block-1" class="scroll-to"><img src="sites/all/themes/bookboxlanding_ui/images/scroll-to-2.jpg"></a>
</section>

    <!--(bake parts/footer.php)-->
</body>
</html>
