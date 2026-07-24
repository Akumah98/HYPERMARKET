import { api } from '../../../services/api';

export interface Category {
  _id: string;
  name: string;
  icon: string;
  slug: string;
  isActive: boolean;
}

export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  comparePrice?: number;
  category: string | { _id: string; name: string };
  vendor: string;
  images: { url: string; publicId: string }[];
  stock: number;
  unit: string;
  averageRating: number;
  reviewCount: number;
}

export interface ProductsResponse {
  products: Product[];
  total: number;
  page: number;
  totalPages: number;
}

export interface FetchProductsParams {
  search?: string;
  categoryId?: string;
  categories?: string[];
  minPrice?: number;
  maxPrice?: number;
  page?: number;
  limit?: number;
  inStock?: boolean;
  rating?: number;
  badges?: string[];
}

export const catalogService = {
  getCategories: async (): Promise<Category[]> => {
    const response = await api.get('/categories');
    return response.data.data;
  },

  getProducts: async (params: FetchProductsParams, signal?: AbortSignal): Promise<ProductsResponse> => {
    const { categoryId, categories, badges, ...rest } = params;
    let categoryParam: string | undefined = undefined;
    if (categories && categories.length > 0) {
      categoryParam = categories.join(',');
    } else if (categoryId) {
      categoryParam = categoryId;
    }
    const badgeParam = badges && badges.length > 0 ? badges.join(',') : undefined;

    const response = await api.get('/products', {
      params: {
        ...rest,
        category: categoryParam,
        badges: badgeParam,
      },
      signal,
    });
    return response.data.data;
  },

  getProductById: async (id: string): Promise<Product> => {
    const response = await api.get(`/products/${id}`);
    return response.data.data;
  },
};
