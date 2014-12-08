$(function () {
    var $progress = $("#progress");
    $progress.accordion();
    var $instructorSlides = $('#instructor-slides');

    var teacher = Teacher.Create();
    //default lesson
    teacher.Lesson1A();
    $instructorSlides.find('.Lesson1A').show();


    $progress.on('click', 'li', function () {
        var lessonId = $(this).attr('id');
        teacher[lessonId]();

        $instructorSlides.find('.lesson').hide();
        $instructorSlides.find('.' + lessonId).show()
        $progress.find('li').css("background-color", "rgba(0, 0, 0, 0)");
        $(this).css("background-color", "#3498db");
    });

    $('#run').click(function () {
        var codeToRun = $('#editor').val();
        try {
            eval(codeToRun);
        } catch (err) {
            console.log(err);
        }
    });
});