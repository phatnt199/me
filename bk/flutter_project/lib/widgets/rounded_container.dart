import 'package:flutter/material.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';
import 'package:portfolio/common/constants.dart';
import 'package:portfolio/providers/theme.dart';

class RoundedContainer extends HookConsumerWidget {
  final Widget child;
  final EdgeInsetsGeometry padding;
  final EdgeInsetsGeometry? margin;
  final Color? backgroundColor;
  final DecorationImage? backgroundImage;
  final double? width;
  final double? height;
  final double? borderRadius;
  final Alignment? alignment;
  final BoxConstraints? constraints;
  final Border? border;
  final List<BoxShadow>? shadows;
  final Matrix4? transform;

  RoundedContainer({
    Key? key,
    required this.child,
    this.padding = const EdgeInsets.all(16.0),
    this.margin = const EdgeInsets.all(0.0),
    this.backgroundColor,
    this.backgroundImage,
    this.width,
    this.height,
    this.alignment = Alignment.center,
    this.constraints,
    this.borderRadius = 40,
    this.border,
    this.transform,
    this.shadows,
  }) : super(key: key);

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final applicationThemeMode = ref.watch(themeProvider);

    return AnimatedContainer(
      width: this.width,
      height: this.height,
      padding: this.padding,
      margin: this.margin,
      alignment: this.alignment,
      duration: Duration(milliseconds: 200),
      curve: Curves.fastOutSlowIn,
      decoration: BoxDecoration(
        boxShadow: this.shadows,
        image: this.backgroundImage,
        color: this.backgroundColor ??
            (applicationThemeMode == ThemeMode.light
                ? Colors.white
                : ApplicationColor.black),
        border: this.border,
        borderRadius:
            BorderRadius.all(Radius.circular(this.borderRadius ?? 40)),
      ),
      constraints: this.constraints,
      transform: this.transform,
      child: child,
    );
  }
}
