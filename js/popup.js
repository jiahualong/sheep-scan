document.addEventListener('DOMContentLoaded', function (){
    document.querySelector('#check').addEventListener('click', function () {
        document.querySelector('#result').innerHTML += "hello<br />"
    })
});