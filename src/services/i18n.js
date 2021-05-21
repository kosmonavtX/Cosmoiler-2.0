import { t, init, getLocaleFromNavigator, addMessages } from 'svelte-i18n'

import en from '../assets/messages/localeEn.json'
import ru from '../assets/messages/localeRu.json'

function setupi18n() {

    addMessages('en', en);
    addMessages('ru', ru);

    init({
        fallbackLocale: 'en',
        initialLocale: getLocaleFromNavigator(),
    });
}


export { t, setupi18n };
