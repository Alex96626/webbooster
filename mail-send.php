<!doctype html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset"UTF-8 />
    
    <title>fggВаше сообщение успешно отправлено</title>
</script>

</head>

<body>

<?php

// if(!empty($_GET['name']) and !empty($_GET['tel'])){
    echo 'test';
    var_dump($_POST);
    var_dump($_GET);
    var_dump($_REQUEST);
    $name = trim(strip_tags($_POST['name']));
    $phone = trim(strip_tags($_POST['tel']));
    $product = trim(strip_tags($_POST['product-name']));
    
    
    $mailTo = 'work.alex966@gmail.com';
    $mailTema = 'Заявка на покупку';
    $mailMassage = 'Заявку отправил: Имя:'. $name. 'Телефон:'. $phone . 'Товар:' . $product;
    var_dump($mailMassage);

    
    
    mail($mailTo,$mailTema, $mailMassage,"Content-type:text/html;charset=UTF-8");
    echo 'Успех';
    
// } 

?>

</body>