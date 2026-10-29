import css from './LoadMore.module.css'


type LoadMoreProps = {
  onLoadMore: () => void;
  isLoading: boolean;
  hasMore: boolean;
  className?: string;
};

export default function LoadMore({
  onLoadMore,
  isLoading,
  hasMore,
  className,
}: LoadMoreProps) {
  if (!hasMore) return null;
  
  return (
    <button onClick={onLoadMore} disabled={isLoading} className={`${css.loadbtn} ${className || ''} ${isLoading ? css.loading : ''}`}>
        {isLoading ? 'Завантаження' : 'Показати ще'}
        {isLoading && <div className={css.spinner} />}
    </button>
  );
}
