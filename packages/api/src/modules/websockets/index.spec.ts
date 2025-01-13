import { Test, TestingModule } from '@nestjs/testing';
import { ListenerGateway } from './index';
import { Server, Socket } from 'socket.io';
import { WsException } from '@nestjs/websockets';
import { verify } from 'jsonwebtoken';

jest.mock('jsonwebtoken', () => ({
  verify: jest.fn(),
}));

describe('ListenerGateway', () => {
  let gateway: ListenerGateway;
  let socket: Socket;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ListenerGateway],
    }).compile();

    gateway = module.get<ListenerGateway>(ListenerGateway);
    gateway.server = new Server();
    socket = {
      join: jest.fn(),
      handshake: { query: { token: 'test-token' } },
    } as unknown as Socket;
  });

  it('should handle connection successfully', async () => {
    const mockUserId = 'user-id';
    (verify as jest.Mock).mockReturnValue({ id: mockUserId });

    await gateway.handleConnection(socket);

    expect(socket.join).toHaveBeenCalledWith(mockUserId);
    expect(gateway.connectedUsers).toContain(mockUserId);
  });

  it('should handle connection error', async () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
    (verify as jest.Mock).mockImplementation(() => {
      throw new WsException('Unauthorized');
    });

    await gateway.handleConnection(socket);

    expect(consoleSpy).toHaveBeenCalledWith(
      'connection error',
      expect.any(WsException),
    );
  });
});
