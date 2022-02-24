import { GetStaticProps } from 'next';
import prismicClient from '../../services/prismic';
import * as Prismic from '@prismicio/client';
import { RichText } from 'prismic-dom';
import Head from 'next/head';

import styles from './styles.module.scss';
import Link from 'next/link';

type Post = {
  slug: string,
  title: string,
  abstract: string,
  publishedAt: string,
}

interface PostsProps {
  posts: Post[]
}

export default function Posts({ posts }: PostsProps) {

  return (
    <>
      <Head>
        <title>Posts | ig.news</title>
      </Head>

      <main className={styles.container}>
        <div className={styles.posts}>
          {posts.map(post => (
            <Link href={`/posts/${post.slug}`}>
              <a key={post.slug}>
                <time>{post.publishedAt}</time>
                <strong>{post.title}</strong>
                <p>{post.abstract}</p>
              </a>
            </Link>
          ))}
        </div>
      </main>
    </>
  )
}

export const getStaticProps: GetStaticProps = async (req) => {
  const prismic = prismicClient();

  const response = await prismic.query(
    Prismic.predicates.at('document.type', 'post'),
    {
      fetch: ['post.title', 'post.content'],
      pageSize: 20,
    }
  )
  //console.log(JSON.stringify(response, null, 2))

  const posts = response.results.map(post => {
    return {
      slug: post.uid,
      title: RichText.asText(post.data.title),
      abstract: post.data.content.find(content => content.type === 'paragraph')?.text ?? '',
      publishedAt: new Date(post.first_publication_date).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      })
    }
  })

  return {
    props: {
      posts
    },
    revalidate: 60 * 60 * 24, //24 hours in seconds
  }
}
