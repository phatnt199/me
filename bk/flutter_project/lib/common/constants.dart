import 'package:flutter/material.dart';
import 'package:intl/intl.dart';

class ApplicationColor {
  static final black = Color.fromRGBO(27, 26, 23, 1);
  static final red = Color.fromRGBO(173, 23, 48, 1);
  static final yellow = Color.fromRGBO(240, 165, 0, 1);
  static final beige = Color.fromRGBO(230, 213, 184, 1);
}

class VariableKeys {
  static final KEY_DATABASE = 'app_database';
  static final KEY_DIRECTORY = 'app_directory';
  static final KEY_PREFERENCES = 'app_preferences';
}

class PreferenceKeys {
  static final KEY_APPLICATION_THEME_MODE = 'app_theme_mode';
}

class Formatter {
  static final DECIMAL_FORMATTER = NumberFormat('#,###.00');
  static final NUMBER_FORMATTER = NumberFormat('#,###');
}

class Constants {
  static const APP_NAME = 'PhatNT\'s Portfolio';
  static final START_WORK_AT = DateTime(2015, 8, 1);
}

class ScreenSizeFactor {
  static double DESKTOP = 1024;
  static double SMALL_DESKTOP = 900;
  static double TABLET = 768;
  static double HANDSET = 640;
}

enum ScreenSize {
  SMALL,
  NORMAL,
  LARGE,
  EXTRA_LARGE,
}
