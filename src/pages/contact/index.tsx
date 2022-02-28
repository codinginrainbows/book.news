import Link from "next/link";
import { FiMail, FiUser } from "react-icons/fi";
import FeedbackButton from "../../components/FeedbackButton";

import { useState } from 'react';

import styles from './styles.module.scss';

export default function contactUs() {
  const [inputTextEmail, setInputTextEmail] = useState('')

  const handleInputTextChangeEmail = (e) => {
    setInputTextEmail(e.target.value)
  }

  return (
    <main className={styles.container}>
      <form className={styles.formContainer}>
        <h1>Contact us<span>.</span></h1>

        <div>
          <div className={styles.inputControl}>
            <FiUser className={styles.icon} />
            <input
              placeholder="Name"
              autoComplete="off"
            />
          </div>

          <div className={styles.inputControl}>
            <FiMail className={styles.icon} />
            <input
              onChange={handleInputTextChangeEmail}
              type="email"
              value={inputTextEmail}
              placeholder="E-mail"
              autoComplete="off"
            />
          </div>
        </div>

        <textarea placeholder="Write your message here"></textarea>

        <FeedbackButton isDisabled={false} children={'Send'} />
      </form>
    </main>
  )
}