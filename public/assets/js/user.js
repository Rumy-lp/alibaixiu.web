//用户显示功能 利用模板引擎拼接
let userArr = [];
$.ajax({
    type: 'get',
    url: '/users',
    success: function (res) {
        userArr = res;
        render();
    }
});
function render() {
    let html = template('userTpl', { data: userArr });
    $('tbody').html(html);
};

//上传图片功能
$('#avatar').on('change', function () {
    let formData = new FormData();
    formData.append('avatar', this.files[0]);
    $.ajax({
        //对应接口文档
        type: 'post',
        url: '/upload',
        data: formData,
        // 只要是通过jquery中的ajax来实现文件上传的功能 就需要设置下面两个属性
        processData: false,
        contentType: false,
        success: function (res) {
            $('#previewImg').attr('src', res[0].avatar);
            $('#hidden').val(res[0].avatar)
        }
    })
});

//添加用户功能
$('#btnAdd').on('click', function () {
    // 收集用户输入的数据  将表单里面的数据进行一次性获取到
    let data = $("form").serialize();
    $.ajax({
        type: 'post',
        url: '/users',
        data: data,
        success: function (res) {
            userArr.push(res);
            render();
            // 将表单数据清空 
            $('input[type="email"]').val('');
            $('input[name="nickName"]').val('');
            $('input[name="password"]').val('');
            $('#status0').prop('checked', false);
            $('#status1').prop('checked', false);
            $('#admin').prop('checked', false);
            $('#normal').prop('checked', false);
            $('#hidden').val('');
            $('#previewImg').attr('src', '../assets/img/default.png')
        },
        error: function (err) {
            console.log(err)
        }
    })
});

//给用户列表中的编辑按钮注册点击事件 当点击编辑按钮时 选中的用户信息将展示到左边的添加信息列表中
$('tbody').on('click', '.edit', function () {
    //将标头添加用户改为编辑用户
    $('h2').html('编辑用户');
    //获取当前被点击的元素的父级元素tr
    let tr = $(this).parents('tr');
    let imgSrc = tr.find('img').attr('src');
    $('#previewImg').attr("src", imgSrc);
    $('#hidden').val(imgSrc);
    $('input[name="email"]').prop('disabled', true).val(tr.children().eq(2).text());
    $('input[name="nickName"]').val(tr.children().eq(3).text());
    $('input[name="password"]').prop('disabled', true);

    if (tr.children().eq(4).text() == '激活') {
        $('#status1').prop('checked', true);
    } else {
        $('#status0').prop('checked', true);
    }

    if (tr.children().eq(5).text() == '超级管理员') {
        $('#admin').prop('checked', true);
    } else {
        $('#normal').prop('checked', true);
    }
    // 将添加按钮隐藏 同时 将遍历按钮显示出来 
    $('#btnAdd').hide();
    $('#btnEdit').show();
});