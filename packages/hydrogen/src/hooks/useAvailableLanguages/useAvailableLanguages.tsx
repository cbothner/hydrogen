import {useContext} from 'react';
import {LocalizationContext} from '../../components/LocalizationProvider/LocalizationContext.client';

function useLocalization() {
  const context = useContext(LocalizationContext);

  if (context == null) {
    throw new Error('No Localization Context available');
  }

  return context;
}

/**
 * The `useAvailableLanguages` hook returns an array of available languages used for localization.
 * It must be a descendent of a `LocalizationProvider` component.
 */
export function useAvailableLanguages() {
  const context = useLocalization();

  return context.availableLanguages;
}
