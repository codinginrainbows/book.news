import Link from "next/link";
import { FiMail, FiUser } from "react-icons/fi";
import ContactButton from "../../components/ContactButton";

import { useEffect, useState } from 'react';

import styles from './styles.module.scss';

export default function contactUs() {
  const [inputTextName, setInputTextName] = useState('')
  const [inputTextEmail, setInputTextEmail] = useState('')
  const [textarea, setTextarea] = useState('')

  const [contactButtonDisabled, setContactButtonDisabled] = useState(false)
  const [validationMessageName, setValidationMessageName] = useState('');
  const [validationMessageEmail, setValidationMessageEmail] = useState('');
  const [validationMessageTextarea, setValidationMessageTextarea] = useState('');

  // validating NAME input field
  const handleInputTextChangeName = (e) => {
    if (inputTextName === '') {
      setValidationMessageName(null)
      setContactButtonDisabled(true)
    } else if (inputTextName !== '' &&
      inputTextName.trim().length > 16 &&
      inputTextName.trim().length > 1) {
      setValidationMessageName('Name must be 2-16 characters long')
      setContactButtonDisabled(true)
    } else {
      setValidationMessageName(null)
      setContactButtonDisabled(false)
    }

    setInputTextName(e.target.value)
  }

  // validating EMAIL input field
  const handleInputTextChangeEmail = (e) => {
    if (inputTextEmail === '') {
      setValidationMessageEmail(null)
      setContactButtonDisabled(true)
    } else if (inputTextEmail.includes("@" && ".")) {
      setValidationMessageEmail(null)
      setContactButtonDisabled(false)
    } else {
      setValidationMessageEmail('Insert a valid email')
      setContactButtonDisabled(true)
    }

    setInputTextEmail(e.target.value)
  }

  // validating TEXTAREA input field
  const handleTextareaChange = (e) => {
    if (textarea === '') {
      setValidationMessageTextarea(null)
      setContactButtonDisabled(true)
    } else if (textarea !== '' &&
      textarea.trim().length < 10) {
      setValidationMessageTextarea('Text must be at least 10 characters long')
      setContactButtonDisabled(true)
    } else {
      setValidationMessageTextarea(null)
      setContactButtonDisabled(false)
    }

    setTextarea(e.target.value);
  }

  return (
    <main className={styles.container}>
      <form className={styles.formContainer}>
        <h1>Contact us<span>.</span></h1>

        <div>
          <div className={styles.msg}>
            <div tabIndex={0} className={styles.inputControl}>
              <FiUser className={styles.icon} />
              <input
                onChange={handleInputTextChangeName}
                value={inputTextName}
                placeholder="Name"
                autoComplete="off"
                required={true}
              />
            </div>
            {validationMessageName &&
              <div className={styles.validationMessage}>
                {validationMessageName}
              </div>
            }
          </div>
          <div className={styles.msg}>
            <div className={styles.inputControl}>
              <FiMail className={styles.icon} />
              <input
                onChange={handleInputTextChangeEmail}
                value={inputTextEmail}
                type="email"
                placeholder="E-mail"
                autoComplete="off"
                required={true}
              />
            </div>
            {validationMessageEmail &&
              <div className={styles.validationMessage}>
                {validationMessageEmail}
              </div>
            }
          </div>
        </div>

        <textarea
          onChange={handleTextareaChange}
          placeholder="Write your message here"
          required={true}
        />

        {validationMessageTextarea &&
          <div className={styles.validationMessage}>
            {validationMessageTextarea}
          </div>
        }

        <ContactButton isDisabled={contactButtonDisabled} children={'Send'} />
      </form>
    </main >
  )
}