import React from 'react';
import $ from 'jquery';
//direct child of Admin

class AddToyProblems extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          title: '',
          body: '',
          code: '',
          tests: '',
          params: ''
        }
    }

    submitToyProblem (toyProblem) {
      let emptyState = { // on success clears the state of the input fields
            title: '',
            body: '',
            code: '',
            tests: '',
            params: ''
          };
      $.post('/admin/toyProblem', toyProblem)
      .done((data) => {
        console.log('success', data);
        this.setState(emptyState);
      })
      .fail((err) => {
        console.error('error', err);
      });
    }

    setter (prop) { //@param prop - sets the state of each of the input fields
      return (e) => {
        let state = {};
        state[prop] = e.target.value;
        this.setState(state);
      }
    }

    someTests() {
        return `Tests || Example [{"input": "2,3" , "expected": "5"}, {"input": "4, 4", "expected": "8"}]`;
    }

    render () {
        return (
            <div className="container fullh fullw column">
              <form className="container fullh fullw column">
                <div className="fullw">
                    <h5>Challenge Title</h5>
                    <input className="halfw" placeholder="Problem name" value={this.state.title} onChange={this.setter.call(this, 'title')}></input>
                </div>
                <br />
                <div className="fullw">
                    <h5>Function Name</h5>
                    <input className="halfw" placeholder="Expected function name" value={this.state.code} onChange={this.setter.call(this, 'code')}></input>
                </div>
                <br />
                <div className="fullw">
                    <h5>Parameters || Example: value1, value2</h5>
                    <input className="halfw" placeholder="Expected function parameters as comma separated values" value={this.state.params} onChange={this.setter.call(this, 'params')}></input>
                </div>
                <br />
                <div id="newPrompt" className="fullw">
                    <h5>Prompt</h5>
                    <textarea placeholder="Instructions for user" value={this.state.body} onChange={this.setter.call(this, 'body')} className="tp-text fullw"></textarea>
                </div>
                <br />
                <div id="newTests" className="fullw">
                    <h5>{this.someTests()}</h5>
                    <textarea
                    placeholder='Create tests as an array of objects with "input" property and "expected" property, in JSON-parsable format'
                    onChange={this.setter.call(this, 'tests')}
                    value={this.state.tests}
                    className="tp-text fullw"
                    ></textarea>
                </div>
                <div className="container submit fullw">
                    <button type="Submit" onClick={() => this.submitToyProblem.call(this, this.state)}>Submit</button>
                </div>
              </form>
            </div>
        )
    }
}

export default AddToyProblems
