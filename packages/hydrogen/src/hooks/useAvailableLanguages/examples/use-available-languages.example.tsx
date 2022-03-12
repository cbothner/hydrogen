import {useAvailableLanguages, useLanguage} from '@shopify/hydrogen';

export function LanguageSelector() {
  const languages = useAvailableLanguages();
  const [_, setLanguage] = useLanguage();

  return (
    <select
      name="language"
      onChange={(event) => setLanguage(event.target.value)}
    >
      {languages.map((language) => {
        return (
          <option key={language.isoCode} value={language.isoCode}>
            {language.endonymName}
          </option>
        );
      })}
    </select>
  );
}
