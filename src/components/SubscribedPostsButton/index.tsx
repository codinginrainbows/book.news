import Link from 'next/link';

import styles from './styles.module.scss';

interface SubscribeButtonProps {
  priceId: string,
}

export function SubscribedPostsButton({ priceId }: SubscribeButtonProps) {
  return (
    <Link href="/posts">
      <button
        type="button"
        className={styles.subscribeButton}
      >
        Read articles
      </button>
    </Link>
  )
}
