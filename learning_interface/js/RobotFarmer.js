var robotFarmer = (function () {

    var created = false,
        serverUrl = "http://localhost:9000",
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
        if (!created) {
            created = true;
            ConsoleMessage("Robot Farmer Created!");
            return {
                lightsOn: function () { PostMessage("{sender: 'student', message: 'lightsOn'}", 'lights on') },
                status: function () { console.log(status.lightsOn); }
            };
        }
        else {
            ConsoleMessage("Can't create Robot Farmer, already created");
        }
    }

    return {
        create: CreateRobotFarmer
    };
})();