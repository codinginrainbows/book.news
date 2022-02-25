import Link from "next/link";
import { FiMail, FiUser } from "react-icons/fi";

import styles from './styles.module.scss';

export default function contactUs() {

  return (
    <main className={styles.container}>
      <form className={styles.formContainer}>
        <h1>Contact us<span>.</span></h1>

        <div>
          <div className={styles.inputControl}>
            <FiUser className={styles.icon} />
            <input name="name" placeholder="Name" autoComplete="off" />
          </div>

          <div className={styles.inputControl}>
            <FiMail className={styles.icon} />
            <input name="email" placeholder="E-mail" autoComplete="off" />
          </div>
        </div>

        <textarea placeholder="Write your message here"></textarea>

        <Link href="/">
          <button type="submit"><strong>Send</strong></button>
        </Link>
      </form>
    </main>
  )
}