import { Form, Input, Radio, DatePicker, Space, Select, Checkbox } from 'antd';
import { ImageUpload } from 'components/app/ImageUpload';
import { ProductDetailResponse, TaxDetail, ProductOption } from 'types';
import { CategoryTree } from 'components/app/CategoryTree';
import { useState, useEffect } from 'react';
import { formatPrice } from 'filters/currency';
import { Box } from 'rebass';
import { DslCategory } from 'graphql/generated/graphql';
const { TextArea } = Input;

interface Props {
  data?: ProductDetailResponse;
  taxes?: TaxDetail[];
  productOptions: ProductOption[];
  categories?: DslCategory[];
}

export const ProductGeneral: React.FC<Props> = ({ data, categories, taxes, productOptions }) => {
  const [price, setPrice] = useState(0);
  const [logisticFee, setlogisticFee] = useState(0);

  useEffect(() => {
    setPrice(data?.product.inputPrice || 0);
    setlogisticFee(data?.product.logisticFee || 0);
  }, [data]);

  return (
    <>
      <Form.Item
        name="name"
        label="Product Name *"
        rules={[{ required: true, message: 'Product name is required' }]}
      >
        <Input></Input>
      </Form.Item>
      <Form.Item
        name="code"
        label="Product Code *"
        rules={[{ required: true, message: 'Product code is required' }]}
      >
        <Input style={{ maxWidth: 200 }}></Input>
      </Form.Item>
      <Form.Item label="Postcode Restrictions">
        <Form.Item name="postCodeRestriction">
          <Select mode="tags">
            {data?.destinations.map((item) => {
              return (
                <Select.Option value={item.name} key={item.name}>
                  {item.name}
                </Select.Option>
              );
            })}
          </Select>
        </Form.Item>
        {!!data?.adminRestrictions.length && (
          <Box sx={{ mt: 3 }}>
            The following additional restrictions haven applied to this product by StarStock:{' '}
            {data?.adminRestrictions.map((o) => o.name).join(', ')}
          </Box>
        )}
      </Form.Item>
      <ImageUpload></ImageUpload>
      <CategoryTree label="Categories *" data={categories || []} treeCheckable required />
      <Form.Item label="Price (£) *">
        <table className="price-table">
          <thead>
            <tr>
              <th>Input price ex VAT</th>
              <th>Starstock Fee</th>
              <th>Logistics Fee</th>
              <th>Sell out price</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <Form.Item
                  name="price"
                  style={{ margin: 0 }}
                  rules={[{ required: true, message: 'Price is required' }]}
                >
                  <Input
                    type="number"
                    onChange={(e) => {
                      setPrice(parseFloat(e.target.value) || 0);
                    }}
                  ></Input>
                </Form.Item>
              </td>
              <td>3%</td>
              <td>
                <Form.Item name="logistic" style={{ margin: 0 }}>
                  <Input
                    type="number"
                    onChange={(e) => {
                      setlogisticFee(parseFloat(e.target.value) || 0);
                    }}
                  ></Input>
                </Form.Item>
              </td>
              <td>
                <Input
                  value={formatPrice(price * 1.03 + logisticFee)}
                  readOnly
                  disabled
                  style={{
                    background: 'rgba(55, 188, 150, 0.25)',
                    color: '#333',
                    textAlign: 'center',
                    borderColor: 'rgba(55, 188, 150, 0.25)',
                  }}
                ></Input>
              </td>
            </tr>
          </tbody>
        </table>
      </Form.Item>
      <Form.Item label="VAT" name="vat">
        <Radio.Group>
          <Space direction="vertical">
            {(taxes || data?.taxes || []).map((tax) => {
              return (
                <Radio key={tax.taxId} value={tax.taxId}>
                  Tick this box if {tax.tax} is is applicable to this product
                </Radio>
              );
            })}
            <Radio value={null}>Tick this box if the product is VAT exempt</Radio>
          </Space>
        </Radio.Group>
      </Form.Item>
      <Form.Item label="Options" name="options">
        <Checkbox.Group>
          <Space direction="vertical">
            {productOptions.map((option) => {
              return (
                <Checkbox key={option.optionId} value={option.optionId}>
                  Tick this box if <span style={{ fontWeight: 500 }}>{option.optionName}</span> is
                  is applicable to this product
                </Checkbox>
              );
            })}
          </Space>
        </Checkbox.Group>
      </Form.Item>
      <Form.Item label="Description" name="fullDescription">
        <TextArea rows={5}></TextArea>
      </Form.Item>
      <Form.Item label="Status *" name="status">
        <Radio.Group>
          <Radio value="A">Active</Radio>
          <Radio value="D">Disabled</Radio>
        </Radio.Group>
      </Form.Item>
      <Form.Item label="Available from" name="availableFrom">
        <DatePicker></DatePicker>
      </Form.Item>
    </>
  );
};
