import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Help from './pages/help';
import Upload from './pages/upload';
import Download from './pages/download'

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={Upload} />
        <Route exact path='/upload' component={Upload} />
        <Route exact path='/download' component={Download} />
        <Route exact path='/help' component={Help} />
      </Switch>
    </Router>
  );
}

export default App;
