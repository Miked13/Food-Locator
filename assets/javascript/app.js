$(document).ready(function () {
    /**
    * pulls information from the form and build the query URL
    * @returns {string} URL for ZOMATO API based on form inputs
    */
    function getQueryURL() {
        var queryURL = "https://developers.zomato.com/api/v2.1/search?q=";
        //"https://developers.zomato.com/api/v2.1/search";
        var querySearch = $("#search-term").val().trim();
        var user_key = "fafaa7da981182588674fb22841c865f";
        console.log("URL :" + queryURL);
        console.log(queryURL + querySearch + "&user-key=" + user_key);
        return queryURL + querySearch + "&user-key=" + user_key;
    }

    function updatePage(data){
        console.log(data);
        var restaurant = data.restaurants;
        console.log(restaurant);
        for (var i = 0; i < restaurant.length; i++){
            $(".searchResult").append(restaurant[i]);
        }

        
        
        /*
        $(".searchResult").append("<div class='col-4'> \
        <div class='list-group' id='list-tab' role='tablist'> \
          <a class='list-group-item list-group-item-action active' id='list-home-list' data-toggle='list' href='#list-home' role='tab' aria-controls='home'>restaurant</a> \
        </div> \
      </div>");
      */
        //$(".searchResult").append("<div class = 'col-4'>");
    };

    function clear(){
        $("#article-section").empty();
    }

    $("#searchButton").on("click", function(){
        event.preventDefault();
        clear();
        var queryURL = getQueryURL();
        
        $.ajax({
            type: "GET",
            url: queryURL,
            data: {"user-key" : "fafaa7da981182588674fb22841c865f"},
            dataType: "json",
            beforeSend: (xhr) => {
                xhr.setRequestHeader('Accept', 'application/json');
                xhr.setRequestHeader('user-key', 'fafaa7da981182588674fb22841c865f');
            }
        }).then(data => updatePage(data));

        
    });
    $("#clear-all").on("click", clear);
});