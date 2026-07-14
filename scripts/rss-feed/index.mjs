import { writeFileSync, readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { Feed } from 'feed';
import matter from 'gray-matter';

const BASE_URL = 'https://webpack.js.org';
const POSTS_DIR = './pages/blog/posts';
const OUTPUT_PATH = './out/feed.xml';

function generateRSS() {
  const feed = new Feed({
    title: 'Webpack Blog',
    description: 'Announcements and updates from the Webpack team',
    id: `${BASE_URL}/blog/`,
    link: `${BASE_URL}/blog/`,
    language: 'en',
    updated: new Date(),
    feedLinks: {
      rss: `${BASE_URL}/feed.xml`,
    },
  });

  const files = readdirSync(POSTS_DIR);

  const posts = files
    .map(file => {
      const fileContent = readFileSync(join(POSTS_DIR, file), 'utf8');
      const { data } = matter(fileContent);

      // post URL
      const postSlug = file.replace(/\.mdx?$/, '');
      const postUrl = `${BASE_URL}/blog/posts/${postSlug}`;

      return {
        title: data.title,
        link: postUrl,
        date: data.date ? new Date(data.date) : null,
        description: data.description || data.title,
      };
    })
    // sort to keep newest blog at the top
    .sort((a, b) => b.date.getTime() - a.date.getTime());

  for (const post of posts) {
    feed.addItem({
      title: post.title,
      id: post.link,
      link: post.link,
      description: post.description,
      date: post.date,
    });
  }

  writeFileSync(OUTPUT_PATH, feed.rss2(), 'utf8');
  console.log(`Successfully generated RSS feed at ${OUTPUT_PATH}`);
}

generateRSS();
