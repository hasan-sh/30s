import { AppRegistry } from 'react-native'
import App from './index.js'
import { name } from './app.json'

console.log('the name', name)

AppRegistry.registerComponent(name, () => App)
