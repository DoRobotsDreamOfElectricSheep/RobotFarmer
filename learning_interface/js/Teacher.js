var Teacher = (function () {
    
    var $console = $('#console-output');

    var originalRobotFarmer = robotFarmer;
    var originalRobotFarmerFunctions = {
        Create : robotFarmer.create
    }

    function CreateTeacher() {
        //override the console so that students see output in the interface
        console.log = function (message) { $console.append(message + '</br>') }

        return {
            Lesson1: StartLesson1
        }
    }

    function ResetOverrides() {
        robotFarmer = originalRobotFarmer;
        robotFarmer.create = originalRobotFarmerFuntions.create;
    }

    function StartLesson1() {
        var originalCreate = robotFarmer.create;

        robotFarmer.create = function () {
            originalCreate();
            console.log("Lesson1 Complete");
        };
    }

    return {
        Create: CreateTeacher
    };
})();