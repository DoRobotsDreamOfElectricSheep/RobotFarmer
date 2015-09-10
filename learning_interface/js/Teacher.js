var Teacher = (function () {
    
    var $console = $('#console-output');
    var $lessonTitle = $('#lesson-title');
    var $instructorSlides = $('#instructor-slides');

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
        $instructorSlides.html(lesson.description);
        var lessonCompleteCallback = function () {
            console.log(lessonTitle + " Complete");
            ResetOverrides();
        };

        robotFarmer.create = function () {
            shimmedRobotFarmer = originalRobotFarmerFunctions.Create();
            lesson.start(lessonCompleteCallback);
            return shimmedRobotFarmer;
        };
    }
//LESSONS 1--------------------------------------------------------------------------------------------------------
    var LightsOnLesson = (function(){
        return {
            description:
                '<div class="Lesson1A lesson">'
                    + "<p>The plants are probably hungry for some sun, so let's begin by having some fun.</p>"
                    + '<p>Create a Robot Farmer and store it in a variable.  The variable name can be anything you want ex: myRobotFarmer, alexsRobotFarmer, etc, but it can not be named robotFarmer</p><p>#Note: Javascript is case-sensitive'
                    + '<div class="code">var myRobotFarmer = robotFarmer.create();</div>'
                    + '<p>Now turn the farm uv lights on</p>'
                    + '<div class="code">myRobotFarmer.lightsOn();</div>'
                    + '<p>Type the two lines of code above into the editor below...then click run.</p>'
                + '</div>',
            start: function (lessonCompleteCallback) {
                var orig_lightsOn = shimmedRobotFarmer.lightsOn;
                shimmedRobotFarmer.lightsOn = function () {
                    orig_lightsOn();
                    lessonCompleteCallback();
                };
            }
        }
    })();

    var LightsOffLesson = (function () {
        return {
            description:
                '<div class="Lesson1B lesson">'
                    + "<p>That was easy, now lets try turning those lights back off</p>"
                    + '<p>Create a Robot Farmer and store it in a variable.  The variable name can be anything you want ex: myRobotFarmer, alexsRobotFarmer, etc, but it can not be named robotFarmer</p>'
                    + '<div class="code">var myRobotFarmer = robotFarmer.create();</div>'
                    + '<p>Now turn the farm lights off</p>'
                    + '<div class="code">myRobotFarmer.lightsOff();</div>'
                    + '<p>Type the two lines of code above into the editor below...then click run.</p>'
                + '</div>',
            start: function (lessonCompleteCallback) {
                var orig_lightsOff = shimmedRobotFarmer.lightsOff;
                shimmedRobotFarmer.lightsOff = function () {
                    orig_lightsOff();
                    lessonCompleteCallback();
                };
            }
        }
    })();

    var WaterOnLesson = (function () {
        return {
            description:
                '<div class="Lesson1C lesson">'
                    + "<p>Now it's time to turn the water on.</p>"
                    + '<p>So create a Robot Farmer like before and then call its waterOn() function</p>'
                    + '<div class="code">myRobotFarmer.waterOn();</div>'
                + '</div>',
            start: function (lessonCompleteCallback) {
                var orig_waterOn = shimmedRobotFarmer.waterOn;
                shimmedRobotFarmer.waterOn = function () {
                    orig_waterOn();
                    lessonCompleteCallback();
                };
            }
        }
    })();

    var WaterOffLesson = (function () {
        return {
            description:
                '<div class="Lesson1B lesson">'
                    + "<p>That was easy, now lets try turning those lights back off</p>"
                    + '<p>Create a Robot Farmer and store it in a variable.  The variable name can be anything you want ex: myRobotFarmer, alexsRobotFarmer, etc, but it can not be named robotFarmer</p>'
                    + '<div class="code">var myRobotFarmer = robotFarmer.Create();</div>'
                    + '<p>Now turn the farm lights off</p>'
                    + '<div class="code">myRobotFarmer.lightsOff();</div>'
                    + '<p>Type the two lines of code above into the editor below...then click run.</p>'
                + '</div>',
            start: function (lessonCompleteCallback) {
                var orig_waterOff = shimmedRobotFarmer.waterOff;
                shimmedRobotFarmer.waterOff = function () {
                    orig_waterOff();
                    lessonCompleteCallback();
                }; 
            }
        }
    })();

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