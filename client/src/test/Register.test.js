import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Register from '../components/Register'

Enzyme.configure({ adapter: new Adapter() });