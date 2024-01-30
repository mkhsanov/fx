import React from 'react';

import Main from '@sections/Main';
import Tabs from '@sections/Navigation';
import SideBar from '@sections/SideBar';

const Trading: React.FC = () => {
  return (
    <>
      <Tabs />
      <Main />
      <SideBar />
    </>
  );
};

export default Trading;
