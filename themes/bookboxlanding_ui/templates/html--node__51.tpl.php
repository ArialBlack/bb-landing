<?php
$node = node_load(51);

?>

<!DOCTYPE html>
<html lang="uk">
<head>
    <meta charset="UTF-8">
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <title><?php print $node_object->title;?> | <?php print variable_get('site_name'); ?></title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="/sites/all/themes/bookboxlanding_ui/css/style.css">
    <link rel="apple-touch-icon" sizes="57x57" href="/sites/all/themes/bookboxlanding_ui/apple-icon-57x57.png">
    <link rel="apple-touch-icon" sizes="60x60" href="/sites/all/themes/bookboxlanding_ui/apple-icon-60x60.png">
    <link rel="apple-touch-icon" sizes="72x72" href="/sites/all/themes/bookboxlanding_ui/apple-icon-72x72.png">
    <link rel="apple-touch-icon" sizes="76x76" href="/sites/all/themes/bookboxlanding_ui/apple-icon-76x76.png">
    <link rel="apple-touch-icon" sizes="114x114" href="/sites/all/themes/bookboxlanding_ui/apple-icon-114x114.png">
    <link rel="apple-touch-icon" sizes="120x120" href="/sites/all/themes/bookboxlanding_ui/apple-icon-120x120.png">
    <link rel="apple-touch-icon" sizes="144x144" href="/sites/all/themes/bookboxlanding_ui/apple-icon-144x144.png">
    <link rel="apple-touch-icon" sizes="152x152" href="/sites/all/themes/bookboxlanding_ui/apple-icon-152x152.png">
    <link rel="apple-touch-icon" sizes="180x180" href="/sites/all/themes/bookboxlanding_ui/apple-icon-180x180.png">
    <link rel="icon" type="image/png" sizes="192x192"  href="/sites/all/themes/bookboxlanding_ui/android-icon-192x192.png">
    <link rel="icon" type="image/png" sizes="32x32" href="/sites/all/themes/bookboxlanding_ui/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="96x96" href="/sites/all/themes/bookboxlanding_ui/favicon-96x96.png">
    <link rel="icon" type="image/png" sizes="16x16" href="/sites/all/themes/bookboxlanding_ui/favicon-16x16.png">
    <link rel="manifest" href="/sites/all/themes/bookboxlanding_ui/manifest.json">
    <meta name="msapplication-TileColor" content="#ffffff">
    <meta name="msapplication-TileImage" content="/sites/all/themes/bookboxlanding_ui/ms-icon-144x144.png">
    <meta name="theme-color" content="#ffffff">
</head>

<body class="page-main">

<ul>
    <li><a href="https://lib.bookbox.ua/user">Вхід</a></li>
    <li><a href="https://lib.bookbox.ua/user/register">Реєстрація</a></li>
</ul>

<nav class="navbar navbar-inverse">
    <div class="container">
        <div class="navbar-header">
            <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                <span class="sr-only">Toggle navigation</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>
            <a class="navbar-brand" href="/">Bookbox</a>
        </div>
        <div id="navbar" class="collapse navbar-collapse">
            <ul class="nav navbar-nav">
                <li class="active"><a href="#how">Як це працює</a></li>
                <li><a href="#books">Асортимент</a></li>
                <li><a href="#price">Вартість</a></li>
                <li><a href="#clients">Клієнти</a></li>
                <li><a href="#faq">F.A.Q.</a></li>
            </ul>
        </div><!--/.nav-collapse -->
    </div>
</nav>


<?php print $messages; ?>

<section id="contacts">
    <div class="container">
        <h1><?php print $node->title; ?></h1>

        <?php print $node->body['und'][0]['safe_value']; ?>
    </div>
</section>

    <footer class="footer">
        <div class="container">
            Footer goes here
        </div>
    </footer>
    <script src="/sites/all/themes/bookboxlanding_ui/js/vendors/jquery.min.js"></script>
    <script src="/sites/all/themes/bookboxlanding_ui/bower_components/bootstrap/dist/js/bootstrap.min.js"></script>
    <script src="/sites/all/themes/bookboxlanding_ui/js/main.js"></script>

</body>
</html>
