// module.exports = function(api) {
//   api.cache(true)
//   return {
//     plugins: ['react-native-paper/babel'],
//   }
// }

module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  env: {
    production: {
      plugins: ['react-native-paper/babel'],
    },
  },
}
