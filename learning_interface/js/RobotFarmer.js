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
            $console.append('[' + GetFormattedCurrentTime() + '] Message Sent: ' + message + '</br>');
        }
        if (type === 'senderror') {
            $console.append('[' + GetFormattedCurrentTime() + '] Send Error: ' + message + '</br>');
        }
        else {
            $console.append('[' + GetFormattedCurrentTime() + '] ' + message + '</br>');
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
            success: function() { $console.append(displayMessage, 'sent'); },
            error: HandleAjaxError
        })
    }

    function CreateRobotFarmer() {
        if (!created) {
            created = true;
            ConsoleMessage("Robot Farmer Created!");
            return {
                lightsOn: function () { PostMessage("{sender: 'student', message: 'lightsOn'}", 'lights on') },
                status: function () { alert(status.lightsOn); }
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