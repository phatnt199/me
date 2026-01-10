import 'package:flutter/material.dart';
import 'package:flutter_hooks/flutter_hooks.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';
import 'package:portfolio/common/constants.dart';
import 'package:portfolio/widgets/hover_chip.dart';
import 'package:portfolio/widgets/rounded_container.dart';
import 'package:portfolio/widgets/sector_title.dart';

final coffeeConsumed = dayOfWork * 1.5;
final dayOfWork = now.difference(Constants.START_WORK_AT).inDays;
final hourOfWork = now.difference(Constants.START_WORK_AT).inHours * 0.35;

final now = DateTime.now();

final _FunFacts = [
  {
    'title': 'Years of Work',
    'icon': Icons.history_rounded,
    'value': Formatter.DECIMAL_FORMATTER.format(dayOfWork / 365),
  },
  {
    'title': 'Hours of Work',
    'icon': Icons.watch_later_rounded,
    'value': '~${Formatter.NUMBER_FORMATTER.format(hourOfWork)}',
  },
  {
    'title': 'Awards/Certs',
    'icon': Icons.emoji_events_rounded,
    'value': '6',
  },
  {
    'title': 'CF Consumed',
    'icon': Icons.coffee_rounded,
    'value': '~${Formatter.NUMBER_FORMATTER.format(coffeeConsumed.ceil())}',
  }
];
final _PERSONALITY = <String>[
  '#confident',
  '#forward-thinking',
  '#passionate',
  '#funny',
];

// ------------------------------------------------------------------------------------------
class About extends HookWidget {
  @override
  Widget build(BuildContext context) {
    final appTheme = Theme.of(context);
    final textTheme = appTheme.textTheme;
    final headerStyle = textTheme.titleLarge?.apply(
      fontWeightDelta: 2,
    );

    return Column(
      mainAxisAlignment: MainAxisAlignment.center,
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        SectorTitle(title: 'About'),
        Wrap(
          spacing: 8,
          children: _PERSONALITY
              .map((label) => _PersonalityElement(label: label))
              .toList(),
        ),
        Divider(),
        SizedBox(height: 20),
        RichText(
          text: TextSpan(
            style: appTheme.textTheme.bodyMedium,
            children: [
              TextSpan(
                text: '- As individual view, I see myself',
              ),
              TextSpan(
                text: ' confident',
                style: TextStyle(fontWeight: FontWeight.w900),
              ),
              TextSpan(
                text: ', open-minded',
                style: TextStyle(fontWeight: FontWeight.w900),
              ),
              TextSpan(
                text: ' and ',
              ),
              TextSpan(
                text: 'straight-thinking.',
                style: TextStyle(fontWeight: FontWeight.w900),
              ),
            ],
          ),
        ),
        SizedBox(height: 20),
        RichText(
          text: TextSpan(
            style: appTheme.textTheme.bodyMedium,
            children: [
              TextSpan(
                text: '- Besides, you’ll find me',
              ),
              TextSpan(
                text: ' creative',
                style: TextStyle(fontWeight: FontWeight.w900),
              ),
              TextSpan(
                text: ', funny',
                style: TextStyle(fontWeight: FontWeight.w900),
              ),
              TextSpan(
                text: ' naturally passionate',
                style: TextStyle(fontWeight: FontWeight.w900),
              ),
              TextSpan(
                text: ' and',
              ),
              TextSpan(
                text: ' active',
                style: TextStyle(fontWeight: FontWeight.w900),
              ),
              TextSpan(
                text: ' in new aspect of knowledge.',
              ),
            ],
          ),
        ),
        SizedBox(height: 20),
        RichText(
          text: TextSpan(
            style: appTheme.textTheme.bodyMedium,
            children: [
              TextSpan(
                text: '- I’m a',
              ),
              TextSpan(
                text: ' forward-thinker',
                style: TextStyle(fontWeight: FontWeight.w900),
              ),
              TextSpan(
                text:
                    ' which others may find inspiring when working as a team.',
              ),
            ],
          ),
        ),
        SizedBox(height: 20),
        Divider(thickness: 1),
        SizedBox(height: 20),
        Text(
          '- An opportunity to work and upgrade knowledge will attract me, as well as being involved in an organization that believes in gaining a competitive edge and giving back to the community.',
        ),
        SizedBox(height: 20),
        Text(
          '- I\'m presently expanding my solid experience in programming. I focus on using my interpersonal skills to build plenty of good softwares and create a strong motivation for my members.',
        ),
        SizedBox(height: 20),
        Text(
          '- I hope to develop my skill set and knowledge in Financial Technology, Software Development, Software Process, and become an great-honest asset to the business.',
        ),
        SizedBox(height: 40),
        Text('Fun Fact', style: headerStyle),
        Divider(thickness: 1),
        _FunFact(),
      ],
    );
  }
}
//child: SizedBox.expand(
//child: Container(
//color: Colors.red,
//),
//),

