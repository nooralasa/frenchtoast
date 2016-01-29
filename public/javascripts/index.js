$(function () {

  var socket = io();
  var currentPlayer;
  $('#submit').click(function (evt) {
    $.post('/', {
      name: $('input[name=name]').val(),
      age: $('input[name=age]').val(),
      gender: $('input[name=gender]:checked').val()
    }).done(function (res) {
      currentPlayer = res.content;
      socket.emit('player', currentPlayer);
      if (currentPlayer && currentPlayer.type == 'B') {
        window.location.replace('/playerbInfo');
      } else {
        window.location.replace('/playeraInfo');
      }
      console.log('created a player');
    }).fail(function (res) {
      console.log('AJAX failed');
    });    
  });
  
});

