class GeocodeError extends Error {
  constructor(message) {
    super(message);
    this.name = 'GeocodeError';
  }
}

export default GeocodeError;
