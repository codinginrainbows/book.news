import Link from 'next/link';

import { ActiveLink } from '../ActiveLinks';
import { SignInButton } from './SignInButton';

import styles from './styles.module.scss';

export function Header() {

  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <Link href="/">
          <h1>book.news</h1>
        </Link>

        <nav>
          <ActiveLink activeClassName={styles.active} href="/">
            <a>Home</a>
          </ActiveLink>
          <ActiveLink activeClassName={styles.active} href="/posts" prefetch>
            <a>Posts</a>
          </ActiveLink>
          <ActiveLink activeClassName={styles.active} href="/contact">
            <a>Contact</a>
          </ActiveLink>
        </nav>

        <SignInButton />
      </div>
    </header>
  )
}