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