    <?php
    // 生成一个PHP数组
    $data = array();
    $data['a'] = 'test';
    $data['b'] = 'bbb';

    // 把PHP数组转成JSON字符串
    $json_string = json_encode($data);

    // 写入文件
    file_put_contents('../json/package.json', $json_string);
    ?>