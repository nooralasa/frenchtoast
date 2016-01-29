$(function () {

	var socket = io();

  $('#submit').click(function (evt) {
    $('#submit').attr('disabled', true);
  	var ques = "Is it more like "+$('input[name=object1]').val()+" or like "+ $('input[name=object2]').val()+"?";
    $('#questions').append("<span>"+ques+"</span><br>");
    
    $.post('/playerb', {
      firstChoice: $('input[name=object1]').val(),
      secondChoice: $('input[name=object2]').val()
    }).done(function (res) {
      socket.emit('playerbToServer', {
        question: res.content,
        statement: ques
      });   
    }).fail(function (res) {
      alert('AJAX failed');
    }); 

    $('input[name=object1]').val('');
    $('input[name=object2]').val('');
    $('#submit').disabled = true;

  });

  $('#submit2').click(function (evt) {
    var ques = "Is it "+$('input[name=guess]').val()+"?";
    var ans = 'No';
    $('#questions').append("<span>"+ques+"</span><br>");
    
    $.post('/playerb/guess', {
      guess: $('input[name=guess]').val()
    }).done(function (res) {
      if (res.content.bool) {
        $('#questions').append("<span>Yes</span><br>");
        ans = "Yes";
        alert("Congratulations, you've guessed correctly!");
      } else {
        $('#questions').append("<span>No</span><br>");
      }
      socket.emit('playerbToServer', {
        gameId: res.content.gameId,
        statement: ques,
        guess: ans
      });
    }).fail(function (res) {
      alert('AJAX failed');
    });

    $('input[name=guess]').val("");
  });

  socket.on('serverToPlayerb', function (msg) {
    $('#submit').attr('disabled', false);
    $('#questions').append("<span>"+msg.answer+"</span><br>");
  });

});

