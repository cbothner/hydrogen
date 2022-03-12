import {useLanguage} from '@shopify/hydrogen';
import gql from 'graphql-tag';

export function MyComponent() {
  const [language, setLanguage] = useLanguage();

  const query = gql`
    query ProductDetails($language: LanguageCode)
    @inContext(language: $language) {
      productByHandle(handle: "1234") {
        title
        descriptionHtml
      }
    }
  `;

  const {data} = useShopQuery({
    query,
    variables: {
      language: language.isoCode,
    },
  });

  return {
    /* Your JSX*/
  };
}
