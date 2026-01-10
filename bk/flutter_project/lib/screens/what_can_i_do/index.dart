import 'package:flutter/material.dart';
import 'package:flutter_hooks/flutter_hooks.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';
import 'package:portfolio/common/constants.dart';
import 'package:portfolio/common/typedefs.dart';
import 'package:portfolio/utils/device.dart';
import 'package:portfolio/widgets/hover_chip.dart';
import 'package:portfolio/widgets/sector_title.dart';

final _programmingLanguages = <String>[
  'Java',
  'Kotlin',
  'Python',
  'JavaScript/TypeScript',
  'Elixir',
  'Swift',
  'C/C++',
  'Golang (Go)',
  'SQL',
  'Lua',
  'Rust',
  'Ruby',
  'Google Apps Script',
  'Dart',
];

final _skillOptions = <SkillOptions>[
  SkillOptions(name: 'Backend Dev', indicator: 0.9),
  SkillOptions(name: 'Frontend Dev', indicator: 0.8),
  SkillOptions(name: 'Struture Design', indicator: 0.8),
  SkillOptions(name: 'Design Patten', indicator: 0.75),
  SkillOptions(name: 'UI/UX Design', indicator: 0.6),
  SkillOptions(name: 'Office Tools', indicator: 0.95),
];

final _moreSkillOptions = <SkillOptions>[
  SkillOptions(name: 'Self-learning', indicator: 0.95),
  SkillOptions(name: 'Leadership', indicator: 0.85),
  SkillOptions(name: 'Management', indicator: 0.85),
  SkillOptions(name: 'Communication', indicator: 0.8),
  SkillOptions(name: 'Creativity', indicator: 0.75),
  SkillOptions(name: 'Teamwork', indicator: 0.85),
];

// ------------------------------------------------------------------------------
class WhatCanIDo extends HookWidget {
  @override
  Widget build(BuildContext context) {
    final textTheme = Theme.of(context).textTheme;

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        SectorTitle(title: 'What can I do?', subtitle: _ShortInfo()),
        _LongInfo(),
        Divider(),
        SizedBox(height: 10),
        RichText(
          text: TextSpan(
            style: textTheme.bodyMedium,
            children: [
              TextSpan(
                text: '- I have confident in software',
              ),
              TextSpan(
                text:
                    ' programming, structuring, architecture designing, solution finding',
                style: TextStyle(fontWeight: FontWeight.bold),
              ),
              TextSpan(
                text: ' and',
              ),
              TextSpan(
                text: ' problem resolving.\n\n',
                style: TextStyle(fontWeight: FontWeight.bold),
              ),
              TextSpan(
                text:
                    '- As a Full-Stack Software Engineer, I can handle through whole tiers of software architecture.\n\n',
              ),
              // --------------------------------------------------------------------------------------------------------
              TextSpan(
                text: '- With Data tier, I do familiar with using',
              ),
              TextSpan(
                text: ' PostgreSQL, TimescaleDB, Redis, Elasticsearch',
                style: TextStyle(fontWeight: FontWeight.bold),
              ),
              TextSpan(
                text:
                    ', MySQL, OracleDB, Microsoft SQL Server, MongoDB, MariaDB, IBM Db2.\n\n',
              ),
              TextSpan(text: '- For more specific,'),
              TextSpan(
                text: ' PostgreSQL',
                style: TextStyle(fontWeight: FontWeight.bold),
              ),
              TextSpan(text: ' is my main datastore.'),
              TextSpan(
                text: ' ElasticSearch, TimescaleDB, Grafana',
                style: TextStyle(fontWeight: FontWeight.bold),
              ),
              TextSpan(
                text:
                    ' is my main time-series datastore, data analysis, visualization and interpretation adaptive.\n\n',
              ),
              // --------------------------------------------------------------------------------------------------------
              TextSpan(
                text:
                    '- With Application (Business Logic) tier, I mainly stick to',
              ),
              TextSpan(
                text: ' NodeJS',
                style: TextStyle(fontWeight: FontWeight.bold),
              ),
              TextSpan(
                text: ' (Express and Loopback),',
              ),
              TextSpan(
                text: ' JAVA',
                style: TextStyle(fontWeight: FontWeight.bold),
              ),
              TextSpan(
                text: ' (Spring Boot), and',
              ),
              TextSpan(
                text: ' C/C++',
                style: TextStyle(fontWeight: FontWeight.bold),
              ),
              TextSpan(
                text: ' for high-performance logical processing.\n\n',
              ),
              // --------------------------------------------------------------------------------------------------------
              TextSpan(
                text: '- With Presentation tier, I definitely go with',
              ),
              TextSpan(
                text: ' ReactJS',
                style: TextStyle(fontWeight: FontWeight.bold),
              ),
              TextSpan(
                text: ' for web development and',
              ),
              TextSpan(
                text: ' Flutter',
                style: TextStyle(fontWeight: FontWeight.bold),
              ),
              TextSpan(
                text: ' for mobile development these years.',
              ),
            ],
          ),
        ),
        SizedBox(height: 40),
        _Language(),
        SizedBox(height: 40),
        Text(
          'Skills',
          style: textTheme.titleLarge?.apply(fontWeightDelta: 2),
        ),
        Divider(),
        LayoutBuilder(
          builder: (context, constraints) {
            if (constraints.maxWidth < ScreenSizeFactor.TABLET) {
              return Column(children: [
                _Skills(options: _skillOptions),
                SizedBox(height: 20),
                _Skills(options: _moreSkillOptions),
              ]);
            }

            return Row(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Flexible(
                  flex: 5,
                  child: _Skills(options: _skillOptions),
                ),
                Spacer(),
                Flexible(
                  flex: 5,
                  child: _Skills(options: _moreSkillOptions),
                ),
              ],
            );
          },
        ),
      ],
    );
  }
}

