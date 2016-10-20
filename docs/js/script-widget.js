$(function() {
    function shuffle(array) {
        var currentIndex = array.length, temporaryValue, randomIndex;

          // While there remain elements to shuffle...
        while (0 !== currentIndex) {

            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

          return array;
    }

    $.getJSON( "js/faces.json", function(data) {
        data = shuffle(data);
        data = data.slice(0, 20)
        $.each(data, function(index, record) {
            $('#widget').append('<a title="' + record.title + '" class="grid-item pull-left" href="' + record.link + '"><img width="50" height="50" alt="' + record.title + '" src="/faces/' + record.image + '"></a>');
        });

    });
});