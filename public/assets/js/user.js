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