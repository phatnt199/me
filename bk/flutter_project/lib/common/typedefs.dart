import 'package:flutter/material.dart';

class SectionOptions {
  final int index;
  final String name;
  final IconData? icon;
  final Widget content;

  SectionOptions(
      {this.index = 0, required this.name, this.icon, required this.content});
}

class EduEpxOptions {
  final String time;
  final String place;
  final String title;
  final List<String> details;

  EduEpxOptions({
    required this.time,
    required this.place,
    required this.title,
    required this.details,
  });
}

class SkillOptions {
  final String name;
  final double indicator;

  SkillOptions({
    required this.name,
    required this.indicator,
  });
}

class ContactOptions {
  final String name;
  final String address;
  final String href;
  final String tag;
  final Color? color;
  final IconData? icon;

  ContactOptions({
    required this.name,
    required this.address,
    required this.href,
    required this.tag,
    this.color,
    this.icon = Icons.contacts_rounded,
  });
}
