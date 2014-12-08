var robotFarmer = (function () {

    var serverUrl = "http://aunwin.koding.io:3000",
        $console = $('#console-output'),
        $camera = $('#camera');

    var status = {
        lightsOn: false,
        waterOn: false,
        cameraImageUrl: ''
    }
    
    function ConsoleMessage(message, type) {
        if (type === 'sent') {
            console.log('[' + GetFormattedCurrentTime() + '] Message Sent: ' + message);
        }
        if (type === 'senderror') {
            console.log('[' + GetFormattedCurrentTime() + '] Send Error: ' + message);
        }
        else {
            console.log('[' + GetFormattedCurrentTime() + '] ' + message);
        }
    }

    function GetFormattedCurrentTime() {
        var time = new Date();
        return time.getHours() + ':' + time.getMinutes() + ':' + time.getSeconds();
    }

    function HandleAjaxError(jqXHR, textStatus, errorThrown) {
        var errorMessage = errorThrown.message ? errorThrown.message : textStatus;
        ConsoleMessage(errorMessage, 'senderror');
    }

    function PostMessage(messageToSend, displayMessage) {
        $.ajax({
            type: 'POST',
            url: serverUrl,
            data: JSON.stringify(messageToSend),
            success: function () { ConsoleMessage(displayMessage, 'sent'); },
            error: HandleAjaxError
        })
    }

    function GetMessage(messageToSend, sucessCallback, displayMessage) {
        $.ajax({
            type: 'POST',
            url: serverUrl,
            data: JSON.stringify(messageToSend),
            success: function (data) {
                sucessCallback(data);
            },
            error: HandleAjaxError
        })
    }

    function CreateRobotFarmer() {
        ConsoleMessage("Robot Farmer Created!");
        PollCameraImageUrl();

        return {
            lightsOn: TurnLightsOn,
            lightsOff: TurnLightsOff,
            takePicture: TakeArmPicture,
            status: function () { console.log(status.lightsOn); }
        };
    }

    function TurnLightsOn(pos, timer) {
        PostMessage({id: 'student', cmd: 'lightsOn', data: { pos:pos , timer: timer } }, 'lights on');
    }

    function TurnLightsOff(pos, timer) {
        PostMessage({ id: 'student', cmd: 'lightsOff', data: { pos: pos, timer: timer } }, 'lights off');
    }

    function TakeArmPicture() {
        PostMessage({ id: 'student', cmd: 'takepicture'}, 'picture taken');
    }

    function PollCameraImageUrl() {
        setTimeout(function () {
            GetMessage({ id: 'student', cmd: 'cameraImageUrl' }, function (data) { 
                if (data) {
                    if (status.cameraImageUrl != data.imageUrl) {
                        status.cameraImageUrl = url;
                        $camera.attr('src', url);
                    };
                }
            });
            PollCameraImageUrl();
        }, 1000);
    }

    //function UpdatePicture
    return {
        create: CreateRobotFarmer
    };

})();