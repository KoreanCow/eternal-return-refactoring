'use client';
import styles from './nickname.module.scss'

import { useRouter } from 'next/navigation';
import { UserNum } from '@/types/user/info';

import { useSeason } from '@/app/[locale]/(home)/components/context/SeasonContext';

import UserInfo from '../components/UserInfo';
import UserStat from '../components/UserStat';
import { useEffect, useRef, useState } from 'react';
import UserMatchResult from '../components/UserMatchResult';
import { useTranslations } from 'next-intl';
import { useQuery } from '@tanstack/react-query';
import instance from '../../../../../lib/axios';

export default function UserPage({ params }: { params: { nickname: string } }) {
  const t = useTranslations('UserPage');
  // const { season } = useSeason();
  const [toggleOpen, setToggleOpen] = useState<boolean>(false);

  const router = useRouter();
  const decodedNickname = decodeURI(params.nickname);

  const toggleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (toggleRef.current && !toggleRef.current.contains(e.target as Node)) {
        setToggleOpen(false);
      }
    }

    if (toggleOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);

    }
  }, [toggleOpen])

  const { data: userNum, isLoading } = useQuery<UserNum>({
    queryKey: ['userNum', decodedNickname],
    queryFn: async () => (await instance.get(`/v1/user/nickname?query=${decodedNickname}`)).data,
  })

  if (isLoading) {
    return <p>Loading...</p>;
  }
  console.log(userNum);
  return (
    <div className={styles.body}>
      <div className={styles.toggle}>
        <p className={styles.toggle_btn} onClick={() => router.push('/')}>{t('BackSpace')}</p>
        <p className={styles.toggle_btn} onClick={() => setToggleOpen(!toggleOpen)}>{t('MatchResult')}</p>

      </div>

      <UserInfo userNum={userNum!} />
      <UserStat userNum={userNum!} seasonID={29} />
      <UserMatchResult userNum={userNum!} ref={toggleRef} isOpen={toggleOpen} onClose={() => setToggleOpen(false)} />
    </div>
  );
}