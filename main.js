$(document).ready(function () {
    'use strict';
    
    document.getElementById("Button").disabled = false;
    
    $("#submitButton").click(function () {
         
        var searchField = $('#searchField').val();
         
        if (searchField === "") {
            alert("Please enter something in the field first.");
        } else {
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
                console.log(results);
            })
        }
    });
    
  //"click" submit button if user presses Enter
    $('#searchField').keypress(function (e) {
        if (e.which === 13) {
            $('#submitButton').click();
            return false;
            }
        return false;
    })
})