// ------------------------------------------------------------------------------------------
class _FunFact extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Wrap(
      alignment: WrapAlignment.spaceAround,
      spacing: 8,
      children: _FunFacts.map(
        (element) {
          return _FunFactElement(
            title: element['title'] as String,
            icon: element['icon'] as IconData,
            value: (element['value'] ?? '') as String,
          );
        },
      ).toList(),
    );
  }
}

// ------------------------------------------------------------------------------------------
class _FunFactElement extends HookConsumerWidget {
  final String title;
  final IconData icon;
  final dynamic value;

  const _FunFactElement({
    Key? key,
    required this.title,
    required this.icon,
    required this.value,
  }) : super(key: key);

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final appTheme = Theme.of(context);
    final textTheme = appTheme.textTheme;
    final isHover = useState(false);

    return LayoutBuilder(
      builder: (BuildContext context, BoxConstraints constraints) {
        final maxWidth = constraints.maxWidth;
        final boxSize = (maxWidth /
                (maxWidth < ScreenSizeFactor.HANDSET
                    ? 1
                    : (maxWidth < ScreenSizeFactor.TABLET ? 2 : 4))) -
            8;

        return MouseRegion(
          onEnter: (value) {
            isHover.value = true;
          },
          onExit: (value) {
            isHover.value = false;
          },
          child: RoundedContainer(
            margin: EdgeInsets.only(top: 16),
            backgroundColor: appTheme.cardColor,
            border: Border.all(width: 2, color: appTheme.dividerColor),
            borderRadius: 24,
            width: boxSize,
            height: boxSize - 24,
            constraints: BoxConstraints(minWidth: 160, maxHeight: 220),
            transform: Matrix4.identity()..translate(0, isHover.value ? -5 : 0),
            shadows: [
              BoxShadow(
                color:
                    appTheme.shadowColor.withOpacity(isHover.value ? 0.3 : 0),
                spreadRadius: -20,
                blurRadius: 20,
                offset: Offset(0, 20),
              ),
            ],
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Icon(this.icon, size: 32, color: ApplicationColor.beige),
                FittedBox(
                  child: Padding(
                    padding: const EdgeInsets.symmetric(
                        vertical: 8.0, horizontal: 0),
                    child: Text(
                      this.title,
                      style: textTheme.bodySmall?.copyWith(
                        fontSize: 16,
                        fontWeight: FontWeight.w900,
                      ),
                    ),
                  ),
                ),
                FittedBox(
                  child: Text(
                    this.value,
                    style: TextStyle(
                      fontSize: 28,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                )
              ],
            ),
          ),
        );
      },
    );
  }
}

// ------------------------------------------------------------------------------------------
class _PersonalityElement extends StatelessWidget {
  final String label;
  _PersonalityElement({Key? key, required this.label}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return HoverChip(
      backgroundColor: ApplicationColor.beige,
      label: this.label,
      labelStyle: TextStyle(
        color: ApplicationColor.black,
        fontSize: 12,
      ),
    );
  }
}
