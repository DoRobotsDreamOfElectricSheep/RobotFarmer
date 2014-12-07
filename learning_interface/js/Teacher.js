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
            //Create RobotFarmer
            Lesson1: CreateRobotLesson,
            //Turn Lights On
            Lesson2: LightsOnLesson
        }
    }

    function ResetOverrides() {
        robotFarmer = originalRobotFarmer;
        robotFarmer.create = originalRobotFarmerFunctions.Create;
    }

    function CreateRobotLesson() {
        robotFarmer.create = function () {
            var shimmedRobotFarmer = originalRobotFarmerFunctions.Create();
            console.log("Lesson1 Complete");
            ResetOverrides();
            return shimmedRobotFarmer;
        };
    }
    
    function LightsOnLesson() {
        var shimmedRobotFarmer;
        robotFarmer.create = function () {
            shimmedRobotFarmer = originalRobotFarmerFunctions.Create();
            var originalLightsOn = shimmedRobotFarmer.lightsOn;
            shimmedRobotFarmer.lightsOn = function () {
                originalLightsOn();
                console.log("Lesson2 Complete");
                ResetOverrides();
            };
            
            return shimmedRobotFarmer;
        };
    }

    return {
        Create: CreateTeacher
    };
})();