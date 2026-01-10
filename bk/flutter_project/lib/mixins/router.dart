import 'package:flutter/material.dart';

mixin RouterMixin {
  AnimatedWidget getDefaultTransition(
      context, primaryAnimation, secondaryAnimation, child) {
    final begin = Offset(0.0, 5.0);
    final end = Offset.zero;
    final tween =
        Tween(begin: begin, end: end).chain(CurveTween(curve: Curves.ease));

    return SlideTransition(
      position: primaryAnimation.drive(tween),
      child: child,
    );
  }

  void navigate(BuildContext context, Route route,
      [Map<String, String>? options = const {'mode': 'push'}]) {
    final navigator = Navigator.of(context);

    String? navigateMode = 'push';
    if (options != null && options.containsKey('mode')) {
      navigateMode = options['mode'] ?? 'push';
    }

    switch (navigateMode) {
      case 'replace':
        navigator.pushReplacement(route);
        break;
      default:
        navigator.push(route);
        break;
    }
  }
}
