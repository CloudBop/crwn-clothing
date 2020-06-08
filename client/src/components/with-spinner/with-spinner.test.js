import React from 'react';
import { shallow } from 'enzyme';

import WithSpinner from './WithSpinnerHOC2';
import Spinner from '../spinner/Spinner';

import WithSpinnerStyledComponents from './WithSpinner';
import { SpinnerContainer } from './with-spinner.style';

describe('WithSpinner HOC', () => {
  const TestComponent = () => <div className="test" />;
  const WrappedComponent = WithSpinner(TestComponent);

  describe('if loading is true', () => {
    it('should render Spinner component', () => {
      const wrapper = shallow(<WrappedComponent isLoading={true} />);

      expect(wrapper.exists(Spinner)).toBe(true);
    });

    it('should not render component', () => {
      const wrapper = shallow(<WrappedComponent isLoading={true} />);

      expect(wrapper.exists(TestComponent)).toBe(false);
    });
  });

  describe('if loading is false', () => {
    it('should render component', () => {
      const wrapper = shallow(<WrappedComponent isLoading={false} />);

      expect(wrapper.exists(TestComponent)).toBe(true);
    });

    it('should not render Spinner', () => {
      const wrapper = shallow(<WrappedComponent isLoading={false} />);

      expect(wrapper.exists(Spinner)).toBe(false);
    });
  });
});

describe('Styled Component WithSpinner HOC', () => {
  const TestComponent = () => <div className="test" />;
  const WrappedComponent = WithSpinnerStyledComponents(TestComponent);

  describe('if loading is true', () => {
    it('should render Spinner component', () => {
      const wrapper = shallow(<WrappedComponent isLoading={true} />);

      expect(wrapper.exists(SpinnerContainer)).toBe(true);
    });

    it('should not render component', () => {
      const wrapper = shallow(<WrappedComponent isLoading={true} />);

      expect(wrapper.exists(TestComponent)).toBe(false);
    });
  });

  describe('if loading is false', () => {
    it('should render component', () => {
      const wrapper = shallow(<WrappedComponent isLoading={false} />);

      expect(wrapper.exists(TestComponent)).toBe(true);
    });

    it('should not render Spinner', () => {
      const wrapper = shallow(<WrappedComponent isLoading={false} />);

      expect(wrapper.exists(Spinner)).toBe(false);
    });
  });
});
