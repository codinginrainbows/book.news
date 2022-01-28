import { SignInButton } from './SignInButton';

import styles from './styles.module.scss';

export function Header() {

  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <img src="/images/logo.svg" alt="News App" />
        <nav>
          <a className={styles.active}>Home</a>
          <a>Posts</a>
          <a>Favorites</a>
          <a>Contact</a>
        </nav>

        <SignInButton />
      </div>
    </header>
  )
}