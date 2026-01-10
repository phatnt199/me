import 'package:flutter/material.dart';

class ApplicationTheme {
  static final Color PRIMARY_COLOR = Color.fromRGBO(228, 88, 38, 1);
  static final Color SECONDARY_COLOR = Color.fromRGBO(240, 165, 0, 1);

  static final LIGHT = ThemeData(
    brightness: Brightness.light,
    visualDensity: VisualDensity.comfortable,
    primarySwatch: Colors.red,
  );

  static final DARK = ThemeData(
    brightness: Brightness.dark,
    visualDensity: VisualDensity.comfortable,
    primarySwatch: Colors.red,
  );
}
