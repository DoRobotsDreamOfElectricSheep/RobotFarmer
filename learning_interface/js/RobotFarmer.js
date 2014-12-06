var robotFarmer = (function () {

    var created = false,
        serverUrl = "localhost:9000",
        $console = $('#console-output');

    var status = {
        lightsOn: false,
        waterOn: false
    }
    
    function ConsoleMessage(message, type) {
        if (type === 'sent') {
            $console.append('[' + GetFormattedCurrentTime() + '] Message Sent: ' + message + '</br>');
        }
        else {
            $console.append('[' + GetFormattedCurrentTime() + '] ' + message + '</br>');
        }
    }

    function GetFormattedCurrentTime() {
        var time = new Date();
        return time.getHours() + ':' + time.getMinutes() + ':' + time.getSeconds();
    }

    function PostMessage(messageToSend, displayMessage) {
        $.ajax({
            type: 'POST',
            url: serverUrl,
            data: messageToSend,
            success: function() { $console.append(displayMessage, 'sent'); },
            error: function(jqXHR,textStatus,errorThrown) { $console.append(errorThrown); }
        })
    }

    function CreateRobotFarmer() {
        if (!created) {
            created = true;
            ConsoleMessage("Robot Farmer Created!");
            return {
                lightsOn: PostMessage("{sender: 'student', message: 'lightsOn'}", 'lights on'),
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