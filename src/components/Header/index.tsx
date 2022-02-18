import Link from 'next/link';

import { ActiveLink } from '../ActiveLinks';
import { SignInButton } from './SignInButton';

import styles from './styles.module.scss';

export function Header() {

  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <img src="/images/logo.svg" alt="ig.news" />
        <nav>
          <ActiveLink activeClassName={styles.active} href="/">
            <a>Home</a>
          </ActiveLink>
          <ActiveLink activeClassName={styles.active} href="/posts" prefetch>
            <a>Posts</a>
          </ActiveLink>
          <Link href="/contact">
            <a>Contact</a>
          </Link>
        </nav>

        <SignInButton />
      </div>
    </header>
  )
}