$(function () {

    $("#run").click(function (event) {
        event.preventDefault();
        event.stopPropagation();
      

        elem.toggleClass('focused', elem.is(':visible'))
            .toggle(elem.is(':visible'))

        document.onselectstart = function () { return false; };
        event.target.ondragstart = function () { return false; };
        return false;
    });

    $('#run').click(function () {
        var codeToRun = $('#editor').val();
        try {
            eval(codeToRun);
        } catch (err) {
            alert(err);
        }
    });
});