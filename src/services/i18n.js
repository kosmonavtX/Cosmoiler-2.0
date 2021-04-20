import { t, init, getLocaleFromNavigator, addMessages } from 'svelte-i18n'

import en from '../assets/messages/localeEn.json'
import ru from '../assets/messages/localeRu.json'

function setupi18n() {
/*         register('en', () =>
            import ('../assets/messages/localeEn.json'))
        register('ru', () =>
            import ('../assets/messages/localeRu.json')) */
    /*     init({
            fallbackLocale: 'en',
            initialLocale: getLocaleFromNavigator(),
        }) */

    addMessages('en', en);
    addMessages('ru', ru);

    init({
        fallbackLocale: 'en',
        initialLocale: getLocaleFromNavigator(),
    });

/*     locale.set('en-US') */
}


export { t, setupi18n };
