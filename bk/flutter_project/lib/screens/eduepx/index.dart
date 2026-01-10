import 'package:flutter/material.dart';
import 'package:flutter_hooks/flutter_hooks.dart';
import 'package:portfolio/common/constants.dart';
import 'package:portfolio/common/typedefs.dart' show EduEpxOptions;
import 'package:portfolio/widgets/hover_chip.dart';
import 'package:portfolio/widgets/sector_title.dart';

final _eduOptions = <EduEpxOptions>[
  EduEpxOptions(
    time: '2021',
    place: 'grow.google | Grow with Google',
    title: 'DATA ANALYTICS CERTIFICATE',
    details: [
      '- Completed Data analysts certificate about collect, transform, and organize data in order to help make informed business decisions.',
      '- Particularly, these skill sets are applied in Stock Market.'
    ],
  ),
  EduEpxOptions(
    time: '2016',
    place: 'IBM Bluemix Cloud',
    title: 'BLUEMIX AWARD OF 24,000 USD',
    details: [
      '- Award for winning the best application on BLUEMIX',
      '- Received 24,000 USD for Start-up'
    ],
  ),
  EduEpxOptions(
    time: '2016',
    place: 'IBM Training and Application Development',
    title: 'BLUEMIX CERTIFICATE FOR APPLICATION DEVELOPMENT',
    details: [
      '- Archive IBM Training and Application Development on BLUEMIX Certificate.',
    ],
  ),
  EduEpxOptions(
    time: '2015',
    place: 'Oracle Education',
    title: 'OCA CERTIFICATE OF ORACLE',
    details: [
      '- Archive OCA Certificate of Oracle (Oracle Certified Associate, Java SE 7 Programmer Certificate)',
    ],
  ),
  EduEpxOptions(
    time: '2014 - 2015',
    place: 'FPT Software, Ho Chi Minh City, Vietnam',
    title: 'ON-JOB-TRAINING',
    details: [
      '- I got many experience when work here with architecture designing and mobile development.'
    ],
  ),
  EduEpxOptions(
    time: '2012 - 2016',
    place:
        'Bachelor of Engineering (B.Eng.) in Computer Software Engineering, FPT University , Vietnam',
    title: 'BACHELOR DEGREE CERTIFICATE',
    details: [
      '- I have completed Software Engineering degree with Excellent Grade (8.7/10).'
    ],
  ),
  EduEpxOptions(
    time: '2009 - 2012',
    place:
        'Nguyen Dinh Chieu High School, My Tho City, Tien Giang District, Vietnam',
    title: 'HIGHER SECONDARY CERTIFICATE',
    details: [
      '- I was awesome at Math, Infomation Technology.',
      '- I got an award from my district about Software Contest.',
      '- From this step of existence in this spot, this is the greatest motivation for me in the future!'
    ],
  ),
];

final _expOptions = <EduEpxOptions>[
  EduEpxOptions(
    time: '2019 - Now',
    place: 'Work as a Freelancer',
    title: 'FREELANCER FULL-STACK SOFTWARE DEVELOPER',
    details: [
      '- Lead a group of 10 persons and work as a Software Outsourcing Development Group.',
      '- Study, Research and Involve in Stock Market as an Data Analyst!',
      '- Be a part of Algorithm Trading Team and PI Team.'
          '- Developed Trading Automation Bot, which using automation algorithm for Stock Market.'
    ],
  ),
  EduEpxOptions(
    time: '2017 - 2020',
    place: 'Work as a Freelancer',
    title: 'FULL-STACK SOFTWARE DEVELOPER and TEAM LEADER',
    details: [
      '- Lead a group of 10 persons and work as a Software Outsourcing Development Group.'
    ],
  ),
  EduEpxOptions(
    time: '2018 - 2019',
    place: 'Nexpando Corporation, Ho Chi Minh, Vietnam',
    title: 'TECHNICAL LEAD',
    details: [
      '- Cooperated and Developed Vietjet\'s Instant Ticketing System!',
      '- Be a part of Nexbus production, which is core value production of company.',
    ],
  ),
  EduEpxOptions(
    time: '2017 - 2018',
    place: 'Dinosys Corporation, Ho Chi Minh, Vietnam',
    title: 'FULL-STACK SOFTWARE DEVELOPER & JAVA TECHNICAL LEAD',
    details: [
      '- Developed appplications with plenty of programming language (Java, Ruby on Rails, Golang, NodeJS, ReactJS).',
      '- Promoted to become a Java Team Leader and lead a team of 5 members through 4 projects.',
    ],
  ),
  EduEpxOptions(
    time: '2016 - 2017',
    place: 'Dinosys Corporation, Ho Chi Minh, Vietnam',
    title: 'FULL-STACK SOFTWARE DEVELOPER',
    details: [
      '- Develop Travel Application including Web Application (Ruby on Rails), Android Application (Java) and RestAPI Server (Java)',
    ],
  ),
  EduEpxOptions(
    time: '2016',
    place: 'FPT University, Ho Chi Minh, Vietnam',
    title: 'SOFTWARE TEAM LEADER',
    details: [
      '- Develop iMuseum - Intelligent Museum (Capstone Project 2016) interact with Estimote Beacon.',
    ],
  ),
  EduEpxOptions(
    time: '2015 - 2016',
    place: 'Wisky Solution CO., LTD, Ho Chi Minh, Vietnam',
    title: 'ANDROID DEVELOPER',
    details: [
      '- Completely handle Android segment for this company.',
      '- Feel comfortable when working with Loyalty System.',
      '- Besides, promoted from CEO of Wisky Solution CO., LTD for becoming a trainer about Android Development.',
    ],
  ),
  EduEpxOptions(
    time: '2014 - 2015',
    place: 'FPT Software, Ho Chi Minh, Vietnam',
    title: 'JUNIOR ANDROID DEVELOPER',
    details: [
      '- I got many experience when work here with architecture designing and mobile development.'
    ],
  ),
];

