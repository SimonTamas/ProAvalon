
class GoodLancelot {
    constructor(thisRoom) {
        this.thisRoom = thisRoom;

        this.role = 'Good Lancelot';
        this.alliance = 'Resistance';

        this.description = 'A standard Resistance member who might turn bad.';
    }

    see() {
        return undefined;
    }

    checkSpecialMove() {

    }
}


module.exports = GoodLancelot;
