import config from './config';

const modules = [];

config.forEach(moduleConfig => {
  const module = require(`${moduleConfig.path}`).default;
  modules.push({
    name: moduleConfig.name,
    module: module,
    position: moduleConfig.position
  })
})

export default modules;