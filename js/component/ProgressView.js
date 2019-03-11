import React from "react";
import { 
  Platform,
  View,
  ProgressBarAndroid,
  ProgressViewIOS
} from "react-native"; 
import { size } from "../utils/Util";

/**点击button*/
export default class ProgressView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      progressNum: 0
    };
  }
  render() {
    var view =
      Platform.OS == "ios" ? (
        <ProgressViewIOS style={{}} />
      ) : (
        <ProgressBarAndroid
          style={{ width: size.width, height: 2 }}
          indeterminate={false}
          animating={true}
          styleAttr="Horizontal"
          progress={this.state.progressNum}
          color="#2196F3"
        />
      );
    return view;
  }

  progressNum(num) {
    this.setState({ progressNum: num });
  }
}
