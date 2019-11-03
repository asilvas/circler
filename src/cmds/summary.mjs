import getLogin from '../getLogin.mjs';
import getFileDate from '../getFileDate.mjs';
import getFileTime from '../getFileTime.mjs';
import getAccessories from '../getAccessories.mjs';
import fileExists from '../fileExists.mjs';
import getSummary from '../getSummary.mjs';
import writeFile from '../writeFile.mjs';
import moment from 'moment';

export default {
  command: 'summary [duration]',
  handler: async argv => {
    const { email, password, from, to, duration, dir, accessories: accessoryNames } = argv;

    const dur = moment(duration, 'h:mm');
    const hours = Math.max(0, Math.min(24, dur.isValid() ? dur.hours() : 1));
    const minutes = Math.max(0, Math.min(24, dur.isValid() ? dur.minutes() : 0));

    const login = await getLogin({ email, password });

    const accessories = await getAccessories(login, accessoryNames);

    for (let accessoryIndex = 0; accessoryIndex < accessories.length; accessoryIndex++) {
      const accessory = accessories[accessoryIndex];
      const curDate = from.clone();

      while (curDate.isBefore(to)) {
        const fileDate = getFileDate(curDate);
        const fileTime = getFileTime(curDate);
        console.log(`Getting summary ${fileDate} @ ${fileTime} for length of ${hours} hours ${minutes} min for accessory '${accessory.name}'`);
  
        const fileName = `${accessory.name}_summary_${fileTime}_length ${hours}h ${minutes}m.mp4`;
        const exists = fileExists(dir, curDate, fileName);
        if (!exists) {
          const toDate = curDate.clone();
          toDate.add(hours, 'hours');
          toDate.add(minutes, 'minutes');
          let err;
          const buffer = await getSummary(login, accessory, curDate, toDate).catch(ex => { err = ex; });
          if (err) {
            console.error(err.message);
          } else {
            await writeFile(dir, curDate, fileName, buffer);
          }
        } else {
          console.log(`Skipping '${fileName}' since it already exists`);
        }

        curDate.add(hours, 'hours');
        curDate.add(minutes, 'minutes');
      }
  
    }
  }
}
