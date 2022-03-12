import {useCallback} from 'react';
import {useAvailableLanguages, useLanguage} from '@shopify/hydrogen/client';
import {Listbox} from '@headlessui/react';

import {ArrowIcon, CheckIcon} from './LanguageSelector.client';

/**
 * A client component that selects the appropriate language to display for products on a mobile storefront
 */
export default function MobileLanguageSelector() {
  const languages = [...useAvailableLanguages()].sort((a, b) =>
    a.endonymName.localeCompare(b.endonymName),
  );
  const [selectedLanguage, setSelectedLanguage] = useLanguage();

  const setLanguage = useCallback(
    (isoCode) => {
      setSelectedLanguage(
        languages.find((language) => language.isoCode === isoCode),
      );
    },
    [languages, setSelectedLanguage],
  );

  return (
    <div className="mt-8 rounded border border-gray-200 w-full">
      <Listbox onChange={setLanguage}>
        {({open}) => (
          <>
            <Listbox.Button className="w-full flex justify-between text-sm items-center py-5 px-7">
              {titleCase(
                selectedLanguage.endonymName,
                selectedLanguage.isoCode,
              )}
              <ArrowIcon isOpen={open} />
            </Listbox.Button>
            <Listbox.Options className="w-full px-3 pb-2 text-lg">
              <Listbox.Option
                disabled
                className="font-medium px-4 pb-4 w-full text-left uppercase"
              >
                Language
              </Listbox.Option>
              {languages.map((language) => {
                const isSelected =
                  language.isoCode === selectedLanguage.isoCode;
                return (
                  <Listbox.Option
                    key={language.isoCode}
                    value={language.isoCode}
                  >
                    {({active}) => (
                      <div
                        className={`py-2 px-4 rounded flex justify-between items-center text-left w-full cursor-pointer ${
                          active ? 'bg-gray-100' : null
                        }`}
                      >
                        {titleCase(language.endonymName, language.isoCode)}
                        {isSelected ? <CheckIcon /> : null}
                      </div>
                    )}
                  </Listbox.Option>
                );
              })}
            </Listbox.Options>
          </>
        )}
      </Listbox>
    </div>
  );
}

function titleCase(string, locale) {
  return string.charAt(0).toLocaleUpperCase(locale) + string.slice(1);
}
