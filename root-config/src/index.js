import { registerApplication, start } from 'single-spa';
import {
  constructApplications,
  constructRoutes,
  constructLayoutEngine,
} from 'single-spa-layout';
import microfrontendLayout from './microfrontend-layout.html';

const routes = constructRoutes(microfrontendLayout);
const applications = constructApplications({
  routes,
  loadApp: async (appName) => {
    console.log(`Loading app: ${appName}`);
    return System.import(appName);
  },
});
const layoutEngine = constructLayoutEngine({ routes, applications });

applications.forEach(app => {
  console.log(`Registering app: ${app.name}`);
  registerApplication(app);
});
layoutEngine.activate();
start();
