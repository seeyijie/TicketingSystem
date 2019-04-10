import React from 'react';
import { shallow } from 'enzyme';
import Contact from '../components/AppNavigation';
import Enzyme from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';

Enzyme.configure({
    adapter: new EnzymeAdapter(),
    disableLifecycleMethods: true
});