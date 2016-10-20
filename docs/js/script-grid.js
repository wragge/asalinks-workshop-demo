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

    $('#grid').hide();
    $('#status').show();
    $.getJSON( "js/records.json", function(data) {
        data = shuffle(data);
        $.each(data, function(index, record) {
            $('#grid').append('<a title="' + record.title + '" class="grid-item pull-left thumbnail" href="' + record.repository_url + '"><img alt="' + record.title + '" src="images/' + record.version_id + '.jpg"></a>');
        });
        var $grid = $('#grid').packery({
            itemSelector: '.grid-item',
            gutter: 5
        });
        // layout Packery after each image loads
        $grid.imagesLoaded(function() {
            $('#status').hide();
            $grid.show();
            $grid.packery();
        });

    });
});