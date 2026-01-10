import 'dart:io';

import 'package:flutter_learn/providers/network.dart';
import 'package:flutter_learn/utils/crypto.dart';
import 'package:http/http.dart';

class NetworkRequest {
  static final _networkClient = Network.withHeaders(
    baseUrl: [
      RequestConstants.NETWORK_REQUEST_BASE_URL,
      RequestConstants.NETWORK_REQUEST_BASE_PATH
    ].join(),
    headers: RequestConstants.NETWORK_REQUEST_DEFAULT_HEADERS,
  );

  static Future<Response> doLogin({
    String username = '',
    String password = '',
  }) async {
    Response rs = await _networkClient.send(
      url: '/Users/login',
      method: 'post',
      params: {'include': 'user'},
      body: {'loginId': username, 'password': password},
    );

    return rs;
  }

  static Future<Response> getStockSnapshots({
    List<String> symbols = const [],
  }) async {
    List<int> deflated = Crypto.deflate({'symbols': symbols});
    Response rs = await _networkClient.send(
      url: 'TsMarkets/stock/latest',
      method: 'get',
      params: {'filter': deflated.join(',')},
      headers: {
        HttpHeaders.authorizationHeader: 'Bearer ${RequestConstants.JWT_TOKEN}'
      },
    );

    return rs;
  }

  static Future<Response> getPhotos() async {
    Response rs = await _networkClient.send(
      baseUrl: 'https://api.npoint.io',
      url: 'e6c4015da89896be9767',
      method: 'get',
    );
    return rs;
  }
}

class RequestConstants {
  static const NETWORK_REQUEST_DEFAULT_HEADERS = {
    HttpHeaders.acceptHeader: '*/*',
    HttpHeaders.accessControlAllowHeadersHeader: '*',
    HttpHeaders.contentTypeHeader: 'application/json; charset=utf-8',
  };

  static const NETWORK_REQUEST_BASE_URL = 'https://qt-qts-be.quantech.vn';
  static const NETWORK_REQUEST_BASE_PATH = '/v1/api';

  static const JWT_TOKEN =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjUsImJhc2VUb2tlbiI6IkU1NEQ3dHB1MTN2U3R0QThXMlhCWDhYSmIycEhBcVprZjFUSUVYY1VwN1gxTElNWmVCSmdqbm1XelprSWFDb04iLCJpYXQiOjE2NDYzMDMwMDUsImV4cCI6MTY0NzUxMjYwNX0.u8lQBh2uh_elp93ZUcqMzQHXydZOyMwJpguvRLP4b3A';
}
