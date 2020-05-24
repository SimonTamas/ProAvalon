class BadLancelot {
    constructor(thisRoom) {
        this.thisRoom = thisRoom;

        this.role = 'Bad Lancelot';
        this.alliance = 'Spy';

        this.description = 'Bad Lancelot and Spies do not know each other, he might turn good.';
        this.orderPriorityInOptions = 50;
    }

    see() {
        if (this.thisRoom.gameStarted === true) {
            const obj = {};
            const array = [];

            for (let i = 0; i < this.thisRoom.playersInGame.length; i++) {
                if (this.thisRoom.playersInGame[i].role === 'Bad Lancelot') {
                    array.push(this.thisRoom.playersInGame[i].username);
                    break;
                }
            }

            obj.spies = array;
            return obj;
        }
    }

    checkSpecialMove() {

    }
}


module.exports = BadLancelot;
