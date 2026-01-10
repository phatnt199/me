import 'dart:convert';

mixin ToStringMixin {
  String stringify(Object obj) {
    return jsonEncode(obj);
  }
}
