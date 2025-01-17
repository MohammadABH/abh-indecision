import React from 'react';
import AddOption from './AddOption';
import Action from './Action';
import Header from './Header';
import Options from './Options';
import OptionModal from './OptionModal';

export default class IndecisionApp extends React.Component {
	state = {
		options: [],
		selectedoption: undefined
	}
	handleDeleteOptions = () => {
		this.setState(() => ({ options: [] }));
	}
	handleDeleteOption = (optionToRemove) => {
		this.setState((prevState) => ({
			options: prevState.options.filter((option) => {
				return optionToRemove !== option;
			})
		}))
	}
	handlePick = () => {
		this.setState(() => ({ selectedoption: this.state.options[Math.floor(Math.random() * this.state.options.length)] }));
	}
	handleAddOption = (option) => {
		if(!option) {
			return 'Enter a valid value to add'
		}
		else if(this.state.options.indexOf(option) > -1) {
			return 'This option already exists'
		}
		this.setState((prevState) => ({ options: prevState.options.concat(option) }))
	}
	handleCloseModal = () => {
		this.setState(() => ({ selectedoption: undefined }));
	}
	componentDidMount() {
		try {
			const json = localStorage.getItem('options');
			const options = JSON.parse(json);
			if(options) {
				this.setState(() => ({ options }));
			}
		} catch(e){
			// Do nothing at all
		}
	}
	componentDidUpdate(prevProps, prevState) {
		if(prevState.options.length !== this.state.options.length){
			const json = JSON.stringify(this.state.options);
			localStorage.setItem('options', json);
		}
	}
	render () {
		const title = 'Indecision';
		const subtitle = 'Put your life in the hands of a computer!'
		return (
			<div>
				<Header title={title} subtitle={subtitle}/>
				<div className="container">
					<Action 
						hasOptions={this.state.options.length > 0}
						handlePick={this.handlePick}
					/>
					<div className="widget">
					<Options 
						options={this.state.options} 
						handleDeleteOptions={this.handleDeleteOptions}
						handleDeleteOption={this.handleDeleteOption}
					/>
					<AddOption
						handleAddOption={this.handleAddOption}
					/>
					</div>
				</div>
				<OptionModal 
					selectedoption={this.state.selectedoption}
					handleCloseModal={this.handleCloseModal}
				/>
			</div>
		)	
	}
}

IndecisionApp.defaultProps = {
	options: []
}