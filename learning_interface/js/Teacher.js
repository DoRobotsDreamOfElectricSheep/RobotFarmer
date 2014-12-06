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
        robotFarmer.create = originalRobotFarmerFunctions.Create;
    }

    function StartLesson1() {
        robotFarmer.create = function () {
            var rf = originalRobotFarmerFunctions.Create();
            console.log("Lesson1 Complete");
            ResetOverrides();
            return rf;
        };
    }

    return {
        Create: CreateTeacher
    };
})();