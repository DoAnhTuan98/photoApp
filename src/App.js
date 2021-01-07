import React, { Suspense } from 'react';
import './App.scss'
import { BrowserRouter, Route, Switch, Redirect, Link} from 'react-router-dom'
import NotFound from './components/NotFound'
import Header from './components/Header'

const Photo = React.lazy(() => import('./features/Photo'))

function App() {
  return (
    <div className="photo-app">
      <Suspense fallback={<div>Loading ...</div>}>
        <BrowserRouter>
          <Header />
          {/* <Button onClick={handleButtonClick}>Fetch Product List</Button> */}
          <Switch>
            <Redirect exact from="/" to="/photos" />

            <Route path="/photos" component={Photo} />
            {/* <Route path="/sign-in" component={SignIn} /> */}
            <Route component={NotFound} />
          </Switch>
        </BrowserRouter>
      </Suspense>
    </div>
  );
}

export default App;