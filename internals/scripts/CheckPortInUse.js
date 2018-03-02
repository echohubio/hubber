// @flow
import chalk from 'chalk'; // eslint-disable-line import/no-extraneous-dependencies
import detectPort from 'detect-port'; // eslint-disable-line import/no-extraneous-dependencies

(function CheckPortInUse() {
  const port: string = process.env.PORT || '1212';

  detectPort(port, (err: ?Error, availablePort: number) => {
    if (port !== String(availablePort)) {
      throw new Error(chalk.whiteBright.bgRed.bold(`Port "${port}" on "localhost" is already in use. Please use another port. ex: PORT=4343 npm run dev`));
    } else {
      process.exit(0);
    }
  });
}());
