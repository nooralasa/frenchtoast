$(function () {

  $('#submit').click(function (evt) {
    $('#questions').append("<span> Is it more like "+$('input[name=object1]').val()+" or like "+ $('input[name=object2]').val() +"? </span><br>");
    $('input[name=object1]').val('');
    $('input[name=object2]').val('');
  });

});

