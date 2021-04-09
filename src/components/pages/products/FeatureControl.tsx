import { ProductFeature } from 'types';
import { Form, Input, Select, Row, Col, Checkbox, DatePicker } from 'antd';
import { ProductFeatureType } from 'utils/constant';
import { Box, Text } from 'rebass';

const { Option } = Select;

interface Props {
  feature: ProductFeature;
}

export const FeatureControl: React.FC<Props> = ({ feature }) => {
  const isSelectType =
    feature.featureType === ProductFeatureType.SELECT_BOX_TEXT ||
    feature.featureType === ProductFeatureType.SELECT_BOX_BRAND ||
    feature.featureType === ProductFeatureType.CHECK_BOX_MULTI ||
    feature.featureType === ProductFeatureType.SELECT_BOX_NUMBER;

  const formName = `product_data[product_features][${feature.featureId}]`;

  return (
    <Box sx={{ mb: 3 }}>
      <Text className="ant-form-item-label">
        <label>{feature.description}</label>
      </Text>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        {feature.prefix && <Text sx={{ mr: 1 }}>{feature.prefix}</Text>}
        <Box>
          {isSelectType && (
            <Row gutter={20}>
              <Col span={14}>
                <Form.Item name={formName} noStyle>
                  <Select
                    mode={
                      feature.featureType === ProductFeatureType.CHECK_BOX_MULTI
                        ? 'multiple'
                        : undefined
                    }
                    style={{ width: 300 }}
                  >
                    {feature.variants.map((variant) => {
                      return (
                        <Option key={variant.variantId} value={variant.variantId}>
                          {variant.variant}
                        </Option>
                      );
                    })}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={10}>
                <Form.Item
                  name={`product_data[add_new_variant][${feature.featureId}][variant]`}
                  noStyle
                >
                  <Input
                    placeholder="Enter other"
                    style={{ width: 200 }}
                    type={
                      feature.featureType === ProductFeatureType.SELECT_BOX_NUMBER
                        ? 'number'
                        : 'text'
                    }
                  ></Input>
                </Form.Item>
              </Col>
            </Row>
          )}
          {feature.featureType === ProductFeatureType.CHECK_BOX_SINGLE && (
            <Form.Item name={formName} valuePropName="checked" noStyle>
              <Checkbox></Checkbox>
            </Form.Item>
          )}
          {feature.featureType === ProductFeatureType.TEXT && (
            <Form.Item name={formName} noStyle>
              <Input style={{ width: 400 }}></Input>
            </Form.Item>
          )}
          {feature.featureType === ProductFeatureType.DATE && (
            <Form.Item name={formName} noStyle>
              <DatePicker format="DD/MM/YYYY"></DatePicker>
            </Form.Item>
          )}
          {feature.featureType === ProductFeatureType.NUMBER && (
            <Form.Item name={formName} noStyle>
              <Input style={{ width: 120 }} type="number"></Input>
            </Form.Item>
          )}
        </Box>
        {feature.suffix && <Text sx={{ ml: 1 }}>{feature.suffix}</Text>}
      </Box>
    </Box>
  );
};
