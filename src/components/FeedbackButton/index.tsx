import styles from './styles.module.scss';

interface FeedbackButtonProps {
  children: string,
  isDisabled: boolean,
}

export default function FeedbackButton({ children, isDisabled }: FeedbackButtonProps) {

  return (
    <button
      className={styles.feedbackButton}
      disabled={isDisabled}
      type='button'
    >
      {children}
    </button>
  )
}