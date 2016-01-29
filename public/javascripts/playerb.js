$(function () {

	var socket = io();

  $('#submit').click(function (evt) {
  	console.log('Hello');
  	var ques = "Is it more like "+$('input[name=object1]').val()+" or like "+ $('input[name=object2]').val()+"?";
    $('#questions').append("<span>"+ques+"</span><br>");
    
    $.post('/playerb', {
      firstChoice: $('input[name=object1]').val(),
      secondChoice: $('input[name=object2]').val()
    }).done(function (res) {
      console.log('res.content: ');
      console.log(res.content);
      socket.emit('playerbToServer', {
        question: res.content,
        statement: ques
      });
  		console.log('done');    
    }).fail(function (res) {
      alert('AJAX failed');
    }); 

    $('input[name=object1]').val('');
    $('input[name=object2]').val('');
    $('#submit').disabled = true;

  });

  socket.on('serverToPlayerb', function (msg) {
    console.log(msg);
    $('#submit').disabled = false;
    $('#questions').append("<span>"+msg.answer+"</span><br>");
  });

});

