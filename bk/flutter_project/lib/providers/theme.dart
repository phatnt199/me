import 'package:flutter/material.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';
import 'package:portfolio/common/constants.dart';
import 'package:portfolio/services/preferences.dart';
import 'package:portfolio/services/variables.dart';

class ThemeNotifier extends StateNotifier<ThemeMode> {
  ThemeNotifier() : super(ThemeMode.light);

  ThemeNotifier.withThemeMode({ThemeMode themeMode = ThemeMode.light})
      : super(themeMode);

  void toggle(ThemeMode themeMode) {
    if (this.state == themeMode) {
      return;
    }

    this.state = themeMode;

    final appPrefs =
        Variables.get<Preference>(key: VariableKeys.KEY_PREFERENCES);
    appPrefs.prefs
        .setString(PreferenceKeys.KEY_APPLICATION_THEME_MODE, themeMode.name);
  }
}

final themeProvider = StateNotifierProvider<ThemeNotifier, ThemeMode>((ref) {
  final appPrefs = Variables.get<Preference>(key: VariableKeys.KEY_PREFERENCES);
  final prevThemeMode =
      appPrefs.prefs.getString(PreferenceKeys.KEY_APPLICATION_THEME_MODE);

  return ThemeNotifier.withThemeMode(
      themeMode: prevThemeMode == ThemeMode.dark.name
          ? ThemeMode.dark
          : ThemeMode.light);
});
