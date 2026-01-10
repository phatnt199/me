import 'package:shared_preferences/shared_preferences.dart';

class Preference {
  SharedPreferences prefs;

  Preference(this.prefs);

  static Future<Preference> configure() async {
    final prefs = await SharedPreferences.getInstance();
    return Preference(prefs);
  }
}
