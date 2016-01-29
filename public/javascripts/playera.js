$(function () {

	var socket = io();

  //if issues with multiple players, add game id 
  socket.on('serverToPlayera', function (msg) {
    $('#currentQuestion').text(msg.statement);
    
    

    $('#submit').click(function (evt) {
      console.log('Hi');
      var ans = $('input[name=answer]').val();
      console.log('ans: '+ans);
      console.log('msg.question._id: '+msg.question._id);
      $('#questions').append("<span>"+msg.statement+"</span><br>");
      $('#questions').append("<span>"+$('input[name=answer]').val()+"</span><br>");
      $('#currentQuestion').text('Waiting for question!');

      $.post('/playera', {
        quesId: msg.question._id,
        answer: ans
      }).done(function (res) {
        socket.emit('playeraToServer'+res.content.game, {
          question: res.content,
          answer: ans
        });
        console.log('done');    
      }).fail(function (res) {
        console.log(res);
        console.log(res.body);
        alert('AJAX failed');
      }); 

      $('input[name=answer]').val('');

    });
    //wait for submit
      //add choice to question 
      //emit choice
  });

});

