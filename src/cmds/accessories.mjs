import getLogin from '../getLogin.mjs';
import getAccessories from '../getAccessories.mjs';

export default {
  command: 'accessories',
  handler: async argv => {
    const { email, password, accessories: accessoryNames } = argv;

    const login = await getLogin({ email, password });

    await getAccessories(login, accessoryNames);
  }
}
