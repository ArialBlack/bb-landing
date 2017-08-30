<?php

/**
 * @file
 * Default simple view template to display a list of rows.
 *
 * @ingroup views_templates
 */
?>

<div id="carousel-rates" class="carousel slide" data-ride="carousel">
  <!-- Indicators -->
  <ol class="carousel-indicators">
    <li data-target="#carousel-rates" data-slide-to="0" class="active"></li>
    <?php
      for($i=1; $i<count($rows); $i++) {
        print '<li data-target="#carousel-rates" data-slide-to="' . $i . '"></li>';
      }
    ?>
  </ol>

  <!-- Wrapper for slides -->
  <div class="carousel-inner" role="listbox">
    <div class="item active">
      <?php print $rows[0]; ?>
    </div>
    <?php
      for($i=1; $i<count($rows); $i++) {
        print '<div class="item">' . $rows[$i] . '</div>';
      }
    ?>
  </div>

  <!-- Controls -->
  <a class="left carousel-control" href="#carousel-rates" role="button" data-slide="prev">
    <span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
    <span class="sr-only">Попередній</span>
  </a>
  <a class="right carousel-control" href="#carousel-rates" role="button" data-slide="next">
    <span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
    <span class="sr-only">Наступний</span>
  </a>
</div>