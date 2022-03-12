import {useShopQuery, Seo} from '@shopify/hydrogen';
import {PageSeoFragment} from '@shopify/hydrogen/fragments';
import gql from 'graphql-tag';

import Layout from '../../components/Layout.server';
import NotFound from '../../components/NotFound.server';

export default function Page({params, localizationContext}) {
  const {handle} = params;
  const {data} = useShopQuery({
    query: QUERY,
    variables: {handle: decodeURIComponent(handle), ...localizationContext},
  });

  if (!data.pageByHandle) {
    return <NotFound />;
  }

  const page = data.pageByHandle;

  return (
    <Layout localizationContext={localizationContext}>
      <Seo type="page" data={page} />
      <h1 className="text-2xl font-bold">{page.title}</h1>
      <div
        dangerouslySetInnerHTML={{__html: page.body}}
        className="prose mt-8"
      />
    </Layout>
  );
}

const QUERY = gql`
  query PageDetails(
    $handle: String!
    $countryCode: CountryCode
    $languageCode: LanguageCode
  ) @inContext(country: $countryCode, language: $languageCode) {
    pageByHandle(handle: $handle) {
      title
      body
      ...PageSeoFragment
    }
  }

  ${PageSeoFragment}
`;
