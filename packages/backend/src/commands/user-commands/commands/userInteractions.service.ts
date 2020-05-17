// eslint-disable-next-line max-classes-per-file
import { Injectable } from '@nestjs/common';
import { SocketUser } from '../../../users/users.socket';
import { emitCommandResponse } from '../../commandResponse';
import { Command, Commands, CommandsWrapper } from '../../commands.types';
import RedisAdapterService from '../../../redis-adapter/redis-adapter.service';
import { ChatResponseType } from '../../../../proto/lobbyProto';

class Interaction implements Command {
  command: string;
  pastTenseCommand: string;
  help: string;

  constructor(
    private redisAdapter: RedisAdapterService,
    command: string,
    pastTenseCommand: string,
  ) {
    this.command = command;
    this.pastTenseCommand = pastTenseCommand;
    this.help = `/${command} <playername>: ${command} a player.`;
  }

  async run(senderSocket: SocketUser, data: string[]) {
    const ret = await this.redisAdapter.emitToUsername(
      data[0],
      `${senderSocket.user.displayUsername} has ${this.pastTenseCommand} you!`,
      ChatResponseType.USER_COMMAND,
    );

    if (ret) {
      emitCommandResponse(
        `You have ${this.pastTenseCommand} ${data[0]}!`,
        senderSocket,
      );
    } else {
      emitCommandResponse(
        `Something went wrong trying to ${this.command} ${data[0]}.`,
        senderSocket,
      );
    }
  }
}

@Injectable()
class UserInteractionsService implements CommandsWrapper {
  commands: Commands;

  constructor(private readonly redisAdapterService: RedisAdapterService) {
    this.commands = {
      buzz: new Interaction(this.redisAdapterService, 'buzz', 'buzzed'),
      lick: new Interaction(this.redisAdapterService, 'lick', 'licked'),
      slap: new Interaction(this.redisAdapterService, 'slap', 'slapped'),
      punch: new Interaction(this.redisAdapterService, 'punch', 'punched'),
      boop: new Interaction(this.redisAdapterService, 'boop', 'booped'),
      tickle: new Interaction(this.redisAdapterService, 'tickle', 'tickled'),
    };
  }
}

export default UserInteractionsService;
