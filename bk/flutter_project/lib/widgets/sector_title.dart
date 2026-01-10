import 'package:flutter/material.dart';
import 'package:portfolio/common/constants.dart';

class SectorTitle extends StatelessWidget {
  final String title;
  final Widget? subtitle;

  SectorTitle({
    Key? key,
    required this.title,
    this.subtitle,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final textTheme = Theme.of(context).textTheme;
    final deviceWidth = MediaQuery.of(context).size.shortestSide;

    final children = <Widget>[
      FittedBox(
        child: Text(
          this.title,
          style: textTheme.headline2?.copyWith(fontWeight: FontWeight.bold),
        ),
      ),
    ];

    double maxHeight = deviceWidth > ScreenSizeFactor.HANDSET ? 220 : 160;
    if (subtitle != null) {
      children.add(this.subtitle!);
    } else {
      maxHeight -= 40;
    }

    final constraints = BoxConstraints(maxHeight: maxHeight);
    return Container(
      alignment: Alignment.centerLeft,
      padding: EdgeInsets.symmetric(
          vertical: 24,
          horizontal: deviceWidth > ScreenSizeFactor.HANDSET ? 24 : 0),
      constraints: constraints,
      child: Flex(
        direction: deviceWidth > ScreenSizeFactor.HANDSET
            ? Axis.horizontal
            : Axis.vertical,
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        crossAxisAlignment: deviceWidth > ScreenSizeFactor.HANDSET
            ? CrossAxisAlignment.center
            : CrossAxisAlignment.start,
        children: children,
      ),
    );
  }
}
