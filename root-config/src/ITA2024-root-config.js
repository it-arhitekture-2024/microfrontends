import { registerApplication, start } from 'single-spa';

registerApplication({
  name: '@ITA2024/navigation',
  app: () => System.import('@ITA2024/navigation'),
  activeWhen: ['/'],
});

registerApplication({
  name: '@ITA2024/grades',
  app: () => System.import('@ITA2024/grades'),
  activeWhen: ['/grades'],
});

registerApplication({
  name: '@ITA2024/subjects',
  app: () => System.import('@ITA2024/subjects'),
  activeWhen: ['/subjects'],
});

registerApplication({
  name: '@ITA2024/users',
  app: () => System.import('@ITA2024/users'),
  activeWhen: ['/users'],
});

console.log('All applications registered');

start({
  urlRerouteOnly: true,
});
