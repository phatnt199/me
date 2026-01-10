import 'package:flutter/material.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';
import 'package:portfolio/mixins/notistack.dart';
import 'package:portfolio/providers/section.dart';
import 'package:portfolio/providers/theme.dart';
import 'package:portfolio/widgets/profile_image.dart';

// --------------------------------------------------------------------------
class MenuBar extends HookConsumerWidget with NotistackMixin {
  MenuBar({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context, WidgetRef ref) {

    return Container(
      height: 8 * 5,
      child: Align(
        alignment: Alignment.bottomCenter,
        child: Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Row(
              children: [
                AnimatedSize(
                  duration: Duration(milliseconds: 200),
                  curve: Curves.fastOutSlowIn,
                  child: ProfileImage(
                    width: ref.watch(sectionProvider).index == 0 ? 0 : 8 * 5,
                    assetSrc: 'images/profile-1.png',
                  ),
                ),
                SizedBox(width: 10),
                _Name(),
              ],
            ),
            _ToggleThemeButton(),
          ],
        ),
      ),
    );
  }
}

// --------------------------------------------------------------------------
class _Name extends HookConsumerWidget {
  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final appTheme = Theme.of(context);

    return Text(
      'Phat Nguyen',
      style: appTheme.textTheme.headlineSmall?.apply(fontWeightDelta: 900),
    );
  }
}

// --------------------------------------------------------------------------
class _ToggleThemeButton extends HookConsumerWidget {
  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final themeMode = ref.watch(themeProvider);

    return InkWell(
      child: IconButton(
        icon: Icon(themeMode == ThemeMode.light
            ? Icons.brightness_2
            : Icons.brightness_7),
        onPressed: () {
          final newThemeMode =
              themeMode == ThemeMode.light ? ThemeMode.dark : ThemeMode.light;
          ref.read(themeProvider.notifier).toggle(newThemeMode);
        },
      ),
    );
  }
}
