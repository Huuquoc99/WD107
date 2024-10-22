export interface Products {
  id?: any;
  catalogue_id?: Catalogues;
  name: string;
  slug: string;
  sku: string;
  img_thumnail: string;
  price_regular: number;
  price_sale: number;
  short_description: string;
  description: string;
  screen_size: string;
  battery_capacity: string;
  camera_resolution: string;
  operating_system: string;
  processor: string;
  ram: string;
  storage: string;
  sim_type: string;
  network_connectivity: string;
  is_active: number;
  is_hot_deal: number;
  is_good_deal: number;
  is_new: number;
  is_show_home: number;
  created_at: Date;
  updated_at: Date;
  deleted_at: boolean;
}

export interface Catalogues {
  id?: any;
  name: string;
  cover: string;
  is_active: number;
  created_at: Date;
  updated_at: Date;
  deleted_at: boolean;
}
