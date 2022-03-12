import {useShopQuery, Seo, useRouteParams} from '@shopify/hydrogen';
import {
  ProductProviderFragment,
  ProductSeoFragment,
} from '@shopify/hydrogen/fragments';
import gql from 'graphql-tag';

import ProductDetails from '../../components/ProductDetails.client';
import NotFound from '../../components/NotFound.server';
import Layout from '../../components/Layout.server';

export default function Product({localizationContext}) {
  const {handle} = useRouteParams();

  const {
    data: {product},
  } = useShopQuery({
    query: QUERY,
    variables: {
      handle,
      ...localizationContext,
    },
    preload: true,
  });

  if (!product) {
    return <NotFound />;
  }

  return (
    <Layout localizationContext={localizationContext}>
      <Seo type="product" data={product} />
      <ProductDetails product={product} />
    </Layout>
  );
}

const QUERY = gql`
  query product(
    $countryCode: CountryCode
    $languageCode: LanguageCode
    $handle: String!
    $includeReferenceMetafieldDetails: Boolean = true
    $numProductMetafields: Int = 20
    $numProductVariants: Int = 250
    $numProductMedia: Int = 6
    $numProductVariantMetafields: Int = 10
    $numProductVariantSellingPlanAllocations: Int = 0
    $numProductSellingPlanGroups: Int = 0
    $numProductSellingPlans: Int = 0
  ) @inContext(country: $countryCode, language: $languageCode) {
    product: product(handle: $handle) {
      id
      vendor
      ...ProductProviderFragment
      ...ProductSeoFragment
    }
  }

  ${ProductProviderFragment}
  ${ProductSeoFragment}
`;
