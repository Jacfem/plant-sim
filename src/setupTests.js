// require Enzyme & React for tests
import Adapter from 'enzyme-adapter-react-16';
import { configure } from 'enzyme';
import React from 'react';

window.Enzyme = require('enzyme');
window.React = require('react');

configure({ adapter: new Adapter() });
