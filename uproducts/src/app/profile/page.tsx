'use client';
import React from 'react';
import Title from '@/components/ui/title';
import UserDataList from '@/components/profile/userDataList/UserDataList';

function ProfilePage() {
  return (
    <>
      <Title text="User details page:" />

      <UserDataList />
    </>
  );
}

export default ProfilePage;
