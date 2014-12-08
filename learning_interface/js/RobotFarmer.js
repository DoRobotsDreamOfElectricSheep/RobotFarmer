var robotFarmer = (function () {

    var serverUrl = "http://192.168.1.2:3000",
        $console = $('#console-output');

    var status = {
        lightsOn: false,
        waterOn: false,
        pictureTimeStamp: 0
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
            success: function () { console.log(displayMessage, 'sent'); },
            error: HandleAjaxError
        })
    }

    function GetMessage(messageToSend, sucessCallback, displayMessage) {
        $.ajax({
            type: 'POST',
            url: serverUrl,
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(messageToSend),
            dataType: 'json',
            success: function (data) {
                console.log(displayMessage, 'sent');
                sucessCallback(data);
            },
            error: HandleAjaxError
        })
    }

    function CreateRobotFarmer() {
        ConsoleMessage("Robot Farmer Created!");
        PollForImageTimeStamp();

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

    function PollForImageTimeStamp() {
        setTimeout(function () {
            PostMessage({ id: 'student', cmd: 'lastPictureTaken' }, function (data) { 
                if (data) {
                    status.pictureTimeStamp = data;

                }
            });
            PollForPictureTimeStamp();
        }, 3000);
    }

    //function UpdatePicture
    return {
        create: CreateRobotFarmer
    };

})();