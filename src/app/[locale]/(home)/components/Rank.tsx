'use client';
import styles from '@/app/[locale]/page.module.scss';
import { RankListType } from '@/types/home/rank';
import { useSeason } from './context/SeasonContext';
import { useQuery } from '@tanstack/react-query';
import instance from '../../../../../lib/axios';
import { useRouter } from '@/i18n/routing';
import { useTranslations } from 'next-intl';

export default function Rank() {
  const router = useRouter();
  const t = useTranslations('HomePage');

  const { season } = useSeason();
  const { data: ranking, isLoading, error } = useQuery<RankListType>({
    queryKey: ['ranking', season?.seasonID],
    queryFn: async () => (await instance.get(`v1/rank/top/${season?.seasonID}/3`)).data,
    enabled: !!season?.seasonID, // seasonID가 있을 때만 활성화
  });
  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    console.error('Failed to fetch rankings:', error);
    return <p>Error loading rankings: {error.message}</p>;
  }

  if (!season) {
    return <p className={styles.season}>Loading season information...</p>;
  }

  const onRankerClick = (nickname: string) => {
    const trimNickname = nickname.trim();
    if (trimNickname !== '') {
      router.push({
        pathname: '/users/[nickname]',
        params: { nickname: trimNickname },
      });
    }
  };

  return (
    <div className={styles.season}>
      <div className={styles.seasonInfo}>
        <h1>{t('CurrentSeason')}: {season.seasonName}</h1>
        <h2>{season.seasonStart} - {season.seasonEnd}</h2>
        <h3>{t('SeasonId')}: {season.seasonID}</h3>
      </div>
      <div className={styles.rank}>
        {ranking?.topRanks?.slice(0, 10).map((rank) => (
          <div key={rank.userNum} className={styles.rankItem}>
            <h4>{t('Rank')}: {rank.rank}</h4>
            <p
              onClick={() => onRankerClick(rank.nickname)}
              className={styles.ranker}
            >{t('Nickname')}: {rank.nickname}</p>
            <p>MMR: {rank.mmr}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
