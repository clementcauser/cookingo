import styles from './misc.module.css';

/* eslint-disable-next-line */
export interface MiscProps {}

export function Misc(props: MiscProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to Misc!</h1>
    </div>
  );
}

export default Misc;
