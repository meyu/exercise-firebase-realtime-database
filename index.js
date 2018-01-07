// Initialize Firebase
var config = {
    apiKey: "AIzaSyCxMU5crY8sIYhSTbDW1HlDtdtAj0OuC_A",
    authDomain: "nodejs-2647b.firebaseapp.com",
    databaseURL: "https://nodejs-2647b.firebaseio.com",
    projectId: "nodejs-2647b",
    storageBucket: "nodejs-2647b.appspot.com",
    messagingSenderId: "459984730028"
};
firebase.initializeApp(config);
var todos = firebase.database().ref('todos');


// select
var list = document.getElementById('list');
todos.orderByChild('creat_date').on('value', function (data) {
    var html = '';
    var obj = data.val();
    data.forEach(el => {
        html += getListHtml(obj[el.key].title,el.key);
    });
    list.innerHTML = html;
});
function getListHtml(title, idx) {
    return '<li data-idx="' + idx + '">' + title + '</li>';
}


// insert
var send = document.getElementById('send');
var input = document.getElementById('input');
send.addEventListener("click",function() {
    if (input.value != '') {
        var todo = {
            title: input.value,
            create_date: (new Date()).toJSON()
        }
        todos.push(todo);
    }
    input.value = '';
});


// delete
list.addEventListener("click",function(e){
    if (e.target.nodeName == 'LI') {
        todos.child(e.target.dataset.idx).remove();
    }
})


