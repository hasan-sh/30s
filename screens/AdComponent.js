import {
  AdIconView,
  MediaView,
  AdChoicesView,
  TriggerableView,
} from 'react-native-fbads';
class AdComponent extends React.Component {
  render() {
    return (
      <View>
        <AdChoicesView style={{ position: 'absolute', left: 0, top: 0 }} />
        <AdIconView style={{ width: 50, height: 50 }} />
        <MediaView style={{ width: 160, height: 90 }} />
        <TriggerableView>
          <Text>{this.props.nativeAd.description}</Text>
        </TriggerableView>
      </View>
    );
  }
}

export default withNativeAd(AdComponent);