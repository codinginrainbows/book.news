import { GetStaticProps } from "next"
import { useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

import { RichText } from "prismic-dom";
import prismicClient from "../../../services/prismic";

import { useEffect } from "react";

import styles from '../post.module.scss';

interface PostProps {
  post: {
    slug: string,
    title: string,
    content: string,
    publisedAt: string,
  }
}

export default function postPreview({ post }: PostProps) {
  const { data } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (data?.activeSubscription) {
      router.push(`/posts/${post.slug}`)
    }
  }, [data])

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
            className={`${styles.postContent} ${styles.postPreviewContent}`}
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          <div className={styles.postPreviewContinueReading}>
            Wanna continue reading?
            <Link href="">
              <a>Subscribe Now 😊</a>
            </Link>
          </div>
        </article>
      </main>
    </>
  )
}

export const getStaticPaths = () => {
  return {
    paths: [],
    fallback: 'blocking'
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params

  const prismic = prismicClient()

  const response = await prismic.getByUID('post', String(slug), {})

  //formating data
  const post = {
    slug,
    title: RichText.asText(response.data.title),
    content: RichText.asHtml(response.data.content.splice(0, 2)),
    publishedAt: new Date(response.first_publication_date).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    }),
  }

  return {
    props: {
      post,
    },
    revalidate: 60 * 60 * 24, //24 hours in seconds 
  }
}