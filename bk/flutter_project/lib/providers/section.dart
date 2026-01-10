import 'package:flutter/material.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';
import 'package:portfolio/common/typedefs.dart' show SectionOptions;
import 'package:portfolio/screens/home/index.dart';
import 'package:portfolio/screens/my_contact/index.dart';
import 'package:portfolio/screens/what_can_i_do/index.dart';
import 'package:portfolio/screens/what_i_did/index.dart';
import 'package:portfolio/screens/about/index.dart';
import 'package:portfolio/screens/eduepx/index.dart';

final HomeSection = SectionOptions(
  index: 0,
  name: 'Home',
  icon: Icons.home_rounded,
  content: Home(),
);
final AboutSection = SectionOptions(
  index: 1,
  name: 'About',
  icon: Icons.info_rounded,
  content: About(),
);
final EducationSection = SectionOptions(
  index: 2,
  name: 'Edu & Exp',
  icon: Icons.history_edu_rounded,
  content: EduEpx(),
);
final WhatCanIDoSection = SectionOptions(
  index: 3,
  name: 'What can I do?',
  icon: Icons.work_rounded,
  content: WhatCanIDo(),
);
final WhatIDidSection = SectionOptions(
  index: 4,
  name: 'What I did',
  icon: Icons.task_rounded,
  content: WhatIDid(),
);
final MyContactSection = SectionOptions(
  index: 5,
  name: 'My Contact',
  icon: Icons.contact_support_rounded,
  content: MyContact(),
);

final Map<String, SectionOptions> MENU_OPTIONS = <String, SectionOptions>{
  'home': HomeSection,
  'about': AboutSection,
  'education': EducationSection,
  'what-can-i-do': WhatCanIDoSection,
  'what-i-did': WhatIDidSection,
  'contact': MyContactSection,
};

class SectionNotifier extends StateNotifier<SectionOptions> {
  SectionNotifier() : super(HomeSection);

  void goTo(SectionOptions section) {
    if (this.state.index == section.index) {
      return;
    }

    this.state = section;
  }
}

final sectionProvider =
    StateNotifierProvider<SectionNotifier, SectionOptions>((ref) {
  return SectionNotifier();
});
