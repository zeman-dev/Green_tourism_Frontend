import Link from 'next/link';
import css from './MessageNoStories.module.css';

type MessageNoStoriesProps = {
  text: string;
  buttonText: string;
  linkTo: string;
};

export default function MessageNoStories({
  text,
  buttonText,
  linkTo,
}: MessageNoStoriesProps) {
  return (
    <div className={css.container}>
      <div className={css.containerBox}>
        <p className={css.text}>{text}</p>

        <Link href={linkTo} className={css.button}>
          {buttonText}
        </Link>
      </div>
    </div>
  );
}
