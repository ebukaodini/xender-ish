import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Documents from './pages/documents';
import Upload from './pages/upload';
import Download from './pages/download'

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={Upload} />
        <Route exact path='/upload' component={Upload} />
        <Route exact path='/download' component={Download} />
        <Route exact path='/help' component={Documents} />
      </Switch>
    </Router>
  );
}

export default App;
