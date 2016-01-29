$(function () {

  var socket = io();
  var currentPlayer;
  $('#submit').click(function (evt) {
    //check if a game exists
    //create a player
    $.post('/', {
      name: $('input[name=name]').val(),
      age: $('input[name=age]').val(),
      gender: $('input[name=gender]:checked').val()
    }).done(function (res) {
      currentPlayer = res.content;
      socket.emit('player', currentPlayer);
      if (currentPlayer && currentPlayer.type == 'B') {
        console.log("I'm type B");
        window.location.replace('/playerb');
      } else {
        window.location.replace('/playera');
      }
      console.log(res.content);
      console.log(currentPlayer.type == 'B');
      console.log('created a player');
    }).fail(function (res) {
      console.log(res);
      console.log('AJAX failed');
    });    
  });

  console.log('currentPlayer: '+currentPlayer);



  // if (currentPlayer.type == 'B') {
  //   console.log("I'm type B");
  //   $('#submit').attr('href', '/playera');
  // } else {
  //   $('#submit').attr('href', '/playerb');
  // }

  // $.get('/current', function (playerData) {
  //   console.log("I'm here");
  //   if (!playerData.success) {
  //     alert('failed in getting user data');
  //   } else {
  //     currentPlayer = playerData.content.player;
  //     console.log('yo yo yo');
  //     socket.emit('player id', currentPlayer._id);
  //     console.log(currentPlayer.type);
  //     if (currentPlayer.type == 'B') {
  //       console.log("I'm type B");
  //       $('#submit').attr('href', '/playera');
  //     } else {
  //       $('#submit').attr('href', '/playerb');
  //     }
  //   }
  // });

});

