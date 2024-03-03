export type ActionType = 'collects' | 'plants' | 'offsets';

export type ImpactType = 'carbon' | 'plastic bottles' | 'trees';

export type SelectedColorType = 'white' | 'black' | 'blue' | 'green' | 'beige';

export interface ProductWidgetProps {
  id: number;
  type: ImpactType;
  amount: number;
  action: ActionType;
}

export interface ProductWidgetInterface extends ProductWidgetProps {
  linked?: boolean;
  selectedColor?: SelectedColorType;
  active?: boolean;
}

export interface ProductsStateInterface {
  allProducts: ProductWidgetInterface[];
}

export interface StateInterface {
  products: { allProducts: ProductWidgetInterface[] };
}
