$(function () {
  // var socket = io();
  
  $('#submit').click(function (evt) {
    //create a player
    $.post('/', {
      name: $('input[name=name]').val(),
      age: $('input[name=age]').val(),
      gender: $('input[name=gender]:checked').val()
    }).done(function () {
      console.log('created a player');
    }).fail(function () {
      alert('AJAX failed.');
    });
    
  });

});

