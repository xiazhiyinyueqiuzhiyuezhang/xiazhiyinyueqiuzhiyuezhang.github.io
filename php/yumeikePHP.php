    <?php
    // ����һ��PHP����
    $data = array();
    $data['a'] = 'test';
    $data['b'] = 'bbb';

    // ��PHP����ת��JSON�ַ���
    $json_string = json_encode($data);

    // д���ļ�
    file_put_contents('../json/package.json', $json_string);
    ?>