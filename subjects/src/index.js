import React from 'react';
import ReactDOM from 'react-dom';
import singleSpaReact from 'single-spa-react';
import App from './App';

const lifecycles = singleSpaReact({
  React,
  ReactDOM,
  rootComponent: App,
  errorBoundary(err, info, props) {
    return <div>Error: {err.message}</div>;
  },
});

export const { bootstrap, mount, unmount } = lifecycles;

if (!window.singleSpaNavigate) {
  ReactDOM.render(<App />, document.getElementById('root'));
}
