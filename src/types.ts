export type ActionType = 'collects' | 'plants' | 'offsets';

export type ImpactType = 'carbon' | 'plastic bottles' | 'trees';

export type SelectedColorType = 'white' | 'black' | 'blue' | 'green' | 'beige';

export interface AmendProductInterface {
  id: number;
  linked?: boolean;
  selectedColor?: SelectedColorType;
  active?: boolean;
}

export interface ProductWidgetProps extends AmendProductInterface {
  type: ImpactType;
  amount: number;
  action: ActionType;
}

export interface ProductsStateInterface {
  allProducts: ProductWidgetProps[];
}

export interface StateInterface {
  products: { allProducts: ProductWidgetProps[] };
}
