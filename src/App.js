import React from 'react'
import './App.css';
import { Padder } from './shared';
import AppStore from './store/index';
import { RenderIf, Center, Gap } from './shared';
import List from './components/List';
import ReactLoading from 'react-loading';
import Action from './components/Action';


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
            <Action />
            <List />
          </Padder>
        </RenderIf>
        <RenderIf condition={!this.state.dbInitialized}>
          <Center>
            <ReactLoading
              type={'spin'}
              color={'#3d2462'}
              height={30}
              width={30}
            />
            <Gap vertical />
            <div style={{ fontWeight: 'bold' }} >
              {'INITIALIZING DATABASE'}
            </div>
          </Center>
        </RenderIf>
      </div>
    );
  }
}

export default App;
