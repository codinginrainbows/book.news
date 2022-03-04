import { GetServerSideProps } from "next"
import { getSession } from "next-auth/react";
import Head from "next/head";

import { RichText } from "prismic-dom";
import prismicClient from "../../services/prismic";
import * as Prismic from '@prismicio/client';

import Comments from '../../components/Comments'

import styles from './post.module.scss';
import Link from "next/link";

interface PostProps {
  post: {
    slug: string,
    title: string,
    content: string,
    publishedAt: string,
  },
  navigation: {
    previousPost: {
      uid: string,
      data: {
        title: string,
      };
    }[];

    nextPost: {
      uid: string,
      data: {
        title: string,
      };
    }[];
  }
}

export default function Post({ post, navigation }: PostProps) {

  return (
    <>
      <Head>
        <title>{post.title}</title>
      </Head>

      <main className={styles.container}>
        <article className={styles.post}>
          <h1>{post.title}</h1>
          <time>{post.publishedAt}</time>
          <div
            className={styles.postContent}
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
          <section className={styles.nextPostLink}>
            {/* {navigation?.previousPost.length > 0 && (
              <Link href={`/posts/${navigation.previousPost[0].uid}`}>
                <a>
                  <h4>{`${navigation.previousPost[0].data.title}`}</h4>
                  <p>Last Post</p>
                </a>
              </Link>
            )}

            {navigation?.nextPost.length > 0 && (
              <Link href={`/posts/${navigation.nextPost[0].uid}`}>
                <a>
                  <h4>{`${navigation.nextPost[0].data.title}`}</h4>
                  <p>Next Post</p>
                </a>
              </Link>
            )} */}
          </section>
          <Comments issueTerm={post.slug} />
        </article>
      </main>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req, params }) => {
  const session = await getSession({ req })
  const { slug } = params

  if (!session?.activeSubscription) {
    return {
      redirect: {
        destination: `/posts/preview/${slug}`,
        permanent: false
      }
    }
  }

  const prismic = prismicClient()

  const response = await prismic.getByUID('post', String(slug), {})

  // getting prev and next post to make links below the post
  const previousPost = await prismic.query(
    [Prismic.Predicates.at('document.type', 'post')],
    {
      pageSize: 1,
      after: response.id,
      orderings: ['document.first_publication_date'],
    }
  )

  const nextPost = await prismic.query(
    [Prismic.Predicates.at('document.type', 'post')],
    {
      pageSize: 1,
      after: response.id,
      orderings: ['document.first_publication_date desc]'],
    }
  )

  //formating data
  const post = {
    slug,
    title: RichText.asText(response.data.title),
    content: RichText.asHtml(response.data.content),
    publishedAt: new Date(response.first_publication_date).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    }),
  }

  return {
    props: {
      post,
      navigation: {
        previousPost: previousPost?.results,
        nextPost: nextPost?.results
      }
    }
  }
}