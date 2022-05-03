import React from 'react';
import './App.css';
import ProfilePage from './ProfilePage';
import { TOKEN } from './consts';

interface IState {
  value: string;
  show: boolean;
}

class App extends React.Component<any, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      value: '',
      show: false
    };
  }

  private _setValue(value: string): void {
    this.setState({
      value
    });
  }

  private _find(): void {
    if (this.state.value) {
      this.setState({
        show: true
      });
    }
  }

  render() {
    if (!TOKEN) {
      return (
        <div>Please insert github token to file ./src/consts.ts</div>
      );
    }
    return (
      <div className="App">
        {!this.state.show &&
        (<div><input placeholder='Enter the login' onChange={(e) => this._setValue(e.target.value)} />
        <button onClick={() => this._find()}>Search</button></div>)}
        {this.state.show && (
          <ProfilePage user={this.state.value} onBack={() => this.setState({show: false})} />
        )}
      </div>
    );
  }
}

export default App;
