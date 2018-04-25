import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import Routes from './../../Routes';
import { Navigation, Home, Gamezone, RouteNotFound } from './../../containers';

import Store from '../../Store';

test('all routes should render the Navigation component', () => {
  const wrapper = mount(
    <MemoryRouter initialEntries={['/', '/random', '/gameOfLife']} initialIndex={0}>
      <Navigation />
    </MemoryRouter>,
  );
  expect(wrapper.find(Navigation)).toHaveLength(1);
});

test('default path should redirect to Home component', () => {
  const wrapper = mount(
    <MemoryRouter initialEntries={['/']} initialIndex={0}>
      <Navigation />
    </MemoryRouter>,
  );
  expect(wrapper.find(Home)).toHaveLength(1);
});

test('invalid path should redirect to 404', () => {
  const wrapper = mount(
    <MemoryRouter initialEntries={['/random']} initialIndex={0}>
      <Navigation />
    </MemoryRouter>,
  );
  expect(wrapper.find(RouteNotFound)).toHaveLength(1);
});

test('/gameOfLife path should redirect to Gamezone component', () => {
  const wrapper = mount(
    <MemoryRouter
      initialEntries={['/','/gameOfLife']}
      initialIndex={1}
    >
      <Navigation />
    </MemoryRouter>,
  );
  expect(wrapper.find(Gamezone)).toHaveLength(1);
  expect(wrapper.find(Home)).toHaveLength(0);
});
