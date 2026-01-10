import 'package:hive_flutter/hive_flutter.dart';

abstract class AbstractDatabase {}

class Database extends AbstractDatabase {
  Database();

  Future<void> close() async {
    await Hive.close();
  }

  static Future<Database> configure() async {
    await Hive.initFlutter();
    return Database();
  }

  Future<Box<T>> box<T>(String name) async {
    final rs = await Hive.openBox<T>(name);
    return rs;
  }
}
