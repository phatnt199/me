import 'package:flutter/material.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';
import 'package:portfolio/common/constants.dart';
import 'package:portfolio/providers/theme.dart';
import 'package:portfolio/utils/device.dart';
import 'package:portfolio/widgets/draggable_container.dart';
import 'package:portfolio/widgets/profile_image.dart';

// ------------------------------------------------------------------------------
class Home extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return LayoutBuilder(builder: (context, constraints) {
      final maxWidth = constraints.maxWidth;
      if (maxWidth < ScreenSizeFactor.TABLET) {
        return Column(children: [
          _Avatar(),
          _Introduction(),
        ]);
      }
      return Column(
        children: [
          Row(children: [
            Flexible(flex: 5, child: _Avatar()),
            Flexible(flex: 7, child: _Introduction()),
          ]),
        ],
      );
    });
  }
}

// ------------------------------------------------------------------------------
class _Avatar extends HookConsumerWidget {
  final _defaultColor =
      ApplicationColor.black.withRed(68).withGreen(68).withBlue(68);

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final themeMode = ref.watch(themeProvider);
    final double imageSize =
        8 * (getSize(context) == ScreenSize.SMALL ? 32 : 38);

    return DraggableContainer(
      child: ProfileImage(
        height: imageSize,
        width: imageSize,
        decoration: BoxDecoration(
          color: _defaultColor,
          border: Border.all(width: 16.0, color: _defaultColor),
          borderRadius: BorderRadius.all(Radius.circular(500)),
          boxShadow: [
            BoxShadow(
              color: Colors.black
                  .withOpacity(themeMode == ThemeMode.dark ? 0.5 : 0.1),
              spreadRadius: 5,
              blurRadius: 20,
              offset: Offset(0, 10),
            ),
          ],
        ),
        assetSrc: 'images/profile-2.jpg',
      ),
    );
  }
}

// ------------------------------------------------------------------------------
class _Introduction extends StatelessWidget {
  const _Introduction({
    Key? key,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final appTheme = Theme.of(context);
    final textTheme = appTheme.textTheme;
    final bodyTextStyle = textTheme.bodyMedium;

    return Container(
      padding: EdgeInsets.symmetric(vertical: 8, horizontal: 0),
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        crossAxisAlignment: CrossAxisAlignment.start,
        textDirection: TextDirection.ltr,
        children: [
          Text(
            'Hi there! I am...',
            style: bodyTextStyle,
          ),
          SizedBox(height: 20),
          Text(
            'Phat Nguyen',
            style: appTheme.textTheme.titleLarge
                ?.apply(fontWeightDelta: 900, fontSizeFactor: 3),
          ),
          SizedBox(height: 20),
          RichText(
            text: TextSpan(
              style: textTheme.bodyMedium,
              children: [
                TextSpan(text: 'A'),
                TextSpan(
                    text: ' Full-Stack Software Engineer',
                    style: TextStyle(fontWeight: FontWeight.bold)),
                TextSpan(
                  text: ' based in Vietnam 🇻🇳 ',
                ),
              ],
            ),
          ),
          Divider(thickness: 1),
          SizedBox(height: 20),
          Text(
            'Involving in latest software development technologies which can be applied for scalable frontend and backend applications.',
            style: bodyTextStyle,
          ),
          SizedBox(height: 20),
          Text(
            'Want to know more about me especially what I have done? Feel free to checkout my portfolio!',
            style: bodyTextStyle,
          ),
          Divider(thickness: 1),
          SizedBox(height: 20),
          Chip(
            label: FittedBox(
              child: Text(
                'I\'M AVAILABLE FOR FREELANCE PROJECTS',
                style: TextStyle(
                  fontWeight: FontWeight.bold,
                  wordSpacing: 2,
                ),
              ),
            ),
            labelPadding: EdgeInsets.symmetric(vertical: 8, horizontal: 4),
          ),
        ],
      ),
    );
  }
}
