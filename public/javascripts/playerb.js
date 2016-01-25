$(function () {

	var socket = io();

  $('#submit').click(function (evt) {
  	console.log('Hello');
    $('#questions').append("<span> Is it more like "+$('input[name=object1]').val()+" or like "+ $('input[name=object2]').val() +"? </span><br>");
    socket.emit('chat message', "Is it more like "+$('input[name=object1]').val()+" or like "+ $('input[name=object2]').val()+"?");

    $('input[name=object1]').val('');
    $('input[name=object2]').val('');

  });

});

