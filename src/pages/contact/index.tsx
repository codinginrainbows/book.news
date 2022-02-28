import Link from "next/link";
import { FiMail, FiUser } from "react-icons/fi";
import ContactButton from "../../components/ContactButton";

import { useState } from 'react';

import styles from './styles.module.scss';

export default function contactUs() {
  const [inputTextName, setInputTextName] = useState('')
  const [inputTextEmail, setInputTextEmail] = useState('')
  const [textarea, setTextarea] = useState('')

  const [contactButtonDisabled, setContactButtonDisabled] = useState(true)
  const [validationMessage, setValidationMessage] = useState('');

  const handleInputTextChangeName = (e) => {
    setInputTextName(e.target.value)

    if (inputTextName === '') {

    } else if (inputTextName !== '' && inputTextName.trim().length < 10) {
      setValidationMessage('Text must be at least 10 characters long')
    } else {
      setValidationMessage(null)
    }

  }

  const handleInputTextChangeEmail = (e) => setInputTextEmail(e.target.value)

  const handleTextareaChange = (e) => {
    if (textarea === '') {
      setValidationMessage(null)
    } else if (textarea !== '' && textarea.trim().length < 10) {
      setValidationMessage('Text must be at least 10 characters long')
    } else {
      setValidationMessage(null)
    }

    setTextarea(e.target.value);
  }


  return (
    <main className={styles.container}>
      <form className={styles.formContainer}>
        <h1>Contact us<span>.</span></h1>

        <div>
          <div className={styles.posicionandoMensagemDeMerda}>
            <div className={styles.inputControl}>
              <FiUser className={styles.icon} />
              <input
                onChange={handleInputTextChangeName}
                value={inputTextName}
                placeholder="Name"
                autoComplete="off"
              />
            </div>
          </div>

          <div className={styles.inputControl}>
            <FiMail className={styles.icon} />
            <input
              onChange={handleInputTextChangeEmail}
              value={inputTextEmail}
              type="email"
              placeholder="E-mail"
              autoComplete="off"
            />
          </div>

        </div>

        <textarea onChange={handleTextareaChange} placeholder="Write your message here"></textarea>

        {validationMessage &&
          <div className={styles.validationMessage}>
            {validationMessage}
          </div>
        }

        <ContactButton isDisabled={false} children={'Send'} />
      </form>
    </main>
  )
}