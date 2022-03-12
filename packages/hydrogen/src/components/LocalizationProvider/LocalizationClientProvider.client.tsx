import React, {
  ReactNode,
  useMemo,
  useState,
  useCallback,
  useEffect,
} from 'react';
import {LocalizationContext, Localization} from './LocalizationContext.client';
import {ServerStateContextValue} from '../../foundation/ServerStateProvider';
import {useServerState} from '../../foundation/useServerState';

export default function LocalizationClientProvider({
  localization,
  children,
}: {
  children: ReactNode;
  localization: Localization;
}) {
  const {setServerState} = useServerState() as ServerStateContextValue;
  const [country, setCountry] = useState<Localization['country']>(
    localization.country
  );
  const [language, setLanguage] = useState<Localization['language']>(
    localization.language
  );

  const {availableCountries, availableLanguages} = localization;

  const setLocalizationContext = useCallback(
    ({
      country,
      language,
    }: {
      country?: Localization['country'];
      language?: Localization['language'];
    }) => {
      setServerState('localizationContext', {
        countryCode: country?.isoCode || localization.country.isoCode,
        languageCode: language?.isoCode || localization.language.isoCode,
      });
    },
    [localization, setServerState]
  );

  const countrySetter = useCallback(
    (country: Localization['country']) => {
      setCountry(country);
      setLocalizationContext({country});
    },
    [setLocalizationContext]
  );
  const languageSetter = useCallback(
    (language: Localization['language']) => {
      setLanguage(language);
      setLocalizationContext({language});
    },
    [setLocalizationContext]
  );

  useEffect(() => {
    setCountry(localization.country);
    setLanguage(localization.language);
    setLocalizationContext(localization);
  }, [localization.country, localization.language]);

  const contextValue = useMemo(() => {
    return {
      country,
      setCountry: countrySetter,
      availableCountries,
      language,
      setLanguage: languageSetter,
      availableLanguages,
    };
  }, [
    country,
    countrySetter,
    availableCountries,
    language,
    languageSetter,
    availableLanguages,
  ]);

  return (
    <LocalizationContext.Provider value={contextValue}>
      {children}
    </LocalizationContext.Provider>
  );
}
