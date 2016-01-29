$(function () {

	var socket = io();

  $.get('playera/game').done(function (res, gameId) {
    $('#concept').text('The Concept is '+res.content.concept);
  }).fail(function (res) {
      alert('AJAX failed');
    });

  socket.on('serverToPlayera', function (msg) {
    if (msg.guess) {
        $.get('playera/gameId').done(function (res, gameId) {
    
        if (res.content==msg.gameId) {
          $('#questions').append("<span>"+msg.statement+"</span><br>");
          $('#questions').append("<span>"+msg.guess+"</span><br>");

          if (msg.guess=='Yes') {
            alert('Congratulations, you helped your partner guess correctly!');
          }
        }
      });

    } else {
        $.get('playera/gameId').done(function (res, gameId) {
    
        if (res.content==msg.question.game) {
          $('#currentQuestion').text(msg.statement);
          $('#choice1').text(msg.question.firstChoice);
          $('#choice2').text(msg.question.secondChoice);
          $('input[name=answer]').attr('disabled', false);
          $('#submit').attr('disabled', false);

          $('#submit').click(function (evt) {
            var ans = $('input[name=answer]:checked').next().text();

            $.post('/playera/wasQuestionAsked', {
                quesId: msg.question._id
              }).done(function (res) {

                if (res.content==false) {
                  $('#questions').append("<span>"+msg.statement+"</span><br>");
                  $('#questions').append("<span>"+ans+"</span><br>");
                  $('#currentQuestion').text('Waiting for question!');
                  $('#choice1').text('Waiting for first choice');
                  $('#choice2').text('Waiting for second choice');
                  $('input[name=answer]').attr('disabled', true);
                  $('#submit').attr('disabled', true);  

                  $.post('/playera', {
                    quesId: msg.question._id,
                    answer: ans
                  }).done(function (res) {
                    socket.emit('playeraToServer', {
                      question: res.content,
                      answer: ans
                    }); 
                  }).fail(function (res) {
                    alert('AJAX failed');
                  }); 

                  $.post('/playera/addQuestion', {
                    quesId: msg.question._id
                  }).fail(function (res) {
                    alert('AJAX failed');
                  }); 
                }   
              }).fail(function (res) {
                alert('AJAX failed');
              }); 

          }); 
        } 
      }).fail(function (res) {
        alert('AJAX failed');
      });
    }
  });

});

