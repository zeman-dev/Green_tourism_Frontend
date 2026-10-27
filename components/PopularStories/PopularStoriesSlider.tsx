'use client';
import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper';
import type { Story } from '@/types/story';
import 'swiper/css';
import styles from './PopularStories.module.css';
import StoryCard from '@/components/StoryCard/StoryCard';

type PopularStoriesSliderProps = {
  stories: Story[];
};

export default function PopularStoriesSlider({
  stories,
}: PopularStoriesSliderProps) {
  const [swiper, setSwiper] = useState<SwiperType | null>(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  const updateButtons = (instance: SwiperType) => {
    setIsBeginning(instance.isBeginning);
    setIsEnd(instance.isEnd);
  };

  return (
    <div>
      <Swiper
        slidesPerView={1}
        spaceBetween={16}
        onSwiper={instance => {
          setSwiper(instance);
          updateButtons(instance);
        }}
        onSlideChange={updateButtons}
        breakpoints={{
          768: { slidesPerView: 2 },
          1440: { slidesPerView: 3 },
        }}
      >
        {stories.map(story => (
          <SwiperSlide key={story._id}>
            <StoryCard
              story={story}
              authorName={story.ownerId.name}
              savedCount={story.rate}
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <div className={styles.nav}>
        <button
          type="button"
          className={styles.arrow}
          aria-label="Попередні статті"
          disabled={isBeginning}
          onClick={() => {
            if (!swiper) return;
            swiper.slidePrev();
          }}
        >
          ←
        </button>
        <button
          type="button"
          className={styles.arrow}
          aria-label="Наступні статті"
          disabled={isEnd}
          onClick={() => {
            if (!swiper) return;
            swiper.slideNext();
          }}
        >
          →
        </button>
      </div>
    </div>
  );
}
