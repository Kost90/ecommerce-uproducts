'use client';
import React from 'react';
import UserDataList from '@/components/profile/userDataList/UserDataList';
import TypographyH1 from '@/components/typography/TypographyH1';

function ProfilePage() {
  return (
    <>
      <TypographyH1 text="User details page:" />

      <UserDataList />
    </>
  );
}

export default ProfilePage;
