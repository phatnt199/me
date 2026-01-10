import 'package:flutter/material.dart';
import 'package:flutter_hooks/flutter_hooks.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';
import 'package:rxdart/subjects.dart';
import 'package:rxdart/transformers.dart';

final Subject RESET_SCALE_SUBJECT = PublishSubject();

class ProfileImage extends HookConsumerWidget {
  final String assetSrc;
  final double height;
  final double? width;
  final BoxDecoration? decoration;

  ProfileImage({
    Key? key,
    required this.assetSrc,
    this.height = double.infinity,
    this.width = double.infinity,
    this.decoration,
  }) : super(key: key);

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final profileImageScale = useState(1.0);

    useEffect(() {
      final resetScaleSubscription = RESET_SCALE_SUBJECT.stream
          .debounceTime(Duration(milliseconds: 100))
          .listen((data) {
        profileImageScale.value = data;
      });

      RESET_SCALE_SUBJECT.add(1);
      return () {
        resetScaleSubscription.cancel();
      };
    }, []);

    return InkWell(
      onTap: () {
        profileImageScale.value = 0.9;
        RESET_SCALE_SUBJECT.add(1);
      },
      onHover: (isHover) {
        if (isHover) {
          profileImageScale.value = 1.1;
          return;
        }
        profileImageScale.value = 1;
      },
      child: Container(
        height: this.height,
        width: this.width,
        decoration: this.decoration,
        child: AnimatedScale(
          scale: profileImageScale.value,
          duration: Duration(seconds: 1),
          curve: Curves.elasticOut,
          child: ClipOval(
            child: Image.asset(assetSrc),
          ),
        ),
      ),
    );
  }
}
