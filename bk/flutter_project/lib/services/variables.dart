class Variables {
  static Map<String, dynamic> variables = {};

  static void set({required String key, required dynamic value}) {
    variables.putIfAbsent(key, () => value);
  }

  static T get<T>({required String key}) => variables[key] as T;
}
