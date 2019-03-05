$(document).ready(function(){
  'use strict'
  
  //variable that contains the max amount of responses from the API
  var numOfResponses = 20;
    
  function displayResponses(apiData){
         //clear any previous search entry responses
    $('#response').empty();

    //array for containing info on responses as objects
    var responses = [];
    //variables to hold info on responses before putting in an object
    var title;
    var snippet;
    var url;
    
    for(var i = 0; i < numOfResponses; i++){
          //object for storing info on each response
    var responseObj = {title:"", snippet:"", url:""};
      
      //retrieve info on each response
      title = apiData.query.search[i].title; //last thing Kevin looked at
      snippet = apiData.query.search[i].snippet;
      url = "https://en.wikipedia.org/wiki/" + (title.replace(/ /g, "_"));

      //enter each info part into the object
      responseObj.title = title;
      responseObj.snippet = snippet;
      responseObj.url = url;
      
      //push object to array
      responses.push(responseObj);
    };

       //Iterates through responses
    for(var j = 0; j < responses.length; j++)
      {
        //Declares & initializes local variables that will hold result information - just for looks
        var title = responses[j].title;
        var snippet = responses[j].snippet;
        var url = responses[j].url;
        
        //Creates the HTML elements that will display the results
        var htmlAppend = '<div class = "responses-div"><a class = "responses-a" target = "_blank" href =' + responses[j].url +'><h2 class = "title">'+responses[j].title+'</h2><p>'+responses[j].snippet+'</p></a></div>';


//Appends the results to the ul with slideDown animation
  $("ul").append(htmlAppend).children(':last').slideDown('slow');
      }
  };
  
    //function used to contact Wiki API using user search input
  function contactWiki(searchField){
    $.ajax({
        url: 'https://en.wikipedia.org/w/api.php',
        data: { action: 'query', 
            list: 'search', 
            srlimit: numOfResponses,
            srsearch: searchField, 
            format: 'json'},
        dataType: 'jsonp',
        success: displayResponses
    }); 
  }

  function getInput() {
    //place value user entered in searchField variable
    var searchField = $('#searchField').val();
    //run function to contact Wiki API
    contactWiki(searchField);
  }
  
  
  //run getInput() when Submit button is clicked
  $("#submitButton").click(getInput);
  //"click" submit button if user presses Enter
  $('#searchField').keypress(function (e) {
    if (e.which == 13) {
     $('#submitButton').click();
      return false;
  }
  

});
})