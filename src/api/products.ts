import api from './api';
import { ProductWidgetInterface } from '@/types';
import getErrorMessage from '@/util/error';

export default async function getProducts() {
  try {
    const products = await api.get<ProductWidgetInterface>(
      'https://api.mocki.io/v2/016d11e8/product-widgets'
    );
    return products;
  } catch (error) {
    throw new Error(`Product API error: ${getErrorMessage(error)}`);
  }
}
