import 'package:flutter/material.dart';
import 'package:flutter_hooks/flutter_hooks.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';
import 'package:portfolio/common/constants.dart';
import 'package:portfolio/common/typedefs.dart';
import 'package:portfolio/providers/section.dart'
    show MENU_OPTIONS, sectionProvider;
import 'package:portfolio/providers/theme.dart';
import 'package:portfolio/screens/main/bottom_navigator.dart';
import 'package:portfolio/screens/main/menu_bar.dart';
import 'package:portfolio/widgets/rounded_container.dart';

const double MAX_WIDTH = 1366.0;

// ------------------------------------------------------------------------------
class MainPortfolio extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: _PortfolioContainer(
        content: _PortfolioContent(),
        navigationBar: BottomNavigator(
          width: MAX_WIDTH / 2,
          options: MENU_OPTIONS,
        ),
      ),
    );
  }
}

// ------------------------------------------------------------------------------
class _PortfolioContainer extends HookConsumerWidget {
  final Widget content;
  final Widget navigationBar;

  _PortfolioContainer({
    Key? key,
    required this.content,
    required this.navigationBar,
  }) : super(key: key);

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final themeMode = ref.watch(themeProvider);

    return LayoutBuilder(
      builder: (context, constraints) {
        final bgAsset =
            themeMode == ThemeMode.dark ? 'images/bg-4.jpg' : 'images/bg-3.jpg';
        final isSmallScreenWidth =
            constraints.maxWidth < ScreenSizeFactor.TABLET;
        EdgeInsets padding =
            EdgeInsets.only(left: 48.0, right: 48.0, top: 40.0, bottom: 8.0);

        List<Widget> children = [
          this.content,
          Positioned(bottom: 0, child: this.navigationBar)
        ];
        if (isSmallScreenWidth) {
          padding = EdgeInsets.all(8.0);
        }

        return Container(
          height: double.infinity,
          width: double.infinity,
          padding: padding,
          decoration: BoxDecoration(
            image: DecorationImage(
              image: AssetImage(bgAsset),
              fit: BoxFit.cover,
            ),
          ),
          child: Stack(
            alignment: Alignment.topCenter,
            children: children,
          ),
        );
      },
    );
  }
}

// ------------------------------------------------------------------------------
class _PortfolioContent extends HookConsumerWidget {
  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final appSize = MediaQuery.of(context).size;
    final SectionOptions selectedSection = ref.watch(sectionProvider);
    final scrollController = useScrollController();

    useEffect(() {
      if (scrollController.hasClients) {
        scrollController.animateTo(
          0,
          duration: Duration(milliseconds: 500),
          curve: Curves.fastOutSlowIn,
        );
      }
      return () {};
    }, [selectedSection]);

    return RoundedContainer(
      height: appSize.height -
          (8 * (appSize.width < ScreenSizeFactor.TABLET ? 10 : 15)),
      constraints: BoxConstraints(maxWidth: 1200),
      padding: EdgeInsets.all(32),
      child: Column(
        mainAxisAlignment: MainAxisAlignment.start,
        children: [
          Flexible(
            flex: 1,
            child: MenuBar(),
          ),
          Flexible(
            flex: 18,
            child: Container(
              padding: EdgeInsets.only(top: 8.0),
              alignment: selectedSection.index != 0
                  ? Alignment.topCenter
                  : Alignment.center,
              child: SingleChildScrollView(
                controller: scrollController,
                child: AnimatedSwitcher(
                  switchOutCurve: Curves.fastOutSlowIn,
                  switchInCurve: Curves.easeInQuart,
                  duration: Duration(milliseconds: 200),
                  child: selectedSection.content,
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }
}
