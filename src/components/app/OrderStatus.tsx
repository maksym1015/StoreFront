import { Box } from 'rebass';

export default function OrderStatus({ status }: { status: string }) {
  const orderStatuses = {} as any;
  let statusInfo;
  if (orderStatuses) {
    statusInfo = orderStatuses[status.toLowerCase()];
  }
  return (
    <Box
      minWidth={142}
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        whiteSpace: 'nowrap',
        px: 3,
        py: 2,
        textAlign: 'center',
        textTransform: 'uppercase',
        borderColor: 'midDarkGrey',
        borderStyle: 'solid',
        borderWidth: '2px',
      }}
    >
      {statusInfo ? statusInfo.description : null}
    </Box>
  );
}
