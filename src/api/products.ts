import api from './api';
import { ProductWidgetProps } from '@/types';
import getErrorMessage from '@/util/error';

const debug = process.env.NODE_ENV !== 'production';

export default async function getProducts() {
  try {
    const products = await api.get<ProductWidgetProps>(
      'https://api.mocki.io/v2/016d11e8/product-widgets'
    );
    return products;
  } catch (error) {
    if (debug) {
      console.error(`getProducts error: ${error}`);
    }
    throw new Error(`Product API error: ${getErrorMessage(error)}`);
  }
}
