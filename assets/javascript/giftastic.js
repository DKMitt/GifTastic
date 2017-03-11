
var topics = ["chevy","ford","volvo", "chrysler"];
var deleteEnabled = false;

$(document).ready(function() {
  addButton();
  addDeleteButton();

  $('#addCar').on('click', function(event){

    event.preventDefault();

    var newCar = $('#carInput').val().trim();

     $('#carInput').val("")

    topics.push(newCar);

    addButton();

  });



  $('#carButton').on('click', '.car', function(){

    var theButtonText = this.textContent;

    if (deleteEnabled === true) {

      topics.splice(topics.indexOf(theButtonText),1);

      $(this).remove();

      deleteEnabled = false;

    }

    else{

      var searchText = theButtonText.replace(" ", "+");

      var queryURL = "http://api.giphy.com/v1/gifs/search?q="+searchText+"&limit=10&api_key=dc6zaTOxFJmzC";

      $.ajax({url: queryURL, method: 'GET'})
		.done(function(ajaxResponse) {
        addGifs(ajaxResponse);

      });

    }

  })



  $("#GIFArea").on('click', '.giphy', function(){

    if (deleteEnabled === true) {
      $(this).parent().remove();
      deleteEnabled = false;
    }

    else{
    animateGifs(this);
    }

  })



  $("#deleteButton").on("click", ".deleteEnable", function(){

    deleteEnabled = true;

  })


  function addButton(){

    $('.car').remove();

    for (var i = 0; i < topics.length; i++) {

      var $button = $('<button>') // create <button>

      $button.addClass('car btn-danger'); // Added a class

      $button.attr('data-name', topics[i]); // Added a data-attribute

      $button.html(topics[i]); // Provided the initial button text

      $('#carButton').append($button); // Added the button to the HTML

    };

  }; 

  function addGifs(ajaxResponse){

    for (var objNdx = 0; objNdx < ajaxResponse.data.length; objNdx++) {

      var gifUrlAnime = ajaxResponse.data[objNdx].images.fixed_height.url;

      var gifUrlStill = ajaxResponse.data[objNdx].images.fixed_height_still.url;

      var gifHeight = ajaxResponse.data[objNdx].images.fixed_height.height;

      var gifRating = ajaxResponse.data[objNdx].rating;

      var $div=$('<div>');

      $div.addClass("gifDiv pull-left");

      var $p=$('<p>').text("Rating: "+gifRating);

      $p.addClass("text-center");

      var $gifImage = $('<img>');

      $gifImage.attr('src', gifUrlStill);

      $gifImage.attr('data-still', gifUrlStill);

      $gifImage.attr('data-animate', gifUrlAnime);

      $gifImage.attr('data-state', 'still');

      $gifImage.addClass('giphy');

      $div.append($p);

      $div.append($gifImage);

      $('#GIFArea').prepend($div);

    }

  }


  function animateGifs(gifClicked){

    if ( $(gifClicked).attr('data-state') == 'still'){

      $(gifClicked).attr('src', $(gifClicked).data('animate'));

      $(gifClicked).attr('data-state', 'animate');

    }else{

      $(gifClicked).attr('src', $(gifClicked).data('still'));

      $(gifClicked).attr('data-state', 'still');

    }

  }

  function addDeleteButton(){

    $("deleteButton").addClass('text-right');

    var $button = $('<button>')

    $button.addClass('deleteEnable btn');

    $button.html('Delete Enable Button');

    $('#deleteButton').append($button);

  }

}); 




