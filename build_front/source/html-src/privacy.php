<?php
$node = node_load(50);

?>

<!--(bake parts/head.php title="Політика конфіденційності | Book Box")-->

<body class="page-privacy">

<!--(bake parts/nav-and-header-2.php)-->

<section id="privacy">
    <div id="block-1" class="first-block-privacy">
        <div class="container">
          <div class="row">
            <div class="col-md-8 col-sm-8">
            <div class="bread-crumbs"><p class="to-main"><a href="/">Головна</a></p><span class="bread-arrow">▶</span><p class="current"><?php print $node->title; ?></p></div>
              <h1><?php print $node->title; ?></h1>
            </div>
            <div class="col-md-4 col-sm-4">
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
