import styles from './message.module.css'
import someAvatarSrc from './../../assets/icons/user-avatar.svg'
import hideSrc from './../../assets/icons/hide.svg'
import optionsSrc from './../../assets/icons/options.svg'
import favoriteSrc from './../../assets/icons/favorite.svg'
import imageSrc from './../../assets/media-image@2x 2.jpg'

export default function Message () {
	return(
		<li className={styles.container}>
  <div className={styles.avatar}>
    <img  className={styles['avatar-icon']} src={someAvatarSrc} alt="Аватар" />
    <time className={styles.time}>15:57</time>
  </div>
  <div className={styles.wrapper}>
    <header className={styles.header}>
      <div className={styles.info}>
        <div>
          <h3 className={styles.name}>Nina Malofeeva</h3>
          <p className={styles.comment}>Текст поста в соц. сетях если это комментарий</p>
        </div>
      </div>
      <div className={styles['column-controls']}>
        <button className={styles['column-btn']}>Левый</button>
        <button className={styles['column-btn']}>Центр</button>
        <button className={styles['column-btn']}>Правый</button>
      </div>
      <div className={styles.actions}>
		<button className={styles['action-btn']} aria-label="Выбрать">
          <img src={hideSrc} alt="Выбрать" />
        </button>
        <button className={styles['action-btn']} aria-label="Скрыть">
          <img className={styles['hide-icon']} src={hideSrc} alt="Скрыть" />
        </button>
        <button className={styles['action-btn']} aria-label="Параметры">
          <img className={styles['options-icon']} src={optionsSrc} alt="Параметры" />
        </button>
        <button className={styles['action-btn']} aria-label="В избранное">
          <img className={styles['favorite-icon']} src={favoriteSrc} alt="В избранное" />
        </button>
      </div>
    </header>
    <main className={styles.content}>
      <p className={styles.message}>Здравствуйте, как дела у вас в студии?</p>
      <button className={styles.next}>Далее</button>
      <img className={styles.attachment} src={imageSrc} alt=""  />
    </main>
  </div>
</li>
	)
}
