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