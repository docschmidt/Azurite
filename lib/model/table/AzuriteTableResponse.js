/** @format */

"use strict";

const uuidV1 = require("uuid/v1"),
  N = require("./../../core/HttpHeaderNames");

class AzuriteTableResponse {
  constructor({ proxy = undefined, payload = undefined, continuationToken = undefined }) {

    this.proxy = proxy;
    this.httpProps = {};
    this.httpProps[N.VERSION] = "2016-05-31";
    this.httpProps[N.DATE] = new Date().toGMTString();
    this.httpProps[N.REQUEST_ID] = uuidV1();
    this.payload = payload;

    if (continuationToken !== undefined) {
      this.httpProps[N.TABLE_CONTINUATION_NEXT_PARTITION_KEY] = encodeURIComponent(continuationToken.nextPartitionKey);
      this.httpProps[N.TABLE_CONTINUATION_NEXT_ROW_KEY] = encodeURIComponent(continuationToken.nextRowKey);
    }
  }

  addHttpProperty(key, value) {
    if (value !== undefined) {
      this.httpProps[key] = value;
    }
  }
}

module.exports = AzuriteTableResponse;
