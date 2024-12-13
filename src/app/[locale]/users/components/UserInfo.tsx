'use client';
import { UserNum } from '@/types/user/info';

import styles from '../[nickname]/nickname.module.scss'
import { useTranslations } from 'next-intl';
interface UserInfoProps {
  userNum: UserNum;
}

export default function UserInfo({ userNum }: UserInfoProps) {
  const t = useTranslations('UserPage');

  if (!userNum || !userNum.user) {
    return <p>No user data available.</p>;
  }

  return (
    <div className={styles.info}>
      <h2>{userNum.user.nickname}</h2>
      <h2>{t('UserNum')}: {userNum.user.userNum}</h2>
    </div>
  );
}
