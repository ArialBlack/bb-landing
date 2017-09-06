<?php
$node = node_load(51);

?>

<!--(bake parts/head.php)-->

<body class="page-terms">

<!--(bake parts/nav-and-header-2.php)-->

<?php print $messages; ?>

<section id="terms-of-use">
    <div id="block-1" class="first-block-terms">
    		<div class="container">
    		  <div class="row">
    		    <div class="col-md-7 col-sm-7">
              <h1><?php print $node->title; ?></h1>
            </div>
            <div class="col-md-5 col-sm-3 col-sm-offset-2">
            <img src="sites/all/themes/bookboxlanding_ui/images/terms.png">
            </div>
          </div>
    		</div>
		</div>
    <div class="second-block-terms">
      <div class="container">
          <?php print $node->body['und'][0]['safe_value']; ?>
      </div>
    </div>
    <a href="#block-1" class="scroll-to"><img src="sites/all/themes/bookboxlanding_ui/images/scroll-to-2.jpg"></a>
</section>

    <!--(bake parts/footer.php)-->
</body>
</html>
