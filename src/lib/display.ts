import chalk from 'chalk';
import figlet from 'figlet';

export function showCLIName(): void {
   console.log(
      chalk.blue(
         figlet.textSync('GGH', { font: 'DOS Rebel' })
      ),
   );
   console.log(chalk.green('Preparing your environment...'));
}