// -------------------------------------------------------------------
class _Skills extends StatelessWidget {
  final List<SkillOptions> options;

  _Skills({
    Key? key,
    required this.options,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.spaceAround,
        children: [
          ...options.map((option) => _SkillElement(options: option)).toList(),
        ],
      ),
    );
  }
}

// ------------------------------------------------------------------------------
class _Language extends HookWidget {
  @override
  Widget build(BuildContext context) {
    final textTheme = Theme.of(context).textTheme;

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'Programming language I used to be deep in...',
          style: textTheme.titleMedium?.apply(fontWeightDelta: 2),
        ),
        Divider(),
        Wrap(
          spacing: 8,
          children: _programmingLanguages.map((name) {
            return Padding(
              padding: const EdgeInsets.only(top: 8.0),
              child: HoverChip(
                backgroundColor: ApplicationColor.beige,
                label: name,
                labelStyle: TextStyle(
                  color: ApplicationColor.black,
                ),
              ),
            );
          }).toList(),
        ),
      ],
    );
  }
}

// ------------------------------------------------------------------------------
class _LongInfo extends HookWidget {
  @override
  Widget build(BuildContext context) {
    return Row(
      children: [
        Text('For long! It\'s '),
        Padding(
          padding: const EdgeInsets.only(left: 8.0),
          child: HoverChip(
            backgroundColor: ApplicationColor.beige,
            label: 'really... A LOT',
            labelStyle: TextStyle(
              color: ApplicationColor.black,
              fontSize: 12,
            ),
          ),
        ),
      ],
    );
  }
}

// ------------------------------------------------------------------------------
class _ShortInfo extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Row(
      children: [
        Text('For short! It\'s'),
        Padding(
          padding: const EdgeInsets.only(left: 8.0),
          child: HoverChip(
            backgroundColor: ApplicationColor.beige,
            label: 'A LOT',
            labelStyle: TextStyle(
              color: ApplicationColor.black,
              fontSize: 12,
            ),
          ),
        ),
      ],
    );
  }
}

// ------------------------------------------------------------------------------
class _SkillElement extends HookConsumerWidget {
  final SkillOptions options;

  _SkillElement({Key? key, required this.options}) : super(key: key);

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final percentage = '${this.options.indicator * 100}%';

    return Container(
      padding: EdgeInsets.symmetric(vertical: 8, horizontal: 8),
      child: Column(children: [
        Row(
          children: [
            Text(
              this.options.name,
              style: TextStyle(
                fontSize: 14,
                fontWeight: FontWeight.bold,
              ),
            ),
            Spacer(),
            Text(percentage),
          ],
        ),
        SizedBox(height: 4),
        ClipRRect(
          borderRadius: BorderRadius.circular(4),
          child: LinearProgressIndicator(
            value: this.options.indicator,
            minHeight: 8,
          ),
        ),
      ]),
    );
  }
}
