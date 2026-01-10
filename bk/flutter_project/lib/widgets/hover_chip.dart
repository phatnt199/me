import 'package:flutter/material.dart';
import 'package:flutter_hooks/flutter_hooks.dart';

class HoverChip extends HookWidget {
  final Color? backgroundColor;
  final String label;
  final TextStyle? labelStyle;
  final Function()? onTap;

  HoverChip({
    Key? key,
    this.backgroundColor,
    required this.label,
    this.labelStyle,
    this.onTap,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final isHover = useState(false);

    return InkWell(
      onTap: () {
        if (this.onTap == null) {
          return;
        }

        this.onTap!();
      },
      onHover: (value) {
        isHover.value = value;
      },
      child: Chip(
        backgroundColor: this.backgroundColor,
        label: Text(
          this.label,
          style: this.labelStyle?.copyWith(
              fontWeight: isHover.value ? FontWeight.w900 : FontWeight.w100),
        ),
        elevation: isHover.value ? 4 : 0,
      ),
    );
  }
}
