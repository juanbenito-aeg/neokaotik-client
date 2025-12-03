function io() {
  const socket = { on: jest.fn(), emit: jest.fn(), disconnect: jest.fn() };
  return socket;
}

export { io };
