import 'package:flutter/material.dart';
import 'package:flutter_hooks/flutter_hooks.dart';
import 'package:portfolio/common/constants.dart';
import 'package:portfolio/common/typedefs.dart';
import 'package:portfolio/widgets/rounded_container.dart';
import 'package:portfolio/widgets/sector_title.dart';
import 'package:url_launcher/url_launcher.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';

final _CONTACTS = <ContactOptions>[
  ContactOptions(
    name: 'Email',
    address: 'tanphat199@gmail.com',
    href: 'mailto:tanphat199@gmail.com?subject=[Portfolio] Get Me In Touch!',
    tag: '#email',
    color: ApplicationColor.red,
    icon: Icons.mail_rounded,
  ),
  ContactOptions(
    name: 'Messenger',
    address: 'Phat Nguyen Tan',
    href: 'https://m.me/phatnt199',
    tag: '#messenger',
    color: Color.fromRGBO(10, 124, 255, 1),
    icon: FontAwesomeIcons.facebookMessenger,
  ),
  ContactOptions(
    name: 'Telegram',
    address: 'Phat Nguyen',
    href: 'https://t.me/tanphat199',
    tag: '#telegram',
    color: Color.fromRGBO(0, 136, 204, 1),
    icon: FontAwesomeIcons.telegram,
  ),
  ContactOptions(
    name: 'Skype',
    address: 'tanphat199@outlook.com',
    href: 'skype:tanphat199@outlook.com?chat',
    tag: '#skype',
    color: Color.fromRGBO(0, 120, 212, 1),
    icon: FontAwesomeIcons.skype,
  ),
];

// ------------------------------------------------------------------------------------------
class MyContact extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    final appTheme = Theme.of(context);

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        SectorTitle(title: 'My Contact'),
        Divider(),
        SizedBox(height: 20),
        LayoutBuilder(
          builder: (context, constraints) {
            return Container(
              constraints: BoxConstraints(maxHeight: 180),
              child: Flex(
                direction: constraints.maxWidth < ScreenSizeFactor.TABLET
                    ? Axis.vertical
                    : Axis.horizontal,
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Flexible(
                    flex: 1,
                    child: RichText(
                      text: TextSpan(
                        style: appTheme.textTheme.bodyMedium,
                        children: [
                          TextSpan(
                            text:
                                'By using these ways, you can get in touch to me easily!\n\n',
                          ),
                          TextSpan(
                            text: 'Feel free to get in touch 😁',
                          ),
                        ],
                      ),
                    ),
                  ),
                  Flexible(
                    flex: 1,
                    child: Chip(
                      label: FittedBox(
                        child: Text(
                          'I\'M AVAILABLE FOR FREELANCE PROJECTS',
                          style: TextStyle(
                            fontWeight: FontWeight.bold,
                            wordSpacing: 4,
                          ),
                        ),
                      ),
                      labelPadding:
                          EdgeInsets.symmetric(vertical: 8, horizontal: 4),
                    ),
                  ),
                ],
              ),
            );
          },
        ),
        SizedBox(height: 20),
        Divider(),
        SizedBox(height: 10),
        Wrap(
          spacing: 8,
          alignment: WrapAlignment.spaceAround,
          children: _CONTACTS.map((contact) {
            return _ContactElement(option: contact);
          }).toList(),
        ),
      ],
    );
  }
}

// ------------------------------------------------------------------------------------------
class _ContactElement extends HookWidget {
  final ContactOptions option;

  _ContactElement({Key? key, required this.option}) : super(key: key);

  void doLaunchHref(String href) async {
    await launch(href);
  }

  @override
  Widget build(BuildContext context) {
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

        return InkWell(
          onTap: () {
            doLaunchHref(this.option.href);
          },
          onHover: (value) {
            isHover.value = value;
          },
          child: RoundedContainer(
            width: boxSize,
            height: boxSize - 12,
            margin: EdgeInsets.only(top: 16),
            backgroundColor: appTheme.cardColor,
            border: Border.all(width: 2, color: appTheme.dividerColor),
            borderRadius: 24,
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
                Icon(this.option.icon, size: 40),
                SizedBox(height: 20),
                FittedBox(
                  child: Text(
                    '${this.option.address}',
                    style: textTheme.titleSmall,
                  ),
                ),
                SizedBox(height: 10),
                Chip(
                  backgroundColor: this.option.color,
                  labelPadding:
                      EdgeInsets.symmetric(vertical: 2, horizontal: 4),
                  label: FittedBox(
                    child: Text(
                      '${this.option.tag} ME',
                      style: textTheme.titleSmall
                          ?.apply(fontWeightDelta: 2, color: Colors.white),
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
