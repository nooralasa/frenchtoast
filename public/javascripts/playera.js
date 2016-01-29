$(function () {

	var socket = io();

  //if issues with multiple players, add game id 
  socket.on('serverToPlayera', function (msg) {
    $.get('playera/gameId').done(function (res, gameId) {
      console.log('-------------------------------------');
      console.log('questionsAsked: '+questionsAsked);
      
      if (res.content==msg.question.game) {
        $('#currentQuestion').text(msg.statement);

        $('#submit').click(function (evt) {
          console.log('Hi');
          var ans = $('input[name=answer]').val();
          console.log('ans: '+ans);
          console.log('msg.question._id: '+msg.question._id);
          
          $.post('/playera/wasQuestionAsked', {
              quesId: msg.question._id
            }).done(function (res) {

              console.log(res.content);
              console.log('done'); 

              if (res.content==false) {
                $('#questions').append("<span>"+msg.statement+"</span><br>");
                $('#questions').append("<span>"+$('input[name=answer]').val()+"</span><br>");
                $('#currentQuestion').text('Waiting for question!');

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

                $('input[name=answer]').val('');
              }   
            }).fail(function (res) {
              console.log(res);
              console.log(res.body);
              alert('AJAX failed');
            }); 

          // if (questionsAsked.length==0 || jQuery.inArray(msg.question._id, questionsAsked)) {

          // } else {
          //   questionsAsked.push(msg.question._id);
          // }
        }); 
      } 
    }).fail(function (res) {
      console.log(res);
      console.log(res.body);
      alert('AJAX failed');
    });
  });

});

