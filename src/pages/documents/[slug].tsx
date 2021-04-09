import { Box, Text } from 'rebass';
import { usePageData } from 'hooks/fetch-page-data';
import { useRouter } from 'next/router';
import { RepositoryFactory } from 'repositories/RepositoryFactory';
import { AppSpin } from 'components/app/Spin';

const ContentRepository = RepositoryFactory.get('content');

const Document: React.FC = () => {
  const router = useRouter();
  const { data, loading } = usePageData(() => {
    return ContentRepository.getContent(router.query.slug as string);
  }, ['slug']);

  return (
    <Box>
      {loading ? (
        <AppSpin></AppSpin>
      ) : (
        <Box variant="card" sx={{ px: '25px' }}>
          <Text as="h1" textAlign="center" fontSize={20} sx={{ mb: 3 }}>
            {data?.title}
          </Text>
          <div
            dangerouslySetInnerHTML={{
              __html: data?.body.replace(new RegExp('\n<div></div>', 'g'), '<div><br></div>'),
            }}
          ></div>
        </Box>
      )}
    </Box>
  );
};

export default Document;
