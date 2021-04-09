import { Box } from 'rebass';
import { FeatureControl } from './FeatureControl';
import { ProductFeature } from 'types';

interface Props {
  features: ProductFeature[];
}

export const ProductAttr: React.FC<Props> = ({ features }) => {
  return (
    <Box sx={{ maxWidth: '600px' }}>
      {features.map((item) => {
        return <FeatureControl feature={item} key={item.featureId}></FeatureControl>;
      })}
    </Box>
  );
};
