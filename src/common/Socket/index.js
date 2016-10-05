import Channel from './Channel';
import CustomSocket from './CustomSocket';
import ScriptEndpoint from './ScriptEndpoint';
import DataEndpoint from './DataEndpoint';
import Default from './Default';
import Push from './Push';
import Schedule from './Schedule';
import Trigger from './Trigger';
import Hosting from './Hosting';
import User from './User';
import Users from './Users';
import EmptyListItem from './EmptyListItem';

const Socket = Default;

Socket.Channel = Channel;
Socket.CustomSocket = CustomSocket;
Socket.ScriptEndpoint = ScriptEndpoint;
Socket.DataEndpoint = DataEndpoint;
Socket.Push = Push;
Socket.Schedule = Schedule;
Socket.Trigger = Trigger;
Socket.User = User;
Socket.Users = Users;
Socket.Hosting = Hosting;
Socket.EmptyListItem = EmptyListItem;

export default Socket;
