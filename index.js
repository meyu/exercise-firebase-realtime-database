//////////////////
// 資料操作
//////////////////

// 連結 Firebase
var config = {
    apiKey: "AIzaSyCxMU5crY8sIYhSTbDW1HlDtdtAj0OuC_A",
    authDomain: "nodejs-2647b.firebaseapp.com",
    databaseURL: "https://nodejs-2647b.firebaseio.com",
    projectId: "nodejs-2647b",
    storageBucket: "nodejs-2647b.appspot.com",
    messagingSenderId: "459984730028"
};
firebase.initializeApp(config);

// 取得資料
var raw_data;
var todos = firebase.database().ref('todos');
todos.orderByChild('creat_date').on('value', function (data) {
    raw_data = data;
    printTODOs();
});

// 新增資料
var input = document.getElementById('input');
function pushTodo() {
    if (input.value != '') {
        var todo = {
            title: input.value,
            create_date: (new Date()).toJSON()
        }
        todos.push(todo);
    }
    input.value = '';
}

// 刪除資料
function removeTodo(keyValue) {
    todos.child(keyValue).remove();
}

// 顯示資料
var list = document.getElementById('list');
function printTODOs() {
    var html = '';
    var obj = raw_data.val();

    // 取出key值及內容，做作陣列，並依指定方式排序
    var todos_arr = [];
    raw_data.forEach(el => {
        todos_arr.push([el.key, obj[el.key].title]);
    });

    // 來排序
    switch (orderBy.value) {
        case '0':  // 逆排輸入序
            todos_arr.reverse();
            break;
        case '2':  // 內容順排
            todos_arr = sortMan(todos_arr, 1);
            break;
        case '3':  // 內容逆排
            todos_arr = sortMan(todos_arr, 1);
            todos_arr.reverse();
            break;
        default:   // 原始輸入序
            break;
    }

    // 來輸出
    for (var i in todos_arr) {
        html += '<li data-idx="' + todos_arr[i][0] + '">' + todos_arr[i][1] + '</li>';
    }
    list.innerHTML = html;
}

// 依指定位置的內容來排序陣列
function sortMan(a_array, idx2order) {
    a_array.sort(function (a, b) {
        if (a[idx2order] > b[idx2order]) {
            return 1;
        }
        if (a[idx2order] < b[idx2order]) {
            return -1;
        }
        return 0;
    });
    return a_array;
}


//////////////////
// 食指事件
//////////////////

// 切換排序模式
var orderBy = document.getElementById("order_by");
orderBy.addEventListener("change", function () {
    printTODOs();
});

// 新增by按鈕
var send = document.getElementById('send');
send.addEventListener("click", function () {
    pushTodo();
});

// 新增by鍵盤
input.addEventListener("keypress", function (e) {
    if (e.keyCode == 13) {
        pushTodo();
    }
});

// 刪除by滑鼠
list.addEventListener("click", function (e) {
    if (e.target.nodeName == 'LI') {
        removeTodo(e.target.dataset.idx);
    }
})




