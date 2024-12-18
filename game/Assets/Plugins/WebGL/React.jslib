mergeInto(LibraryManager.library, {
  SignIn: function () {
    window.dispatchReactUnityEvent("SignIn");
  },
  GetDesigns: function () {
    window.dispatchReactUnityEvent("GetDesigns");
  },
  SaveDesign: function (design) {
    window.dispatchReactUnityEvent("SaveDesign", UTF8ToString(design));
  },
  GetENS: function (address) {
    window.dispatchReactUnityEvent("GetENS", UTF8ToString(address));
  },
  SetIsGasless: function (isGasless) {
    window.dispatchReactUnityEvent("SetIsGasless", isGasless);
  },
  ExecuteAny: function (taskId, route, payload, cb) {
    // convert taskId from pointer to str and allocate it to keep in memory
    var id = UTF8ToString(taskId);
    var idSize = lengthBytesUTF8(id) + 1;
    var idPtr = _malloc(idSize);
    stringToUTF8(id, idPtr, idSize);
    // execute bridge call
    window.customBridge
      .invoke(UTF8ToString(route), UTF8ToString(payload))
      .then((returnStr) => {
        var bufferSize = lengthBytesUTF8(returnStr) + 1;
        var buffer = _malloc(bufferSize);
        stringToUTF8(returnStr, buffer, bufferSize);
        // callback into unity
        dynCall_viii(cb, idPtr, buffer, null);
      })
      .catch((err) => {
        console.error("ExecuteAny invoke error", err);
        var msg = err.reason || err.message;
        var bufferSize = lengthBytesUTF8(msg) + 1;
        var buffer = _malloc(bufferSize);
        stringToUTF8(msg, buffer, bufferSize);
        dynCall_viii(cb, idPtr, null, buffer);
      });
  }
});
