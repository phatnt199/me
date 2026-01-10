import 'package:flutter/material.dart';
import 'package:flutter/physics.dart';
import 'package:flutter_hooks/flutter_hooks.dart';

class DraggableContainer extends StatefulHookWidget {
  final Widget child;
  final bool willResetAlignment;

  DraggableContainer(
      {Key? key,
      required Widget this.child,
      bool this.willResetAlignment = true})
      : super(key: key);

  @override
  createState() => _DraggableContainerState();
}

class _DraggableContainerState extends State<DraggableContainer> {
  late Animation _animation;

  @override
  build(BuildContext context) {
    final springDescription = useMemoized(() {
      return SpringDescription(mass: 20, stiffness: 1, damping: 2);
    }, [context]);
    final size = useMemoized(() {
      final queriedSize = MediaQuery.of(context).size;
      return queriedSize;
    }, [context]);
    final dragAlignment = useState(Alignment.center);
    final animationController = useAnimationController(
      duration: Duration(seconds: 2),
    );

    final doResetAlignment = useCallback((DragEndDetails details) {
      _animation = animationController.drive(AlignmentTween(
        begin: dragAlignment.value,
        end: Alignment.center,
      ));

      final simulation =
          SpringSimulation(springDescription, 0, 1, Offset(0, 1).distance);
      animationController.animateWith(simulation);
    }, [animationController, size]);

    useEffect(() {
      animationController.addListener(() {
        dragAlignment.value = _animation.value;
      });

      return () {};
    }, []);

    return GestureDetector(
      onPanUpdate: (details) {
        dragAlignment.value += Alignment(
          details.delta.dx / (size.width / 2),
          details.delta.dy / (size.height / 2),
        );
      },
      onPanEnd: (details) {
        if (!this.widget.willResetAlignment) {
          return;
        }
        doResetAlignment(details);
      },
      child: Align(
        alignment: dragAlignment.value,
        child: this.widget.child,
      ),
    );
  }
}
