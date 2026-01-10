import 'package:flutter/material.dart';

mixin NotistackMixin {
  SnackBar getSnackBar({required Widget content, SnackBarAction? action}) {
    final snackBar = SnackBar(content: content, action: action);
    return snackBar;
  }

  void showSnackBar({
    required BuildContext context,
    required Widget content,
    SnackBarAction? action,
  }) {
    final snackBar = this.getSnackBar(content: content, action: action);
    ScaffoldMessenger.of(context).showSnackBar(snackBar);
  }
}
