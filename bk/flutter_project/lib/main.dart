import 'package:flutter/material.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';
import 'package:portfolio/common/constants.dart';
import 'package:portfolio/configurations/theme.dart';
import 'package:portfolio/providers/theme.dart';
import 'package:portfolio/screens/main/index.dart';
import 'package:portfolio/services/database.dart';
import 'package:portfolio/services/preferences.dart';
import 'package:portfolio/services/variables.dart';

// ---------------------------------------------------------------
Future<void> main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await initialize();

  final application = ProviderScope(
    child: Main(),
  ); // ProviderScope

  runApp(application);
}

// ---------------------------------------------------------------
// APPLICATION INITIALIZATION
// ---------------------------------------------------------------
Future<void> initialize() async {
  // Share Preferences
  final preference = await Preference.configure();
  Variables.set(key: VariableKeys.KEY_PREFERENCES, value: preference);

  // Database
  final database = await Database.configure();
  Variables.set(key: VariableKeys.KEY_DATABASE, value: database);
}

// ---------------------------------------------------------------
class Main extends HookConsumerWidget {
  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final themeMode = ref.watch(themeProvider);

    return MaterialApp(
      key: key,
      title: Constants.APP_NAME,
      theme: ApplicationTheme.LIGHT,
      darkTheme: ApplicationTheme.DARK,
      themeMode: themeMode,
      home: MainPortfolio(),
    ); // MaterialApp
  }
}
