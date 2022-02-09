import $ from 'jquery'

$(function (){

    $("<h1 />")
        .text("Привет медвед")
        .css({
            textAlign: 'right',
            color: 'red'
        })
        .appendTo(".header");

});