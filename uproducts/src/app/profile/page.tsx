'use client';
import React from 'react';
import UserDataList from '@/components/profile/userDataList/UserDataList';
import TypographyH1 from '@/components/typography/TypographyH1';

function ProfilePage() {
  return (
    <>
      <TypographyH1 text="Profile" className="text-orange pb-4 border-b border-b-slate-300 w-1/2" />

      <UserDataList />
    </>
  );
}

export default ProfilePage;
