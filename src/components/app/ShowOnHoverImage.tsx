import { Box, Image } from 'rebass';
import ImageIcon from 'assets/icons/image-solid.svg';

interface Props {
  src?: string;
}

export const ShowOnHoverImage: React.FC<Props> = ({ src }) => {
  return (
    <Box
      sx={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        '> img': { display: 'none' },
        ':hover': { '> img': { display: 'block' } },
      }}
    >
      <Image
        src={src}
        style={{
          border: '2px solid #ccc',
          backgroundColor: 'white',
          padding: 8,
          maxHeight: 300,
          maxWidth: 300,
          position: 'absolute',
          zIndex: 10000,
          bottom: '0%',
          left: 20,
        }}
      ></Image>
      <ImageIcon width={30} height={30} />
    </Box>
  );
};
