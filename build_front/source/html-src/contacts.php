﻿<?php
$node_object = node_load(49);
$node = node_view(node_load(49),'full');

//form
$form = $node['field_paragraphs'][0]['entity']['paragraphs_item'][16];
$form_title = $form['field_title']['#items'][0]['value'];
$form_subtitle = $form['pp_title']['#items'][0]['value'];
?>

<!--(bake parts/head.php title="Контакти | Book Box")-->

<body class="page-contacts">

<!--(bake parts/nav-and-header-2.php)-->

<section id="contacts">

		<div id="block-1" class="first-block-contacts">
		<div class="container">
		  <div class="row">
		    <div class="col-md-8 col-sm-9">
        <div class="bread-crumbs"><p class="to-main"><a href="/">Book Box</a></p><span class="bread-arrow">▶</span><p class="current">Контакти</p></div>

          <h1>Контакти</h1>
          <h2><?php print $form_title; ?></h2>
          <h3><?php print $form_subtitle; ?></h3>
        </div>
        <div class="col-md-4 col-sm-3">
        <img src="sites/all/themes/bookboxlanding_ui/images/svg/Forma_6.svg">
        </div>
      </div>
		</div>


		</div>
		<div class="second-block-contacts">
			<div class="container">
			  <h2><mark>Напишіть нам</mark></h2>
        <?php
            $feedback_block = module_invoke('webform', 'block_view', 'client-block-49');
            print render($feedback_block['content']);
        ?>
    </div>
		</div>
		<a href="#block-1" class="scroll-to"><img src="sites/all/themes/bookboxlanding_ui/images/scroll-to-2.jpg"></a>
</section>

    <!--(bake parts/footer.php)-->
</body>
</html>
