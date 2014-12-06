var Teacher = (function () {
    
    var $console = $('#console-output');

    function CreateTeacher() {
        //override the console so that students see output in the interface
        console.log = function (message) { $console.append(message + '</br>') }
    }

    return {
        Create: CreateTeacher
    };
})();