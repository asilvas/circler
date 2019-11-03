import yargs from 'yargs';
import cmdSummary from './cmds/summary.mjs';
import cmdAccessories from './cmds/accessories.mjs';
import moment from 'moment';

yargs
  .command(cmdAccessories)
  .command(cmdSummary)
  .option('email', {
    type: 'string',
    demandOption: true,
    alias: 'e'
  })
  .option('password', {
    type: 'string',
    demandOption: true,
    alias: 'p'
  })
  .option('from', {
    type: 'string',
    alias: 'f',
    coerce: arg => moment(arg)
  })
  .option('to', {
    type: 'string',
    alias: 't',
    coerce: arg => moment(arg)
  })
  .option('dir', {
    type: 'string',
    default: 'downloads'
  })
  .option('accessories', {
    type: 'array',
    alias: 'a',
    default: ['*']
  })
  .demandCommand()
  .help()
  .argv
;
