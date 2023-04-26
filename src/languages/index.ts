import * as enDict from './en';

class Languages {
    /**
     * Get language
     * @param  {} lang
     */
    getLang(lang) {
        if (!lang) {
            return 'en';
        }

        return lang.toLowerCase();
    }

    /**
     * Get text from key
     * @param  {} lang
     * @param  {} key
     */
    getText(lang, key) {
        let text = enDict.getValue(key);
        if (languages.getLang(lang)) {
            if (languages.getLang(lang) === 'en') {
                text = enDict.getValue(key);
            }
        }

        if (text === key) {
            text = enDict.getValue(key);
        }

        return (text === undefined) ? key : text;
    }
}

export const languages = new Languages();
