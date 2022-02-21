import { GetServerSideProps } from "next"
import { getSession } from "next-auth/react";
import Head from "next/head";

import { RichText } from "prismic-dom";
import prismicClient from "../../services/prismic";

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

      <main>
        <article>
          <h1>{post.title}</h1>
          <time>{post.publisedAt}</time>
          <div>
            {post.content}
          </div>
        </article>
      </main>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const session = await getSession()
  const { slug } = params

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