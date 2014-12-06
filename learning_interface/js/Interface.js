$(function () {
    var teacher = Teacher.Create();
    teacher.Lesson1();

    $('#run').click(function () {
        var codeToRun = $('#editor').val();
        try {
            eval(codeToRun);
        } catch (err) {
            console.log(err);
        }
    });
});