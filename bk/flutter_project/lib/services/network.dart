import 'dart:io';
import 'dart:convert';

import 'package:http/http.dart' as http;

abstract class AbstractNetwork {
  http.Client httpClient = http.Client();

  String? baseUrl;
  Map<String, String>? defaultHeaders;

  // ----------------------------------------------------------------------
  Uri getRequestUri(String url,
      {String? baseUrl, Map<String, dynamic>? params}) {
    if (url.isEmpty) {
      throw Exception('[getRequestUri] Empty URL Request');
    }

    String requestUrl = '${baseUrl ?? this.baseUrl}/$url';

    if (params?.isNotEmpty ?? false) {
      String queryString = Uri(queryParameters: params).query;
      requestUrl = [requestUrl, queryString].join('?');
    }

    return Uri.parse(requestUrl);
  }

  // ----------------------------------------------------------------------
  Map<String, String> getRequestHeaders(Map<String, dynamic>? headers) {
    final rs = Map<String, String>();

    defaultHeaders?.forEach((key, value) {
      rs.putIfAbsent(key, () => value.toString());
    });

    headers?.forEach((key, value) {
      rs.putIfAbsent(key, () => value.toString());
    });

    return rs;
  }

  // ----------------------------------------------------------------------
  String? getRequestBody(Object? body) {
    String rs = '';
    if (body == null) {
      return rs;
    }

    if (!(body is String)) {
      return jsonEncode(body);
    }

    return rs;
  }

  // ----------------------------------------------------------------------
  Future<http.Response> send({
    String? baseUrl,
    required String url,
    required String method,
    Map<String, dynamic>? params,
    Map<String, dynamic>? headers,
    Object? body,
  }) async {
    int requestAt = DateTime.now().millisecondsSinceEpoch;
    http.Response rs = http.Response('', HttpStatus.noContent);

    try {
      final requestUri =
          this.getRequestUri(url, baseUrl: baseUrl, params: params);

      final requestHeaders = this.getRequestHeaders(headers);
      final requestBody = this.getRequestBody(body);
      final requestMethod = method.toLowerCase();

      print('[$requestMethod] Uri: $requestUri');
      switch (requestMethod) {
        case 'get':
          rs = await this.httpClient.get(requestUri, headers: requestHeaders);
          break;
        case 'post':
          rs = await this
              .httpClient
              .post(requestUri, headers: requestHeaders, body: requestBody);
          break;
        case 'put':
          rs = await this
              .httpClient
              .put(requestUri, headers: requestHeaders, body: requestBody);
          break;
        case 'patch':
          rs = await this
              .httpClient
              .patch(requestUri, headers: requestHeaders, body: requestBody);
          break;
        case 'delete':
          rs = await this
              .httpClient
              .delete(requestUri, headers: requestHeaders, body: requestBody);
          break;
        default:
          throw HttpException('[send] Invalid HTTP Request Method!');
      }
    } catch (e) {
      print('[send] Error while sending request!');
      print(e);
    } finally {
      print(
          '[send] Url: $url | Took: ${DateTime.now().millisecondsSinceEpoch - requestAt}(ms)');
      return rs;
    }
  }
}

class Network extends AbstractNetwork {
  Network({String? baseUrl = ''}) : super() {
    this.baseUrl = baseUrl;
    this.defaultHeaders = Map<String, String>();
  }

  Network.withHeaders(
      {String? baseUrl = '', required Map<String, String> headers})
      : super() {
    this.baseUrl = baseUrl;
    this.defaultHeaders = headers;
  }
}
