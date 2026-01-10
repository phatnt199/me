import 'dart:io';

import 'package:flutter/foundation.dart' show kIsWeb;
import 'package:flutter/material.dart';
import 'package:portfolio/common/constants.dart';

bool get isWeb => kIsWeb;

bool get isMobileDevice => !kIsWeb && (Platform.isIOS || Platform.isAndroid);

bool get isDesktopDevice =>
    !kIsWeb && (Platform.isMacOS || Platform.isWindows || Platform.isLinux);

bool get isMobileDeviceOrWeb => kIsWeb || isMobileDevice;

bool get isDesktopDeviceOrWeb => kIsWeb || isDesktopDevice;

ScreenSize getSize(BuildContext context) {
  final deviceWidth = MediaQuery.of(context).size.shortestSide;

  if (deviceWidth > ScreenSizeFactor.DESKTOP) {
    return ScreenSize.EXTRA_LARGE;
  }

  if (deviceWidth > ScreenSizeFactor.TABLET) {
    return ScreenSize.LARGE;
  }

  if (deviceWidth > ScreenSizeFactor.HANDSET) {
    return ScreenSize.NORMAL;
  }

  return ScreenSize.SMALL;
}
