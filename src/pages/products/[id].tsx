// import { AppBreadcrumb } from 'components/app/AppBreadcrumb';
// import { BreadcrumbItem, ProductFeature } from 'types';
// import { RepositoryFactory } from 'repositories/RepositoryFactory';
// import { useRouter } from 'next/router';
// import { AppSpin } from 'components/app/Spin';
// import { Tabs, Form, Button, Space } from 'antd';
// import { NextBack } from 'components/app/NextBack';
// import { Box } from 'rebass';
// import { usePageData } from 'hooks/fetch-page-data';
// import { useRef } from 'react';
// import { FormInstance } from 'antd/lib/form';
// import { Store } from 'antd/lib/form/interface';
// import { useContext, useState } from 'react';
// import AppContext from 'contexts/app';
// import { ProductAttr } from 'components/pages/products/ProductAttr';
// import { ProductGeneral } from 'components/pages/products/ProductGeneral';
// import { ProductFeatureType } from 'utils/constant';
// import moment from 'moment';
// const { TabPane } = Tabs;

// const ProductRepository = RepositoryFactory.get('product');

// const ProductDetail: React.FC = () => {
//   const router = useRouter();
//   const formInstance = useRef<FormInstance>(null);
//   const context = useContext(AppContext);
//   const isAdd = router.query.id === 'new';
//   const [reload, setReload] = useState(false);

//   const { loading: loadingProduct, data: productData } = usePageData(
//     () => {
//       if (!isAdd) {
//         return ProductRepository.getProductDetail(router.query.id as string);
//       }
//     },
//     ['id'],
//     [reload],
//   );

//   const { loading: loadingProductFeatures, data: productFormData } = usePageData(
//     () => {
//       return Promise.all([
//         ProductRepository.getProductFeature(isAdd ? '0' : (router.query.id as string)),
//         ProductRepository.getProductForm(),
//       ]);
//     },
//     ['id'],
//     [reload],
//   );

//   const [productFeatures, taxes] = productFormData || [];

//   const { loading: loadingCategories, data: categoriesData } = usePageData(() => {
//     return ProductRepository.get({
//       perPage: 1,
//     });
//   });

//   const productOptions = (productFeatures?.options || []).map((option) => {
//     const selectedId = productData?.selectedOptions?.find((o) => o.optionName === option.optionName)
//       ?.optionId;
//     option.optionId = selectedId || option.optionId;
//     option.selected = !!selectedId;

//     return option;
//   });

//   const selectedOptionIds = productOptions.filter((o) => o.selected).map((o) => o.optionId);

//   const product = productData?.product;
//   const categories = categoriesData?.categories;

//   const breadcrumbs: BreadcrumbItem[] = [
//     {
//       label: 'Products',
//       pathname: '/products',
//       as: '/products',
//     },
//   ];

//   if (isAdd) {
//     breadcrumbs.push({
//       label: 'Add Product ',
//       pathname: '',
//       as: '#',
//     });
//   } else if (product) {
//     breadcrumbs.push({
//       label: product.name,
//       pathname: '',
//       as: '#',
//     });
//   }

//   const onFinish = async (values: Store) => {
//     const params: any = {
//       ...values,
//       availableFrom: values.availableFrom ? values.availableFrom.format('DD/MM/YYYY') : null,
//       categories: Array.isArray(values.category) ? values.category.map((o) => o.value) : [],
//       companyId: context.company?.companyId as string,
//       image: values.image && values.image.length ? values.image[0].originFileObj : null,
//       postCodeRestriction: values.postCodeRestriction ? values.postCodeRestriction.join(',') : null,
//     };

//     const newOptionIds = (params.options || []) as string[];

//     if (isAdd) {
//       const productId = await ProductRepository.addProduct(params);

//       if (productId) {
//         await Promise.all(
//           newOptionIds.map((optionId) => ProductRepository.addProductOption(productId, optionId)),
//         );
//         router.push('/products/[id]', `/products/${productId}`);
//       }
//     } else {
//       // add main pair to remove image
//       if ((!values.image || !values.image.length) && productData?.product.mainPair?.id) {
//         params.removeImage = true;
//         params.mainPair = productData?.product.mainPair;
//       }
//       const productId = productData?.product.id as string;

