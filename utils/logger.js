const write = (stream, level, message) => {
  stream.write(`${new Date().toISOString()} [${level}] ${message}\n`);
};

const logger = {
  info: (message) => write(process.stdout, 'INFO', message),
  warn: (message) => write(process.stderr, 'WARN', message),
  error: (message) => write(process.stderr, 'ERROR', message),
};

module.exports = logger;
