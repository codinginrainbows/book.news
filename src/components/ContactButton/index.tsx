import styles from './styles.module.scss';

interface FeedbackButtonProps {
  children: string,
  isDisabled: boolean,
}

function preventDefault(e) {
  e.preventDefault();
}

export default function ContactButton({ children, isDisabled }: FeedbackButtonProps) {

  return (
    <button
      className={styles.feedbackButton}
      disabled={isDisabled}
      type='submit'
      onSubmit={preventDefault}
    >
      {children}
    </button>
  )
}