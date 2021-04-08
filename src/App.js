import React from 'react'
import './App.css';
import Form from './components/Form';
import { Padder } from './shared';
import AppStore from './store/index';
import { RenderIf } from './shared';
import List from './components/List';


class App extends React.Component {
  state = {
    dbInitialized: false,
  }
  async componentDidMount() {
    await AppStore.init();
    this.setState({ dbInitialized: true });
  }
  render() {
    return (
      <div>
        <RenderIf condition={this.state.dbInitialized} >
          <Padder vertical={30}>
            <Form />
            <List />
          </Padder>
        </RenderIf>
      </div>
    );
  }
}

export default App;
