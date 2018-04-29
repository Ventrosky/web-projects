import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import App, { Search, Button, Table} from './App';


Enzyme.configure({ adapter: new Adapter() });

const emptyFu = () => { return null; };

describe('App', () => {

	it('renders without crashing', () => {
	  const div = document.createElement('div');
	  ReactDOM.render(<App />, div);
	  ReactDOM.unmountComponentAtNode(div);
	});

	test('has valid snapshot', () => {
		const component = renderer.create(
			<App />
		);
		let tree = component.toJSON();
		expect(tree).toMatchSnapshot();
	});

});

describe('Search', () => {

	it('renders without crashing', () => {
	  const div = document.createElement('div');
	  ReactDOM.render(<Search>Search</Search>, div);
	  ReactDOM.unmountComponentAtNode(div);
	});

	test('has valid snapshot', () => {
		const component = renderer.create(
			<Search>Search</Search>
		);
		let tree = component.toJSON();
		expect(tree).toMatchSnapshot();
	});

});

describe('Button', () => {

	it('renders without crashing', () => {
	  const div = document.createElement('div');
	  ReactDOM.render(<Button onClick={(e) => e.preventDefault()}>Give Me More</Button>, div);
	  ReactDOM.unmountComponentAtNode(div);
	});

	test('has valid snapshot', () => {
		const component = renderer.create(
			<Button onClick={emptyFu}>Give Me More</Button>
		);
		let tree = component.toJSON();
		expect(tree).toMatchSnapshot();
	});

	it('should contain className', () => {
		const element = shallow(
			<Button 
                  onClick={emptyFu}
                  className="button-test"
            > 
                Test Button
            </Button>

		);
		expect(element.find('.button-test').length).toBe(1);
	});

});

describe('Table', () => {

	const props = {
		list: [
			{ title: '1', author: '1', num_comments: 1, points: 2, objectID: 'y' },
			{ title: '2', author: '2', num_comments: 1, points: 2, objectID: 'z' },
		],
		onDismiss: emptyFu,
	};

	it('renders without crashing', () => {
	  const div = document.createElement('div');
	  ReactDOM.render(<Table { ...props } />, div);
	});

	test('has valid snapshot', () => {
		const component = renderer.create(
			<Table { ...props } />
		);
		let tree = component.toJSON();
		expect(tree).toMatchSnapshot();
	});

	it('shows two items in list', () => {
		const element = shallow(
			<Table { ...props } />
		);

		expect(element.find('.table-row').length).toBe(2);
	});

});
