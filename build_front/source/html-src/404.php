<?php
$node = node_load(19);
?>

<!--(bake parts/head.php)-->

<body class="thank-you-page">
    <!--(bake parts/nav-and-header.php)-->

    <main>
        <div class="container">
            <div class="thank-you-block">
                <div class="row">
                    <div class="col-md-6">
                        <h1><?php print $node->title;?></h1>
                    </div>
                </div>
            </div>
        </div>
    </main>

    <!--(bake parts/footer.php)-->
</body>
</html>