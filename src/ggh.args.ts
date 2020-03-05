import yargs = require("yargs");
import { Arguments } from "yargs";

export default function configureHelper(): { [key in keyof Arguments<{}>]: Arguments<{}>[key] } {
   return yargs
      .command('merge-develop', 'Updates develop and merge with current branch.')
      .command('clean', 'Clean the current branch, removing the git non tracked files/folders.')
      .command('pull', 'pull with latest remote, running gulp afterwards.')
      .option('db', {
         type: 'string',
         description: 'Creates a new database \n\r' +
            'Accepted values are: \n\r' +
            'db:small, db:large, db: tiny, db:deploy'
      })
      .argv;
}