//       const toRemoveOptions = selectedOptionIds.filter((id) => !newOptionIds.includes(id));
//       const toAddOptions = newOptionIds.filter((id) => !selectedOptionIds.includes(id));

//       await Promise.all([
//         ...toAddOptions.map((optionId) => ProductRepository.addProductOption(productId, optionId)),
//         ...toRemoveOptions.map((optionId) =>
//           ProductRepository.removeProductOption(productId, optionId),
//         ),
//       ]);

//       await ProductRepository.updateProduct(productId, params);
//       setReload(!reload);
//     }
//   };

//   const save = () => {
//     formInstance.current?.submit();
//   };

//   const getAttrValues = (features: ProductFeature[]) => {
//     const values: { [key: string]: any } = {};

//     for (let feature of features) {
//       let value: any = feature.value || parseFloat(feature.valueInt as string) || feature.variantId;

//       if (feature.featureType === ProductFeatureType.DATE) {
//         value = value ? moment(parseInt(value as string), 'X') : undefined;
//       }

//       if (feature.featureType === ProductFeatureType.CHECK_BOX_MULTI) {
//         value = feature.variants.filter((o) => o.selected).map((o) => o.variantId);
//       }

//       if (feature.featureType === ProductFeatureType.CHECK_BOX_SINGLE) {
//         value = value === 'Y';
//       }

//       values[`product_data[product_features][${feature.featureId}]`] = value;
//     }

//     return values;
//   };

//   const initialValues =
//     product && categories
//       ? {
//           ...getAttrValues(productFeatures?.features || []),
//           name: product.name,
//           status: product.status,
//           code: product.code,
//           price: product.inputPrice,
//           logistic: product.logisticFee,
//           fullDescription: product.fullDescription,
//           availableFrom: moment(product.availableFrom, 'X'),
//           category: categories
//             .filter((category) => product.categoryIds.includes(parseInt(category.id)))
//             .map((category) => ({ label: category.name, value: category.id })),
//           image: product.image ? [{ url: product.image, uid: product.id }] : undefined,
//           postCodeRestriction: productData?.activeRestrictions.map((o) => o.name),
//           vat: productData?.product.taxIds.find((o) => o) || null,
//           options: selectedOptionIds,
//         }
//       : { status: 'A' };

//   const loading = loadingCategories || loadingProduct || loadingProductFeatures;

//   return (
//     <div>
//       <Box variant="breadcrumbHeader">
//         <AppBreadcrumb items={breadcrumbs}></AppBreadcrumb>
//         <Space>
//           <Button type="default">Preview</Button>
//           {!isAdd && <NextBack basePath="/products" data={productData?.viewTools}></NextBack>}
//           <Button type="primary" onClick={save}>
//             Save
//           </Button>
//         </Space>
//       </Box>
//       {loading ? (
//         <AppSpin></AppSpin>
//       ) : (
//         <Box variant="card" sx={{ pl: 4 }}>
//           <Form
//             layout="vertical"
//             style={{ maxWidth: 700 }}
//             ref={formInstance}
//             onFinish={onFinish}
//             initialValues={initialValues}
//             onValuesChange={() => console.log('change')}
//           >
//             <Tabs defaultActiveKey="1">
//               <TabPane tab="GENERAL" key="1" forceRender>
//                 <ProductGeneral
//                   data={productData}
//                   categories={categories}
//                   taxes={taxes}
//                   productOptions={productOptions}
//                 ></ProductGeneral>
//               </TabPane>
//               <TabPane tab="ATTRIBUTES" key="2" forceRender>
//                 <ProductAttr features={productFeatures?.features || []}></ProductAttr>
//               </TabPane>
//             </Tabs>
//           </Form>
//         </Box>
//       )}
//     </div>
//   );
// };

// export default ProductDetail;

export default () => null;
