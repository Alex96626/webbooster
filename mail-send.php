<?php

if(!empty($_GET['phone']) and !empty($_GET['mail'])){
    $name = trim(strip_tags($_GET['name']));
    $phone = trim(strip_tags($_GET['tel']));
    $product = trim(strip_tags($_GET['productItem']));
    
    
    $mailTo = 'work.alex966@gmail.com';

    
    $mailTema = 'Заявка на покупку';
    $mailMassage = 'Заявку отправил: Телефон:'. $phone.'    '. 'Email:'. $mail . 'Товар:' . $product;

    
    
    mail($mailTo,$mailTema, $mailMassage,"Content-type:text/html;charset=UTF-8");
    echo 'Успех';
    
} 

?>