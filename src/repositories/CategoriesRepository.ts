import {
  DslCategory,
  GetCategoriesQuery,
  GetCategoriesQueryVariables,
} from 'graphql/generated/graphql';
import getCategoriesQuery from 'graphql/queries/categories.graphql';
import Repository from './Repository2';

export default {
  async get(): Promise<DslCategory[] | null> {
    try {
      const { data } = await Repository.query<GetCategoriesQuery, GetCategoriesQueryVariables>({
        query: getCategoriesQuery,
      });

      return (data.dslCategories || []) as DslCategory[];
    } catch (e) {
      console.log(e);
      return null;
    }
  },
};
