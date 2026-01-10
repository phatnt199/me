import 'package:portfolio/mixins/to_string.dart';

abstract class BaseModel with ToStringMixin {
  List<String> fields = [];

  Object? getObjectClass();

  @override
  String toString() {
    final objectClass = this.getObjectClass();
    if (objectClass == null) {
      return '';
    }

    return this.stringify(objectClass);
  }
}
