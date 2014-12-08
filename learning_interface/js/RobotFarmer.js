var robotFarmer = (function () {

    var serverUrl = "http://localhost:9000",
        $console = $('#console-output');

    var status = {
        lightsOn: false,
        waterOn: false
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
            type: 'GET',
            url: serverUrl,
            contentType: "application/json; charset=utf-8",
            data: messageToSend,
            dataType: 'json',
            success: function () { console.log(displayMessage, 'sent'); },
            error: HandleAjaxError
        })
    }

    function CreateRobotFarmer() {
        ConsoleMessage("Robot Farmer Created!");
        return {
            lightsOn: TurnLightsOn,
            lightsOff: TurnLightsOff,
            status: function () { console.log(status.lightsOn); }
        };
    }

    function TurnLightsOn(pos, timer) {
        PostMessage("{id: 'student', cmd: 'lightsOn', data: { pos:" + pos + " , timer:" + timer + "} }", 'lights on');
    }

    function TurnLightsOff(pos, timer) {
        PostMessage("{id: 'student', cmd: 'lightsOff', data: { pos:" + pos + " , timer:" + timer + "} }", 'lights off');
    }

    return {
        create: CreateRobotFarmer
    };
})();