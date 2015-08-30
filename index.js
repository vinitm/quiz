$(document).ready(function() {

    $('select').material_select();

    $('.start-btn').click(function(event) {
        var year = $("#year :selected").val();
        var date = $("#date :selected").val();
        var shift = $("#shift :selected").val();
        if (!year)
            alert("Please select a year");
        else if (!date)
            alert("Please select a date");
        else if (!shift)
            alert("Please select a shift");

        return true;
    });
});
