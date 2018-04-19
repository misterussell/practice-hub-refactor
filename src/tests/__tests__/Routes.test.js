import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import Routes from './../../Routes';
import { Home, GameBoard, RouteNotFound } from './../../containers';

import Store from '../../Store';

test('default path should redirect to Home component', () => {
  const wrapper = mount(
    <MemoryRouter initialEntries={['/']} initialIndex={0}>
      <Routes />
    </MemoryRouter>,
  );
  expect(wrapper.find(Home)).toHaveLength(1);
});

test('invalid path should redirect to 404', () => {
  const wrapper = mount(
    <MemoryRouter initialEntries={['/random']} initialIndex={0}>
      <Routes />
    </MemoryRouter>,
  );
  expect(wrapper.find(RouteNotFound)).toHaveLength(1);
});
// test('/gameOfLife path should redirect to GameBoard component', () => {
//   const wrapper = mount(
//     <MemoryRouter
//       initialEntries={['/gameOfLife']}
//       initialIndex={0}
//     >
//       <Routes store={Store} />
//     </MemoryRouter>,
//   );
//   expect(wrapper.find(GameBoard)).toHaveLength(1);
// });
