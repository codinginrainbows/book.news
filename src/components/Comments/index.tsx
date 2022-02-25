import React, { useEffect } from 'react'

import styles from './styles.module.scss';

const Comments = ({ issueTerm }) => {
  const commentsUUID = `comments_${issueTerm}`

  useEffect(() => {
    let anchor
    const theme = 'github-dark' // you could choose other themes too
    const script = document.createElement('script')

    anchor = document.getElementById(commentsUUID)
    script.setAttribute('src', 'https://utteranc.es/client.js')
    script.setAttribute('crossorigin', 'anonymous')
    script.setAttribute('async', 'true')
    script.setAttribute('repo', 'codinginrainbows/news-app')
    script.setAttribute('issue-term', issueTerm)
    script.setAttribute('theme', theme)
    anchor.appendChild(script)

    return () => {
      <>
        anchor.innerHTML = ''
      </>
    }

  }, [])

  return (
    <>
      <div id={commentsUUID} className={styles.utterancesContainer}>
        <div className={styles.utterancesContent}></div>
      </div>
    </>
  )
}

export default Comments

// script configs
{/* <script src="https://utteranc.es/client.js"
        repo="[ENTER REPO HERE]"
        issue-term="pathname"
        theme="github-dark"
        crossorigin="anonymous"
        async>
</script> */}

