var plugin = {
  ThirdwebInvoke: function (taskId, route, payload, cb) {
    // convert taskId from pointer to str and allocate it to keep in memory
    var id = UTF8ToString(taskId);
    var idSize = lengthBytesUTF8(id) + 1;
    var idPtr = _malloc(idSize);
    stringToUTF8(id, idPtr, idSize);
    // execute bridge call
    window.bridge
      .invoke(UTF8ToString(route), UTF8ToString(payload))
      .then((returnStr) => {
        var bufferSize = lengthBytesUTF8(returnStr) + 1;
        var buffer = _malloc(bufferSize);
        stringToUTF8(returnStr, buffer, bufferSize);
        // callback into unity
        dynCall_viii(cb, idPtr, buffer, null);
      })
      .catch((err) => {
        console.error("ThirdwebSDK invoke error", err);
        var msg = err.reason || err.message;
        var bufferSize = lengthBytesUTF8(msg) + 1;
        var buffer = _malloc(bufferSize);
        stringToUTF8(msg, buffer, bufferSize);
        dynCall_viii(cb, idPtr, null, buffer);
      });
  },
  ThirdwebInvokeListener: function (taskId, route, payload, action) {
    // execute bridge call
    window.bridge.invokeListener(
      UTF8ToString(taskId),
      UTF8ToString(route),
      UTF8ToString(payload),
      action,
      (jsAction, jsTaskId, jsResult) => {
        // Handle Task ID
        var jsId = jsTaskId;
        var jsIdSize = lengthBytesUTF8(jsId) + 1;
        var jsIdBuffer = _malloc(jsIdSize);
        stringToUTF8(jsId, jsIdBuffer, jsIdSize);

        // Handle Result
        var jsRes = jsResult;
        var jsResSize = lengthBytesUTF8(jsRes) + 1;
        var jsResBuffer = _malloc(jsResSize);
        stringToUTF8(jsRes, jsResBuffer, jsResSize);

        dynCall_vii(jsAction, jsIdBuffer, jsResBuffer);
      }
    );
  },
  ThirdwebInitialize: function (chain, options) {
    window.bridge.initialize(UTF8ToString(chain), UTF8ToString(options));
  },
  ThirdwebConnect: function (taskId, wallet, chainId, password, email, cb) {
    // convert taskId from pointer to str and allocate it to keep in memory
    var id = UTF8ToString(taskId);
    var idSize = lengthBytesUTF8(id) + 1;
    var idPtr = _malloc(idSize);
    stringToUTF8(id, idPtr, idSize);
    // execute bridge call
    window.bridge
      .connect(
        UTF8ToString(wallet),
        chainId,
        UTF8ToString(password),
        UTF8ToString(email)
      )
      .then((address) => {
        if (address) {
          var bufferSize = lengthBytesUTF8(address) + 1;
          var buffer = _malloc(bufferSize);
          stringToUTF8(address, buffer, bufferSize);
          dynCall_viii(cb, idPtr, buffer, null);
        } else {
          dynCall_viii(cb, idPtr, null, null);
        }
      })
      .catch((err) => {
        var msg = err.message;
        var bufferSize = lengthBytesUTF8(msg) + 1;
        var buffer = _malloc(bufferSize);
        stringToUTF8(msg, buffer, bufferSize);
        dynCall_viii(cb, idPtr, null, buffer);
      });
  },
  ThirdwebSwitchNetwork: async function (taskId, chainId, cb) {
    // convert taskId from pointer to str and allocate it to keep in memory
    var id = UTF8ToString(taskId);
    var idSize = lengthBytesUTF8(id) + 1;
    var idPtr = _malloc(idSize);
    stringToUTF8(id, idPtr, idSize);
    // execute bridge call
    window.bridge
      .switchNetwork(chainId)
      .then(() => {
        dynCall_viii(cb, idPtr, null, null);
      })
      .catch((err) => {
        var msg = err.message;
        var bufferSize = lengthBytesUTF8(msg) + 1;
        var buffer = _malloc(bufferSize);
        stringToUTF8(msg, buffer, bufferSize);
        dynCall_viii(cb, idPtr, null, buffer);
      });
  },
  ThirdwebDisconnect: async function (taskId, cb) {
    // convert taskId from pointer to str and allocate it to keep in memory
    var id = UTF8ToString(taskId);
    var idSize = lengthBytesUTF8(id) + 1;
    var idPtr = _malloc(idSize);
    stringToUTF8(id, idPtr, idSize);
    // execute bridge call
    window.bridge
      .disconnect()
      .then(() => {
        dynCall_viii(cb, idPtr, idPtr, null);
      })
      .catch((err) => {
        var msg = err.message;
        var bufferSize = lengthBytesUTF8(msg) + 1;
        var buffer = _malloc(bufferSize);
        stringToUTF8(msg, buffer, bufferSize);
        dynCall_viii(cb, idPtr, null, buffer);
      });
  },
  ThirdwebFundWallet: async function (taskId, payload, cb) {
    // convert taskId from pointer to str and allocate it to keep in memory
    var id = UTF8ToString(taskId);
    var idSize = lengthBytesUTF8(id) + 1;
    var idPtr = _malloc(idSize);
    stringToUTF8(id, idPtr, idSize);
    // execute bridge call
    window.bridge
      .fundWallet(UTF8ToString(payload))
      .then(() => {
        dynCall_viii(cb, idPtr, idPtr, null);
      })
      .catch((err) => {
        var msg = err.message;
        var bufferSize = lengthBytesUTF8(msg) + 1;
        var buffer = _malloc(bufferSize);
        stringToUTF8(msg, buffer, bufferSize);
        dynCall_viii(cb, idPtr, null, buffer);
      });
  },
};

mergeInto(LibraryManager.library, plugin);
