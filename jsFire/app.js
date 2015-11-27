//calling firebase io javascript api
var favMovies = new Firebase('https://fendi.firebaseio.com/movies');

function saveToList(event) {
    if (event.which == 13 || event.keyCode == 13) { // as the user presses the enter key, we will attempt to save the data
        var movieName = document.getElementById('movieName').value.trim();
        if (movieName.length > 0) {
            saveToFB(movieName);
        }
        document.getElementById('movieName').value = '';
        return false;
    }
};

function saveToFB(movieName) {
    //this will save data to FireBase
    favMovies.push({
        name: movieName
    });
};

function refreshUI(list) {
    var lis = '';
    for(var i = 0; i<list.length; i++){
        lis += '<li data-key=" ' + list[i].key + '" >'+list[i].name + '</li>';
    };
    document.getElementById('favMovies').innerHTML = lis;
};

    //this will get fired on initial loadd as well as wheneveer there's a change in the data
favMovies.on("value", function(snapshot) {
    var data = snapshot.val();
    var list = [];
    for (var key in data) {
        if (data.hasOwnProperty(key)) {
            name = data[key].name ? data[key].name : '';
            if(name.trim().length > 0) {
                list.push({
                    name: name,
                    key: key
                })
            }
        }
    }
    //refresh the UI
    refreshUI(list);
    });

