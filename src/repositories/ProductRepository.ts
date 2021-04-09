import {
  DslProduct,
  GetProductsQuery,
  GetProductsQueryVariables,
  ProductByIdQuery,
  ProductByIdQueryVariables,
} from 'graphql/generated/graphql';
import getProductsQuery from 'graphql/queries/products.graphql';
import getProductById from 'graphql/queries/product-detail-by-id.graphql';
import Repository from './Repository2';
import { getListingQuery } from 'utils/helper';
import { ParsedUrlQuery } from 'querystring';
import { waitFor } from 'utils/helper';

interface GetProductApprovalResult {
  products: DslProduct[];
  total: number;
}

const products: any = [];

export default {
  async get(query: ParsedUrlQuery): Promise<{ total: number; products: DslProduct[] } | null> {
    try {
      const params = getListingQuery(query);
      const { data } = await Repository.query<GetProductsQuery, GetProductsQueryVariables>({
        query: getProductsQuery,
        variables: {
          params: {
            sort: params.sort,
            pagination: params.pagination,
          },
        },
      });

      return {
        total: data.getAdminProducts.totalCount,
        products: (data.getAdminProducts.products || []) as DslProduct[],
      };
    } catch (e) {
      console.log(e);
      return null;
    }
  },

  async getProductDetail(id: number): Promise<DslProduct | null> {
    const { data } = await Repository.query<ProductByIdQuery, ProductByIdQueryVariables>({
      query: getProductById,
      variables: { id: String(id) },
    });

    if (data.dslProductById) {
      return data.dslProductById as DslProduct;
    }

    return null;
  },

  async updateStatus(id: string, status: number) {
    id;
    status;
  },

  async updateProducts() {},

  async deleteProducts(ids: string[]) {
    ids;
  },

  async cloneProducts(ids: string[]) {
    ids;
  },

  async removeImage() {},

  async updateProduct() {},

  async getProductApproval(): Promise<GetProductApprovalResult> {
    const total = 12;
    const products: DslProduct[] = (Array(total)
      .fill(0)
      .map((_, idx) => ({
        id: 10000000 + idx,
      })) as unknown) as DslProduct[];

    return Promise.resolve({
      products,
      total,
    });
  },

  async getProductsLinked(): Promise<DslProduct[]> {
    await waitFor(300);
    return products as DslProduct[];
  },

  async approveProducts(ids: number[]): Promise<number[]> {
    console.log('approve rows: ', ids);

    return Promise.resolve(ids);
  },
  async rejectProducts(ids: number[]): Promise<number[]> {
    console.log('reject rows: ', ids);

    return Promise.resolve(ids);
  },
};
