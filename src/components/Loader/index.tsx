import styles from './styles.module.scss'

export function Loader() {
  return (
    <div className={styles.loaderContainer}>
      <img src="/images/loading.svg" alt="loading..." />
    </div>
  )
}