// -------------------------------------------------------------------
class EduEpx extends HookWidget {
  @override
  Widget build(BuildContext context) {
    final textTheme = Theme.of(context).textTheme;
    final dayOfWork = DateTime.now().difference(Constants.START_WORK_AT).inDays;

    final rowChildren = <Widget>[
      Flexible(
        flex: 5,
        child: _Content(title: 'Education', options: _eduOptions),
      ),
      Spacer(),
      Flexible(
        flex: 5,
        child: _Content(title: 'Experience', options: _expOptions),
      ),
    ];

    final columnChildren = <Widget>[
      _Content(title: 'Education', options: _eduOptions),
      _Content(title: 'Experience', options: _expOptions),
    ];

    return Column(
      children: [
        SectorTitle(
          title: 'Resume',
          subtitle: Chip(
            label: Text(
              '${Formatter.DECIMAL_FORMATTER.format(dayOfWork / 365)} Years of Experience',
              style: textTheme.bodyLarge?.apply(fontWeightDelta: 2),
            ),
          ),
        ),
        LayoutBuilder(
          builder: (context, constraints) {
            if (constraints.maxWidth < ScreenSizeFactor.TABLET) {
              return Column(children: columnChildren);
            }

            return Row(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: rowChildren,
            );
          },
        ),
      ],
    );
  }
}

// -------------------------------------------------------------------
class _Content extends StatelessWidget {
  final String title;
  final List<EduEpxOptions> options;

  _Content({
    Key? key,
    required this.title,
    required this.options,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final textTheme = Theme.of(context).textTheme;

    return Container(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.spaceAround,
        children: [
          Container(
            alignment: AlignmentDirectional.topStart,
            child: Text(
              this.title,
              style: textTheme.titleLarge?.apply(
                fontWeightDelta: 2,
              ),
            ),
          ),
          Divider(),
          ...options.map((option) => _ExContainer(options: option)).toList(),
        ],
      ),
    );
  }
}

// -------------------------------------------------------------------
class _ExContainer extends HookWidget {
  final EduEpxOptions options;

  _ExContainer({
    Key? key,
    required this.options,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final textTheme = Theme.of(context).textTheme;

    return Container(
      width: double.infinity,
      margin: EdgeInsets.only(
        top: 8 * 3,
        bottom: 8 * 6,
      ),
      child: Column(
        mainAxisAlignment: MainAxisAlignment.spaceAround,
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              Flexible(
                flex: 4,
                child: HoverChip(
                  backgroundColor: ApplicationColor.beige,
                  label: this.options.time,
                  labelStyle: TextStyle(
                    color: ApplicationColor.black,
                    fontWeight: FontWeight.bold,
                  ),
                ),
              ),
              Flexible(
                flex: 8,
                child: Padding(
                  padding: EdgeInsets.only(left: 8.0),
                  child: Text(
                    this.options.place,
                    style: textTheme.headline4?.copyWith(fontSize: 14),
                  ),
                ),
              ),
            ],
          ),
          Container(
            padding: EdgeInsets.symmetric(horizontal: 8.0),
            decoration: BoxDecoration(
              border: Border(
                left: BorderSide(width: 2, color: ApplicationColor.beige),
              ),
            ),
            child: Column(
              mainAxisAlignment: MainAxisAlignment.spaceAround,
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                SizedBox(height: 20),
                Text(
                  this.options.title,
                  style: textTheme.titleMedium?.copyWith(
                    fontWeight: FontWeight.bold,
                  ),
                ),
                SizedBox(height: 4),
                Divider(),
                ...this.options.details.map((detail) {
                  return Column(children: [
                    SizedBox(height: 4),
                    Text(detail),
                  ]);
                }).toList(),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
