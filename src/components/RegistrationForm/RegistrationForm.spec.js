import React from 'react'
import ReactDOM from 'react-dom'
import { shallow } from 'enzyme'
import { expect } from 'chai'
import RegistrationForm from './RegistrationForm'
import { BrowserRouter } from 'react-router-dom'
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

describe(`<RegistrationForm />`, () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<RegistrationForm />)
    expect(wrapper).to.have.ownPropertyDescriptor('form')
  })
})
//
// import React from 'react'
// import ReactDOM from 'react-dom'
// import RegistrationForm from './RegistrationForm'
// import { BrowserRouter } from `react-router-dom`​
// it('renders without crashing', () => {
//   const div = document.createElement('div')
//
//   ReactDOM.render(
//   <BrowserRouter>
//     <RegistrationForm />
//   </BrowserRouter>
//   , div)
//   ReactDOM.unmountComponentAtNode(div)
// })
