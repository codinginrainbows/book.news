import { GetServerSideProps } from "next"
import { getSession } from "next-auth/react";
import Head from "next/head";

import { RichText } from "prismic-dom";
import prismicClient from "../../services/prismic";

import Comments from '../../components/Comments'

import styles from './post.module.scss';

interface PostProps {
  post: {
    slug: string,
    title: string,
    content: string,
    publisedAt: string,
  }
}

export default function Post({ post }: PostProps) {

  return (
    <>
      <Head>
        <title>{post.title}</title>
      </Head>

      <main className={styles.container}>
        <article className={styles.post}>
          <h1>{post.title}</h1>
          <time>{post.publisedAt}</time>
          <div
            className={styles.postContent}
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
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
    }
  }
}