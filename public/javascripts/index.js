$(function () {

  var socket = io();
  $('#submit').click(function (evt) {
    //check if a game exists
    //create a player
    $.post('/', {
      name: $('input[name=name]').val(),
      age: $('input[name=age]').val(),
      gender: $('input[name=gender]:checked').val()
    }).done(function (res) {
      console.log(res);
      console.log('created a player');
    }).fail(function () {
      alert('AJAX failed badly.');
    });    
  });

  $.get('/current', function (playerData) {
    console.log("I'm here");
    if (!playerData.success) {
      alert('failed in getting user data');
    } else {
      currentPlayer = playerData.content.player;
      console.log('yo yo yo');
      socket.emit('player id', currentPlayer._id);
      console.log(currentPlayer.type);
      if (currentPlayer.type == 'B') {
        console.log("I'm type B");
        $('#submit').attr('href', '/playera');
      } else {
        $('#submit').attr('href', '/playerb');
      }
    }
  });

});

