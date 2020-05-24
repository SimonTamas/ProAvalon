const usernamesIndexes = require('../../myFunctions/usernamesIndexes');

function LancelotSwitch(thisRoom_) {
    this.thisRoom = thisRoom_;

    this.phase = 'lancelotSwitch';
    this.showGuns = false;
}

LancelotSwitch.prototype.gameMove = function (socket, buttonPressed, selectedPlayers) {
    if (buttonPressed !== 'yes') {
        return;
    }
    const index = usernamesIndexes.getIndexFromUsername(this.thisRoom.playersInGame, socket.request.user.username);
    let isPlayerBadLancelot = index !== -1 && this.thisRoom.playersInGame[index].role === 'Bad Lancelot';
    let isPlayerGoodLancelot = index !== -1 && this.thisRoom.playersInGame[index].role === 'Good Lancelot';
    let swap = this.thisRoom.lancelotSwitches[this.thisRoom.missionNum-3];
    let haveSwapped = swap === 1;
    if ( haveSwapped ) {
        if ( this.thisRoom.lancelotsSwitched ) {
            if ( isPlayerGoodLancelot ) {
                socket.emit('danger-alert', 'You are Good Lancelot again! You will stay good for the rest of the game!');
            } else if ( isPlayerBadLancelot ) {
                socket.emit('danger-alert', 'You are Bad Lancelot again! You will stay bad for the rest of the game!');
            }
            socket.emit('info-alert', 'Lancelots have switched again. They are now and will remain their original roles.');
            this.thisRoom.sendText(this.thisRoom.allSockets, `Lancelots have switched again. They are now and will remain their original roles.`, 'gameplay-text-red');
        } else {
            if ( isPlayerGoodLancelot ) {
                socket.emit('danger-alert', 'You are now Bad Lancelot! You MUST fail missions from now on!');
            } else if ( isPlayerBadLancelot ) {
                socket.emit('danger-alert', 'You are now Good Lancelot! You MUST succeed missions from now on!');
            }
            socket.emit('info-alert', 'Lancelots have switched. If you were bad you are now good and visa versa.');
            this.thisRoom.sendText(this.thisRoom.allSockets, `Lancelots have switched. If you were bad you are now good and visa versa.`, 'gameplay-text-red');
        }
        this.thisRoom.lancelotsSwitched = !this.thisRoom.lancelotsSwitched;
    } else {
        socket.emit('info-alert', 'Lancelots have not switched.');
        this.thisRoom.sendText(this.thisRoom.allSockets, `Lancelots have not switched.`, 'gameplay-text-blue');
    }

    this.thisRoom.phase = 'pickingTeam';
};


// Returns a object with green and red keys.
// Green and Red must both have the following properties:
//  hidden          - Is the button hidden?
//  disabled        - Is the button disabled?
//  setText         - What text to display in the button
LancelotSwitch.prototype.buttonSettings = function (indexOfPlayer) {
    const obj = {
        green: {},
        red: {},
    };

    // If it is the host
    if (indexOfPlayer === this.thisRoom.teamLeader) {
        obj.green.hidden = false;
        obj.green.disabled = false;
        obj.green.setText = 'Draw Lancelot Card';

        obj.red.hidden = true;
        obj.red.disabled = true;
        obj.red.setText = '';
    }
    // If it is any other player who isn't host
    else {
        obj.green.hidden = true;
        obj.green.disabled = true;
        obj.green.setText = '';

        obj.red.hidden = true;
        obj.red.disabled = true;
        obj.red.setText = '';
    }

    return obj;
};

LancelotSwitch.prototype.numOfTargets = function (indexOfPlayer) {
    return null;
};

LancelotSwitch.prototype.getStatusMessage = function (indexOfPlayer) {
    if (indexOfPlayer !== undefined && indexOfPlayer === this.thisRoom.teamLeader) {
        return `Your turn to drawn a Lancelot switch card.`;
    }
    if (this.thisRoom.playersInGame[this.thisRoom.teamLeader]) {
        return `Waiting for ${this.thisRoom.playersInGame[this.thisRoom.teamLeader].username} to draw a Lancelot Switch card.`;
    }
};


module.exports = LancelotSwitch;
