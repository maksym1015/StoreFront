import axios from 'axios';

const WP_ENDPOINT =
  process.env.WP_ENDPOINT ||
  'http://direct-wp.eba-wjw5h5wq.ap-southeast-1.elasticbeanstalk.com/wp-json/wp/v2';

export default {
  async getContent(slug: string) {
    const { data } = await axios.get(`${WP_ENDPOINT}/content-page`, {
      params: {
        slug,
      },
    });

    const post = data[0];

    return {
      title: post.title.rendered,
      body: post.content.rendered,
    };
  },
};
