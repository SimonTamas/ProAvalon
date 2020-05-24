class Guinevere {
    constructor(thisRoom) {
        this.thisRoom = thisRoom;

        this.role = 'Guinevere';
        this.alliance = 'Resistance';

        this.description = 'Guinevere sees both Lancelots.';
        this.orderPriorityInOptions = 50;
    }

    see() {
        const roleTag = {};

        for (let i = 0; i < this.thisRoom.playersInGame.length; i++) {
            if (this.thisRoom.playersInGame[i].role === 'Good Lancelot' || this.thisRoom.playersInGame[i].role === 'Bad Lancelot') {
                roleTag[this.thisRoom.playersInGame[i].username] = {};
                roleTag[this.thisRoom.playersInGame[i].username].roleTag = 'Lancelot?';
            }
        }

        return roleTag;
    }
}


module.exports = Guinevere;
