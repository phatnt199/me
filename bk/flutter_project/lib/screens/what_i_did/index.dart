import 'package:flutter/material.dart';
import 'package:flutter_hooks/flutter_hooks.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';
import 'package:portfolio/common/constants.dart';
import 'package:portfolio/widgets/rounded_container.dart';
import 'package:portfolio/widgets/sector_title.dart';

final _workDefs = [
  {'assetSrc': 'images/work11.jpg', 'title': 'Beacon Working'},
  {'assetSrc': 'images/work10.jpg', 'title': 'Myo Armband Working'},
  {'assetSrc': 'images/work2.jpg', 'title': 'IoT Application'},
  {'assetSrc': 'images/work6.jpg', 'title': 'Travel Application'},
  {'assetSrc': 'images/work5.png', 'title': 'ERP'},
  {'assetSrc': 'images/work7.jpg', 'title': 'Loyaly CRM'},
  {'assetSrc': 'images/work12.png', 'title': 'Bus Ticket System'},
  {'assetSrc': 'images/work13.jpg', 'title': 'Vietjet Instant Ticket System'},
  {'assetSrc': 'images/work14.jpg', 'title': 'Stock Trading Application'},
  {'assetSrc': 'images/work15.jpg', 'title': 'Stock Trading Algorithm'},
];

// ------------------------------------------------------------------------------------------
class WhatIDid extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.center,
      children: [
        SectorTitle(title: 'What I did?'),
        Wrap(
          spacing: 16,
          alignment: WrapAlignment.start,
          children: _workDefs.map((workDef) {
            return _WorkElement(
              assetSrc: workDef['assetSrc'] as String,
              title: workDef['title'] as String,
              content: '',
            );
          }).toList(),
        )
      ],
    );
  }
}

// ------------------------------------------------------------------------------------------
class _WorkElement extends HookConsumerWidget {
  final String assetSrc;
  final String title;
  final String content;

  _WorkElement({
    Key? key,
    required this.assetSrc,
    required this.title,
    required this.content,
  }) : super(key: key);

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final appTheme = Theme.of(context);
    final textTheme = appTheme.textTheme;
    final isHover = useState(false);

    return LayoutBuilder(
      builder: (context, constraints) {
        final maxWidth = constraints.maxWidth;
        final boxSize =
            (maxWidth / (maxWidth < ScreenSizeFactor.TABLET ? 2 : 4)) - 8;

        return MouseRegion(
          onEnter: (value) {
            isHover.value = true;
          },
          onExit: (value) {
            isHover.value = false;
          },
          child: RoundedContainer(
            width: boxSize,
            height: boxSize,
            padding: EdgeInsets.all(0),
            margin: EdgeInsets.symmetric(vertical: 12, horizontal: 0),
            borderRadius: 24,
            backgroundColor: appTheme.cardColor,
            child: Stack(
              alignment: AlignmentDirectional.topStart,
              children: [
                AnimatedContainer(
                  duration: Duration(milliseconds: 200),
                  curve: Curves.easeOutExpo,
                  transform: Matrix4.identity()
                    ..translate(
                        isHover.value ? -10 : 0, isHover.value ? -10 : 0)
                    ..scale(isHover.value ? 1.08 : 1.0),
                  child: ClipRRect(
                    borderRadius: BorderRadius.all(Radius.circular(24)),
                    child: Image.asset(
                      this.assetSrc,
                      fit: BoxFit.cover,
                      width: boxSize,
                      height: boxSize,
                    ),
                  ),
                ),
                Container(
                  margin: const EdgeInsets.only(
                    top: 16.0,
                    left: 8.0,
                  ),
                  padding: const EdgeInsets.symmetric(
                    vertical: 4.0,
                    horizontal: 12.0,
                  ),
                  decoration: BoxDecoration(
                    color: appTheme.cardColor,
                    borderRadius: BorderRadius.all(Radius.circular(4)),
                  ),
                  child: Text(
                    this.title,
                    style: textTheme.labelMedium?.apply(fontWeightDelta: 2),
                  ),
                ),
              ],
            ),
          ),
        );
      },
    );
  }
}
