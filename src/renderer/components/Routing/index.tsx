import React from 'react';
import { Routes, Route, MemoryRouter } from 'react-router-dom';

import Loading from '@pages/Loading';

import type { RoutingProps } from '@components/Routing/types';

const Routing: React.FC<RoutingProps> = () => {
  return (
    <MemoryRouter>
      <Routes>
        <Route path="/" element={<Loading />} />
      </Routes>
    </MemoryRouter>
  );
};

export default Routing;
