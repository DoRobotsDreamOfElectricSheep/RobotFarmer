$(function () {
    $('#run').click(function () {
        var codeToRun = $('#editor').val();
        try {
            eval(codeToRun);
        } catch (err) {
            alert(err);
        }
    });
});