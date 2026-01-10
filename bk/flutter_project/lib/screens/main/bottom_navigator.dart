import 'package:flutter/material.dart';
import 'package:flutter_hooks/flutter_hooks.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';
import 'package:portfolio/common/constants.dart';
import 'package:portfolio/common/typedefs.dart';
import 'package:portfolio/providers/section.dart';
import 'package:portfolio/widgets/rounded_container.dart';

// ------------------------------------------------------------------------------
class SizeDefinition {
  static const double NAVIGATOR_HEIGHT = 8 * 6;
  static const double BUTTON_WIDTH_FACTOR = 15;

  static double BUTTON_WIDTH(double factor) => 8 * factor;
  static double SELECTOR_WIDTH(double factor) => 8 * (factor - 2);
}

// ------------------------------------------------------------------------------
class _FlatButton extends HookConsumerWidget {
  final String text;
  final bool isSelected;
  final IconData? icon;
  final double width;
  final VoidCallback? onPressed;

  _FlatButton({
    Key? key,
    required this.text,
    required this.isSelected,
    required this.width,
    this.icon = null,
    this.onPressed = null,
  }) : super(key: key);

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final textTheme = Theme.of(context).textTheme;
    final querySize = MediaQuery.of(context).size;

    final rowChildren = <Widget>[];
    rowChildren.add(
      FittedBox(
        child: querySize.width < ScreenSizeFactor.DESKTOP
            ? Icon(this.icon)
            : Text(
                this.text,
                style: isSelected
                    ? textTheme.labelLarge?.apply(
                        color: ApplicationColor.black, fontWeightDelta: 2)
                    : textTheme.labelLarge,
              ),
      ),
    );

    return InkWell(
      onTap: onPressed,
      child: RoundedContainer(
        width: this.width,
        padding: EdgeInsets.only(left: 8.0, right: 8.0),
        margin: EdgeInsets.only(left: 8.0),
        backgroundColor: Colors.transparent,
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          crossAxisAlignment: CrossAxisAlignment.center,
          children: rowChildren,
        ),
      ),
    );
  }
}

// ------------------------------------------------------------------------------
class BottomNavigator extends HookConsumerWidget {
  final Map<String, SectionOptions> options;
  final double width;
  BottomNavigator({
    Key? key,
    this.width = double.infinity,
    required this.options,
  }) : super(key: key);

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final SectionOptions selectedSection = ref.watch(sectionProvider);
    final currentWidth = MediaQuery.of(context).size.width;
    final scaleFactor = useState(SizeDefinition.BUTTON_WIDTH_FACTOR);

    final getMarginOffset = useCallback((int index) {
      return (SizeDefinition.BUTTON_WIDTH(scaleFactor.value) * index) +
          (8 * index);
    }, [scaleFactor]);

    useEffect(() {
      if (currentWidth < ScreenSizeFactor.TABLET) {
        scaleFactor.value = 6;
      } else if (currentWidth < ScreenSizeFactor.SMALL_DESKTOP) {
        scaleFactor.value = 9;
      } else {
        scaleFactor.value = 15;
      }

      return () {};
    }, [currentWidth]);

    return RoundedContainer(
      height: SizeDefinition.NAVIGATOR_HEIGHT,
      padding: EdgeInsets.all(8),
      child: Stack(
        children: [
          RoundedContainer(
            margin:
                EdgeInsets.only(left: getMarginOffset(selectedSection.index)),
            backgroundColor: ApplicationColor.beige,
            child: SizedBox(
              width: SizeDefinition.SELECTOR_WIDTH(scaleFactor.value),
            ),
          ),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceEvenly,
            crossAxisAlignment: CrossAxisAlignment.start,
            children: options.entries.map((option) {
              final optionKey = option.key;
              final optionValue = option.value;

              return _FlatButton(
                  key: Key(optionKey),
                  width: SizeDefinition.BUTTON_WIDTH(scaleFactor.value),
                  text: optionValue.name,
                  icon: optionValue.icon,
                  isSelected: selectedSection.index == optionValue.index,
                  onPressed: () {
                    ref.read(sectionProvider.notifier).goTo(optionValue);
                  });
            }).toList(),
          ),
        ],
      ),
    );
  }
}
