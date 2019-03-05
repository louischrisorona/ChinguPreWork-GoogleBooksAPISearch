$(document).ready(function () {
    'use strict';
    
   // document.getElementById("#searchField").setAttribute(‘disabled’, false);
    
   function fetchData() {
         
        var searchField = $('#searchField').val();
         
        if (searchField === "") {
            alert("Please enter something in the field first.");
        } else {
            var responsesObj = {};
            var title = "";
            var author = "";
            var publisher = "";
            var url = "";
            var thumbnail = "";
             
            fetch(('https://www.googleapis.com/books/v1/volumes/?q=' + searchField), {
                method: 'GET',
                mode: 'cors',
                credentials: 'omit',
                redirect: 'follow',
                cache: 'no-cache',
                headers: new Headers({
                    'Content-Type': 'application/json'
                })
            }).then(function (response) {
                // convert to JSON
                return response.json();
            }).then(function (results) {

                for (var i = 0; i < results.items.length; i++) {
                    title = results.items[i].volumeInfo.title;
                    author = results.items[i].volumeInfo.authors;
                    publisher = results.items[i].volumeInfo.publisher;
                    url = results.items[i].volumeInfo.infoLink;
                    thumbnail = results.items[i].volumeInfo.imageLinks.thumbnail;
                    
                    //Creates the HTML elements that will display the results
                    var htmlAppend = '<div class = "responses-div"><a class = "responses-a" target = "_blank" href =' + url +'><img src="'+ thumbnail + '><h2 class = "title">'+title+'</h2><h3>'+author+'</h3><h4>'+publisher+'</h4></a></div>';


                    //Appends the results to the ul with slideDown animation
                    $("ul").append(htmlAppend).children(':last').slideDown('slow');
                }
                
            })
        }
    };
  
  //run fetchData() when Submit button is clicked
  $("#submitButton").click(fetchData);
  //"click" submit button if user presses Enter
    $('#searchField').keypress(function (e) {
        if (e.which === 13) {
            $('#submitButton').click();
            return false;
            }
        return false;
    })
})