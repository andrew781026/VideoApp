import * as React from 'react';
import PropTypes from "prop-types";

class NavigationHeader extends React.Component {
  static propTypes = {
    //- WARNING: if navigation is not provided, then there will be no back button
    navigation: PropTypes.object,
    titleStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.arrayOf(PropTypes.object)])
  };

  static defaultProps = {
    title: "",
    style: 'green',
    titleStyle: {},
  };

  _hasTitle = () => (this.props.title && this.props.title.length > 0);

  _getLeftComponent = () => (this.props.navigation ? <NavigatorBackButton navigation={this.props.navigation}/> : null);

  _getCenterComponent = () => {
    if (this._hasTitle()) {
      return (
        <Animated.View style={this.props.titleStyle}>
          <Text style={styles.titleText.styles}>{this.props.title}</Text>
        </Animated.View>
      )
    } else {
      //- return dummy view so header stays having 3 components spaced
      return <View/>
    }
  };

  _getRightComponent = () => this.props.right || null;

  _getSecondRightComponent = () => this.props.secondRight || null;

  render() {
    let left = this._getLeftComponent();
    let center = this._getCenterComponent();
    let right = this._getRightComponent();
    let secondRight = this._getSecondRightComponent();

    if (secondRight !== null) {
      return (
        <Animated.View style={[NavigationHeader.defaultProps.style, this.props.style, {paddingHorizontal: 10}]}>
          <View style={styles.left.styles}>{left}</View>
          <View style={styles.center.styles}>{center}</View>
          <View style={styles.right.styles}>{secondRight}</View>
          <View style={styles.right.styles}>{right}</View>
        </Animated.View>
      )
    } else {
      return (
        <Animated.View style={[NavigationHeader.defaultProps.style, this.props.style, {paddingHorizontal: 10}]}>
          <View style={styles.left.styles}>{left}</View>
          <View style={styles.center.styles}>{center}</View>
          <View style={styles.right.styles}>{right}</View>
        </Animated.View>
      )
    }

  }
}

export class HeaderFactory {

  static create = ({style, title, titleStyle, navigation} = {}) => {
    const params = navigation.state.params || {};
    const {right = null} = params;
    const {secondRight = null} = params;

    return ({
      header: (
        <NavigationHeader
          style={style}
          title={title}
          titleStyle={titleStyle}
          navigation={navigation}
          right={right}
          secondRight={secondRight}
        />
      )
    });
  };

  static createEmptyHeader = () => {
    return ({
      header: null
    });
  };
}

export default NavigationHeader;
