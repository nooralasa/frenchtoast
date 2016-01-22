$(function () {

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
      alert('AJAX failed.');
    });    
  });

  // if (counter%2==0) {
  //   $('#submit').attr('href', '/playerb');
  // } else {
  //   $('#submit').attr('href', '/playera');
  // }

});

