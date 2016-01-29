$(function () {

	var socket = io();

  $.get('playera/game').done(function (res, gameId) {
    $('#concept').text('The Concept is '+res.content.concept);
  }).fail(function (res) {
      console.log(res);
      console.log(res.body);
      alert('AJAX failed');
    });

  //if issues with multiple players, add game id 
  socket.on('serverToPlayera', function (msg) {
    $.get('playera/gameId').done(function (res, gameId) {
      
      if (res.content==msg.question.game) {
        $('#currentQuestion').text(msg.statement);
        $('#choice1').text(msg.question.firstChoice);
        $('#choice2').text(msg.question.secondChoice);
        $('input[name=answer]').attr('disabled', false);
        $('#submit').attr('disabled', false);

        $('#submit').click(function (evt) {
          console.log('Hi');
          var ans = $('input[name=answer]:checked').next().text();
          console.log('ans: '+ans);
          console.log('msg.question._id: '+msg.question._id);
          
          $.post('/playera/wasQuestionAsked', {
              quesId: msg.question._id
            }).done(function (res) {

              console.log(res.content);
              console.log('done'); 

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
                  console.log('done');    
                }).fail(function (res) {
                  console.log(res);
                  console.log(res.body);
                  alert('AJAX failed');
                }); 

                $.post('/playera/addQuestion', {
                  quesId: msg.question._id
                }).done(function (res) {
                  console.log('done');    
                }).fail(function (res) {
                  console.log(res);
                  console.log(res.body);
                  alert('AJAX failed');
                }); 
              }   
            }).fail(function (res) {
              console.log(res);
              console.log(res.body);
              alert('AJAX failed');
            }); 

        }); 
      } 
    }).fail(function (res) {
      console.log(res);
      console.log(res.body);
      alert('AJAX failed');
    });
  });

});

