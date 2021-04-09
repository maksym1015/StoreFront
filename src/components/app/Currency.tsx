import formatCurrency from 'filters/currency';

interface Props {
  value: any;
}

export const Currency: React.FC<Props> = ({ value }) => {
  return <span>{formatCurrency(value)}</span>;
};
