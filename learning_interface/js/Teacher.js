var Teacher = (function () {
    
    var $console = $('#console-output');
    var $lessonTitle = $('#lesson-title');

    var originalRobotFarmer = robotFarmer;
    var originalRobotFarmerFunctions = {
        Create : robotFarmer.create
    }

    var shimmedRobot;

    function CreateTeacher() {
        //override the console so that students see output in the interface
        console.log = function (message) { $console.append(message + '</br>') }

        return {
            Lesson1A: function () { CreateLesson('Lesson 1A', LightsOnLesson); },
            Lesson1B: function () { CreateLesson('Lesson 1B', LightsOffLesson); },
            Lesson1C: function () { CreateLesson('Lesson 1C', WaterOnLesson); },
            Lesson1D: function () { CreateLesson('Lesson 1D', WaterOffLesson); },
            Lesson1E: function () { CreateLesson('Lesson 1E', TakeDarkPictureLesson); },
            Lesson1F: function () { CreateLesson('Lesson 1E', TakeLightPictureLesson); }
        }
    }

    function ResetOverrides() {
        robotFarmer = originalRobotFarmer;
        robotFarmer.create = originalRobotFarmerFunctions.Create;
    }


    function CreateLesson(lessonTitle, lesson) {
        $lessonTitle.text(lessonTitle);
        var lessonCompleteCallback = function () {
            console.log(lessonTitle + " Complete");
            ResetOverrides();
        };

        robotFarmer.create = function () {
            shimmedRobotFarmer = originalRobotFarmerFunctions.Create();
            lesson(lessonCompleteCallback);
            return shimmedRobotFarmer;
        };
    }
//LESSONS 1--------------------------------------------------------------------------------------------------------
    function LightsOnLesson(lessonCompleteCallback) {
        $('#instructor-slides').load('http://robotfarmer.student12345.netdna-cdn.com/lessons.html .Lesson1A');
        var orig_lightsOn = shimmedRobotFarmer.lightsOn;
        shimmedRobotFarmer.lightsOn = function () {
            orig_lightsOn();
            lessonCompleteCallback();
        };
    }

    function LightsOffLesson(lessonCompleteCallback) {
        var orig_lightsOff = shimmedRobotFarmer.lightsOff;
        shimmedRobotFarmer.lightsOff = function () {
            orig_lightsOff();
            lessonCompleteCallback();
        };
    };

    function WaterOnLesson(lessonCompleteCallback) {
        var orig_waterOn = shimmedRobotFarmer.waterOn;
        shimmedRobotFarmer.waterOn = function () {
            orig_waterOn();
            lessonCompleteCallback();
        };
    }

    function WaterOffLesson(lessonCompleteCallback) {
        var orig_waterOff = shimmedRobotFarmer.waterOff;
        shimmedRobotFarmer.waterOff = function () {
            orig_waterOff();
            lessonCompleteCallback();
        };
    }

    function TakeDarkPictureLesson(lessonCompleteCallback) {
        var orig_takePic = shimmedRobotFarmer.takePicture;
        shimmedRobotFarmer.takePicture = function () {
            orig_takePic();
            lessonCompleteCallback();
        };
    }

    function TakeLightPictureLesson(lessonCompleteCallback) {
        var orig_takePic = shimmedRobotFarmer.takePicture;
        var picTaken = false;

        var orig_lightsOn = shimmedRobotFarmer.lightsOn;
        var lightOn = false;

        shimmedRobotFarmer.takePicture = function () {
            orig_takePic();
            picTaken = true;
            
            if (lightOn) { lessonCompleteCallback };
        };

        shimmedRobotFarmer.lightsOn = function () {
            orig_lightsOn();
            lightOn = true;

            if (picTaken) { lessonCompleteCallback };
        };

        lessonCompleteCallback();
    }
    
    
    

//LESSON 2-------------------------------------------------------------------------------------------------------
//LESSON 3--------------------------------------------------------------------------------------------------------
//LESSON 4--------------------------------------------------------------------------------------------------------
//LESSON 5--------------------------------------------------------------------------------------------------------

    return {
        Create: CreateTeacher
    };
})();