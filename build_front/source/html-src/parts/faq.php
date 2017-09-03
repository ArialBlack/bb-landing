<?php
    $topics = $node['field_paragraphs'][7]['entity']['paragraphs_item'][9]['pp_items_node']['#items'];
    $topics_nodes = [];

    for($i=0; $i < count($topics); $i++) {
        $topic_node_nid = $topics[$i]['target_id'];
        $topic_node = node_load($topic_node_nid);
        array_push($topics_nodes, $topic_node);
    }
?>
<div class="faq-tab-container">
    <div class="col-sm-3 faq-tab-menu">
        <div class="list-group">
            <?php
                print '<a href="#" class="list-group-item active text-center">' . $topics_nodes[0]->title . '</a>';

                for($i=1; $i < count($topics_nodes); $i++) {
                    print '<a href="#" class="list-group-item text-center">' . $topics_nodes[$i]->title . '</a>';
                }
            ?>
        </div>
    </div>

    <div class="col-sm-9 faq-tab">
        <?php
            $active_class = '';

            for ($i=0; $i < count($topics_nodes); $i++) {
            $topic_nid = $topics_nodes[$i]->nid;
            $topic_view_node = node_view(node_load($topic_nid),'full');

            if($i==0) {
                $active_class = ' active';
            } else {
                $active_class = '';
            }

            print '<div class="faq-tab-content' . $active_class . '">';

            $questions = $topic_view_node['field_paragraphs'][0]['entity']['paragraphs_item'];
            reset($questions);
            $first_key = key( $questions);
            $question_items = $questions[$first_key]['pp_items_node']['#items'];

            print '<div class="panel-group" id="accordion" role="tablist" aria-multiselectable="true">';
            $exp_status = 'false';
            $in = '';

                for($j=0; $j<count($question_items); $j++) {
                $nid = $question_items[$j]['target_id'];
                $question_node = node_load($nid);

                if($j==0) {
                    $exp_status = 'true';
                    $in = ' in';
                } else {
                    $exp_status = 'false';
                    $in = '';
                }

                print '<div class="panel panel-default">';
                print '<div class="panel-heading" role="tab" id="heading' . $j . '">';
                print '<h4 class="panel-title">';
                print '<a role="button" data-toggle="collapse" data-parent="#accordion" href="#collapse' . $j . '" aria-expanded="' . $exp_status . '" aria-controls="collapse' . $j . '">';
                print $question_node->title;
                print '</a></h4></div>';
                print '<div id="collapse' . $j . '" class="panel-collapse collapse' . $in . '" role="tabpanel" aria-labelledby="heading' . $j . '">';
                print '<div class="panel-body">';
                print $question_node->body['und'][0]['safe_value'];
                print '</div></div></div>';
            }

            print '</div>';
            print '</div>';
        }
        ?>
    </div>
</div>
