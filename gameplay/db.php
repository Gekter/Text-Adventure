<?php
$connect = mysqli_connect("127.0.0.1", "istu_gektor", "ISTU2021_gektor");
$db = new mysqli("127.0.0.1", "istu_gektor", "ISTU2021_gektor", "istu_gektor");


if (isset($_GET['getSlides'])) {
    $sql = "SELECT * FROM `project_slide`";
    $selectALL = $db->query($sql);
    
    $slides = array();

    while ($slide = $selectALL->fetch_assoc()) {
        $buttons = array();
        $selectButtons = $db->query("SELECT * from project_buttons where id_cur_slide=".$slide['id']);
        while ($button = $selectButtons->fetch_assoc()) {
            array_push($buttons, array(
                // 'id_cur_slide'=> $button['id_cur_slide'],
                'id_next_slide'=> $button['id_next_slide'],
                'text'=> $button['text']
            ));
        }
        array_push($slides, array(
            'text'=> $slide['text'], 
            'image'=> $slide['image'],
            'buttons'=> $buttons
        ));
    }
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($slides);
    die(); 
}
